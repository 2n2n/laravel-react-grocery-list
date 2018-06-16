<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    public function ingredients()
    {
        return $this->belongsToMany('App\Ingredient');
    }
}
