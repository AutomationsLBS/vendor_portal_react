import React, { Component } from 'react';
import { Button,Grid, Menu, MenuItem } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import MainNav from '../components/_/navigation';
import Dummy from '../components/_/dummyText';
import Header from '../components/_/header';
import { Footer } from "../components/_/elements";
import { ToastContainer, toast } from 'react-toastify';

export default class SingleRouteView extends Component{
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div>
                <Header showProfile={false} />
                <Grid container className="bodyContainer">                                
                    <Grid className="bodyContent forgotPassword" item lg={10} md={10} sm={9} xs={12}>
                        Forgot Password
                    </Grid>
                </Grid>
                <ToastContainer autoClose={8000} />
                <Footer />
            </div>
        )
    }
}