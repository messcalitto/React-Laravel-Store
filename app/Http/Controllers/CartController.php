<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\Cart;

class CartController extends Controller
{
    // 
    public function add_cart(Request $request, $id, $call = 'web') {

        if ($call == 'api') {
            
            $request->merge(['id' => $id]);

            $request->validate([
                'quantity' => 'required|numeric|min:1',
                'id' => 'required|numeric|min:1',
            ]);
        }

        $product = Product::find($id);

        if ($call == 'api' && !$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found'
            ], 404);
        }

        $user = auth()->user();

        $cart = new Cart;

        $cart->user_id = $user->id;
      
        $cart->product_title = $product->title;
        $cart->price = $product->price;

        if ($product->discount_price > 0) {
            $cart->price = $product->discount_price;
        }

        if ($product->image != null) {
            $cart->image = $product->image[0];
        }

        $cart->quantity = 1;
        if ($request->quantity) {
            $cart->quantity = $request->quantity;
        }

        $cart->product_id = $product->id;
        $cart->save();
        
        if ($call == 'api') {
            return $this->cart_list('api');
        }

        return redirect('/cart');

    }

    public function cart_list($call = 'web') {
        $user = auth()->user();
        $cart = Cart::where('user_id', $user->id)->get();
        if ($call == 'api') {
            return response()->json([
                'status' => 'success',
                'data' => $cart
            ]);
        }
        return view('home.cart_list', compact('cart'));
    }

    public function cart_update(Request $request, $id, $quantity, $call = 'web') {
        
        $request->merge(['quantity' => $quantity, 'id' => $id]);

        $request->validate([
            'quantity' => 'required|numeric|min:1',
            'id' => 'required|numeric|min:1',
        ]);

        $cart = Cart::find($id);

        if ($call == 'api' && !$cart) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cart item not found'
            ], 404);
        }

        $cart->quantity = $quantity;
        $cart->save();

        if ($call == 'api') {
            return response()->json([
                'status' => 'success',
                'message' => 'Cart item updated successfully'
            ], 200);
        }
    
    }

    public function cart_remove(Request $request, $id, $call = 'web') {
        
        $request->merge(['id' => $id]);
        
        $request->validate([
            'id' => 'required|numeric|min:1',
        ]);

        $cart = Cart::find($id);

        if ($call == 'api' && !$cart) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cart item not found'
            ], 404);
        }

        $cart->delete();
        return response()->json([
            'status' => 'success'
        ]);
    }
}
