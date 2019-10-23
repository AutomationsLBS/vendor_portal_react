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
import DonutChart from './doNutChart';
// import BarGraph from './visitGraph';
import BarGraph from './barGraph';
import barGraphData from './data';
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

export default class Dashboard extends Component {
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
                    <TableCell>Community Id</TableCell>
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
                          
                          <TableCell> data1</TableCell>
                            <TableCell> data2 </TableCell>
                          
                            <TableCell> data3</TableCell>
                          
                            <TableCell> 
                            data4
                            </TableCell>
                            
                            <TableCell> 
                              data 5
                            </TableCell>
                            <TableCell> 
                              data 6
                            </TableCell>
                            <TableCell> 
                              data 7
                            </TableCell>
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