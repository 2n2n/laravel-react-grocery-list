import axios from 'axios';

export function fetchMenuIngredient(menuId) {
    return axios.get('/api/menu/'+ menuId +'/ingredient')
        .then((data) => data.data)
        .catch((e) => console.log('menuIngredientService Error:', e.getMessage()));
}

export function addMenuIngredient(menuId, ingredientName) {
    return axios.post('/api/menu/' + menuId + '/ingredient', {
        name: ingredientName
    })
        .then((data) => data.data)
        .catch((e) => console.log('menuIngredientService Error: ', e.getMessage()));
}

export function removeMenuIngredient(menuId, ingredientId) {
    
}