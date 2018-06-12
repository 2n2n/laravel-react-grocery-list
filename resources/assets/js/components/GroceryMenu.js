import React, { Component } from "react";

import Ingredient from './Ingredient';


import * as dummyDataService from '../services/dummyDataService';


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
        this.state = { menuNameModify: false, menuName: "", ingredientName: "", addIngredient:false };

        this.onToggleMenuName = this.onToggleMenuName.bind(this);
        this.onChangeMenuName = this.onChangeMenuName.bind(this);
        this.onSaveGroceryMenu = this.onSaveGroceryMenu.bind(this);
        this.onDeleteGroceryMenu = this.onDeleteGroceryMenu.bind(this);
        this.onAddIngredient = this.onAddIngredient.bind(this);



        this.onAddIngredientToGroceryList = this.onAddIngredientToGroceryList.bind(this);

        this.onRemoveIngredientFromGroceryMenu = this.onRemoveIngredientFromGroceryMenu.bind(this);
    }

    componentDidMount() {
        console.log("component mounted...");

        const name = this.props.groceryMenu.name;
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

    onSaveGroceryMenu(e) {
        this.onToggleMenuName(e);
        let groceryMenu = this.props.groceryMenu;
        groceryMenu.name = this.state.menuName;

        const modifiedList = dummyDataService.modifyGroceryMenu(groceryMenu);

        this.props.onGroceryMenuChanged(modifiedList); //note: call this props when there's a change in item to initiate re-render in parent component
    }

    onDeleteGroceryMenu(e) {
        dummyDataService.deleteGroceryMenu(this.props.groceryMenu);
        this.props.onDeleteGroceryMenu();
    }

    onAddIngredient(e) {
        e.preventDefault();

        this.setState({
            addIngredient: !this.state.addIngredient
        });
        
        dummyDataService.addIngredient(this.state.ingredientName, this.props.groceryMenu.id);
        this.props.onAddIngredient();
    }

    onAddIngredientToGroceryList() {
        this.props.onAddIngredientToGroceryList();
    }

    onRemoveIngredientFromGroceryMenu() {
        this.props.onRemoveIngredientFromGroceryMenu();
    }

    render() {
        const { name, ingredients } = this.props.groceryMenu;

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
            <h5 class="card-title" onClick={this.onToggleMenuName}>{name}</h5>
        );

        const renderIngredients = ingredients.map(x => 
            <Ingredient 
                key={x.id} 
                item={x} 
                groceryMenuId={this.props.groceryMenu.id}
                onAddIngredientToGroceryList={this.onAddIngredientToGroceryList} 
                onRemoveIngredientFromGroceryMenu={this.onRemoveIngredientFromGroceryMenu}
            />
        );

        const renderAddNewIngredient = this.state.addIngredient ? 
            <AddIngredient 
                onAddIngredient={this.onAddIngredient} 
                onChangeIngredientName={(val) => this.setState({ ingredientName: val })} 
            /> : 
            "";

        return (
            <div className="col-md-4">
                <div class="card" style={{ width: "18rem" }}>
                    <div class="card-body">
                        {renderMenuName}

                        <div className="row">
                            <ul>{renderIngredients}</ul>
                        </div>

                        {renderAddNewIngredient}

                        <div className="row">
                            <div className="col-md-12">
                                <button className="btn btn-primary" onClick={() => 
                                    this.setState({
                                        addIngredient: !this.state.addIngredient
                                    })
                                }>
                                    Add ingredient
                                </button>{" "}
                                <button className="btn btn-danger" onClick={this.onDeleteGroceryMenu}>
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