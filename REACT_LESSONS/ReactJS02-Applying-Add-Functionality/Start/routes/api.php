<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('ingredients', 'IngredientController');
Route::apiResource('menus', 'MenuController');
Route::apiResource('grocery-lists', 'GroceryController');

Route::delete('grocery-lists-clear', 'GroceryController@clear');

Route::get('menu/{menu_id}/ingredient', 'MenuIngredientController@index');
Route::post('menu/{menu_id}/ingredient', 'MenuIngredientController@add');
Route::delete('menu/{menu_id}/ingredient/{ingredient_id}', 'MenuIngredientController@delete');
