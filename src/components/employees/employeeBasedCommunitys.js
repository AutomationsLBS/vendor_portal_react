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
  
     this.community_employees(this.getParams());

   }
  

  getParams =()=> {
       
    let id  = this.props.history.location.pathname.split("/")
    
    console.log(id[3],id," kranthis---89")
   
   return id[3]
  }


  community_employees = (data)=>{
   var  usr_company_id  = CommonService.localStore.get("usr_company_id").usr_company_id


    axios
    .get(axios.community_employees(),{params:{community_id: data ,company_id:usr_company_id}})
    .then((response) => {
       // console.log(response,"respose  emp data")
        this.setState({employeeData: response, loader: false});
       
          console.log(this.state.employeeData["employees"].length,"employeedata");
    })
    .catch((error) => {
       
        this.setState({loader: false});
        toast.error((error.message != undefined) ? error.toString() : "Failed for some reason", {
            position: toast.POSITION.TOP_CENTER
          });
        
    });

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


  backButton =()=>{
    this.setState({
      backButton:true

    })

  }

  render() {
    
      if (this.state.redirectUrl) {
        return(<Redirect to={this.state.redirectUrl} />)
      }
  
      if (this.state.backButton) {
        return(<Redirect to='/communityv' />)
      }


      
    return (
      <Fragment>
       <Grid container >
          <Grid container>
            <Grid item sm={6}>
              <h2>
                <Typography className="pageTitle titleSection" variant="title" gutterBottom>
                Employees served for {   CommonService.localStore.get("CommunityName_c").CommunityName_c}  
                </Typography>
              </h2>

              {CommonService.renderLoader(this.state.loader)}
            </Grid>
            <Grid item xs={6} sm={6} align="right">
              <Button className="btn btn-primary btn-round" id="addCred"
              onClick={this.backButton}>Back</Button>
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
                    <TableCell> Communities Served </TableCell>
                    <TableCell> Edit </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                 {  (this.state.employeeData ) ? 
                 (this.state.employeeData["employees"].length != 0)? 
                     
                                        
                 this.state.employeeData["employees"].map((data)=>{
                   return (


                     <TableRow >
                       <TableCell> { ( data["employee_details"]["first_name"] )?  data["employee_details"]["first_name"]+" "+data["employee_details"]["last_name"] : "--" }</TableCell>
                       <TableCell>  { (data["employee_details"]["phone_mobile"] )?  data["employee_details"]["phone_mobile"] : "--" }</TableCell>
                       <TableCell>  { (data["employee_details"]["email"] )?  data["employee_details"]["email"] : "--" } </TableCell>
                       <TableCell>  { ( data["employee_details"]["primary_address_city"])?  data["employee_details"]["primary_address_city"]+"," :  ""   } 
                       {(data["employee_details"]["primary_address_state"])? data["employee_details"]["primary_address_state"]+"," : ""  }
                       {(data["employee_details"]["primary_address_street"]) ? data["employee_details"]["primary_address_street"]+"," : ""   }
                       {data["employee_details"]["primary_address_zip"]  }
                       </TableCell>
                       <TableCell> 
                         
                         <a href="javascript:void(0);"  onClick= {(e) =>  this.getCredentalData( data["employee_details"]["id"], data["employee_details"]["first_name"]+" "+data["employee_details"]["last_name"] ) }  style={{textDecoration:"none"}} >  View Credentials</a> 
                       </TableCell>
                       <TableCell> 
                         
                         <a href="javascript:void(0);" style={{textDecoration:"none"}} onClick= {(e) =>  this.getCommunityData(data["employee_details"]["id"] , data["employee_details"]["first_name"]+" "+data["employee_details"]["last_name"]  ) }   > View Communities</a> 
                       </TableCell>
                       <TableCell>
                         <Link to="/employeesCreate"   className="edit" >
                             <img src={Config.images + "/fevicon_icon/edit.png" } style = {{ width :'23px',height :'23px' }}/>
                         </Link>
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