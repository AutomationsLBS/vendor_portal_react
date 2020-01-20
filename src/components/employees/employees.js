import React, {Component, Fragment} from 'react';
import { Redirect,Link } from 'react-router-dom'
import EmployeesCreate from './employee-create';
import Config from '../../container/config';
import { ToastContainer, toast } from 'react-toastify';
import CommonService from '../../service/commonServices';
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
      redirect: false,
      loader : true,
      employeeData:"",
      doRedirect:"",
      redirectUrl:"",

    }
  }
  componentWillMount() {
  }
  componentDidMount() {


     // axios.community_employees(),{params:{company_id: CommonService.localStore.get("usr_company_id").usr_company_id  }}
    axios
    .get(axios.employeeDetails(),{params:{company_id: CommonService.localStore.get("usr_company_id").usr_company_id  }})
    .then((response) => {
       // console.log(response,"respose  emp data")
        this.setState({employeeData: response, loader: false});
       
          console.log(this.state.employeeData["employees"].length,"employeedata");
          CommonService.localStore.set("serviceLables", this.state.employeeData["service_labels"]);
          
    })
    .catch((error) => {
       
        this.setState({loader: false});
        toast.error((error.message != undefined) ? error.toString() : "Failed for some reason", {
            position: toast.POSITION.TOP_CENTER
          });
        
    });
    console.log("componentDidMount ", this.props);
  }

  
  getCredentalData = (data,employyeeName) => {
    console.log("dataSet",data);
     
    if(data !== undefined && data !== null){
      this.setState({
        doRedirect: true,
         redirectUrl: "/agCredentials/credentials/"+data
      });
     
      CommonService.localStore.set("employeeName_c", employyeeName);
      console.log(CommonService.localStore.get("employeeName_c"));
    }
    CommonService.localStore.set("routerR","/employees");
    let state = this.state;
    console.log("Editing Row At Employees", state);
  }
  

  
  getCommunityData = (data,employyeeName) => {
    console.log("dataSet",data);
    
    if(data !== undefined && data !== null){
      this.setState({
        doRedirect: true,
         redirectUrl: "/communityv/communityvlist/"+data
      });

      CommonService.localStore.set("employeeName_co",employyeeName);
    }
    let state = this.state;
    console.log("Editing Row At Employees", state);
  }

  getEmployeeData = (data) => {
    console.log("dataSet",data);
    
    if(data !== undefined && data !== null){
      this.setState({
        doRedirect: true,
         redirectUrl: "/employees/editEmployee/"+data
      });

   
    }
    let state = this.state;
    console.log("Editing Row At Employees", state);
  }


  redirectToTarget = () => {
   //window.location.href = '/employeesCreate'
   console.log(" redirect to Target")
   return(<Redirect to='/employeesCreate' />)
  }

  
  setRedirect = () => {
    // this.setState({
    //   redirect: true
    // })\
    window.location.href = "/employeesCreate"
    //return(<Redirect to='/employeesCreate' />)
  }

  render() {
    
      if (this.state.redirectUrl) {
        return(<Redirect to={this.state.redirectUrl} />)
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

              {CommonService.renderLoader(this.state.loader)}
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
                    <TableCell>Credential Status</TableCell> 
                    <TableCell>Credentials</TableCell>
                    <TableCell>Communities Served</TableCell>
                    <TableCell>Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                 {  (this.state.employeeData ) ? (this.state.employeeData["employees"].length != 0)? 
                     
                                        
                        this.state.employeeData["employees"].map((data)=>{
                          return (


                            <TableRow >
                              <TableCell> { ( data["employee_details"]["first_name"] )?  data["employee_details"]["first_name"]+" "+data["employee_details"]["last_name"] : "--" }</TableCell>
                              <TableCell>  { (data["employee_details"]["phone_mobile"] )?  data["employee_details"]["phone_mobile"] : "--" }</TableCell>
                              <TableCell>  { (data["employee_details"]["email"] )?  data["employee_details"]["email"] : "--" } </TableCell>
                              <TableCell>  { (data["employee_credential_status"] )? <Button style={{ "background": data["employee_credential_status"] ,color:"white" }} > { Config.EmployeeStatusColors[data["employee_credential_status"]] }</Button>  : "--" } </TableCell>
                              
                             {/*
                            
                             <TableCell>  { ( data["employee_details"]["primary_address_city"])?  data["employee_details"]["primary_address_city"]+"," :  ""   } 
                              {(data["employee_details"]["primary_address_state"])? data["employee_details"]["primary_address_state"]+"," : ""  }
                              {(data["employee_details"]["primary_address_street"]) ? data["employee_details"]["primary_address_street"]+"," : ""   }
                              {data["employee_details"]["primary_address_zip"]  }
                              </TableCell>
                            */} 

                              <TableCell> 
                                
                                <a href="javascript:void(0);"  onClick= {(e) =>  this.getCredentalData( data["employee_details"]["id"], data["employee_details"]["first_name"]+" "+data["employee_details"]["last_name"] ) }  style={{textDecoration:"none"}} >  View Credentials</a> 
                              </TableCell>
                              <TableCell> 
                                
                                <a href="javascript:void(0);" style={{textDecoration:"none"}} onClick= {(e) =>  this.getCommunityData(data["employee_details"]["id"] , data["employee_details"]["first_name"]+" "+data["employee_details"]["last_name"]  ) }   > View Communities</a> 
                              </TableCell>
                              <TableCell>
                              
                                <a href="javascript:void(0);" style={{textDecoration:"none"}} onClick= {(e) =>  this.getEmployeeData(data["employee_details"]["id"]  ) }   >  <img src={Config.images + "/fevicon_icon/edit.png" } style = {{ width :'23px',height :'23px' }}/></a> 
                              </TableCell>
                            </TableRow >

                                  ) 

                          
                        }) : 

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
        </Grid>
     {/* <ToastContainer autoClose={50000} /> */}
   </Fragment>

      
    );
  };
}

export default Employees;