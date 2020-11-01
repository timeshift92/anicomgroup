<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Tab;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'count' => $this->faker->randomDigit,
            'price' => $this->faker->randomDigit,
            'image' => $this->faker->imageUrl(50, 50),
            'tab_id' => Tab::factory(),
        ];
    }
}
