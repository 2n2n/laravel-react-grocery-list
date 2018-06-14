import React, { Component } from "react";

import * as dummyDataService from "../services/dummyDataService";
import * as groceryListService from '../services/groceryListService';
import * as menuIngredientService from '../services/menuIngredientService';

class Ingredient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showControls: false,
            showUpdateIngredient: false,
            ingredientName: ""
        };

        this.onHoverIngredient = this.onHoverIngredient.bind(this);
        this.onLeaveIngredient = this.onLeaveIngredient.bind(this);
        this.onAddIngredientToGroceryList = this.onAddIngredientToGroceryList.bind(
            this
        );

        this.onRemoveIngredientFromGroceryMenu = this.onRemoveIngredientFromGroceryMenu.bind(
            this
        );
    }

    //#region Component Lifecycles
    componentDidMount() {
        this.setState({
            ingredientName: this.props.ingredient.name
        });
    }
    //#endregion

    onHoverIngredient() {
        this.setState({
            showControls: true
        });
    }

    onLeaveIngredient() {
        this.setState({
            showControls: false
        });
    }

    onAddIngredientToGroceryList() {
        groceryListService.addGroceryItem(this.props.ingredient.id)
            .then(this.props.onAddIngredientToGroceryList);
        
    }

    onRemoveIngredientFromGroceryMenu() {
        
        menuIngredientService.removeMenuIngredient(this.props.groceryMenuId, this.props.ingredient.id)
            .then((data) => { 
                this.props.onRemoveIngredientFromGroceryMenu();
            });
    }

    render() {
        const renderIngredientDetails = (
            <li
                onMouseEnter={this.onHoverIngredient}
                onMouseLeave={this.onLeaveIngredient}                
            >
                <span onClick={() => this.setState({ showUpdateIngredient: true })}>
                    { this.props.ingredient.name }                
                </span>
                {this.state.showControls
                    ? [
                          <button
                            className="btn btn-primary"
                            title="add to cart"
                              onClick={this.onAddIngredientToGroceryList}
                          >
                              +
                          </button>,
                          "  ",
                          <button
                              className="btn btn-danger"
                              title="remove ingredient"
                              onClick={this.onRemoveIngredientFromGroceryMenu}
                          >
                              -
                          </button>
                      ]
                    : ""}
            </li>
        );

        const renderUpdateIngredient = (
            <div className="row">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.setState({ showUpdateIngredient: false });

                    let updatedIngredient = this.props.ingredient.name;
                    updatedIngredient.name = this.state.ingredientName;

                    dummyDataService.updateIngredient(updatedIngredient, this.props.groceryMenuId);
                }}>
                    <input type="text" className="form-control" 
                        value={this.state.ingredientName} 
                        onChange={(e) => this.setState({
                            ingredientName: e.target.value
                        })} 
                        autoFocus={true} 
                    />
                </form>
            </div>
        );

        return (
            <React.Fragment>
                { this.state.showUpdateIngredient ? renderUpdateIngredient : renderIngredientDetails }
            </React.Fragment>
        );
    }
}

export default Ingredient;
