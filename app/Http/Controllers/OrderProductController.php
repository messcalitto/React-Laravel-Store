<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderProduct;


class OrderProductController extends Controller
{
    //
    public function List(Request $request) {
        
        $request->pageSize = $request->pageSize ? $request->pageSize : 5;

        return response()->json(OrderProduct::query()
            ->join('orders', 'orders.id', '=', 'order_products.order_id')
            ->select(
                'order_products.id as id', 
                'order_id', 
                'product_id', 
                'order_products.user_id as user_id', 
                'image',
                'title',
                'quantity', 
                'price', 
                'orders.name',
                'orders.email', 
                'orders.phone',
                'orders.address',
                'orders.city',
                'orders.transaction_id',
                'orders.paid_amount',
                'status',
                'order_products.created_at as created_at',
                'order_products.updated_at as updated_at'
                )
                ->paginate($request->pageSize));  
    }

    public function Details(Request $request) {

        return response()->json(OrderProduct::where('order_products.id', $request->id)
            ->join('orders', 'orders.id', '=', 'order_products.order_id')
            ->select(
                'order_products.id as id', 
                'order_id', 
                'product_id', 
                'order_products.user_id as user_id', 
                'image',
                'title',
                'quantity', 
                'price', 
                'orders.name',
                'orders.email', 
                'orders.phone',
                'orders.address',
                'orders.city',
                'orders.transaction_id',
                'orders.paid_amount',
                'status',
                'order_products.created_at as created_at',
                'order_products.updated_at as updated_at'
                )
            ->first());  
    }

    public function Update(Request $request) {
        $orderProduct = OrderProduct::find($request->id);
        $orderProduct->status = $request->status;
        $orderProduct->save();
        return response()->json([
            'message' => 'Product updated successfully',
			'order' => OrderProduct::where('order_products.id', $request->id)
                ->join('orders', 'orders.id', '=', 'order_products.order_id')
                ->select(
                    'order_products.id as id', 
                    'order_id', 
                    'product_id', 
                    'order_products.user_id as user_id', 
                    'image',
                    'title',
                    'quantity', 
                    'price', 
                    'orders.name',
                    'orders.email', 
                    'orders.phone',
                    'orders.address',
                    'orders.city',
                    'orders.transaction_id',
                    'orders.paid_amount',
                    'status',
                    'order_products.created_at as created_at',
                    'order_products.updated_at as updated_at'
                    )
                ->first()]);
    }

}
