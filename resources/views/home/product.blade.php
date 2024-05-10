<section class="product_section layout_padding">
         <div class="container">
            

            <style>
         #searchBar form {
            display:inline-flex;
            margin:auto;

         }
         #searchBar form button {
            background:#f7444e;
            color:white;
            padding:0 10px;
            height:42px;
            margin-left: 5px;
            font-weight:bold;
         }
         #searchBar {
            margin: auto;
            width: fit-content;
         }   
         
      </style>

               <div id="searchBar">
                  <form action="{{url('search')}}" method="get">
                  <input type="text" name="search" placeholder="Search" value="{{$search ?? ''}}">
                  <button type="submit" >Search </button>
                  </form>
               </div>

            <div class="row">
               
            @foreach($products as $product)

               <div class="col-sm-6 col-md-4 col-lg-4">
                  <div class="box"  style="height: 350px">
                     <div class="option_container">
                        <div class="options">
                           <a href="{{url('product_details', $product->id)}}" class="option1">
                           Product Details
                           </a>
                           
                           <form action="{{url('add_cart', $product->id)}}" method="post">
                              <input type="submit" value="Buy Now" class="option2" style="border-radius: 30px;">  
                              @csrf
                           </form>

                        </div>
                     </div>
                     <div class="img-box">
                        <img src="uploads/{{$product->image[0]}}" alt="">
                     </div>
                     <div class="detail-box">
                        <h5>
                        {{ $product->title }}
                        </h5>

                        @if ( $product->discount_price!=0 )
                        <h6>
                           ${{ $product->discount_price }}<br>
                           <span style="text-decoration: line-through; color: red;">
                              ${{ $product->price }}
                           </span>
                        </h6>
                        @else 
                        <h6>
                           ${{ $product->price }}
                        </6>
                        @endif
                     </div>
                  </div>
               </div>
            
            @endforeach

            <span style="margin-top: 20px">
            {!! $products->links('pagination::bootstrap-5') !!}
            </span>

            </div>
           
         </div>
      </section>