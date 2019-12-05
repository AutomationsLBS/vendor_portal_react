import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import axios  from "axios";
import CommonService from '../../service/commonServices';
import Config from '../../container/config';
import { ToastContainer, toast } from 'react-toastify';
import {
  Button,
  Grid,
  Menu,
  MenuList,
  MenuItem,
  FormControl, 
  FormHelperText,
  Select,
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  TableSortLabel,
  Typography,
  IconButton,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  Radio,
  RadioGroup,
  TextField,
  Input,
  InputLabel
} from '@material-ui/core';

import FormControlLabel from '@material-ui/core/FormControlLabel';




export default class EmployeeEdit extends Component {

  constructor(props){
    super(props)
    this.state = {
      loader: false,
      employee: {},
      communitys: [],
      employeeData: {
        "phone_mobile": "",
        "first_name": "",
        "last_name": "",
        "email": "",
        "service_label": "",
      
      },
      employeeError: {},
      doRedirect: false,
      redirectUrl: null
    }
  }
  handleFormChange = name => event => {
    //   debugger;
    let state = this.state;
    state.employeeData[name] = event.target.value;
    state.employeeError[name] = (event.target.value !== null && event.target.value !== '') ? '' : null;
    this.setState(state);
  }

  cancelCreate = event => {
    this.setState({
      doRedirect: true,
      redirectUrl: "/employees"
    })
  }
  
