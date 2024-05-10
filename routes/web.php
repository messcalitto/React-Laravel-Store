<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\StripePaymentController;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', [HomeController::class, 'index']);
Route::get('/product_details/{id}', [HomeController::class, 'product_details']);
Route::get('/search', [HomeController::class, 'search']);

Route::get('/contact', [HomeController::class, 'contact']);
Route::post('/contact', [HomeController::class, 'contact_send']);

Route::get('/dashboard', function () {
     return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->middleware('auth')->name('verification.notice');


Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
 
    return redirect('/home');
})->middleware(['auth', 'signed'])->name('verification.verify');
 
Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
 
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');


// Route::get('/products', function () {
//     return view('products.index');
// })->middleware(['auth', 'verified'])->name('products');

// Route::get('/products', [ProductController::class, 'index'])->name('products');
// Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
// Route::post('/products', [ProductController::class, 'store'])->name('products.store');    
// Route::delete('/products', [ProductController::class, 'destroy'])->name('products.destroy');
// Route::get('/products/edit/{id}', [ProductController::class, 'edit'])->name('products.edit');
// Route::post('/products/edit/{id}', [ProductController::class, 'update'])->name('products.update');




Route::middleware('auth', 'verified')->group(function () {
    
    Route::resource('products', ProductController::class);

    // Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    // Route::get('/products', [ProductController::class, 'create'])->name('products.create');
    // Route::get('/products', [ProductController::class, 'store'])->name('products.store');    

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/add_cart/{id}', [CartController::class, 'add_cart'])->name('add_cart');    
    Route::get('/cart', [CartController::class, 'cart_list'])->name('cart'); 
    Route::get('/cart_update/{id}/{quantity}', [CartController::class, 'cart_update'])->name('cart_update'); 
    Route::get('/cart_remove/{id}', [CartController::class, 'cart_remove'])->name('cart_remove'); 

    Route::get('/shipping', [OrderController::class, 'shipping'])->name('shipping'); 
    Route::post('/place_order', [OrderController::class, 'place_order'])->name('place_order'); 
    Route::get('/my_orders', [OrderController::class, 'show_my_orders'])->name('my_orders'); 

    Route::get('stripe', [StripePaymentController::class, 'stripe']);
    Route::post('stripe', [StripePaymentController::class, 'stripePost'])->name('stripe.post');

});




require __DIR__.'/auth.php';
