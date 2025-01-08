
@include('home.header')
   
<div class="my-5 flex flex-col sm:justify-center items-center sm:pt-0">
    <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white border overflow-hidden sm:rounded-lg">
        {{ $slot }}
    </div>
</div>
       
@include('home.footer')

