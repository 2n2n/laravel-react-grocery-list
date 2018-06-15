import React, { Component } from "react";

import * as menuService from '../services/menuService';

class GroceryMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            menuNameModify: false,
            menuName: "",
            ingredientName: "",
            addIngredient: false
        };
    }

    componentDidMount() {
        
        this.setState({
            menuName: this.props.menu.name
        });
    }
    
    onDeleteGroceryMenu(e) {
        menuService.remove(this.props.menu.id)
            .then((data) => this.props.onDelete() );
    }

    render() {
        return (
            <div className="col-md-4" style={{marginBottom: "20px"}}>
                <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <div>
                            <i class="fas fa-utensils"></i> 
                            <span style={{fontSize: "20px"}} className="card-title">{this.state.menuName}</span>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <button className="btn btn-danger" onClick={this.onDeleteGroceryMenu.bind(this)} style={{ marginLeft: "5px" }}>
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