<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        return [
            'title' => $this->faker->words(3, true),
            'description' => $this->faker->paragraph(),
            'short_notes' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'discount_price' => $this->faker->randomFloat(2, 5, 90),
            'image' => $this->faker->image('public/uploads', 400, 300, null, false),
            'quantity' => $this->faker->numberBetween(1, 100),
            'category_id' => 1,
            'user_id' => 1,
        ];
    }
}
