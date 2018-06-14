import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import GroceryMenu from "./components/GroceryMenu";
import FormAddNewGroceryMenu from "./components/FormAddNewGroceryMenu";
import GroceryListIngredient from "./components/GroceryListIngredient";
import * as groceryListService from "./services/groceryListService";
import * as menuService from './services/menuService';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menus: [],
            groceryLists: [],
            showAddGroceryMenu: false
        };

        this.onSaveNewGroceryMenu = this.onSaveNewGroceryMenu.bind(this);
        this.reloadGroceryList = this.reloadGroceryList.bind(this);
    }

    componentDidMount() {
        axios.all([menuService.fetchAll(), groceryListService.getAllGroceryList()]) 
            .then(axios.spread((menuData, groceryLists) => { 
                this.setState({
                    menus: menuData,
                    groceryLists: groceryLists
                })
            }));
        

    }

    onAddMenu() {
        this.setState({
            showAddGroceryMenu: true
        });
    }
    onDeleteMenu() {
        menuService.fetchAll()
            .then((menus) => this.setState({ menus: menus }) )
    }
    onSaveNewGroceryMenu(data) {
        const menus = this.state.menus;
        menus.push(data);
        this.setState({
            menus: menus
        });

    }
    
    reloadGroceryList() {
        groceryListService.getAllGroceryList()
            .then(groceryListData => this.setState({ groceryLists: groceryListData }));
    }

    render() {
        const menuComponents = this.state.menus.map(menu =>
            <GroceryMenu
                key={menu.id}
                menu={menu}
                onDelete={this.onDeleteMenu.bind(this)}
                onAddIngredientToGroceryList={this.reloadGroceryList}
            />
        );

        const renderFormNewGroceryMenu = this.state.showAddGroceryMenu ? (
            <FormAddNewGroceryMenu
                onSaveNewGroceryMenu={ this.onSaveNewGroceryMenu }
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
                                    onClick={ this.onAddMenu.bind(this) }
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
                                    {menuComponents}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row">
                                    <h1>Your grocery list</h1>
                                </div>
                                <div className="row">
                                    <ul>
                                        {this.state.groceryLists.map(ingredient => 
                                            <GroceryListIngredient 
                                                key={ingredient.id} 
                                                ingredient={ingredient}
                                                onDeleteGroceryItem={this.reloadGroceryList}
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
