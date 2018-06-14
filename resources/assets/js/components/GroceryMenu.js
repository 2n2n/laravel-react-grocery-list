import React, { Component } from "react";

import Ingredient from './Ingredient';


import * as dummyDataService from '../services/dummyDataService';
import * as menuIngredientService from '../services/menuIngredientService';
import * as menuService from '../services/menuService';

const AddIngredient = ({onAddIngredient, onChangeIngredientName}) => (
                            <div className="row" style={{paddingBottom: "15px"}}>
                                <div className="col-md-12">
                                    <form onSubmit={onAddIngredient}>
                                        <input type="text" className="form-control" 
                                            onChange={(e) => onChangeIngredientName(e.target.value)} 
                                        />
                                    </form>
                                </div>
                            </div>);

class GroceryMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            menuNameModify: false,
            menuName: "",
            ingredientName: "",
            addIngredient: false
        };

        this.onAddIngredient = this.onAddIngredient.bind(this);
        this.onRemoveIngredientFromGroceryMenu = this.onRemoveIngredientFromGroceryMenu.bind(this);
        this.onChangeMenuName = this.onChangeMenuName.bind(this);
        this.onToggleMenuName = this.onToggleMenuName.bind(this);
    }

    componentDidMount() {
        menuIngredientService.fetchMenuIngredient(this.props.menu.id)
            .then((ingredients) => {
                this.setState({
                    ingredients: ingredients
                });
            });

        this.setState({
            menuName: this.props.menu.name
        });
    }
    
    onToggleMenuName(e) {
        e.preventDefault();

        this.setState({
            menuNameModify: !this.state.menuNameModify
        });
    }

    onChangeMenuName(e) {
        e.preventDefault();
        const value = e.target.value;

        this.setState({
            menuName: value
        });
    }

    onSaveGroceryMenu(e) {
        this.onToggleMenuName(e);
        let groceryMenu = this.props.groceryMenu;
        groceryMenu.name = this.state.menuName;

        const modifiedList = dummyDataService.modifyGroceryMenu(groceryMenu);

        this.props.onGroceryMenuChanged(modifiedList); //note: call this props when there's a change in item to initiate re-render in parent component
    }

    onDeleteGroceryMenu(e) {
        menuService.remove(this.props.menu.id)
            .then((data) => this.props.onDelete(data) )
        
    }

    onAddIngredient(e) {
        e.preventDefault();
        menuIngredientService.addMenuIngredient(this.props.menu.id, this.state.ingredientName)
            .then((data) => {
                menuIngredientService.fetchMenuIngredient(this.props.menu.id)
                    .then((data) => {
                        this.setState({
                            ingredients: data,
                            addIngredient: false
                        })
                    });
            });
        
    }

    onAddIngredientToGroceryList() {

        this.props.onAddIngredientToGroceryList();
    }

    onRemoveIngredientFromGroceryMenu() {
        menuIngredientService.fetchMenuIngredient(this.props.menu.id)
            .then((data) => this.setState({ ingredients: data }));
    }

    render() {

        const renderMenuName = this.state.menuNameModify ? (
            <form onSubmit={this.onSaveGroceryMenu}>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.menuName}
                    onChange={this.onChangeMenuName}
                    autoFocus={true}
                />
            </form>
        ) : (
            <div>
                <i class="fas fa-utensils"></i> <span style={{fontSize: "20px"}} className="card-title" onClick={this.onToggleMenuName}>{this.state.menuName}</span>
            </div>
        );

        
        const renderIngredients = this.state.ingredients.map( (ingredient) => 
            <Ingredient 
                key={ingredient.id} 
                ingredient = { ingredient } 
                groceryMenuId={ this.props.menu.id }
                onAddIngredientToGroceryList={ this.onAddIngredientToGroceryList.bind(this) } 
                onRemoveIngredientFromGroceryMenu={this.onRemoveIngredientFromGroceryMenu}
            />
        );

        const renderAddNewIngredient = this.state.addIngredient ? 
            <AddIngredient 
                onAddIngredient={ this.onAddIngredient } 
                onChangeIngredientName={(val) => this.setState({ ingredientName: val })} 
            /> : 
            "";

        return (
            <div className="col-md-4" style={{marginBottom: "20px"}}>
                <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                        {renderMenuName}
                    </div>

                    <ul className="list-group list-group-flush">{renderIngredients}</ul>

                    <div className="card-body">
                        {renderAddNewIngredient}
                        <div className="row">
                            <div className="col-md-12">
                                <button className="btn btn-primary" onClick={() => 
                                    this.setState({
                                        addIngredient: !this.state.addIngredient
                                    })
                                }>
                                    Add ingredient
                                </button>
                                <button className="btn btn-danger" onClick={this.onDeleteGroceryMenu.bind(this)}>
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

export default GroceryMenu;