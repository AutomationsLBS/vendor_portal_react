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

export default class Tab4 extends Component {
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
                <Typography className="pageTitle titleSection" variant="title" gutterBottom>
                      Tab4
                      
                      </Typography>
                  
                  <Table className="listTable">
                  <TableHead>
                    <TableRow>
                    <TableCell>row1</TableCell>
                      <TableCell>row2</TableCell>
                      
                      <TableCell>row3</TableCell>
                    
                      <TableCell>row4</TableCell>
                      <TableCell> row5</TableCell>
                      <TableCell> row6 </TableCell>
                      <TableCell> row7 </TableCell>
                      
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
  }
}