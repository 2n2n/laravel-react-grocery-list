import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";

import MyComponent from "./components/MyComponent";
import GroceryItem from "./components/GroceryItem";
import FormAddNewGroceryItem from './components/FormAddNewGroceryItem';

import { DATA_GROCERYLISTS } from "./database/dummyData";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { groceryLists: DATA_GROCERYLISTS, showAddGroceryItem: false };

        this.onGroceryItemChanged = this.onGroceryItemChanged.bind(this);
        this.onToggleAddGroceryItem = this.onToggleAddGroceryItem.bind(this);
        this.onSaveNewGroceryItem = this.onSaveNewGroceryItem.bind(this);
    }

    componentDidMount() {
        // axios.get('/api/user').then(data => console.log(data)).catch(e => console.log(e));
    }

    onGroceryItemChanged(data) {
        this.setState({
            groceryLists: data
        });
    }

    onToggleAddGroceryItem(e) {
        this.setState({
            showAddGroceryItem: !this.state.showAddGroceryItem
        });
    }

    onSaveNewGroceryItem(e) {
        this.onToggleAddGroceryItem(e);
    }

    render() {
        console.log("rendering this component...");

        const renderGroceryLists = this.state.groceryLists.map(groceryItem => (
            <GroceryItem
                key={groceryItem.id}
                groceryItem={groceryItem}
                onGroceryItemChanged={this.onGroceryItemChanged}
            />
        ));

        const renderFormNewGroceryItem = this.state.showAddGroceryItem ? 
            <FormAddNewGroceryItem 
                onSaveNewGroceryItem={this.onSaveNewGroceryItem} 
            /> : 
            "";

        return (
            <div>
                <main role="main" className="container">
                    <div className="starter-template">
                        <h1 className="text-center">Grocery List Items</h1>
                        <div className="row div-add-menu">
                            <div className="col-md-4">
                                <button className="btn btn-primary" onClick={this.onToggleAddGroceryItem}>
                                    Add new Grocery Item
                                </button>
                            </div>
                        </div>

                        {renderFormNewGroceryItem}

                        <div className="row">{renderGroceryLists}</div>
                    </div>
                </main>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("container"));
