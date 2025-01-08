<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Cart;


class OrderController extends Controller
{
    
    public function shipping($call = 'web')
    {
        $order = Order::where('user_id', auth()->user()->id)
            ->orderBy('id', 'desc')
            ->first();
        
        if ($call == 'api') {
            return response()->json([
                'status' => 'success',
                'data' => $order
            ]);
        }
        return view('home.shipping', compact('order'));
    }



    public function place_order(Request $request, $call = 'web')
    {
        // Validation
        $request->validate([
            'name' => 'required',
            'email_field' => 'required|email',
            'phone' => 'required',
            'address' => 'required',
            'city' => 'required',
        ]);
        
        $order = Order::where('user_id', auth()->user()->id)
            ->whereNull('orders.payment_status')
            ->orderBy('id', 'desc')
            ->first();

        if ($order) {
            $order->name = $request->name;
            $order->email = $request->email_field;
            $order->phone = $request->phone;
            $order->address = $request->address;
            $order->city = $request->city;
            $order->user_id = auth()->user()->id;
            $order->update();
        } else {
            $order = new Order;
            $order->name = $request->name;
            $order->email = $request->email_field;
            $order->phone = $request->phone;
            $order->address = $request->address;
            $order->city = $request->city;
            $order->user_id = auth()->user()->id;
            $order->save();
        }

        if ($call == 'api') {
            return response()->json([
                'status' => 'success',
                'data' => $order
            ]);
        }

        return redirect('/stripe');
    }

   
    public function store(StoreOrderRequest $request)
    {
        //
    }

   
    public function show_my_orders(Order $order, $call = 'web')
    {
        // $orders = Order::where('orders.user_id', auth()->user()->id)
        //     ->join('order_products', 'orders.id', '=', 'order_products.order_id')
        //     ->where('payment_status', 'PAID')
        //     ->get();

        $orders = OrderProduct::where('user_id', auth()->user()->id)->get();

        if ($call == 'api') {
            return response()->json([
                'status' => 'success',
                'data' => $orders
            ]);
        }
        // return $orders;

        return view('home.my_orders', compact('orders'));
    }

   
    public function edit(Order $order)
    {
        //
    }

    
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    
    public function destroy(Order $order)
    {
        //
    }


    
}
