<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\ProductHistory;
use App\Models\Tab;
use Faker\Factory;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class ProductHistoryTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testProductHistoryCreated()
    {
        $gn = $this->generateData();
        $response = $this->json('POST',
            route('products.store'),
            $gn
        );
        $response->assertCreated();
        $productHistory = ProductHistory::whereJsonContains('after->name', $gn['name'])
            ->where('type', ProductHistory::CREATED)
            ->first();
        self::assertEquals($gn['name'], $productHistory->after['name']);
    }

    public function generateData($image_false = false)
    {
        $faker = Factory::create();
        $tab = Tab::factory()->create();
        return [
            'name' => $faker->name,
            'price' => $faker->randomDigit,
            'count' => $faker->randomDigit,
            'image' => !$image_false ? UploadedFile::fake()->image('avatar.jpg') : '',
            'tab_id' => $tab->id,
        ];
    }

    public function testProductHistoryDeleted()
    {
        $product = Product::factory()->create();
        $response = $this->json('DELETE',
            route('products.destroy', [
                'product' => $product
            ])
        );

        $response->assertStatus(200);
        $productHistory = ProductHistory::whereJsonContains('before->id', $product->id)->where('type', ProductHistory::DELETED)->first();
        self::assertEquals($product->id, $productHistory->before['id']);
    }


    public function testProductHistoryUpdated()
    {
        $product = Product::factory()->create();
        $response = $this->json('PUT',
            route('products.update', [
                'product' => $product
            ]),
            $this->generateData()

        );
        $response->assertStatus(200);
        $productHistory = ProductHistory::whereJsonContains('after->id', $product->id)->
        where('type', ProductHistory::CREATED)
            ->first();
        self::assertEquals($product->name, $productHistory->after['name']);
        $productHistory = ProductHistory::whereJsonContains('after->id', $product->id)->
        where('type', ProductHistory::UPDATED)
            ->first();
        self::assertNotEquals($product->name, $productHistory->after['name']);

    }
}
