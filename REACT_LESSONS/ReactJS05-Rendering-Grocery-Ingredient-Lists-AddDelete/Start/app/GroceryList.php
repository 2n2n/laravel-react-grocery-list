<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GroceryList extends Model
{
    public function ingredient()
    {
        return $this->hasOne('\App\Ingredient', 'id', 'ingredient_id');
    }
}
