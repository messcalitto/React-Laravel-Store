
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
                <th scope="col" class="h5">Shopping Bag</th>
                
                <th scope="col">Quantity</th>
                <th scope="col" class="text-end pe-4">Total Price</th>
              </tr>
            </thead>
            <tbody>
            
            @if(count($cart))
            <tr id="empty_cart_row" class="hidden">
            @else
            <tr id="empty_cart_row">
            @endif
              <td colspan="3">
                <h5 class="text-center my-4">Your shopping bag is empty</h5>
              </td>
            </tr>
            


            <?php $totalprice = 0;?>

            @foreach($cart as $item)
              <tr>
                <th scope="row">
                  <div class="d-flex align-items-center">
                    <img src="/uploads/{{$item->image}}" class="img-fluid rounded-3"
                      style="width: 120px;" alt="Book">
                    <div class="flex-column ms-4">
                      <p class="mb-2">{{$item->product_title}}</p>
                      <p class="mb-0 fw-normal">$<span id="price{{$item->id}}">{{$item->price}}</span></p>
                    </div>
                  </div>
                </th>
              
                <td class="align-middle">
                  <div class="d-flex flex-row">
                    <button class="btn btn-link px-2"
                      onclick="decreaseValue(this, {{$item->id}})">
                      <i class="fas fa-minus"></i>
                    </button>

                    <input id="form1" min="0" name="quantity" value="{{$item->quantity}}" type="number"
                      class="form-control form-control-sm rounded" style="width: 50px;" />

                    <button class="btn btn-link px-2"
                      onclick="increaseValue(this, {{$item->id}})">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </td>
                <td class="align-middle text-end pe-4">
                  <p class="mb-0" style="font-weight: 500;">$<span class="totalprice" id="totalprice{{$item->id}}">{{$item->price * $item->quantity}}</span></p>
                </td>
              </tr>
              <?php $totalprice = $totalprice + ($item->price * $item->quantity);?>
             @endforeach
            </tbody>
          </table>
        </div>

        @if(count($cart))
        <div class="mb-5 mb-lg-0" id="bottom_total_price_row">
          <div class="card-body p-4">

            <div class="row">
              <div class="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-0">
                
              </div>
              <div class="col-md-6 col-lg-4 col-xl-6">
                
              </div>
              <div class="col-lg-4 col-xl-3">
                <div class="d-flex justify-content-between" style="font-weight: 500;">
                  <p class="mb-2">Subtotal</p>
                  <p class="mb-2">$<span id="subtotal">{{$totalprice}}</span></p>
                </div>
                <?php $shipping = 2.99; ?>
                <div class="d-flex justify-content-between" style="font-weight: 500;">
                  <p class="mb-0">Shipping</p>
                  <p class="mb-0">$<span id="shipping">{{$shipping}}</span></p>
                </div>
                
                <?php $totalprice = $totalprice + $shipping;?>

                <hr class="my-4">

                <div class="d-flex justify-content-between mb-4" style="font-weight: 500;">
                  <p class="mb-2">Total (tax included)</p>
                  <p class="mb-2">$<span id="total">{{$totalprice}}</span></p>
                </div>

                <button onclick="document.location='{{url('shipping')}}'" type="button" class="btn btn-primary btn-block btn-lg bg-danger border-danger">
                  <div class="d-flex justify-content-between">
                    <span>Checkout</span>
                    <span>$<span id="total2">{{$totalprice}}</span></span>
                  </div>
                </button>

              </div>
            </div>

          </div>

          

        </div>
        @endif
        
      </div>
    </div>
  </div>
</section>
      
<script>
    function increaseValue(currentElement, id) {

        currentElement.parentNode.querySelector('input[type=number]').stepUp()
        var newQuantity = currentElement.parentNode.querySelector('input[type=number]').value;
        var totalprice = document.getElementById('totalprice' + id);
        var price = document.getElementById('price' + id);
        totalprice.innerHTML = newQuantity * price.innerHTML;
        
        calculateTotalPrice();

        $.ajax({url: "/cart_update/"+id+"/"+newQuantity});
    }

    function decreaseValue(currentElement, id) {
        if (currentElement.parentNode.querySelector('input[type=number]').value == 1) {
            if (confirm('Are you sure you want to remove this item from your cart?')) {
                currentElement.parentNode.parentNode.parentNode.remove();
                calculateTotalPrice();

                $.ajax({url: "/cart_remove/"+id});

                if (document.getElementsByClassName('totalprice').length == 0) {
                  document.getElementById('empty_cart_row').classList.remove('hidden');
                  document.getElementById('bottom_total_price_row').remove();
                }
                
            } 
            return;
        }
        currentElement.parentNode.querySelector('input[type=number]').stepDown()
        var newQuantity = currentElement.parentNode.querySelector('input[type=number]').value;
        var totalprice = document.getElementById('totalprice' + id);
        var price = document.getElementById('price' + id);
        totalprice.innerHTML = newQuantity * price.innerHTML;
        
        calculateTotalPrice();

        $.ajax({url: "/cart_update/"+id+"/"+newQuantity});
    }

    function calculateTotalPrice() {
        var totalprice = 0;
        var prices = document.getElementsByClassName('totalprice');
        
        for (var i = 0; i < prices.length; i++) {
            totalprice += parseFloat(prices[i].innerHTML);
        }
        
        document.getElementById('subtotal').innerHTML = totalprice;
        
        var shipping = document.getElementById('shipping').innerHTML;
        var total = document.getElementById('total');
        var total2 = document.getElementById('total2');

        
        total.innerHTML = parseFloat(totalprice) + parseFloat(shipping);
        total2.innerHTML = parseFloat(totalprice) + parseFloat(shipping);
        
    }
</script>
      <!-- footer start -->
      @include('home.footer')
      <!-- footer end -->
    