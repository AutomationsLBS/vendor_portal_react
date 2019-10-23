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

export default class CommunityContractor extends Component {
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
                  <TableCell> Last Visited </TableCell>
                      
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow >
                  <TableCell> XYZ Senior Living </TableCell>
                  <TableCell> 200 Powers </TableCell>
                  <TableCell> 434567894 </TableCell>
                  <TableCell> 06/12/19 13:09:57</TableCell>
                </TableRow > 
                <TableRow >
                  <TableCell> ABC Senior Living </TableCell>
                  <TableCell> 200 Powers </TableCell>
                  <TableCell> 6234567755 </TableCell>
                  <TableCell> 06/12/19 13:09:57</TableCell>
                </TableRow >
                <TableRow >
                  <TableCell> ACC Senior Living </TableCell>
                  <TableCell> 200 Powers </TableCell>
                  <TableCell> 7234567666 </TableCell>
                  <TableCell> 06/12/19 13:09:57</TableCell>
                </TableRow >
                <TableRow >
                  <TableCell> IND Senior Living </TableCell>
                  <TableCell> 200 Powers </TableCell>
                  <TableCell> 1234567890 </TableCell>
                  <TableCell> 06/12/19 13:09:57</TableCell>
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