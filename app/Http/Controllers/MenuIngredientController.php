<?php

namespace App\Http\Controllers;

use App\Ingredient;
use App\Menu;
use Illuminate\Http\Request;

class MenuIngredientController extends Controller
{
    public function index($menu_id)
    {
        $menu = Menu::find($menu_id);

        return $menu->ingredients()->get();
    }

    public function add(Request $request, $menu_id)
    {
        $ingredient = Ingredient::where('name', 'LIKE', $request->name)
            ->get()
            ->first();

        if (is_null($ingredient)) {
            $ingredient = new Ingredient();
            $ingredient->name = $request->name;
            $ingredient->save();
        }

        $menu = Menu::find($menu_id);

        $ingredientExistsOnMenu = $menu->ingredients()
            ->where('name', 'LIKE', $request->name)
            ->get()
            ->count() > 0;

        if ($ingredientExistsOnMenu) {
            return ['response' => true, 'data' => 'ingredient already in the menu.'];
        }

        $menu->ingredients()->attach($ingredient);

        return ['response' => true];
    }

    public function delete(Request $request, $menu_id, $ingredient_id)
    {
        $menu = Menu::find($menu_id);

        if (is_null($menu)) {
            return ['response' => false, 'data' => 'Menu does not exist.'];
        }

        $ingredient = Ingredient::find($ingredient_id);
        if (is_null($ingredient)) {
            return ['response' => false, 'data' => 'Ingredient does not exist.'];
        }

        $menu->ingredients()->detach($ingredient);

        return ['response' => true];
    }
}
