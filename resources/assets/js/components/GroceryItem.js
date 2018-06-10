import React, { Component } from "react";
import {DATA_GROCERYLISTS} from '../database/dummyData';

import * as dummyDataService from '../services/dummyDataService';

class GroceryItem extends Component {
    constructor(props) {
        super(props);
        this.state = { menuNameModify: false, menuName: "" };

        this.onToggleMenuName = this.onToggleMenuName.bind(this);
        this.onChangeMenuName = this.onChangeMenuName.bind(this);
        this.onSaveGroceryItem = this.onSaveGroceryItem.bind(this);
    }

    componentDidMount() {

        const name = this.props.groceryItem.name;
        this.setState({
            menuName: name
        });
    }

    onToggleMenuName(e) {
        e.preventDefault();

        this.setState({
            menuNameModify: !this.state.menuNameModify
        });
    }

    onChangeMenuName(e) {
        const value = e.target.value;

        this.setState({
            menuName: value
        });
    }

    onSaveGroceryItem(e) {
        this.onToggleMenuName(e);
        let groceryItem = this.props.groceryItem;
        groceryItem.name = this.state.menuName;

        const modifiedList = dummyDataService.modifyGroceryItem(groceryItem);

        this.props.onGroceryItemChanged(modifiedList); //note: call this props when there's a change in item to initiate re-render in parent component
    }

    render() {
        const { name, ingredients } = this.props.groceryItem;

        const renderMenuName = this.state.menuNameModify ? (
            <form onSubmit={this.onSaveGroceryItem}>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.menuName}
                    onChange={this.onChangeMenuName}
                    autoFocus={true}
                />
            </form>
        ) : (
            <h5 class="card-title" onClick={this.onToggleMenuName}>{name}</h5>
        );

        const renderIngredients = ingredients.map(x => <li key={x.id}>{x.name}</li>)

        return (
            <div className="col-md-4">
                <div class="card" style={{ width: "18rem" }}>
                    <div class="card-body">
                        {renderMenuName}

                        <div className="row">
                            <ul>{renderIngredients}</ul>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <button className="btn btn-primary">
                                    Add ingredient
                                </button>{" "}
                                <button className="btn btn-danger">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GroceryItem;