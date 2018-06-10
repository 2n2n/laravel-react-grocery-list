import { DATA_GROCERYLISTS } from '../database/dummyData';



export function modifyGroceryItem(groceryItem) {

    const groceryList = DATA_GROCERYLISTS.map(x => {
        if (x.id === groceryItem.id) {
            x = groceryItem;
        }

        return x;
    });

    // DATA_GROCERYLISTS.push(test);

    return groceryList;
}

export function getAllGroceryItems() {
    
}

export function addNewGroceryItem() {
    
}