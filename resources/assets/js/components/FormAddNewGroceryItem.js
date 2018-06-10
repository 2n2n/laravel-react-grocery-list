import React, { Component } from "react";

class FormAddNewGroceryItem extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.onSaveNewGroceryItem = this.onSaveNewGroceryItem.bind(this);
    }
    
    onSaveNewGroceryItem(e) {
        e.preventDefault();

        this.props.onSaveNewGroceryItem();
    }

    render() {
        return (
            <div className="row">
                <form className="form-signin center-component" onSubmit={this.onSaveNewGroceryItem}>
                    <h1 class="h3 mb-3 font-weight-normal">New Grocery Item</h1>
                    <input
                        type="text"
                        id="inputEmail"
                        class="form-control"
                        placeholder="Grocery Item"
                        required=""
                        autofocus=""
                    />
                    <button
                        class="btn btn-lg btn-primary btn-block"
                        type="submit"
                    >
                        Save
                    </button>
                </form>
            </div>
        );
    }
}

export default FormAddNewGroceryItem;
