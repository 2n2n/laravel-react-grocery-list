/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// require('./bootstrap');

import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {

    componentDidMount() {
        axios.get('/api/user').then(data => console.log(data)).catch(e => console.log(e));
    }

    render() {
        return (
            <div>
                Hello world!
                <button onClick={() => alert("hello world!")}>Click me!</button>
                <button onClick={() => console.log("hello world!")}>
                    Click me!
                </button>
            </div>
        );
    }
}



ReactDOM.render(<App />, document.getElementById("container"));
