import axios from 'axios';
import * as cacheService from './cacheService';

const GROCERY_LIST = "GROCERY_LIST";

export function addGroceryItem(ingredientId) {
    
    return axios.post('/api/grocery-lists/', {
        ingredient_id: ingredientId
    })
        .then((response) => response.data)
        .catch((e) => console.log('groceryListservice error', e.getMessage()));
}

export function deleteGroceryItem(ingredientId) {
    return axios.delete('/api/grocery-lists/' + ingredientId)
        .then((response) => response.data)
    .catch((e) => console.log('groceryListService error', e.getMessage()))
}


export function getAllGroceryList() {
    return axios.get('/api/grocery-lists/')
        .then((response) => response.data)
        .catch((e) => console.log('groceryListservice error', e.getMessage()));

}



export function clearGroceryList() {
    return axios.delete('/api/grocery-lists-clear')
        .then((respose) => response.data)
        .catch( (e) => console.log('groceryListService error', e.getMessage() ))
}





