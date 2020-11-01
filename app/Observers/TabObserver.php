<?php

namespace App\Observers;

use App\Models\Tab;
use Illuminate\Support\Str;

class TabObserver
{
    public function creating(Tab $tab)
    {
        $tab->slug = Str::slug($tab->name);
    }
}
