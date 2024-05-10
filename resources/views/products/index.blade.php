

<x-app-layout>
<div class="container">
    <div class="row justify-content-center mx-auto max-w-xl py-12">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header dark:text-gray-200 leading-tight"><b>{{ __('Products') }}</b></div>
            </div>

            <br>
            
            <x-secondary-button class="mr-3" onclick="document.location='/products/create'">Create New Product</x-secondary-button>
            
            

            @if (Session::get('msg'))
                <div class="alert alert-success">
                {{ Session::get('msg') }}
                </div>
            @endif

            @if (count($products))
            <table class="table table-bordered dark:text-gray-200 leading-tight w-full">
            <tr>
                <th class="text-left">No</th>
                <th class="text-left">Name</th>
                <th class="text-left">Price</th>
                <th class="text-left">Image</th>
                <th width="280px">Action</th>
            </tr>

            @foreach ($products as $product)
            <tr>
                <td>{{ $product->id }}</td>
                <td>{{ $product->title }}</td>
                <td>{{ $product->price }}</td>
                <td>
                    @if ($product->image)
                        <img style="width:100px" src="/images/{{ $product->image }}">
                    @endif
                </td>
                <td  class="text-center">
                    
                    <form method="post" action="{{ route('products.destroy', $product->id) }}">
                        
                        @csrf
                        @method('DELETE')
                        <a href="{{ route('products.edit', $product->id) }}" class="btn btn-outline-success">Edit</a>
                        <button type="submit" class="btn btn-outline-danger">Delete</button>

                    </form>

                </td>
            </tr>
            @endforeach

            </table>
            @endif
        </div>
    </div>
</div>
</x-app-layout>
