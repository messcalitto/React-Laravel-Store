<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\Cart;

class CartController extends Controller
{
    // 
    public function add_cart(Request $request, $id) {

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
        
        return redirect('/cart');

    }

    public function cart_list() {
        $user = auth()->user();
        $cart = Cart::where('user_id', $user->id)->get();
        return view('home.cart_list', compact('cart'));
    }

    public function cart_update($id, $quantity) {
        $cart = Cart::find($id);
        $cart->quantity = $quantity;
        $cart->save();
        return ;
    }

    public function cart_remove($id) {
        $cart = Cart::find($id);
        $cart->delete();
        return ;
    }
}
