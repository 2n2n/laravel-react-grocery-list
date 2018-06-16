import React, { Component } from "react";
import ReactDOM from "react-dom";

import * as groceryListService from "./services/groceryListService";
import * as menuService from "./services/menuService";

import FormAddNewGroceryMenu from "./components/FormAddNewGroceryMenu";
import GroceryMenu from './components/GroceryMenu';
import GroceryListIngredient from "./components/GroceryListIngredient";



class App extends Component {
    constructor(props) {
        super(props);

        this.state = { showAddGroceryMenu: false, menus:[], groceryLists: [] };

        this.onSaveNewGroceryMenu = this.onSaveNewGroceryMenu.bind(this);
        this.renderLists = this.renderLists.bind(this);
    }

    renderLists() {
        menuService.fetchAll().then(menus => this.setState({menus}));
        groceryListService
            .getAllGroceryList()
            .then(groceryLists => this.setState({ groceryLists }));
    }
    
    componentDidMount() {
        this.renderLists();
    }

    togglAddForm() {
        this.setState({
            showAddGroceryMenu: !this.state.showAddGroceryMenu
        });
    }

    onAddMenu() {
        this.togglAddForm();
    }

    onSaveNewGroceryMenu() {
        this.renderLists();
        this.togglAddForm();
    }

    render() {
        const renderGroceryMenus = this.state.menus.map(menu =>
            <GroceryMenu
                key={menu.id}
                menu={menu}
                onDelete={this.renderLists}
                onAddIngredientToGroceryList={this.renderLists}
            />
        );

        const renderFormNewGroceryMenu = this.state.showAddGroceryMenu ? (
            <FormAddNewGroceryMenu
                onSaveNewGroceryMenu={this.onSaveNewGroceryMenu}
            />
        ) : (
            ""
        );

        const renderGroceryListsIngredient = this.state.groceryLists.map(ingredient => 
            <GroceryListIngredient 
                key={ingredient.id} 
                ingredient={ingredient}
                onDeleteGroceryItem={this.renderLists}
            /> 
        );

        return (
            <div>
                <main role="main">
                    <div className="starter-template">
                        <div className="jumbotron">
                            <h1 className="display-4">Grocery App</h1>
                            <p className="lead">
                                Awesome app using Laravel and ReactJS
                            </p>
                        </div>

                        <div className="row div-add-menu">
                            <div className="col-md-12">
                                <button
                                    className="btn btn-primary"
                                    onClick={this.onAddMenu.bind(this)}
                                >
                                    Add Menu
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
                                    {renderGroceryMenus}
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="row">
                                    <h1>Your grocery list</h1>
                                </div>
                                <div className="row">
                                    <ul>
                                        {renderGroceryListsIngredient}
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