   validateEmail = (elementValue) => {      
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue); 
  }



  getParams =()=> {
       
    let id  = this.props.history.location.pathname.split("/")
    console.log(id[3]," kranthis----")
   
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


  submitEmployeeForm = () => {
    let employeeError = this.state.employeeError;
    let employeeData = this.state.employeeData;
    let  statusFlag  = true;
    if(this.state.employeeData.first_name === ""){
       employeeError.first_name = null;
      this.setState({employeeError})
      statusFlag  = false;
    }else{
      employeeError.first_name = "";
      this.setState({employeeError})
    }

    if(this.state.employeeData.last_name === ""){
      employeeError.last_name = null;
      this.setState({employeeError})
      statusFlag  = false;
    }else{
      employeeError.last_name = "";
      this.setState({employeeError})
    }
    if(this.state.employeeData.phone_mobile === ""){

      employeeError.phone_mobile = null;
      this.setState({employeeError})
      statusFlag  = false;
    }else{
      employeeError.phone_mobile = "";
      this.setState({employeeError})
    }
    if(this.state.employeeData.email === ""){
      employeeError.email = null;
      this.setState({employeeError})
      statusFlag  = false;
    }else{
      employeeError.email = "";
      this.setState({employeeError})
    }

    if (!this.validateEmail(this.state.employeeData.email)){
      employeeError.emailValidate = null;
      this.setState({employeeError})
      statusFlag  = false;
    }else {
      employeeError.emailValidate = "";
      this.setState({employeeError})

    }
    if(this.state.employeeData.service_label === ""){
      employeeError.service_label = null;
      this.setState({employeeError})
      statusFlag  = false;
    }else{
      employeeError.service_label = "";
      this.setState({employeeError})
    }

    let companyID = CommonService.localStore.get("usr_company_id").usr_company_id

    employeeData.company_id = companyID
    console.log(employeeError,"employeeErrro");
    console.log(employeeData,"employeeData",this.validateEmail(this.state.employeeData.email));

  
    if (statusFlag){

      this.setState({ loader : true});

      axios
      .post(axios.create_employee(),employeeData)
      .then((response) => {
          
        employeeData  =  {
          "phone_mobile": "",
          "first_name": "",
          "last_name": "",
          "email": "",
          "service_label": "",
        
        },
        
        this.setState({employeeData, loader: false});
        toast.success(
            (response.message != undefined) 
                ? "Successfully..." 
                : response.message, {
            position: toast.POSITION.TOP_CENTER,
            className: 'rotateY animated'
          });
         // console.log(response,"respose  emp data")
           
      })
      .catch((error) => {
         
          this.setState({loader: false});
          toast.error((error.message != undefined) ? "Vendor already exists with same phone number" : "Failed for some reason", {
              position: toast.POSITION.TOP_CENTER
            });
          
      });
      console.log("componentDidMount ", this.props);
    
    }
     
    

  }
 
  render() {
    const {loader, employee, employeeData, employeeError,  redirectUrl, doRedirect} = this.state;
    if (doRedirect) {
      return <Redirect to={redirectUrl}/>;
    }
    return (
      <Fragment>
         <Grid container>
            <Grid container className="header" justify="flex-start" >
               <Grid item>
                   <h2>
                   <Typography className="pageTitle titleSection" variant="title" gutterBottom>
                      Edit Employee Details
                    </Typography>
                  
                   </h2>
                    
                </Grid>
                {CommonService.renderLoader(this.state.loader)}
            </Grid>
            <Grid container spacing={32}>
              <Grid item xs={12} sm={6} md={6} className="singleFormRight" >
                  <TextField  label="First Name" value={employeeData.first_name}
                  onChange={this.handleFormChange('first_name')}
                  style={{ width: "350px" }} placeholder=" First Name"
                  margin="normal"
                  helperText={(employeeError.first_name !== null) ? "" : "First Name is required."}
                  error={(employeeError.first_name !== null)? false: true} 
                  />   
              </Grid>
              <Grid item xs={12} sm={6} md={6} className="singleFormRight" >
                  <TextField  label="Last Name"
                    value={employeeData.last_name}
                    onChange={this.handleFormChange('last_name')}
                    style={{ width: "350px"}} placeholder=" Last Name"
                    margin="normal"
                    helperText={(employeeError.last_name !== null) ? "" : "Last Name is required."}
                    error={(employeeError.last_name !== null)
                    ? false
                    : true} />  
                </Grid>
              <Grid item xs={12} sm={6} md={6} className="singleFormRight" >
                  <TextField  label="Phone Number"
                   defaultValue = {undefined}
                   value={employeeData.phone_mobile}
                   onChange={this.handleFormChange('phone_mobile')}
                   style={{ width: "350px"}} placeholder="Phone Number"
                   margin="normal" 
                   onInput = {(e) =>{
                    e.target.value = e.target.value.replace(/[^\d]/g, " ");
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10);
                    e.target.value = (e.target.value == "NaN") ? "" : e.target.value;
                  }}
                  fullWidth
                  helperText={(employeeError.phone_mobile !== null) ? "" : "Phone is requied"     }
                  error={(employeeError.phone_mobile !== null) ? false : true}/>  
              </Grid>
              <Grid item xs={12} sm={6} md={6} className="singleFormLeft" >
                  <TextField id="email" label="Email"
                    value={employeeData.email}
                    onChange={this.handleFormChange('email')}
                    style={{ width: "350px"}} placeholder="Email"
                    margin="normal"
                    fullWidth
                    helperText={(employeeError.email !== null) ?  (employeeError.emailValidate !== null) ? "" : "Please enter valid email"  : "Email is required"  }
                    error={(employeeError.email !== null) ? false : true} />  
              </Grid>
              <Grid item xs={12} sm={6} md={6} className="singleFormLeft" >
                  <TextField id="service_label" label="Service label"
                    value={employeeData.service_label}
                    onChange={this.handleFormChange('service_label')}
                    style={{ width: "350px"}} placeholder="Service label"
                    margin="normal" 
                    fullWidth
                    helperText={(employeeError.service_label !== null) ? "" : "service label is required"}
                    error={(employeeError.service_label !== null) ? false : true} />  
              </Grid>
              <Grid item xs={12} sm={6} md={6} className="singleFormLeft" >
               { /*  <FormControl>
                  <InputLabel htmlFor="community-helper"  style={{marginTop: "15px"}}>Community</InputLabel>
                  <Select  label="Community" id="community"
                      value={employeeData.community}
                      onChange={this.handleFormChange('community')}
                      style={{ width: "350px",marginTop: "30px"}}
                      margin="normal">
                       
                  </Select>
                  {(employeeError.community === null) 
                    ? <FormHelperText style={{'color': '#f44336'}}>Community is required!</FormHelperText>
                    : ""}
                  </FormControl> */}
              
              </Grid>
              <Grid item xs={12} sm={6} md={6} justify="center" style={{marginTop: "15px"}}  >
                <Button variant="contained" color="primary" 
                    onClick={this.submitEmployeeForm}
                    style={{backgroundColor:"#47b16f"}} 
                    className="greenBtn">
                       Submit
                </Button>
                <Button variant="outlined" className="outlinedBtn" 
                  onClick={this.cancelCreate}
                  href="/employees"  style={{margin:"14px"}} >
                        Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
          </Fragment>
        
    );
  };
}