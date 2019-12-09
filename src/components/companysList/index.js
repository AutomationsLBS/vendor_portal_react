import React, {Component, Fragment} from 'react';
import { Redirect,Link } from 'react-router-dom'
import Config from '../../container/config';
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
  
  TableRow,
  TableCell,
  

  
} from '@material-ui/core';
import 'react-credit-cards/lib/styles.scss'
import { toast } from 'react-toastify';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      loader : true,
      companyData:"",
      defaultCompany:"",
    }
  }
  componentWillMount() {

  }
  componentDidMount() {

    
    this.setState({defaultCompany: CommonService.localStore.get("usr_company_id").usr_company_id });

    axios
    .get(axios.vendor_agencies())
    .then((response) => {
        console.log(response,"companys")
        this.setState({companyData: response.agencies, loader: false});
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
    console.log("componentDidMount ", this.props);
  }

  
  

  redirectToTarget = () => {
   //window.location.href = '/employeesCreate'
   console.log(" redirect to Target")
   return(<Redirect to='/employeesCreate' />)
  }
  
  radioButtonCheck = ()=>{
     
    this.setState({
        redirect: true
      })
  }
  
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
   
  radioOnChange  = (e,companyName) => {
    console.log(e,companyName,"kranthi................")
     let status  =   window.confirm("Are you sure, you want to change the company?");
     if (status){
             
        this.setState({
            defaultCompany: e.target.value
          }) 
          // asw
          CommonService.localStore.set("usr_company_id", e.target.value);
          CommonService.localStore.set("usr_company_name",companyName );   
          window.location.reload()
     } 

    
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
                  My Companies
                </Typography>
              </h2>
            </Grid>
            {CommonService.renderLoader(this.state.loader)}
            <Grid item sm={12} align="right">
              <Table className="listTable" style = {{ marginTop :'15px' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Select Company</TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell> Address </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                 {  (this.state.companyData.length > 0) ? 
                      this.state.companyData.map((data)=>{
                            
                        return (


                                <TableRow key={ data.id} >
                                    <TableCell> <input type="radio" value={data.id} name="companyname" checked ={ this.state.defaultCompany == data.id } onClick= {(e) => this.radioOnChange(e,data.name)} /></TableCell>
                                    <TableCell> { data.name }</TableCell>
                                   <TableCell>  {(data.shipping_city)? data.shipping_city+", ": "" }{ (data.shipping_street)? data.shipping_street+", " :"" }{(data.shipping_state_abbr)? data.shipping_state_abbr+", ": ""}{(data.shipping_zip)?data.shipping_zip:""} </TableCell>
                                 
                                </TableRow >

                                      ) 
                       }) 

                  :  
                  <TableRow >
                  <TableCell colSpan={3}> <center>No Records</center> </TableCell>
                  </TableRow> }
              

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

export default Company;