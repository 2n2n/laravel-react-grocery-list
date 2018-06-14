import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import GroceryMenu from "./components/GroceryMenu";
import FormAddNewGroceryMenu from "./components/FormAddNewGroceryMenu";

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
    }

    componentDidMount() {
        axios.all(menuService.fetchAll(), groceryListService.getAllGroceryList()) 
            .then((menuData, groceryData) => {
            this.setState({
                menus: menuData,
                groceryLists: groceryData
            });
        })
        

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

    render() {
        const menuComponents = this.state.menus.map(menu =>
            <GroceryMenu
                key={menu.id}
                menu={menu}
                onDelete={ this.onDeleteMenu.bind(this) }
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
                                        {/* {this.state.groceryLists.map(x => 
                                            <GroceryListIngredient 
                                                key={x.id} 
                                                id={x.id} 
                                                name={x.name} 
                                                onDeleteGroceryItem={this.onDeleteGroceryItem}
                                            /> 
                                        )
                                        } */}
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
