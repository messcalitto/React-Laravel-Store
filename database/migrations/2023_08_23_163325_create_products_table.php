<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');  // product title
            $table->text('description');   // description
            $table->string('short_notes');   // short notes
            $table->decimal('price', 10, 2); // price
            $table->decimal('discount_price', 10, 2); // price
            $table->string('image')->nullable(); // product image
            $table->integer('quantity')->nullable(); 
            $table->bigInteger('category_id')->unsigned(); 
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
