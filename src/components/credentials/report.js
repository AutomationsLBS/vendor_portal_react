import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Grid, Menu, MenuItem, Typography} from '@material-ui/core';
import {Scrollbars} from 'react-custom-scrollbars';
import axios from 'axios';
import MainNav from '../_/navigation';
import Config from '../../container/config';
import {toastNotify} from '../../actions';
import store from '../../store';
// import {connect, dispatch  } from 'react-redux';
import {getAllUsers} from '../../actions';
// import BarGraph from './visitGraph';
import CommonService from './../../service/commonServices';
import { ToastContainer, toast } from 'react-toastify';

import {
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableSortLabel,
  Hidden,
  FormControl,
  FormHelperText,
  Select,
  Input,
  InputLabel,
  NativeSelect

  
} from '@material-ui/core';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
    }
  }
  componentWillMount() {
    console.log("Component Will Mount");
    
  }
  componentDidMount() {
    console.log("componentDidMount ", this.props);
  }

 

  render() {
    
    return (
      <Fragment>
         <Grid container>
            <Grid item sm={12}>
              <h2>
                <Typography className="pageTitle titleSection" variant="title" gutterBottom>
                        Reports                       
                </Typography>
              </h2>
            </Grid>
            <Grid item xs={12} sm={6} md={6} className="singleFormLeft" >
                <FormControl  variant="outlined"  >
                  <InputLabel htmlFor="Employee-helper"  style={{marginTop: "15px"}}>Employee Details of </InputLabel>
                  <NativeSelect style={{ width: "350px",marginTop: "30px"}}
                      margin="normal">
                       <option value="" />
                       <option value ="1">Credentials By Employee</option>
                       <option value ="2">Community Served By Employee</option>
                       <option value ="3">Employees Serveing a Community</option>
                       <option value ="4">Employees with Failed Credentials</option>
                  </NativeSelect>
                  
                </FormControl>
              </Grid>
          </Grid>

        
        {/* <ToastContainer autoClose={50000} /> */}
      </Fragment>
    );
  }
}