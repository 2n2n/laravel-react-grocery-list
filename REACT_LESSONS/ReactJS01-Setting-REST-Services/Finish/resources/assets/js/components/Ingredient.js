import React, { Component } from "react";

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
                className="list-group-item"            
            >
                <span onClick={() => this.setState({ showUpdateIngredient: true })} style={{ marginRight: '10px', lineHeight: "35px", padding: "5px"}}>
                    <i class="fas fa-stroopwafel"></i> { this.props.ingredient.name }
                </span>
                {this.state.showControls
                    ? [
                          <button
                            className="btn btn-primary btn-sm"
                            title="add to cart"
                            onClick={this.onAddIngredientToGroceryList}
                          >
                              <i class="fas fa-cart-plus"></i>
                          </button>,
                          "  ",
                          <button
                              className="btn btn-danger btn-sm"
                              title="remove ingredient"
                              onClick={this.onRemoveIngredientFromGroceryMenu}
                          >
                              <i class="fas fa-minus-circle"></i>
                          </button>
                      ]
                    : ""}
            </li>
        );

        return (
            <React.Fragment>
                {renderIngredientDetails}
            </React.Fragment>
        );
    }
}

export default Ingredient;
