import React, { Component } from 'react';

import * as groceryListService from '../services/groceryListService';


class GroceryListIngredient extends Component {

    constructor(props) {
        super(props);
    }
    

    onDelete() {
        groceryListService.deleteGroceryItem(this.props.id);

        this.props.onDeleteGroceryItem();
    }

    render() {
        const { name } = this.props;
        return <li onClick={() => this.onDelete()}>{name}</li>;
    }
}

export default GroceryListIngredient;