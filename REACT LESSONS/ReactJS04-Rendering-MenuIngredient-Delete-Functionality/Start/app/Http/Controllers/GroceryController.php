<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\GroceryList;
use DB;

class GroceryController extends Controller
{
    /**
     * Display a listing of the groceries.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $response = GroceryList::all()->map(function ($item) {
            return $item->ingredient;
        });

        return $response;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $item = GroceryList::where('ingredient_id', $request->ingredient_id)->get()->first();
        if (!is_null($item)) {
            return ['respose' => true, 'data' => 'Item already in the list.'];
        }

        $grocery = new GroceryList();
        $grocery->ingredient_id = $request->ingredient_id;
        $grocery->save();

        return [
            'response' => true,
            'data' => 'Item added to the list.',
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int                      $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($ingredient_id)
    {
        /**
         * @todo add form validation for non existing ingredient from the list.
         */
        $groceryItem = GroceryList::where('ingredient_id', $ingredient_id)->first();
        $groceryItem->delete();

        return ['response' => true, 'data' => 'Grocery item removed.'];
    }

    public function clear()
    {
        DB::table('grocery_lists')->truncate();

        return ['repsonse' => true, 'data' => 'Grocery Items cleared.'];
    }
}
