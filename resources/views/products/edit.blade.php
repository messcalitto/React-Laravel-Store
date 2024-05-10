<x-app-layout>
<div class="container">
    <div class="row justify-content-center  mx-auto max-w-xl py-12 bg-white dark:bg-gray-800 p-6">
        <div class="col-md-8">
            <div class="card">
            <div class="card-header dark:text-gray-200 leading-tight"><b>{{ __('Edit Product') }}</b></div>
            </div>

            <br>
            
            @if ($errors->any())

            <div class="alert alert-danger">
                <ul>
                    @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>

            @endif
            
            <form method="post" action="{{ route('products.update', $product->id) }}" enctype="multipart/form-data">
            
            @csrf
            @method("PUT")

            <table class="table table-bordered dark:text-gray-200 leading-tight w-full">
            <tr>
                <th class="text-right pr-4">Title</th>
                <td><x-text-input id="title" name="title" type="text" class="mt-1 block w-full" :value="old('title', $product->title)" required autofocus autocomplete="title" /></td>
            </tr>
            <tr>
                <th class="text-right pr-4">Description</th>
                <td>
                    <x-textarea-input id="description" name="description" type="text" class="mt-1 block w-full"  required autofocus autocomplete="description" >{{ $product->description }}</x-textarea-input>
                </td>
            </tr>
            <tr>
                <th class="text-right pr-4">Short notes</th>
                <td><x-text-input id="short_notes" name="short_notes" type="text" class="mt-1 block w-full" :value="old('short_notes', $product->short_notes)" required autofocus autocomplete="short_notes" /></td>
            </tr>
            <tr>
                <th class="text-right pr-4">Price</th>
                <td><x-text-input id="price" name="price" type="text" class="mt-1 block w-full" :value="old('price', $product->price)" required autofocus autocomplete="price" /></td>
            </tr>
            <tr>
                <th class="text-right pr-4">Image</th>
                <td><input type="file" class="form-control border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 w-full" name="image" @error('image') is-invalid @enderror></td>
            </tr>
            <tr>
                <th></th>
                <td  class="pt-4">
                    <x-secondary-button onclick="document.location='/products'">{{ __('Back') }}</x-secondary-button>
                    <x-primary-button>{{ __('Save') }}</x-primary-button>
                </td>
            </tr>
            </table>

         

            </form>

            </table>
        </div>
    </div>
</div>
</x-app-layout>
