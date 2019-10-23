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

  
} from '@material-ui/core';

export default class PaymentHistory extends Component {
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
               Our Community
              </Typography>
            </h2>
            <Table className="listTable">
              <TableHead>
                <TableRow>
                  <TableCell>Payment Id</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Community Name</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Amount Paid</TableCell>
                  <TableCell>Status</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow >
                  <TableCell> 100</TableCell>
                  <TableCell> 06/19/19 </TableCell>
                  <TableCell> XYZ Senior Living </TableCell>
                  <TableCell>  234 </TableCell>
                  <TableCell> 234 </TableCell>
                  <TableCell> -- </TableCell>
                </TableRow > 
              </TableBody>
            </Table>
       </Grid>
      </Grid>
        {/* <ToastContainer autoClose={50000} /> */}
      </Fragment>
    );
  };
}