<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description',  'short_notes', 'category_id', 'price', 'discount_price', 'quantity', 'image', 'user_id'];

    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Category::class); 
    }

    public function setImageAttribute($pictures)
    {
        if (is_array($pictures)) {
            $this->attributes['image'] = json_encode($pictures);
        }
    }

    public function getImageAttribute($pictures)
    {
        return json_decode($pictures, true);
    }

}
