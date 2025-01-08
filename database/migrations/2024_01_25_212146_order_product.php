<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::create('order_products', function (Blueprint $table) {

            $table->id();

            $table->bigInteger('order_id')->unsigned()->nullable();
            
            $table->integer('product_id')->unsigned()->nullable();
            $table->integer('user_id')->unsigned()->nullable();
            $table->string('title')->nullable();
            $table->integer('quantity')->unsigned()->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->string('image')->nullable();
            $table->string('status')->nullable();
            
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
