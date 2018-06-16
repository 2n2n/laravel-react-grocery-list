import React, { Component } from "react";

import * as menuService from '../services/menuService';

class FormAddNewGroceryMenu extends Component {
    constructor(props) {
        super(props);

        this.state = { groceryMenuName: "", ingredients: [] };
        this.onSaveNewGroceryMenu = this.onSaveNewGroceryMenu.bind(this);
    }

    onSaveNewGroceryMenu(e) {
        e.preventDefault();
        menuService.save(this.state.groceryMenuName)
            .then((data) => {
                this.props.onSaveNewGroceryMenu(data.data)
            });
    }

    render() {
        return (
            <div className="row">
                <div className="form-signin center-component div-grocerymenu-form">
                    <form onSubmit={this.onSaveNewGroceryMenu}>
                        <div className="row">
                            <div className="col-md-12">
                                <h1 class="h3 mb-3 font-weight-normal text-center">
                                    New Menu
                                </h1>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Menu"
                                    required=""
                                    autoFocus
                                    value={this.state.groceryMenuName}
                                    onChange={e =>
                                        this.setState({
                                            groceryMenuName: e.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <button
                            className="btn btn-lg btn-primary btn-block"
                            type="submit"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default FormAddNewGroceryMenu;
