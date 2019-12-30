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
import commonModal from '../_/commonModal';
import Requsetd from "../_/dataTable";



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
      loader : true,
      mycommunitys:"",
      open: false,
      requestedData: "",
      requestedDataVendor:"",
    }
  }
  componentWillMount() {
  
    
  }
  componentDidMount() {

    axios
    .get(axios.myCommunitys())
    .then((response) => {
        console.log(response,"rta")
        this.setState({mycommunitys: response.communities, loader: false});
        toast.success(
            (response.message != undefined) 
                ? "Successfully..." 
                : response.message, {
            position: toast.POSITION.TOP_CENTER,
            className: 'rotateY animated'
          });
       
    })
    .catch((error) => {
       
        this.setState({loader: false});
        toast.error((error.message != undefined) ? error.toString() : "Failed for some reason", {
            position: toast.POSITION.TOP_CENTER
          });
        
    });
    
  }

  handleClickOpen = (data) => {
    console.log(data,"status__check")
    this.setState({open:!this.state.open, 
      requestedData :data});
     console.log(data,"urlcode")
  }

  handleClose = (e) => {
    this.setState({open:false}); 
  }


requriedCredetailsData = (data)=>{

   
 
  axios
  .get(axios.community_credentials(),{params:{utype:"vendor",community_id:data.community.id }})
  .then((response) => {
      console.log("requested-my_credentials",response);
     // this.setState({requestedCredetials: response, loader: false});
       this.setState({open:!this.state.open,  requestedData :response.credentials});
      //this.setState({showButton : (response.credentials.old_credentials.length > 0)? true : false })
    
     // this.setState({myCredentails: response, loader: false});
      toast.success(
          (response.message != undefined) 
              ? "Successfully..." 
              : response.message, {
          position: toast.POSITION.TOP_CENTER,
          className: 'rotateY animated'
        });
     
  })
  .catch((error) => {
      
    console.log(error,"error12")
      this.setState({loader: false});
      toast.error((error.message != undefined) ?   error.response.data.message : "Failed for some reason", {
          position: toast.POSITION.TOP_CENTER
        });
      
  });

}
  
  render() {
    
    return (
      <Fragment>
         <Grid container>
          <Grid item sm={12}>
            <h2>
              <Typography className="pageTitle titleSection" variant="title" gutterBottom>
              My Communities
              </Typography>
            </h2>

             {CommonService.renderLoader(this.state.loader)}
            <Table className="listTable">
              <TableHead>
                <TableRow>
                  <TableCell>Community Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone no</TableCell>
                  <TableCell> Last Visited </TableCell>
                  <TableCell> Required Credentials </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              <Requsetd  
           buttonTitle = {"testignore"}
           open = {this.state.open}
           data  = {this.state.requestedDataVendor}
           onClose = { this.handleClose}
           dataForVendor = {this.state.requestedData}

          
          />  
               
              {  (this.state.mycommunitys)? 
                  (this.state.mycommunitys.length > 0) ?  
                   (this.state.mycommunitys.map(data =>{
                     return (
                      <TableRow >
                      <TableCell> { data.community.name}</TableCell>
                      <TableCell> { data.community.shipping_city+"," }{ data.community.shipping_street+", " }{data.community.shipping_state_abbr+", "}{data.community.shipping_zip} </TableCell>
                      <TableCell> { data.phone_num} </TableCell>
                      <TableCell> {  data.last_visit_date}</TableCell>
                      <TableCell> <a href="javascript:void(0);"  style={{textDecoration:"none",color: "blue"}} onClick = {(e) =>this.requriedCredetailsData(data) }  > View Credentials </a></TableCell>
                      </TableRow >
                     )

                   }))
                  :  
                  
                  <TableRow >
                  <TableCell colSpan={5}> <center>No Records</center> </TableCell>
                  </TableRow>
                  : 
                  <TableRow >
                  <TableCell colSpan={5}> <center>No Records</center> </TableCell>
                  </TableRow>
                  }

                  
                 
              </TableBody>
             </Table>
          </Grid>
        </Grid>

        {/* <ToastContainer autoClose={50000} /> */}
      </Fragment>
    );
  };
}