<?php

namespace App\Models;

use App\Http\Traits\HasImage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory, HasImage;
    protected $fillable = [
        'name',
        'tab_id',
//        'image',
        'price',
        'count',

    ];



    public function tab()
    {
        return $this->belongsTo(Tab::class);
    }
}
