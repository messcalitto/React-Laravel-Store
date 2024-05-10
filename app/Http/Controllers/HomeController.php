<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\Cart;
use Illuminate\Support\Facades\Mail;

class HomeController extends Controller
{

    public function index() {

        $products = Product::paginate(6);
        return view('home.userpage', compact('products'));
    }

    public function search(Request $request) {
        
        $search = $request->search;
        $products = Product::where('title', 'like', '%'.$search.'%')
            ->orWhere('description', 'like', '%'.$search.'%')->paginate(6);

        return view('home.userpage', compact('products'), ['search' => $search]);
    }

    public function product_details($id) {

        $product = Product::find($id);
        return view('home.product_details', compact('product'));
    }


    public function contact_send(Request $request) {

        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'subject' => 'required',
            'text' => 'required'
        ]);

        Mail::send('emails.contact', $data, function($message) use ($data) {
            $message->from($data['email']);
            $message->to('admin@example.com');
            $message->subject('New Contact Form Submission');
        });
    
        return redirect('contact')->with('message', 'Thanks for contacting us!');
        
    }

    public function contact() {
        return view('home.contact');
    }
   
}