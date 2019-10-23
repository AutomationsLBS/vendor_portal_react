import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button,Grid, Menu, MenuItem } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import MainNav from '../components/_/navigation';
import Header from '../components/_/header';
import { Footer } from "../components/_/elements";

import Dashboard from '../components/dashboard/dashboard';




export default class RenderComponent extends Component {

    constructor(props) {
        super(props);
        console.log("RenderComponent Props", props);
    }

    createElement = (props) => {
        return React.createElement(props, null);
    };

    render() { 
        const Component = this.props.view;       
        return (
            <div>
                {this.createElement(this.props.view)}
            </div>
        )
    }
}