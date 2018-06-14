import React, { Component } from 'react';

import * as groceryListService from "../services/groceryListService";


class GroceryListIngredient extends Component {

    constructor(props) {
        super(props);
        this.state = {showDeleteControl: false};

        this.onDelete = this.onDelete.bind(this);
    }
    

    onDelete(e) {
        e.preventDefault();

        groceryListService.deleteGroceryItem(this.props.ingredient.id)
            .then((data) => this.props.onDeleteGroceryItem(data));
    }

    render() {
        const renderDeleteControl = this.state.showDeleteControl ? 
            <button className="btn btn-danger" onClick={this.onDelete}>
                <i class="fas fa-minus-circle"></i>
            </button> : 
            "";

        return (<li
                    onMouseEnter={() => this.setState({ showDeleteControl: true })}
                    onMouseLeave={() => this.setState({ showDeleteControl: false })}
                >
                    {this.props.ingredient.name} 
                    {renderDeleteControl}
                </li>
        );
    }
}

export default GroceryListIngredient;