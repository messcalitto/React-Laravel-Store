

   <!-- header section strats -->
   @include('home.header')
   <!-- end header section -->
   


<div class="col-sm-6 col-md-4 col-lg-4" style="margin: auto;">
      <div class="box">
         
         <div class="img-box" style=" margin-bottom: 20px;">
            <img src="uploads/{{$product->image[0]}}" alt="">
         </div>
         <div class="detail-box" style="margin-bottom: 20px;">
            <h5>
            {{ $product->title }}
            </h5>
            <br>

            @if ( $product->discount_price!=0 )
            <h6>
                  Discount price: ${{ $product->discount_price }}<br>
               
                  Normal price:
                  <span style="text-decoration: line-through; color: red;">
                  ${{ $product->price }}
               </span>
            </h6>
            @else 
            <h6>
               Price: ${{ $product->price }}
            </6>
            @endif
            <br>
            <h6>
               {{ $product->description }}
            </6>
            <br><br>
            <h6>
               Available: {{ $product->quantity }}
            </6>
            <br><br>
            
            <form action="{{url('add_cart', $product->id)}}" method="post">
                  <h6>
                     Quantity: <input type="number" name="quantity" value="1" min="1" max="{{ $product->quantity }}" style="width:100px">    
                  </h6>
                  
                  <input type="submit" value="Add to Cart" class="btn btn-primary" style="margin:0">  
                  
                  @csrf
            </form>
         </div>
      </div>
   </div>
      
<!-- footer start -->
@include('home.footer')
<!-- footer end -->
