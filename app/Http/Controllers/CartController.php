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

        $product = Product::find($id);

        $user = auth()->user();

        $cart = new Cart;

        $cart->user_id = $user->id;
      
        $cart->product_title = $product->title;
        $cart->price = $product->price;

        if ($product->discount_price != 0) {
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

    public function cart_update($id, $quantity, $call = 'web') {
        $cart = Cart::find($id);
        $cart->quantity = $quantity;
        $cart->save();
        return response()->json([
            'status' => 'success'
        ]);
    }

    public function cart_remove($id, $call = 'web') {
        $cart = Cart::find($id);
        $cart->delete();
        return response()->json([
            'status' => 'success'
        ]);
    }
}
