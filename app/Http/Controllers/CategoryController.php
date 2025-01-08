<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    



	public function CategoryDetails($id) {

        return response()->json(Category::where('id', $id)
            ->select('id', 'name')->first());
    }

	public function CategoryCreate(Request $request) {

		$request->validate([
			'name' => 'required'
		]);

		$category = new Category;
		$category->name = $request->name;
		$category->save();
	
		return response()->json([
			'message' => 'Category created successfully',
			'category' => $category
		]);
	}

	public function CategoryUpdate(Request $request, $id) {
		
		$category = Category::findOrFail($id);
		$category->name = $request->name;
		$category->update();

		return response()->json([
			'message' => 'Category updated successfully',
			'category' => $category
		]);

	}

	public function CategoryDelete($id) {
		$category = Category::findOrFail($id);
		$category->delete();
		return response()->json([
			'message' => 'Category deleted successfully'
		]);
	}

	public function categories(Request $request) {
		
		if ($request->pageSize) {
			return response()->json(Category::query()->select('id', 'name')->paginate($request->pageSize));
		} else {
			
			$categories = Category::query()->select('id', 'name')->get();
			
			return response()->json([
				"data" => $categories,
				"total" => $categories->count()
			]);
		}
	}
}
