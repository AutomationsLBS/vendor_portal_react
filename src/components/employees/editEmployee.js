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
      loader: true,
      employee: {},
      communitys: [],
      employeeData: {
       
      
      },
      employeeError: {},
      doRedirect: false,
      redirectUrl: null,
      dataReadyStatus: false,
      
    }
  }
  handleFormChange = name => event => {
    //   debugger;
    let state = this.state;
    state.employeeData[name] = event.target.value;
    state.employeeError[name] = (event.target.value !== null && event.target.value !== '' && event.target.value !== 0) ? '' : null;
    console.log(state.employeeError,"dataoop");
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
   
   return id[3]
  }
 

   componentDidMount(){

   

   }
   componentWillMount(){
   
    this.community_employees(this.getParams());
   }


  
  community_employees = (data)=>{
    
    let serviceLables =  JSON.parse(CommonService.localStore.get("serviceLables").serviceLables);
 
     axios

     .get(axios.employee_details(),{params:{id: data}})
     .then((response) => {

   
       let empDataa  =  {"phone_mobile":response.employee_data.phone_mobile ,
        "first_name": response.employee_data.first_name ,
        "last_name": response.employee_data.last_name ,
        "email": response.employee_data.email ,
      // "service_label":  response.employee_data.service,
      "service_label":  serviceLables[response.employee_data.service] ,
       "employeestatus": response.employee_data.status,
        "id": response.employee_data.id, 
      }
         this.setState({employeeData: empDataa, loader: false,dataReadyStatus:true});
         
        
          // console.log(this.state.employeeData["employees"],"employeedata");
     })
     .catch((error) => {
        
         this.setState({loader: false});
         toast.error((error.message != undefined) ? error.message.toString() : "Failed for some reason", {
             position: toast.POSITION.TOP_CENTER
           });
         
     });
 
   }




  submitEmployeeForm = () => {
    let employeeError = this.state.employeeError;

    let employeeData = this.state.employeeData;
    let  statusFlag  = true;
    if(this.state.employeeData.first_name.trim() === ""){
       employeeError.first_name = null;
      this.setState({employeeError})
      statusFlag  = false;
    }else{
      employeeError.first_name = "";
      this.setState({employeeError})
    }

    if(this.state.employeeData.last_name.trim() === ""){
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

    var caseTest =  this.validateEmail(this.state.employeeData.email)
    if (caseTest){
      employeeError.emailValidate = "";
      this.setState({employeeError})
    }else {
      
      employeeError.emailValidate = null;
      this.setState({employeeError})
      statusFlag  = false;

    }
    console.log(this.state.employeeData.service_label,"dataiss");
  
    if(this.state.employeeData.service_label == ""){
      console.log("i am heere---------")
      employeeError.service_label = null;
      this.setState({employeeError})
      statusFlag  = false;
    }else{
      console.log("i am not---------")
      employeeError.service_label = "";
      this.setState({employeeError})
    }




    if(this.state.employeeData.employeestatus == ""){
      
      employeeError.employeestatus = null;
      this.setState({employeeError})
      statusFlag  = false;
    }else{
      
      employeeError.employeestatus = "";
      this.setState({employeeError})
    }
   
    let companyID = CommonService.localStore.get("usr_company_id").usr_company_id

    employeeData.company_id = companyID
    console.log(employeeError,"employeeErrro");
    console.log(employeeData,"employeeData",this.validateEmail(this.state.employeeData.email));

  
    if (statusFlag){

      this.setState({ loader : true});
      employeeData.status = employeeData.employeestatus
      axios
      .post(axios.update_employee(),employeeData)
      .then((response) => {
          
      let   employeeData  =  {
          "phone_mobile": "",
          "first_name": "",
          "last_name": "",
          "email": "",
          "service_label": "",
        
        } 
        
        this.setState({employeeData, loader: false});
        toast.success(
            (response.message != undefined) 
                ? "Successfully..." 
                : response.message, {
            position: toast.POSITION.TOP_CENTER,
            className: 'rotateY animated'
          });
         this.cancelCreate();
          //window.location.href="/employees"
         // console.log(response,"respose  emp data")
           
      })
      .catch((error) => {
         
          this.setState({loader: false});
          toast.error((error.message != undefined) ? error.response.data.message : "Failed for some reason", {
              position: toast.POSITION.TOP_CENTER
            });
          
      });
      console.log("componentDidMount ", this.props);
    
    }
     
    

  }
 
  render() {
    console.log(Config.employeeStatus,"employeestatus");
    let serviceLables =  JSON.parse(CommonService.localStore.get("serviceLables").serviceLables);
   
    const {loader, employee, employeeData, employeeError,  redirectUrl, doRedirect} = this.state;
    let errorMessage = (this.state.employeeError.service_label !== null)? false: true ;


    if (this.state.redirectUrl) {
      return(<Redirect to={this.state.redirectUrl} />)
    }
   
    if (!this.state.dataReadyStatus) {
      return (<div>
         {CommonService.renderLoader(this.state.loader)}
      </div>)
    } else {


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
                    <TextField  label= "First Name"
                    label=   "First Name"
                    defaultValue = {employeeData.first_name}
                    onChange={this.handleFormChange('first_name')}
                    style={{ width: "350px" }} 
                    margin="normal"
                    helperText={(employeeError.first_name !== null) ? "" : "First Name is required."}
                    error={(employeeError.first_name !== null)? false: true} 
                    />   
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="singleFormRight" >
                    <TextField 
                      label= "Last Name"
                      defaultValue ={employeeData.last_name}
                      onChange={this.handleFormChange('last_name')}
                      style={{ width: "350px"}} placeholder=" Last Name"
                      margin="normal"
                      helperText={(employeeError.last_name !== null) ? "" : "Last Name is required."}
                      error={(employeeError.last_name !== null)
                      ? false
                      : true} />  
                  </Grid>
                <Grid item xs={12} sm={6} md={6} className="singleFormRight" >
                    <TextField  
                    label= "Phone Number"
                     
                    defaultValue = {employeeData.phone_mobile}
                     onChange={this.handleFormChange('phone_mobile')}
                     style={{ width: "350px"}}
                     margin="normal" 
                     onInput = {(e) =>{
                      e.target.value = e.target.value.replace(/[^\d]/g, " ");
                      e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10);
                      e.target.value = (e.target.value == "NaN") ? "" : e.target.value;
                    }}
                    fullWidth
                    disabled
                    helperText={(employeeError.phone_mobile !== null) ? "" : "Phone is requried"     }
                    error={(employeeError.phone_mobile !== null) ? false : true}/>  
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="singleFormLeft" >
                 
                    <TextField id="email"
                     label="Email"
                    
                    defaultValue= {employeeData.email}
                    id="standard-helperText"
                     // value=
                      onChange={this.handleFormChange('email')}
                      style={{ width: "350px"}} placeholder="Email"
                      margin="normal"
                      fullWidth
                    
                      helperText={(employeeError.email !== null) ?  (employeeError.emailValidate !== null) ? "" : "Please enter valid email"  : "Email is required"  }
                      error={(employeeError.email !== null &&  employeeError.emailValidate !== null) ? false : true} />  
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="singleFormLeft" >
                   
  
  
                 <FormControl label="Select" error = {errorMessage}   >
                     
                      <Select  label="Credentialing" id="credentialing" defaultValue ={employeeData.service_label} 
                      onChange={this.handleFormChange('service_label')}
                          style={{ width: "350px",marginTop: "30px"}}
                           MenuProps = {{
            style: {maxHeight:"300px"}
          }}
  
                          margin="normal">
                          { (serviceLables)?
                            
                            serviceLables.map((data,index) => {
  
                              return (
  
                                <MenuItem value={data}>{data}</MenuItem>
                                
                              )
                            })
                          : 
                            null}
                      </Select>
              {(this.state.employeeError.service_label !== null) 
              ? "" :<FormHelperText style={{'color': '#f44336'}}>Service type is required</FormHelperText>
              }
                                                
                </FormControl>    


             { /* 
             
            <TextField
                label="Service Type" 
          id="standard-select-currency"
          defaultValue ={employeeData.service_label} 
          select
          MenuProps = {{
            style: {maxHeight:"300px"}
          }}
          
          onChange={this.handleFormChange('service_label')}
          style={{ width: "352px",marginTop: "30px"}}
                      margin="normal"
                      helperText={(employeeError.service_label !== null) ? "" : "Service type is required."}
                      error={(employeeError.service_label !== null)
                      ? false
                      : true}
        >
           { (serviceLables)?
                            
                            serviceLables.map((data,index) => {
  
                              return (
  
                                <MenuItem value={data}>{data}</MenuItem>
                                
                              )
                            })
                          : 
                            null}

        
        </TextField>
            
            */}   
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="singleFormLeft" >
                  


                <TextField
                label="Employee Status" 
          id="standard-select-currency"
          defaultValue ={employeeData.employeestatus} 
          select
          onChange={this.handleFormChange('employeestatus')}
          style={{ width: "352px",marginTop: "30px"}}
                      margin="normal"
                      helperText={(employeeError.employeestatus !== null) ? "" : "Employee Status is required."}
                      error={(employeeError.employeestatus !== null)
                      ? false
                      : true}
        >
           { (Config.employeeStatus.length > 0 )?
                            
                            Config.employeeStatus.map((data) => {

                             // console.log("employee status ",key,value);
  
                              return (
  
                                <MenuItem value={ data.id}> { data.value } </MenuItem>
                                
                              )
                            })
                          : 
                            null }

        
        </TextField>
                
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
                      style={{margin:"14px"}} >
                          Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            </Fragment>
          
      );


    }

    
  };
}