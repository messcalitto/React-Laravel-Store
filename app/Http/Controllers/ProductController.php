<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;

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


	public function ProductList(Request $request) {
		
		$request->pageSize = $request->pageSize ? $request->pageSize : 6;

		$search = $request->search;
		if ($search) {
			$products = Product::where('title', 'like', '%'.$search.'%')
				->orWhere('description', 'like', '%'.$search.'%')->paginate($request->pageSize);
			return response()->json($products);
		}

        return response()->json(Product::query()
			->join('categories', 'products.category_id', '=', 'categories.id')
            ->select('products.id', 
					'title',
					'description',
					'short_notes',
					'price', 
					'discount_price', 
					'category_id', 
					'categories.name as category', 
					'image', 
					'quantity')
			->paginate($request->pageSize));
    }

	public function ProductDetails($id) {

        return response()->json(Product::query()
		->join('categories', 'products.category_id', '=', 'categories.id')
            ->select('products.id', 'title','description','short_notes','price', 'discount_price', 'category_id', 'categories.name as category', 'image', 'quantity')
			->where('products.id', $id)
            ->first());
    }

	public function ProductCreate(Request $request) {

		$request->validate([
			'title' => 'required',
			'description' => 'required',
			'short_notes' => 'required',
			'price' => 'required',
			'discount_price' => 'required',
			'category_id' => 'required',
			'quantity' => 'required'
		]);

		$product = new Product;

		if (is_array($request->image) && count($request->image) > 0) {
			
			$product->image = [];
			$images = [];

			foreach($request->image as $index => $image) {

				if (substr($image, 0, 4) == 'http') {
					$images[] = 'images/'.basename($image);
				} else if (strlen($image) > 0) {
					
					$extension = substr($image, 11, 4);
					$extension = str_replace(';', '', $extension);
					$filename = time() ."_" .$index. '.' . $extension;

					$imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $image));

					// save image to file
					file_put_contents(public_path('uploads/images/').$filename, $imageData);
					
					$images[] = 'images/'.$filename;
				}
			}

			if (count($images) > 0) {
			 	$product->image = $images;
			}
		}

		$product->title = $request->title;
		$product->description = $request->description;
		$product->short_notes = $request->short_notes;
		$product->category_id = $request->category_id;
		$product->price = $request->price;
		$product->discount_price = $request->discount_price;
		$product->quantity = $request->quantity;
		$product->user_id = 1;
	
		$product->save();
	
		return response()->json([
			'message' => 'Product created successfully',
			'product' => Product::query()
				->join('categories', 'products.category_id', '=', 'categories.id')
				->select('products.id', 'title','description','short_notes','price', 'discount_price', 'category_id', 'categories.name as category', 'image', 'quantity')
				->where('products.id', $product->id)
				->first()
		]);
	}

	public function ProductUpdate(Request $request, $id) {
		
		$product = Product::findOrFail($id);
		
		$request->validate([
			'title' => 'required',
			'description' => 'required',
			'short_notes' => 'required',
			'price' => 'required',
			'discount_price' => 'required',
			'category_id' => 'required',
			'quantity' => 'required'
		]);
		
		if (is_array($request->image)) {
			
			$product->image = [];
			$images = [];

			foreach($request->image as $index => $image) {

				if (substr($image, 0, 7) == 'images/') {
					$images[] = $image;
				}
				elseif (substr($image, 0, 4) == 'http') {
					$images[] = 'images/'.basename($image);
				} 
				else {
					
					$extension = substr($image, 11, 4);
					$extension = str_replace(';', '', $extension);
					$filename = 'p'.$id ."_" .$index. '.' . $extension;

					$imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $image));
					
					// save image to file
					file_put_contents(public_path('uploads/images/').$filename, $imageData);
					
					$images[] = 'images/'.$filename;
				}
			}

			 $product->image = $images;
		}

		

		$product->title = $request->title;
		$product->description = $request->description;
		$product->short_notes = $request->short_notes;
		$product->category_id = $request->category_id;
		$product->price = $request->price;
		$product->discount_price = $request->discount_price;
		$product->quantity = $request->quantity;

		
		$product->update();
		
		
		return response()->json([
			'message' => 'Product updated successfully',
			'product' => Product::query()
				->join('categories', 'products.category_id', '=', 'categories.id')
				->select('products.id', 'title','description','short_notes','price', 'discount_price', 'category_id', 'categories.name as category', 'image', 'quantity')
				->where('products.id', $id)
				->first()
		]);

		

	}

	public function ProductDelete($id) {
		$product = Product::findOrFail($id);
		$product->delete();
		return response()->json([
			'message' => 'Product deleted successfully'
		]);
	}

	public function categories() {
		return response()->json(Category::query()->select('id', 'name')->get());
	}
}
