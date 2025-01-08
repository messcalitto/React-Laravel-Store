
         <!-- header section strats -->
         @include('home.header')
         <!-- end header section -->
        
      
     
      

         <section class="h-100 h-custom">
  <div class="container h-100 py-5">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="h5">My Orders</th>
                
                <th scope="col"></th>
                <th scope="col" class="text-end pe-4">Status</th>
              </tr>
            </thead>
            <tbody>
            
            @if(count($orders))
            <tr id="empty_cart_row" class="hidden">
            @else
            <tr id="empty_cart_row">
            @endif
              <td colspan="3">
                <h5 class="text-center my-4">You don't have any orders yet</h5>
              </td>
            </tr>
            


            <?php $totalprice = 0;?>

            @foreach($orders as $item)
              <tr>
                <th scope="row">
                  <div class="d-flex align-items-center">
                    <img src="/uploads/{{$item->image}}" class="img-fluid rounded-3"
                      style="width: 120px;" alt="">
                    <div class="flex-column ms-4">
                      <p class="mb-2">{{$item->title}}</p>
                      <p class="mb-0 fw-normal">{{$item->quantity}} x ${{$item->price}}</p>
                    </div>
                  </div>
                </th>
              
                <td class="align-middle">
                  <div class="d-flex flex-row">
                   
                  </div>
                </td>
                <td class="align-middle text-end pe-4">
                  <p class="mb-0" style="font-weight: 500;">{{Str::ucfirst(strtolower($item->status))}}</p>
                </td>
              </tr>
              <?php $totalprice = $totalprice + ($item->price * $item->quantity);?>
             @endforeach
            </tbody>
          </table>
        </div>

      
        
      </div>
    </div>
  </div>
</section>
      

      <!-- footer start -->
      @include('home.footer')
      <!-- footer end -->
    