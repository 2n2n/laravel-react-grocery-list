import React, { Component } from "react";

class FormGroceryMenuIngredients extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "" };

        this.onChangeIngredient = this.onChangeIngredient.bind(this);
    }

    onChangeIngredient(e) {
        const value = e.target.value;
        let ingredient = this.props.ingredient;
        ingredient.name = value;

        this.props.onChangeIngredient(ingredient);
        this.setState({
            name: value
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12" style={{paddingBottom: "10px"}}>
                    <input
                        type="text"
                        className="form-control"
                        onChange={this.onChangeIngredient}
                        value={this.state.name}
                    />
                </div>
            </div>
        );
    }
}

export default FormGroceryMenuIngredients;
