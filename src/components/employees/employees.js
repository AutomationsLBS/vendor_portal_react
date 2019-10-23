import React, {Component, Fragment} from 'react';
import { Redirect,Link } from 'react-router-dom'
import EmployeesCreate from './employee-create';
import Config from '../../container/config';
import {
  Grid,
  
  Typography,
} from '@material-ui/core';
import axios from 'axios';

import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableSortLabel,
  Hidden,

  
} from '@material-ui/core';
import 'react-credit-cards/lib/styles.scss'

class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }
  componentWillMount() {
  }
  componentDidMount() {
  
  }

  redirectToTarget = () => {
   //window.location.href = '/employeesCreate'
   console.log(" redirect to Target")
   return(<Redirect to='/employeesCreate' />)
  }

  
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  render() {
    
      if (this.state.redirect) {
        return(<Redirect to='/employeesCreate' />)
      }
      
    return (
      <Fragment>
       <Grid container >
          <Grid container>
            <Grid item sm={6}>
              <h2>
                <Typography className="pageTitle titleSection" variant="title" gutterBottom>
                  My Employees
                </Typography>
              </h2>
            </Grid>
            <Grid item xs={8} sm={6} align="right">
              <Button className="btn btn-primary btn-round"
                onClick={this.setRedirect}>Add Employee</Button>
            </Grid>
            <Grid item sm={12} align="right">
              <Table className="listTable" style = {{ marginTop :'15px' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee Name</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell> Email</TableCell>
                    <TableCell> Address </TableCell>
                    <TableCell> Credentials </TableCell>
                    <TableCell> Communties Served </TableCell>
                    <TableCell> Edit </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow >
                    <TableCell> Emp XYX </TableCell>
                    <TableCell> 1234567890</TableCell>
                    <TableCell> xxx@gmail.com </TableCell>
                    <TableCell>  200 Powers </TableCell>
                    <TableCell> 
                      <Link to="/credentials"   className="view" >View Credentials</Link>
                    </TableCell>
                    <TableCell> 
                      <Link to="/communityv"   className="edit" > View Communties </Link> 
                    </TableCell>
                    <TableCell>
                      <Link to="/employeesCreate"   className="edit" >
                          <img src={Config.images + "/fevicon_icon/edit.png" } style = {{ width :'23px',height :'23px' }}/>
                      </Link>
                    </TableCell>
                  </TableRow > 
                  <TableRow >
                    <TableCell> Emp ABC </TableCell>
                    <TableCell> 1234456780</TableCell>
                    <TableCell> yyy@gmail.com </TableCell>
                    <TableCell>  200 Powers </TableCell>
                    <TableCell> 
                      <Link to="/credentials"   className="view" >View Credentials</Link>
                    </TableCell>
                    <TableCell> 
                      <Link to="/communityv"   className="edit" > View Communties </Link> 
                    </TableCell>
                    <TableCell>
                      <Link to="/employeesCreate"   className="edit" >
                          <img src={Config.images + "/fevicon_icon/edit.png" } style = {{ width :'23px',height :'23px' }}/>
                      </Link>
                    </TableCell>
                  </TableRow > 
                  <TableRow >
                    <TableCell> Emp 123 </TableCell>
                    <TableCell> 1223456789</TableCell>
                    <TableCell> abc@gmail.com </TableCell>
                    <TableCell>  200 Powers </TableCell>
                    <TableCell> 
                      <Link to="/credentials"   className="view" >View Credentials</Link>
                    </TableCell>
                    <TableCell> 
                      <Link to="/communityv"   className="edit" > View Communties </Link> 
                    </TableCell>
                    <TableCell>
                      <Link to="/employeesCreate"   className="edit" >
                          <img src={Config.images + "/fevicon_icon/edit.png" } style = {{ width :'23px',height :'23px' }}/>
                      </Link>
                    </TableCell>
                  </TableRow > 
                  <TableRow >
                    <TableCell> Emp abc</TableCell>
                    <TableCell> 1233456734</TableCell>
                    <TableCell> abc1@gmail.com </TableCell>
                    <TableCell>  200 Powers </TableCell>
                    <TableCell> 
                      <Link to="/credentials"   className="view" >View Credentials</Link>
                    </TableCell>
                    <TableCell> 
                      <Link to="/communityv"   className="edit" > View Communties </Link> 
                    </TableCell>
                    <TableCell>
                      <Link to="/employeesCreate"   className="edit" >
                          <img src={Config.images + "/fevicon_icon/edit.png" } style = {{ width :'23px',height :'23px' }}/>
                      </Link>
                    </TableCell>
                  </TableRow >
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid>
     {/* <ToastContainer autoClose={50000} /> */}
   </Fragment>

      
    );
  };
}

export default Employees;