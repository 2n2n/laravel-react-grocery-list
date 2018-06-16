import { DATA_GROCERYMENU } from '../database/dummyData';
import * as cacheService from './cacheService';

import * as helper from '../helpers/helper';


const GROCERY_MENU = "groceryMenu";

export function modifyGroceryMenu(groceryMenu) {

    const data = helper.deserializeJsonString(cacheService.getCache(GROCERY_MENU));

    const groceryList = data.map(x => {
        if (x.id === groceryMenu.id) {
            x = groceryMenu;
        }

        return x;
    });

    const jsonStringGroceryLists = helper.stringifyJson(groceryList);
    cacheService.setCache(GROCERY_MENU, jsonStringGroceryLists);

    return groceryList;
}

export function deleteGroceryMenu(groceryMenu) {
    const data = helper.deserializeJsonString(cacheService.getCache(GROCERY_MENU));

    const groceryList = data.filter(x => x.id !== groceryMenu.id);

    console.log(groceryList);

    const jsonStringGroceryLists = helper.stringifyJson(groceryList);
    cacheService.setCache(GROCERY_MENU, jsonStringGroceryLists);

    return groceryList;    
}

export function getAllGroceryMenus() {
    let data = undefined;

    if (!cacheService.cacheExists(GROCERY_MENU)) {
        data = DATA_GROCERYMENU;
        const jsonStringGroceryLists = helper.stringifyJson(DATA_GROCERYMENU);

        cacheService.setCache(GROCERY_MENU, jsonStringGroceryLists);
    } else {
        data = helper.deserializeJsonString(cacheService.getCache(GROCERY_MENU));
    }

    return data;
}

export function addNewGroceryMenu(groceryMenu) {
    groceryMenu.id = helper.generateUniqueGUID();

    let data = helper.deserializeJsonString(cacheService.getCache(GROCERY_MENU));
    data = data.concat([groceryMenu]);

    const jsonStringGroceryLists = helper.stringifyJson(data);

    cacheService.setCache(GROCERY_MENU, jsonStringGroceryLists);

    return data;
}

export function addIngredient(ingredient, groceryId) {

    const data = helper.deserializeJsonString(cacheService.getCache(GROCERY_MENU));

    const groceryList = data.map(x => {
        if (x.id === groceryId) {
            x.ingredients = x.ingredients.concat([
                {
                    id: helper.generateUniqueGUID(),
                    name: ingredient
                }
            ]);
        }

        return x;
    });
    console.log(groceryList);

    const jsonStringGroceryLists = helper.stringifyJson(groceryList);
    cacheService.setCache(GROCERY_MENU, jsonStringGroceryLists);
}

export function updateIngredient(ingredient, groceryMenuId) {

    const data = helper.deserializeJsonString(cacheService.getCache(GROCERY_MENU));

    const groceryMenuList = data.map(x => {
        
        if (x.id === groceryMenuId) {
            x.ingredients = x.ingredients.map(i => {
                if (i.id === ingredient.id) {
                    i = ingredient;
                }

                return i;
            });
        }

        return x;
    });


    console.log(groceryMenuList);
    const jsonStringGroceryLists = helper.stringifyJson(groceryMenuList);
    cacheService.setCache(GROCERY_MENU, jsonStringGroceryLists);

}

export function removeIngredient(ingredientId, groceryId) {
    const data = helper.deserializeJsonString(cacheService.getCache(GROCERY_MENU));

    const groceryList = data.map(x => {
        if (x.id === groceryId) {
            x.ingredients = x.ingredients.filter(x => x.id !== ingredientId);
        }

        return x;
    });

    const jsonStringGroceryLists = helper.stringifyJson(groceryList);
    cacheService.setCache(GROCERY_MENU, jsonStringGroceryLists);    
}

export function deleteCache() {
    cacheService.removeCache(GROCERY_MENU);
}

