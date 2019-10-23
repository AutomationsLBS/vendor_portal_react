import React, { Component } from 'react';
import { Grid, Menu, MenuItem, TextField, Button, Typography } from '@material-ui/core';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import green from '@material-ui/core/colors/green';


import './forgotpassword.scss';
const styles = theme => ({
    button: {
        color: "#ffffff"   
    },
    input: {
      display: 'none',
    },
  });
const theme = createMuiTheme({
    palette: {
      primary: green,
      secondary: {
        main: '#673ab7',
      },
    },
  });
export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        console.log("Register form", props);
        this.state = {
            newpassword: "",
            newpassword_error: false,
            confirmpassword: '',
            confirmpassword_error: false,
        }
        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange = name => event => {
        console.log(name, 
            ">>>>", this.state.newpassword, this.state.confirmpassword);

        this.setState({
            [name]: event.target.value,
        });
        if (name != '') {
            let errName = name + '_error'
            console.log("Handle change", event, name, errName);
            this.setState({
                [errName]: false,
            });
        }
    };

    resetPwd = (event) => {
        event.preventDefault();
        console.log(">>>>", this.state.newpassword, this.state.confirmpassword );
        let formValid = true;
        if (!this.state.newpassword) {
            this.setState({ newpassword_error: true });
            formValid = false;
        }
        if (!this.state.confirmpassword) {
            this.setState({ confirmpassword_error: true });
            formValid = false;
        }
        if (formValid) {
            console.log('resetPwd');
            window.location.pathname = "/login";
        }

    }

    render() {
        return (
            <Grid container className="forgotPwdBlock1" >
                <Grid container justify="center">
                    <Typography className="preLoginHeading" variant="title" gutterBottom align="center">
                        Reset Password
                    </Typography>
                </Grid>
                <Grid className="section" 
                        item>
                    <TextField
                        id="newpassword"
                        label="New Password"
                        className="newpassword"
                        value={this.state.newpassword}
                        onChange={this.handleChange('newpassword')}
                        margin="normal"
                        type="password"
                        helperText={this.state.newpassword_error}
                        error={(this.state.newpassword_error == "") ? false : true}
                        fullWidth
                        />

                    <TextField
                        id="confirmpassword"
                        label="Confirm Password"
                        value={this.state.confirmpassword}
                        onChange={this.handleChange('confirmpassword')}
                        placeholder="confirm password"
                        type="confirmpassword"
                        type="password"
                        fullWidth
                        margin="normal"
                        helperText={this.state.confirmpassword_error}
                        error={(this.state.confirmpassword_error == "") ? false : true}
                        />
                    <MuiThemeProvider theme={theme}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            className="btn btn-primary loginButton"
                            onClick={this.resetPwd} >
                            Submit
                        </Button>
                    </MuiThemeProvider>
                </Grid>
            </Grid>
        );
    };
}