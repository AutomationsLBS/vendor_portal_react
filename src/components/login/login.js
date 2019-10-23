import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Grid, TextField, Hidden } from '@material-ui/core';
import Config from '../../container/config';
import {getEmployees} from '../../service/api';
import './login.scss';
import LoginForm from './loginForm';
import CommonService from '../../service/commonServices';
import { ToastContainer, toast } from 'react-toastify';

export default class Login extends Component {

    constructor(props) {
        super(props);
        console.log("At Login Container", props);
        this.state = {
            employees: [],
            login: {},
            loader: false
        }
        
    }
    componentWillMount() {
        console.log("Loading Component");
        // this.getEmpoyeesList();
    }
    componentDidMount() {
        console.log("Component loaded");
    }

    getEmpoyeesList() {
        let that = this;
        this.setState({loader: true});
        axios
        .get(axios.getEmployees())
        .then((response) => {
           
            this.setState({employees: response.data, loader: false});
            toast.success(
                (response.message != undefined) 
                    ? "Successfully..." 
                    : response.message, {
                position: toast.POSITION.TOP_CENTER,
                className: 'rotateY animated'
              });
           
        })
        .catch((error) => {
           
            this.setState({loader: false});
            toast.error((error.message != undefined) ? error.toString() : "Failed for some reason", {
                position: toast.POSITION.TOP_CENTER
              });
            
        });
    }
    loginSubmit = (data) => {
     
        this.setState({login: data});
        
        if(this.state.login.phone != "" && this.state.login.pin != ""){
            this.setState({loader: true});
            data.service = "login";
            axios
                .post(axios.login(), data)
                .then((response) => {
                    this.setState({loader: false});
          
                    //debugger; 
                    if(response.visitor.phone_mobile == "8247885533"){
                        response.type = "contractor"
                        //alert(JSON.stringify(response));

                        CommonService.localStore.set("userData", JSON.stringify(response));
                        window.location.href = "/communityc";
                         toast.success( "Login successfull", {
                            position: toast.POSITION.TOP_CENTER,
                            className: 'rotateY animated'
                          });
                        setTimeout(() => {
                        }, 3000);
                    } else if(response.visitor.phone_mobile == "7894562310"){
                        response.type = "vendor"
                        //alert("sdsdf"+JSON.stringify(response));

                        CommonService.localStore.set("userData", JSON.stringify(response));
                        // let ud = CommonService.localStore.get('userData');
                        // ud = JSON.parse(ud.userData);
                        // alert(ud.visitor.type)
                        window.location.href = "/communityv";
                         toast.success( "Login successfull", {
                            position: toast.POSITION.TOP_CENTER,
                            className: 'rotateY animated'
                          });
                        setTimeout(() => {
                        }, 3000);
                    }
           
                })
                 .catch((error) => {
                    this.setState({loader: false});  
                });
        }
    }

    render() {  
        const { loader, login } = this.state;              
        return (
            <Fragment>
                <LoginForm updateData={this.loginSubmit} {...this.props} />
                {CommonService.renderLoader(loader)}
                <ToastContainer autoClose={5000} />
            </Fragment>
        );
    };
}