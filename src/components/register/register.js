import React, { Component ,Fragment} from 'react';
import { Grid, Menu, MenuItem, TextField, Button, Typography } from '@material-ui/core';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
//import Dailgo from '../_/sendOtp';
import green from '@material-ui/core/colors/green';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import CommonService from '../../service/commonServices';


import './register.scss';

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

  export default class Register extends Component {
    constructor(props) {
        super(props);
        console.log("Register sssform", props);
               // this.handleChange = this.handleChange.bind(this);
    }
      
     
    
    render() {

        return (

            <Grid container>
            hiiii
                     </Grid> 
            
        );
    }
}