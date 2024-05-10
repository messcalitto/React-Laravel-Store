<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\OrderProduct;
use App\Models\Order;
use App\Models\Cart;
use Illuminate\Http\Request;

use Session;
use Stripe;
   
class StripePaymentController extends Controller
{
    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */
    public function stripe()
    {
        // DB::enableQueryLog(); 

        $price = Cart::where('user_id', auth()->user()->id)
            ->sum(DB::raw('price * quantity'));
        
        // $query = DB::getQueryLog(); 
        // dd($query);


        return view('home.stripe', compact('price'));
    }
  
    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */
    public function stripePost(Request $request)
    {
        $price = Cart::where('user_id', auth()->user()->id)->sum(DB::raw('price * quantity'));

        Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        $paymentRes = Stripe\Charge::create ([
                "amount" => $price * 100,
                "currency" => "usd",
                "source" => $request->stripeToken,
                "description" => "Test payment" 
        ]);
  
      
        
        if ($paymentRes->paid) {

            $order = Order::where('user_id', auth()->user()->id)
            ->whereNull('orders.payment_status')
            ->orderBy('id', 'desc')
            ->first();

            $order->payment_status = 'PAID';
            $order->payment_method = 'Stripe';
            $order->transaction_id = $paymentRes->id;
            $order->paid_amount = $paymentRes->amount / 100;
            $order->update();

            $cart = Cart::where('user_id', auth()->user()->id)->get();

            foreach ($cart as $item) {
                $order_product = new OrderProduct;
                $order_product->order_id = $order->id;
                $order_product->user_id = $item->user_id;
                $order_product->title = $item->product_title;
                $order_product->product_id = $item->product_id;
                $order_product->quantity = $item->quantity;
                $order_product->price = $item->price;
                $order_product->image = $item->image;
                $order_product->status = 'PAID';
                $order_product->save();
            }

            Cart::where('user_id', auth()->user()->id)->delete();

            Session::flash('success', 'Payment successful!');
        }
        else {
            Session::flash('error', 'Payment failed!');
        }


        

        // return $orders;
        // $res->id;

        // Session::flash('success', 'Payment successful!');
          
        return back();
    }
}
