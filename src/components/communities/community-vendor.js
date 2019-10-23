import React, {Component, Fragment} from 'react';
import {Redirect ,Link } from 'react-router-dom';
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

export default class CommunityVendor extends Component {
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
               My Community
              </Typography>
            </h2>
            <Table className="listTable">
              <TableHead>
                <TableRow>
                  <TableCell>Community Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone no.</TableCell>
                  <TableCell> Contact Person</TableCell>
                  <TableCell> Contact Phone no. </TableCell>
                  <TableCell> Employess Serving </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow >
                  <TableCell> XYZ Senior Living </TableCell>
                  <TableCell> 100 Powers</TableCell>
                  <TableCell>  1234455678 </TableCell>
                  <TableCell>  ABC </TableCell>
                  <TableCell> 2334566789</TableCell>
                  <Link to="/employees"   className="view" >View Employee</Link>
                </TableRow >
                <TableRow >
                  <TableCell> ABC Senior Living </TableCell>
                  <TableCell> 100 Powers</TableCell>
                  <TableCell>  1223456600 </TableCell>
                  <TableCell>  DAN </TableCell>
                  <TableCell> 2234456788 </TableCell>
                  <Link to="/employees"   className="view" >View Employee</Link>
                </TableRow >
                <TableRow >
                  <TableCell> ACC Senior Living </TableCell>
                  <TableCell> 100 Powers</TableCell>
                  <TableCell>  1234356212 </TableCell>
                  <TableCell>  XYZ </TableCell>
                  <TableCell> 4456786901 </TableCell>
                  <Link to="/employees"   className="view" >View Employee</Link>
                </TableRow >
                <TableRow >
                  <TableCell> IND Senior Living </TableCell>
                  <TableCell> 100 Powers</TableCell>
                  <TableCell>  1234567890 </TableCell>
                  <TableCell>  TIM </TableCell>
                  <TableCell> 334578900 </TableCell>
                  <Link to="/employees"   className="view" >View Employee</Link>
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