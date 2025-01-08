<!DOCTYPE html>
<html>
   <head>

      <base href="/public">

      <!-- Basic -->
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <!-- Mobile Metas -->
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <!-- Site Metas -->
      <meta name="keywords" content="" />
      <meta name="description" content="" />
      <meta name="author" content="" />
      <link rel="shortcut icon" href="images/favicon.png" type="">
      <title>Famms - Fashion HTML Template</title>
      <!-- bootstrap core css -->
      <link rel="stylesheet" type="text/css" href="home/css/bootstrap.css" />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"/>

      <!-- font awesome style -->
      <link href="home/css/font-awesome.min.css" rel="stylesheet" />
      <!-- Custom styles for this template -->
      <link href="home/css/style.css" rel="stylesheet" />
      <!-- responsive style -->
      <link href="home/css/responsive.css" rel="stylesheet" />

      <link rel="preconnect" href="https://fonts.bunny.net">
      <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

      <!-- Scripts -->
      @vite(['resources/css/app.css', 'resources/js/app.js'])
      <link rel="stylesheet" href="/build/assets/styles.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
      
      <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>

      
      
    

   </head>
   <body>
      


<header class="header_section">
   <div class="container">
      
   

      <nav class="navbar navbar-expand-lg custom_nav-container ">
         <a class="navbar-brand" href="{{url('/')}}"><img width="250" src="images/logo.png" alt="#" /></a>
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span class=""> </span>
         </button>
         <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav">
               <li class="nav-item {{ Request::segment(1) == '' ? 'active' : '' }}">
                  <a class="nav-link" href="{{url('/')}}">Home <span class="sr-only">(current)</span></a>
               </li>
               
               
               <li class="nav-item {{ Request::segment(1) == 'contact' ? 'active' : '' }}">
                  <a class="nav-link" href="{{url('contact')}}">Contact</a>
               </li>
               <li class="nav-item {{ Route::currentRouteName() == 'my_orders' ? 'active' : '' }}">
                  <a class="nav-link" href="{{url('my_orders')}}">My Orders</a>
               </li>
               <li class="nav-item {{ Route::currentRouteName() == 'cart' ? 'active' : '' }}">
                  <a class="nav-link" href="{{url('cart')}}">Cart</a>
               </li>                     

                  @auth

                     @include('layouts.navigation')
                  
                  @else
                  
                     <li class="nav-item">
                        <a class="btn btn-primary" href="{{ route('login') }}" id="logincss">Login</a>
                     </li>
                     
                     <li class="nav-item">
                        <a class="btn btn-primary" href="{{ route('register') }}">Register</a>
                     </li>
                  
                  @endauth
               
               
            </ul>
         </div>
      </nav>
   </div>
</header>