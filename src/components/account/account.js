import React, { Component } from 'react';

import {  Button, Typography, Grid } from '@material-ui/core';


import "./account.scss";

export default class Account extends Component {

    constructor(props) {
        super(props);
        console.log("Account", props);
        this.state = {
            accountDetails: {
                firstname: 'Florida Best Hearing',
                lastname: 'New Port RicheyName',
                sugar_id: '82f72939-735e-53a2-0944-5418c4edae2a',
                phone: '1231234123',
                email_id: 'newportrichey@accushield.com',
                state: 'Florida, New Jersey, New York',
                billingAddress: 'P.O. Box 942873 Sacramento, CA 94273-0001',
                shippingAddress: 'District 2 1657 Riverside Drive Redding 530-225-3426',
            }
        }
        // this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        // this.setState({ accountDetails: JSON.parse(localStorage.getItem('accountData')) });

    }

    editForm = (evt) => {
        // window.location.hash = '/account/edit/1';
        localStorage.setItem('accountData', JSON.stringify(this.state.accountDetails));
        console.log('this.state.accountDetails', this.state.accountDetails);
        this.props.history.push('/account/edit/1');
    }

    render() {
        return (
            <Grid container className="accountBlock" >
                <Grid container className="header" justify="space-between" >
                    {/* <Grid item xs={12} sm={6} md={6} > */}
                    <Grid item>
                        <Typography className="pageTitle titleSection" variant="title" gutterBottom align="center">
                            Account
                        </Typography>
                    </Grid>
                    <Grid item className="text-right" >
                        <Button onClick={this.editForm} variant="outlined" className="outlinedButton" >
                            Edit
                            {/* <Link to="/register" />Edit</Link> */}
                        </Button>
                    </Grid>

                </Grid>
                <Grid item xs={12} sm={6} md={6} className="formBlock" >
                    <div className="formTitle" > Name </div>
                    <div className="formDescp" > {this.state.accountDetails.firstname} - {this.state.accountDetails.lastname} </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="formBlock"  >
                    <div className="formTitle" > Sugar ID </div>
                    <div className="formDescp" > {this.state.accountDetails.sugar_id} </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="formBlock" >
                    <div className="formTitle" > Phone </div>
                    <div className="formDescp" > {this.state.accountDetails.phone} </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="formBlock" >
                    <div className="formTitle" > Email </div>
                    <div className="formDescp" > {this.state.accountDetails.email_id} </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} className="formBlock" >
                    <div className="formTitle" > US State </div>
                    <div className="formDescp" > {this.state.accountDetails.state} </div>
                </Grid>

                <div className="formTitle">
                    Address
                </div>
                <Grid container className="formBlock" >
                    <Grid item xs={12} sm={6} md={6} >
                        <div className="formSubTitle" >Billing Address</div>
                        <div className="formDescp" >{this.state.accountDetails.billingAddress}</div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} >
                        <div className="formSubTitle" >Shipping Address</div>
                        <div className="formDescp" >{this.state.accountDetails.shippingAddress}</div>
                    </Grid>
                </Grid>
            </Grid>
        );
    };
}