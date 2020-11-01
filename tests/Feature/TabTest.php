<?php

namespace Tests\Feature;

use App\Models\Tab;
use Faker\Factory;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class TabTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testTabCreated()
    {

        $response = $this->json('POST',
            route('tabs.store'),
            $this->generateData()
        );
        $response->assertCreated();

    }

    public function generateData($name_false = false)
    {
        $faker = Factory::create();
        return [
            'name' => !$name_false ? $faker->name : '',
        ];
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testTabCreatedFail()
    {

        $response = $this->json('POST',
            route('tabs.store'),
            $this->generateData(true)
        );
        $response->assertJsonValidationErrors('name'
        );

    }

    public function testTabUpdated()
    {
        $tab = Tab::factory()->create();
        $response = $this->json('PUT',
            route('tabs.update', [
                'tab' => $tab
            ]),
            $this->generateData()

        );
        $response->assertStatus(200);
    }

    public function testTabDeleted()
    {
        $Tab = Tab::factory()->create();
        $response = $this->json('DELETE',
            route('tabs.destroy', [
                'tab' => $Tab
            ])
        );

        $response->assertStatus(200);
    }

    public function testTabDeletedFailed()
    {
        $response = $this->json('DELETE',
            route('tabs.destroy', [
                'tab' => 1651
            ])
        );

        $response->assertStatus(404);
    }
}
