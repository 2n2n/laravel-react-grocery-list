import axios from 'axios';
import { DATA_GROCERYLIST } from '../database/dummyData';
import {ENABLE_CACHE} from '../helpers/enums';

import * as cacheService from './cacheService';
import * as helper from '../helpers/helper';


const GROCERY_LIST = "GROCERY_LIST";

export function addGroceryItem(ingredientId) {
    
    axios.post('/api/grocery-lists/', {
        ingredient_id: ingredientId
    })
        .then((response) => response.data)
        .catch((e) => console.log('groceryListservice error', e.getMessage()));
    // let data = undefined;

    // if (ENABLE_CACHE) {
    //     groceryItem.id = helper.generateUniqueGUID();

    //     data = helper.deserializeJsonString(cacheService.getCache(GROCERY_LIST));
    //     data = data.concat([groceryItem]);
    
    //     const jsonStringGroceryLists = helper.stringifyJson(data);
    
    //     cacheService.setCache(GROCERY_LIST, jsonStringGroceryLists);            
    // } else {
        
    // }

    // return data;
}

export function deleteGroceryItem(id) {
    const data = helper.deserializeJsonString(cacheService.getCache(GROCERY_LIST));

    const groceryList = data.filter(x => x.id !== id);

    const jsonStringGroceryLists = helper.stringifyJson(groceryList);
    cacheService.setCache(GROCERY_LIST, jsonStringGroceryLists);
}


export function getAllGroceryList() {
    let data = undefined;

    if (!cacheService.cacheExists(GROCERY_LIST)) {
        data = DATA_GROCERYLIST;
        const jsonStringGroceryLists = helper.stringifyJson(data);

        cacheService.setCache(GROCERY_LIST, jsonStringGroceryLists);
    } else {
        data = helper.deserializeJsonString(cacheService.getCache(GROCERY_LIST));
    }

    return data;
}



export function deleteCache() {
    cacheService.removeCache(GROCERY_LIST);
}





