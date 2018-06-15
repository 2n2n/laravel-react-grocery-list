import React, { Component } from "react";
import ReactDOM from "react-dom";

import * as groceryListService from "./services/groceryListService";
import * as menuService from './services/menuService';


class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        menuService.fetchAll().then(menus => console.log(menus));
        groceryListService.getAllGroceryList().then(groceryLists => console.log(groceryLists));
    }

    render() {
        return (
            <div>
                <main role="main">
                    <div className="starter-template">
                        <div className="jumbotron">
                            <h1 className="display-4">Grocery App</h1>
                            <p className="lead">Awesome app using Laravel and ReactJS</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("container"));
