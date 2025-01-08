<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StripePaymentController;
use App\Http\Controllers\OrderProductController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/






Route::post('login', [UserAuthController::class, 'AdminLogin']);
Route::post('userlogin', [UserAuthController::class, 'UserLogin']);
Route::get('userlogout',  [UserAuthController::class, 'UserLogout']);
Route::post('register',  [RegisteredUserController::class, 'store'])->defaults('call', 'api');
Route::post('password_reset',  [PasswordResetLinkController::class, 'store'])->defaults('call', 'api');


Route::middleware(['auth:sanctum','cors'])->group(function () {
        // Frontend routes 
    Route::get('/profile_edit', [ProfileController::class, 'edit'])->name('profile_edit')->defaults('call', 'api');;
    Route::post('/profile_update', [ProfileController::class, 'api_update'])->name('profile_update');
    Route::post('/password_update', [PasswordController::class, 'update'])->name('password_update')->defaults('call', 'api');
    
    Route::post('/profile_destroy', [ProfileController::class, 'destroy'])->name('profile_destroy')->defaults('call', 'api');

    Route::post('/add_cart/{id}', [CartController::class, 'add_cart'])->name('add_cart')->defaults('call', 'api');
    Route::get('/cart', [CartController::class, 'cart_list'])->name('cart')->defaults('call', 'api'); 
    Route::get('/cart_update/{id}/{quantity}', [CartController::class, 'cart_update'])->name('cart_update')->defaults('call', 'api');
    Route::get('/cart_remove/{id}', [CartController::class, 'cart_remove'])->name('cart_remove')->defaults('call', 'api');

    Route::get('/shipping', [OrderController::class, 'shipping'])->name('shipping')->defaults('call', 'api'); 
    Route::post('/place_order', [OrderController::class, 'place_order'])->name('place_order')->defaults('call', 'api'); 
    Route::get('/payment_intent', [StripePaymentController::class, 'create_payment_intent'])->name('payment_intent')->defaults('call', 'api');
    Route::post('/paid', [StripePaymentController::class, 'stripePost'])->name('paid')->defaults('call', 'api');
    Route::get('/order_list', [OrderController::class, 'show_my_orders'])->name('order_list')->defaults('call', 'api');


    // Admin routes
    
    Route::get('logout',  [UserAuthController::class, 'Logout']);
  
    Route::get('users',  [UserAuthController::class, 'users']);
    Route::get('users/{id}',  [UserAuthController::class, 'UserDetails']);
    Route::post('users/{id}',  [UserAuthController::class, 'UserUpdate']);
    Route::post('users',  [UserAuthController::class, 'UserCreate']);
    // Route::delete('users/{id}',  [UserAuthController::class, 'UserDelete']);
    Route::get('users/{id}/delete',  [UserAuthController::class, 'UserDelete']);

    
    
    Route::post('products/{id}',  [ProductController::class, 'ProductUpdate']);
    Route::post('products',  [ProductController::class, 'ProductCreate']);
    // Route::delete('products/{id}',  [ProductController::class, 'ProductDelete']);
    Route::get('products/{id}/delete',  [ProductController::class, 'ProductDelete']);

    Route::get('categories',  [CategoryController::class, 'categories']); 
    Route::get('categories/{id}',  [CategoryController::class, 'CategoryDetails']);
    Route::post('categories/{id}',  [CategoryController::class, 'CategoryUpdate']);
    Route::post('categories',  [CategoryController::class, 'CategoryCreate']);
    // Route::delete('categories/{id}',  [CategoryController::class, 'CategoryDelete']);
    Route::get('categories/{id}/delete',  [CategoryController::class, 'CategoryDelete']);

    Route::get('orders',  [OrderProductController::class, 'List']);    
    Route::get('orders/{id}',  [OrderProductController::class, 'Details']);
    Route::post('orders/{id}',  [OrderProductController::class, 'Update']);
    Route::post('orders',  [OrderProductController::class, 'Create']);
    // Route::delete('orders/{id}',  [OrderProductController::class, 'Delete']);
    Route::get('orders/{id}/delete',  [OrderProductController::class, 'Delete']);

    Route::get('admin/{id}',  [UserAuthController::class, 'AdminDetails']);
    Route::post('admin/{id}',  [UserAuthController::class, 'AdminUpdate']);
    // });
// });  
});


Route::get('products',  [ProductController::class, 'ProductList']);    
Route::get('products/{id}',  [ProductController::class, 'ProductDetails']);