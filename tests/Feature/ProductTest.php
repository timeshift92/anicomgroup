<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\ProductHistory;
use App\Models\Tab;
use Faker\Factory;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testProductCreated()
    {

        $response = $this->json('POST',
            route('products.store'),
            $this->generateData()
        );

        $response->assertCreated();

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

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testProductCreatedFail()
    {

        $response = $this->json('POST',
            route('products.store'),
            $this->generateData(true)
        );
        $response->assertJsonValidationErrors('image'
        );

    }

    public function testProductUpdated()
    {
        $product = Product::factory()->create();
        $response = $this->json('PUT',
            route('products.update', [
                'product' => $product
            ]),
            $this->generateData()

        );
        $response->assertStatus(200);
    }

    public function testProductDeleted()
    {
        $product = Product::factory()->create();
        $response = $this->json('DELETE',
            route('products.destroy', [
                'product' => $product
            ])
        );

        $response->assertStatus(200);
    }

    public function testProductDeletedFailed()
    {
        $response = $this->json('DELETE',
            route('products.destroy', [
                'product' => 1651
            ])
        );

        $response->assertStatus(404);
    }
}
