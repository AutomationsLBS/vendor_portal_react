import React, { Component, Fragment } from 'react';
import axios from 'axios';
/*import { Grid, TextField } from '@material-ui/core';
import Config from '../../container/config';
import {getEmployees} from '../../service/api';
*/
import LoginForm from '../login/loginForm';
import RegisterForm from './registerForm';

export default class Login extends Component {

    constructor(props) {
        super(props);
        console.log("At Login Container", props);
        this.state = {
            employees: []
        }
    }
    componentWillMount() {
        console.log("Loading Component");
        
    }
    componentDidMount() {
        console.log("Component loaded");
    }

    getEmpoyeesList() {
        axios
        .get(axios.getEmployees())
        .then((response) => {
            this.setState({employees: response.data});
            console.log("At First Response", this.state);
        })
        .catch(function (error) {
            console.log("At First Error", error);
        });
    }

    render() {                
        return (
            <Fragment>
                <RegisterForm {...this.props} />
            </Fragment>
        );
    };
}