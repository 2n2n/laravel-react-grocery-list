import React, { Component } from "react";
import FormGroceryMenuIngredients from "./FormGroceryMenuIngredients";

import * as dummyDataService from "../services/dummyDataService";
import _ from "lodash";
import * as helper from "../helpers/helper";

class FormAddNewGroceryMenu extends Component {
    constructor(props) {
        super(props);

        this.state = { groceryMenuName: "", ingredients: [] };
        this.onSaveNewGroceryMenu = this.onSaveNewGroceryMenu.bind(this);
        this.onAddIngredientField = this.onAddIngredientField.bind(this);
        this.onChangeIngredient = this.onChangeIngredient.bind(this);
    }

    onSaveNewGroceryMenu(e) {
        e.preventDefault();
        const result = dummyDataService.addNewGroceryMenu({
            name: this.state.groceryMenuName,
            ingredients: this.state.ingredients
        });
        this.props.onSaveNewGroceryMenu(result);
    }

    onAddIngredientField(e) {
        this.setState({
            ingredients: this.state.ingredients.concat([
                {
                    id: helper.generateUniqueGUID(),
                    name: ""
                }
            ])
        });
    }

    onChangeIngredient(ingredient) {
        const data = this.state.ingredients.map(x => {
            if (x.id === ingredient.id) {
                x = ingredient;
            }

            return x;
        });

        this.setState({
            ingredients: data
        });
    }

    renderIngredients() {
        const renderIngredientsTextbox = this.state.ingredients.map(x => (
            <FormGroceryMenuIngredients
                ingredient={x}
                onChangeIngredient={this.onChangeIngredient}
            />
        ));
        // console.log(this.state.ingredients);

        if (this.state.ingredients.length > 0) {
            return (
                <div className="row">
                    <div className="col-md-12" style={{ paddingTop: "20px" }}>
                        <h4>Ingredients</h4>
                    </div>
                    <div className="col-md-12">{renderIngredientsTextbox}</div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="row">
                <div className="form-signin center-component div-grocerymenu-form">
                    <form onSubmit={this.onSaveNewGroceryMenu}>
                        <div className="row">
                            <div className="col-md-12">
                                <h1 class="h3 mb-3 font-weight-normal text-center">
                                    New Grocery Item
                                </h1>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Grocery Item"
                                    required=""
                                    autofocus=""
                                    value={this.state.groceryMenuName}
                                    onChange={e =>
                                        this.setState({
                                            groceryMenuName: e.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>

                        {this.renderIngredients()}

                        <button
                            class="btn btn-lg btn-primary btn-block"
                            type="submit"
                        >
                            Save
                        </button>
                    </form>

                    <div className="row">
                        <div className="col-md-12" style={{paddingTop: "20px"}}>
                            <button
                                className="btn btn-primary btn-block"
                                onClick={this.onAddIngredientField}
                            >
                                Add an ingredient
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormAddNewGroceryMenu;
