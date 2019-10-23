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
import {Link } from 'react-router-dom'
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

export default class Credentails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      prevPath: ''
    }
  }
  componentWillMount() {
    console.log("Component Will Mount");
    
  }
  componentDidMount() {
    console.log("componentDidMount ", this.props);
    if(window.location.pathname =="\credentials" && this.state.prevPath == "\employee"){
      document.getElementById("addCred").style.display = "none"
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ prevPath: this.props.location })
    }
    console.log("Component will Receive Props",this.state.prevPath)

  }

 setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  render() {
    
      if (this.state.redirect) {
        return(<Redirect to='/credentialsCreate' />)
      }
    
    return (
      <Fragment>
        <Grid container>
          <Grid container>
            <Grid item sm={6}>
              <h2>
                <Typography className="pageTitle titleSection" variant="title" gutterBottom>
                  My Credentails
                </Typography>
              </h2>
            </Grid>
            <Grid item xs={6} sm={6} align="right">
              <Button className="btn btn-primary btn-round" id="addCred"
              onClick={this.setRedirect}>Add Credentail</Button>
            </Grid>
            <Grid item sm={12} align="right"> 
              <Table className="listTable" >
                <TableHead>
                  <TableRow>
                    
                    <TableCell>Credentail Name</TableCell>
                    <TableCell>Doc/Text</TableCell>
                    <TableCell> Effective Date</TableCell>
                    <TableCell> Effective End Date </TableCell>
                    <TableCell> Status </TableCell>
                    <TableCell> Reason </TableCell>  
                    <TableCell> Edit </TableCell>  
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow >
                    <TableCell> Vendor Terms & Conditions </TableCell>
                    <TableCell> DOC </TableCell>
                    <TableCell> 06/19/19 </TableCell>
                    <TableCell> 06/18/19</TableCell>
                    <TableCell>  --- </TableCell>
                    <TableCell> -- </TableCell>
                    <TableCell>
                      <Link to="/credentialsEdit"   className="edit" >
                          <img src={Config.images + "/fevicon_icon/edit.png" } style = {{ width :'23px',height :'23px' }}/>
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell> T.B Test </TableCell>
                    <TableCell> --- </TableCell>
                    <TableCell> 06/24/19 </TableCell>
                    <TableCell> 06/25/19</TableCell>
                    <TableCell>  --- </TableCell>
                    <TableCell> -- </TableCell>
                    <TableCell>
                      <Link to="/credentialsEdit"   className="edit" >
                          <img src={Config.images + "/fevicon_icon/edit.png" } style = {{ width :'23px',height :'23px' }}/>
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell> Legal Terms & Conditions</TableCell>
                    <TableCell> DOC</TableCell>
                    <TableCell> 07/19/19 </TableCell>
                    <TableCell> 07/27/19</TableCell>
                    <TableCell>  --- </TableCell>
                    <TableCell> -- </TableCell>
                    <TableCell>
                      <Link to="/credentialsEdit"   className="edit" >
                          <img src={Config.images + "/fevicon_icon/edit.png" } style = {{ width :'23px',height :'23px' }}/>
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell>XYZ Test Conditions </TableCell>
                     <TableCell> --- </TableCell>
                    <TableCell> 07/24/19 </TableCell>
                    <TableCell> 07/25/19</TableCell>
                    <TableCell>  --- </TableCell>
                    <TableCell> -- </TableCell>
                    <TableCell>
                      <Link to="/credentialsEdit"   className="edit" >
                          <img src={Config.images + "/fevicon_icon/edit.png" } style = {{ width :'23px',height :'23px' }}/>
                      </Link>
                    </TableCell>
                  </TableRow>
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