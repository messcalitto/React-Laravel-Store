<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index() {
		
		

		$user_id = auth()->user()->id;
    	$products = Product::where('user_id', $user_id)->get();
    	return view('products.index', compact('products'));
    }

    public function create() {
    	return view('products.create');
    }

    public function store(Request $request) {
    	return;
    	$request->validate([
    		'title' => 'required',
    		'price' => 'required',
			'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
    	]);
		
		$pr = new Product;

		if ($request->image) {
			$fileName = time() . '.' . $request->image->extension();
			$request->image->move(public_path('images'), $fileName);
			$pr->image = $fileName;
		}
		
		
		$pr->title = $request->title;
		$pr->description = $request->description;
		$pr->short_notes = $request->short_notes;
		$pr->user_id = auth()->user()->id;
		$pr->price = $request->price;
		$pr->save();

    	return redirect()->route('products.index')->with('msg', "Product Created");
    }

    public function destroy(Product $product) {

    	$product->delete();
    	return redirect()->route('products.index')->with('msg', "Product Deleted");
    }

    public function edit(Product $product) {
    	return view('products.edit', compact('product'));
    }

    public function update(Request $request, Product $product) {

    	$request->validate([
    		'title' => 'required',
    		'price' => 'required',
			'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
    	]);

		$product->title = $request->title;
		$product->description = $request->description;
		$product->price = $request->price;
		$product->short_notes = $request->short_notes;

		if ($request->image) {
			$fileName = time() . '.' . $request->image->extension();
			$request->image->move(public_path('images'), $fileName);
			$product->image = $fileName;
		}

    	$product->update();
    	return redirect()->route('products.index')->with('msg', "Product Updated");
    }
}
