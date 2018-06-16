import React, { Component } from "react";
import ReactDOM from "react-dom";

import * as groceryListService from "./services/groceryListService";
import * as menuService from './services/menuService';

import FormAddNewGroceryMenu from './components/FormAddNewGroceryMenu';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {showAddGroceryMenu: false};

        this.onSaveNewGroceryMenu = this.onSaveNewGroceryMenu.bind(this);
    }

    renderLists() {
        menuService.fetchAll().then(menus => console.log(menus));
        groceryListService.getAllGroceryList().then(groceryLists => console.log(groceryLists));
    }
    componentDidMount() {

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
                        <div className="jumbotron">
                            <h1 className="display-4">Grocery App</h1>
                            <p className="lead">Awesome app using Laravel and ReactJS</p>
                        </div>

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
                    </div>
                </main>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("container"));
