import React, { Component } from 'react';

import * as groceryListService from "../services/groceryListService";


class GroceryListIngredient extends Component {

    constructor(props) {
        super(props);

        this.state = {showDeleteControl: false};
    }
    

    onDelete(e, ingredient) {
        console.log('wawa');
        e.preventDefault();

        groceryListService.deleteGroceryItem(ingredient.id)
            .then((data) => this.props.onDeleteGroceryItem(data));
    }

    render() {
        return (<li
            onMouseEnter={() => this.setState({ showDeleteControl: true })}
            onMouseLeave={() => this.setState({ showDeleteControl: false })}
        >
            {this.props.ingredient.name} 
            {this.state.showDeleteControl ? <button className="btn btn-danger" onClick={(e) => this.onDelete(e, this.props.ingredient)}>-</button> : "" }
        </li>);
    }
}

export default GroceryListIngredient;