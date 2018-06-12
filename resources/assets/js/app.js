import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";

import GroceryMenu from "./components/GroceryMenu";
import FormAddNewGroceryMenu from "./components/FormAddNewGroceryMenu";
import GroceryListIngredient from './components/GroceryListIngredient';

import * as dummyDataService from "./services/dummyDataService";
import * as groceryListService from './services/groceryListService';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groceryMenus: dummyDataService.getAllGroceryMenus(),
            groceryLists: groceryListService.getAllGroceryList(),
            showAddGroceryMenu: false
        };

        this.onGroceryMenuChanged = this.onGroceryMenuChanged.bind(this);
        this.onToggleAddGroceryMenu = this.onToggleAddGroceryMenu.bind(this);
        this.onSaveNewGroceryMenu = this.onSaveNewGroceryMenu.bind(this);
        this.onRemoveCache = this.onRemoveCache.bind(this);
        this.onDeleteGroceryMenu = this.onDeleteGroceryMenu.bind(this);
        this.onAddIngredient = this.onAddIngredient.bind(this);

        this.onDeleteGroceryItem = this.onDeleteGroceryItem.bind(this);

        this.onAddIngredientToGroceryList = this.onAddIngredientToGroceryList.bind(this);

        this.onRemoveIngredientFromGroceryMenu = this.onRemoveIngredientFromGroceryMenu.bind(this);
    }

    componentDidMount() {
        // axios.get('/api/user').then(data => console.log(data)).catch(e => console.log(e));
    }

    onGroceryMenuChanged(data) {
        this.setState({
            groceryMenus: data
        });
    }

    onToggleAddGroceryMenu(e) {
        this.setState({
            showAddGroceryMenu: !this.state.showAddGroceryMenu
        });
    }

    onSaveNewGroceryMenu(data) {
        this.setState({
            groceryMenus: data
        });

        this.onToggleAddGroceryMenu(null);
    }

    initializeState() {
        this.setState({
            groceryMenus: dummyDataService.getAllGroceryMenus(),
            groceryLists: groceryListService.getAllGroceryList()
        });
    }

    onRemoveCache(e) {
        dummyDataService.deleteCache();
        groceryListService.deleteCache();

        this.initializeState();
    }

    onDeleteGroceryMenu() {
        this.initializeState();
    }

    onAddIngredient(e) {
        this.initializeState();
    }

    onAddIngredientToGroceryList() {
        this.initializeState();
    }

    onDeleteGroceryItem() {
        this.initializeState();
    }

    onRemoveIngredientFromGroceryMenu() {
        this.initializeState();
    }

    render() {
        console.log("rendering this component...");

        const rendergroceryMenus = this.state.groceryMenus.map(groceryMenu => (
            <GroceryMenu
                key={groceryMenu.id}
                groceryMenu={groceryMenu}
                onGroceryMenuChanged={this.onGroceryMenuChanged}
                onDeleteGroceryMenu={this.onDeleteGroceryMenu}
                onAddIngredient={this.onAddIngredient}
                onAddIngredientToGroceryList={this.onAddIngredientToGroceryList}
                onRemoveIngredientFromGroceryMenu={this.onRemoveIngredientFromGroceryMenu}
            />
        ));

        const renderFormNewGroceryMenu = this.state.showAddGroceryMenu ? (
            <FormAddNewGroceryMenu
                onSaveNewGroceryMenu={this.onSaveNewGroceryMenu}
            />
        ) : (
            ""
        );

        return (
            <div>
                <main role="main">
                    <div className="starter-template">
                        <h1 className="text-center">Grocery App</h1>
                        <div className="row div-add-menu">
                            <div className="col-md-12">
                                <button
                                    className="btn btn-primary"
                                    onClick={this.onToggleAddGroceryMenu}
                                >
                                    Add new Grocery Item
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={this.onRemoveCache}
                                >
                                    Restore database seed
                                </button>
                            </div>
                        </div>

                        {renderFormNewGroceryMenu}

                        <div className="row">
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h1>Grocery Menu</h1>
                                    </div>
                                    {rendergroceryMenus}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row">
                                    <h1>Your grocery list</h1>
                                </div>
                                <div className="row">
                                    <ul>
                                        {this.state.groceryLists.map(x => 
                                            <GroceryListIngredient 
                                                key={x.id} 
                                                id={x.id} 
                                                name={x.name} 
                                                onDeleteGroceryItem={this.onDeleteGroceryItem}
                                            /> 
                                        )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("container"));
