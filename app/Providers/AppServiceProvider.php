<?php

namespace App\Providers;

use App\Models\Product;
use App\Models\Tab;
use App\Observers\ProductObserver;
use App\Observers\TabObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Product::observe(ProductObserver::class);
        Tab::observe(TabObserver::class);
    }
}
