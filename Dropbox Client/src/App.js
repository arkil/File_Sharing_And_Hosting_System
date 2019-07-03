import React, {Component} from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import RoutingComponent from "./components/RoutingComponent";

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <RoutingComponent/>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
