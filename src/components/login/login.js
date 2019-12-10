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

  
    loginSubmit = (data) => {
        console.log(data);
     
        let phone = data.phone_mobile
        let pin =  data.pin_c;

        this.setState({login: {phone,pin}});
   
        if(pin != "" && phone != ""){
            this.setState({loader: true});
            data.service = "login";
            axios
                .post(axios.login(), data)

                .then((response) => {
             
                    CommonService.localStore.set("companystatus", 0);   
                CommonService.localStore.set("phone_mobile_user", data.phone_mobile); 

                CommonService.localStore.set("visitor_types", response.visitor_type); 
                        
                    CommonService.localStore.set("currentPin",data.pin_c); 
                    CommonService.localStore.set("username", response.visitor["first_name"]+" "+response.visitor["last_name"] );         
                    this.setState({loader: false});
                    CommonService.localStore.set("username", response.visitor["first_name"]+" "+response.visitor["last_name"] );    
                    CommonService.localStore.set("first_name", response.visitor["first_name"])
                    CommonService.localStore.set("last_name", response.visitor["last_name"])
                    CommonService.localStore.set("email", response.visitor["email"])
                   let  vendorComanyStatus = false;
                    if (response.vendor_companies.length > 0){
                        vendorComanyStatus = true;
                       
                        CommonService.localStore.set("visitor_type", response.visitor["id"]);  
                        CommonService.localStore.set("usr_vendor_id", JSON.stringify(response.visitor["id"]));  
                             
                        CommonService.localStore.set("usr_company_id", JSON.stringify(response.vendor_companies[0]["id"]));   
                        CommonService.localStore.set("usr_company_name", response.vendor_companies[0]["name"]);   
                    }
                     
                 if (response.visitor_type == "vendor"){
                    window.location.href = "/communityc";

                  }else{
                           
                            if (vendorComanyStatus){
                                if (response.vendor_companies.length > 1){

                                    window.location.href = "/companies";
                                    CommonService.localStore.set("companystatus", 1);   
                                }else{
                                    window.location.href = "/communityv";
                                }
                                

                            } else {
                                window.location.href = "/communityv";
                            }
                            
                        }
                        
                        
                        CommonService.localStore.set("userData", JSON.stringify(response));
                                                toast.success( "Login successfull", {
                            position: toast.POSITION.TOP_CENTER,
                            className: 'rotateY animated'
                          });
                        setTimeout(() => {
                        }, 3000);
                    
           
                })
                 .catch((error) => {
                    this.setState({loader: false});  
                    
                    toast.error((error.message != undefined) ? "Invalid Pin or Phone/Email " : "Failed for some reason", {
                        position: toast.POSITION.TOP_CENTER
                      });
                    
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