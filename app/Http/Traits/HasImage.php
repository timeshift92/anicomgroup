<?php


namespace App\Http\Traits;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

trait HasImage
{
    public function saveImage(Request $request)
    {
        if ($request->hasFile('image') && $file = $request->file('image')) {
            if ($file->isValid()) {
                $name = time() . Str::random(5) . '.' . $file->getClientOriginalExtension();
                $path = "$this->id";
                $image = Storage::disk('products')->put($path, $file);
                $thumb_name = storage_path("app/public/products/$this->id/") . 'thumb_' . $name;
                Image::make(Storage::disk('products')->get($image))->resize(50, 50)
                    ->save($thumb_name);
                $this->image = Storage::disk('products')->url("$this->id/thumb_$name");
            }
        }
    }
}
