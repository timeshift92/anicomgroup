<?php

namespace App\Http\Controllers;

use App\Http\Requests\TabRequest;
use App\Http\Resources\TabResource;
use App\Models\Tab;
use Exception;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TabController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index()
    {
        return TabResource::collection(Tab::all());
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param TabRequest $request
     * @return TabResource
     */
    public function store(TabRequest $request)
    {
        return new TabResource(Tab::create($request->validated()));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param TabRequest $request
     * @param Tab $tab
     * @return TabResource
     */
    public function update(TabRequest $request, Tab $tab)
    {
        $tab->update($request->validated());
        return $this->sendSuccess('Updated');
    }


    public function destroy(Tab $tab)
    {
        try {
            $tab->delete();
            return $this->sendSuccess('deleted');
        } catch (Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
