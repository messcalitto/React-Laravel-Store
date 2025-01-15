<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Cart;
use App\Models\User;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CartTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_add_product_to_cart()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();
      
        $response = $this->actingAs($user)
            ->post('/api/add_cart/'.$product->id, [
                'quantity' => 1
            ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('carts', [
                'user_id' => $user->id,
                'product_title' => $product->title,
                'price' => $product->discount_price?:$product->price,
                'quantity' => 1
        ]);

        
    }

    public function test_add_negative_quantity_to_cart()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();
      
        $response = $this->actingAs($user)
            ->post('/api/add_cart/'.$product->id, [
                'quantity' => -1
            ]);

        $response->assertStatus(302);

        // Assert that the session has errors for the 'quantity' field
        $response->assertSessionHasErrors(['quantity']);

        // Optionally, you can assert the specific error message
        $response->assertSessionHasErrors([
            'quantity' => 'The quantity field must be at least 1.'
        ]);

        
    }

    public function test_product_not_found()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();
      
        $response = $this->actingAs($user)
            ->post('/api/add_cart/1000', [
                'quantity' => 1
            ]);

        $response->assertStatus(404);

        // Assert that the response contains the specific error message
        $response->assertJson([
            'status' => 'error',
            'message' => 'Product not found'
        ]);
    }

    public function test_product_id_wrong_type()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();
      
        $response = $this->actingAs($user)
            ->post('/api/add_cart/s', [
                'quantity' => 1
            ]);

        $response->assertStatus(302);

        // Optionally, you can assert the specific error message
        $response->assertSessionHasErrors([
            'id' => 'The id field must be a number.'
        ]);
        
    }

    public function test_negative_product_id()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();
      
        $response = $this->actingAs($user)
            ->post('/api/add_cart/-1', [
                'quantity' => -1
            ]);

        $response->assertStatus(302);

        // Assert that the session has errors for the 'quantity' field
        $response->assertSessionHasErrors(['id']);

        // Optionally, you can assert the specific error message
        $response->assertSessionHasErrors([
            'id' => 'The id field must be at least 1.'
        ]);

        
    }

    public function test_can_update_cart_item()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();

        $cart = Cart::factory()->create([
            'user_id' => $user->id,
            'product_id' => $product->id,
            'quantity' => 1,
        ]);

        $response = $this->actingAs($user)
            ->get('/api/cart_update/' . $cart->id.'/2');

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'success',
            'message' => 'Cart item updated successfully'
        ]);

        $this->assertDatabaseHas('carts', [
            'id' => $cart->id,
            'quantity' => 2
        ]);
    }

    public function test_cannot_update_cart_item_with_negative_quantity()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();
        $cart = Cart::factory()->create([
            'user_id' => $user->id,
            'product_id' => $product->id,
            'quantity' => 1,
        ]);

        $response = $this->actingAs($user)
            ->get('/api/cart_update/' . $cart->id.'/-1', [
                'quantity' => -1
            ]);

        $response->assertStatus(302);
        $response->assertSessionHasErrors(['quantity']);
    }

    public function test_cannot_update_non_existent_cart_item()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->get('/api/cart_update/999/1', [
                'quantity' => 1
            ]);

        $response->assertStatus(404);
        $response->assertJson([
            'status' => 'error',
            'message' => 'Cart item not found'
        ]);
    }

    public function test_cannot_update_cart_item_without_quantity()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();
        $cart = Cart::factory()->create([
            'user_id' => $user->id,
            'product_id' => $product->id,
            'quantity' => 1,
        ]);

        $response = $this->actingAs($user)
            ->get('/api/cart_update/' . $cart->id.'/');

        $response->assertStatus(404);
    }


    public function test_can_remove_cart_item()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();
        $cart = Cart::factory()->create([
            'user_id' => $user->id,
            'product_id' => $product->id,
        ]);

        $response = $this->actingAs($user)
            ->get('/api/cart_remove/' . $cart->id);

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'success',
            'message' => 'Cart item removed successfully'
        ]);

        $this->assertDatabaseMissing('carts', [
            'id' => $cart->id
        ]);
    }

    public function test_cannot_remove_non_existent_cart_item()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->get('/api/cart_remove/999');

        $response->assertStatus(404);
        $response->assertJson([
            'status' => 'error',
            'message' => 'Cart item not found'
        ]);
    }

    public function test_cannot_remove_other_users_cart_item()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $product = Product::factory()->create();
        
        $cart = Cart::factory()->create([
            'user_id' => $user1->id,
            'product_id' => $product->id,
        ]);

        $response = $this->actingAs($user2)
            ->get('/api/cart_remove/' . $cart->id);

        $response->assertStatus(403);
        
        $this->assertDatabaseHas('carts', [
            'id' => $cart->id
        ]);
    }
}