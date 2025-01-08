@include('home.header')


<section class="h-100 h-custom">
    <div class="container h-100 py-5">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col">
                <h5><b>Shipping information</b></h5><br>
                <form action="{{url('place_order')}}" method="post">
                    @csrf
                    <div class="row col-md-6">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <x-text-input type="text" class="form-control" id="name" name="name" placeholder="Enter name" value="{{$order->name}}" /> 
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <x-text-input type="email" class="form-control" id="email" name="email_field" placeholder="Enter email" value="{{$order->email}}" />
                            </div>
                        </div>
                        
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="phone">Phone</label>
                                <x-text-input type="text" class="form-control" id="phone" name="phone" placeholder="Enter phone" value="{{$order->phone}}"/>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="address">Address</label>
                                <x-text-input type="text" class="form-control" id="address" name="address" placeholder="Enter address" value="{{$order->address}}"/>    
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="city">City</label>
                                <x-text-input type="text" class="form-control" id="city" name="city" placeholder="Enter city" value="{{$order->city}}"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 text-end">
                    <button type="submit" class="btn btn-primary bg-danger border-danger mx-4">Place Order</button>
                    </div>

                </from>

            </div>
        </div>
    </div>
</section>


@include('home.footer')