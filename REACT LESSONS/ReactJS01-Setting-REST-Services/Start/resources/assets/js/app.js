import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
    constructor(props) {
        super(props);
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
