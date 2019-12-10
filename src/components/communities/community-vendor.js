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

export default class CommunityVendor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loader : true,
      mycommunitys:"",
      redirectUrl:"",
      requestedData:"",
      open: false,
    }
  }
  componentWillMount() {
   
    
  }
  componentDidMount() {
    var companyId = CommonService.localStore.get("usr_company_id").usr_company_id

    axios
    .get(axios.myCommunitys(),{params:{company_id:companyId}})
    .then((response) => {
        
        console.log(response,"community");
      
        this.setState({mycommunitys:  response, loader: false});
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


  getEmployeeCommunityData = ( data,communityName) =>{
    
    if(data !== undefined && data !== null){
      this.setState({
        doRedirect: true,
         redirectUrl: "/employees/empBasedList/"+data
      });
     console.log(data,communityName,"oop")
      CommonService.localStore.set("CommunityName_c", communityName);
      CommonService.localStore.set("router", window.location.pathname);
    }

  }


  requriedCredetailsData = (data)=>{

 
 
    axios
    .get(axios.community_credentials(),{params:{utype:"agency",community_id:data.id,employee:  CommonService.localStore.get("usr_company_id").usr_company_id }})
    .then((response) => {
        console.log("requested-my_credentials",response);
       // this.setState({requestedCredetials: response, loader: false});
         this.setState({open:!this.state.open,  requestedData :response});
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

  handleClose = (e) => {
    this.setState({open:false}); 
  }

 

  render() {

    if (this.state.redirectUrl) {
      return(<Redirect to={this.state.redirectUrl} />)
    }
    
    return (
      <Fragment>
         <Grid container>
          <Grid item sm={12}>
            <h2>
              <Typography className="pageTitle titleSection" variant="title" gutterBottom>
               My Communities
              </Typography>
              {CommonService.renderLoader(this.state.loader)}
            </h2>
            <Requsetd  
           buttonTitle = {"testignore"}
           open = {this.state.open}
           data  = {this.state.requestedData}
           onClose = { this.handleClose}

          
          />  
            <Table className="listTable">
              <TableHead>
                <TableRow>
                  <TableCell>Community Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone no.</TableCell>
                  <TableCell> Contact Person</TableCell>
                  <TableCell> Contact Phone no. </TableCell>
                  <TableCell> Employees Serving </TableCell>
                  <TableCell> Required Credentials </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {  (this.state.mycommunitys)  ?  (this.state.mycommunitys.communities.length > 0)?
                 
                
                   (this.state.mycommunitys.communities.map((data)=>{
                     
                    return (
                      <TableRow >
                      <TableCell> { data.name} </TableCell>
                      <TableCell> { (data.phone_num)?data.phone_num: "---"} </TableCell>
                      <TableCell> {  (data.last_visit_date)? data.last_visit_date : "---"}</TableCell>
                      <TableCell> </TableCell>
                      <TableCell> </TableCell>
                      <TableCell>  <a href="javascript:void(0);" style={{textDecoration:"none"}} onClick= {(e) =>  this.getEmployeeCommunityData(data["id"],data["name"]) }   > View Employees </a> </TableCell>
                      <TableCell>  <a href="javascript:void(0);" style={{textDecoration:"none",color: "blue"}} onClick= {(e) =>  this.requriedCredetailsData(data) }   >View Credentials </a> </TableCell>
                      </TableRow >
                     )

                     
                }))  :  
                        
                          <TableRow >
                            <TableCell colSpan={7}> <center>No Records</center> </TableCell>
                            </TableRow>
                      
                  : 
                  
                            <TableRow >
                            <TableCell colSpan={7}> <center>No Records</center> </TableCell>
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