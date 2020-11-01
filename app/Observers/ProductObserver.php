<?php

namespace App\Observers;

use App\Models\Product;
use App\Models\ProductHistory;
use Illuminate\Support\Str;

class ProductObserver
{
    public function creating(Product $product)
    {
        $product->slug = Str::slug($product->name);
        $product->saveImage(\request());

    }

    public function created(Product $product)
    {

        ProductHistory::create([
            'after' => $product->getDirty(),
            'type' => ProductHistory::CREATED,
        ]);

    }

    public function updated(Product $product)
    {
        $product->saveImage(\request());
        ProductHistory::create([
            'before' => $product->getDirty(),
            'after' => $product->toArray(),
            'type' => ProductHistory::UPDATED,
        ]);
    }

    public function deleted(Product $product)
    {
        ProductHistory::create([
            'before' => $product->toArray(),
            'type' => ProductHistory::DELETED,
        ]);
    }
}
