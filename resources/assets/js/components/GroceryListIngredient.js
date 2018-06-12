import React, { Component } from 'react';

import * as groceryListService from '../services/groceryListService';


class GroceryListIngredient extends Component {

    constructor(props) {
        super(props);

        this.state = {showDeleteControl: false};
    }
    

    onDelete() {
        groceryListService.deleteGroceryItem(this.props.id);

        this.props.onDeleteGroceryItem();
    }

    render() {
        const { name } = this.props;
        return (<li
            onMouseEnter={() => this.setState({ showDeleteControl: true })}
            onMouseLeave={() => this.setState({ showDeleteControl: false })}
        >
            {name} 
            { this.state.showDeleteControl ? <button className="btn btn-danger" onClick={() => this.onDelete()}>-</button> : "" }
        </li>);
    }
}

export default GroceryListIngredient;