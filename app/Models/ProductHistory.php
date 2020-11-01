<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductHistory extends Model
{
    use HasFactory;
    const CREATED = 1;
    const UPDATED = 2;
    const DELETED = 3;

    protected $fillable = [
        'after',
        'before',
        'type'
    ];

    protected $casts = [
        'after' => 'array',
        'before' => 'array',
    ];
}
