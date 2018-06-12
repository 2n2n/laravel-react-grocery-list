import React, { Component } from "react";

import * as groceryListService from "../services/groceryListService";
import * as dummyDataService from "../services/dummyDataService";

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
        const { name } = this.props.item;
        this.setState({
            ingredientName: name
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
        groceryListService.addGroceryItem(this.props.item);

        this.props.onAddIngredientToGroceryList();
    }

    onRemoveIngredientFromGroceryMenu() {
        dummyDataService.removeIngredient(
            this.props.item.id,
            this.props.groceryMenuId
        );

        this.props.onRemoveIngredientFromGroceryMenu();
    }

    render() {
        const { name } = this.props.item;
        const renderIngredientDetails = (
            <li
                onMouseEnter={this.onHoverIngredient}
                onMouseLeave={this.onLeaveIngredient}                
            >
                <span onClick={() => this.setState({ showUpdateIngredient: true })}>
                    {name}                
                </span>
                {this.state.showControls
                    ? [
                          <button
                              className="btn btn-primary"
                              onClick={this.onAddIngredientToGroceryList}
                          >
                              +
                          </button>,
                          "  ",
                          <button
                              className="btn btn-danger"
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

                    let updatedIngredient = this.props.item;
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
