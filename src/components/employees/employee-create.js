import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
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




export default class EmployeeCreate extends Component {

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
        "address": "",
        "community":""
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

  submitEmployeeForm = () => {
    let employeeError = this.state.employeeError;
    let employeeData = this.state.employeeData;
    if(this.state.employeeData.first_name === ""){
      employeeError.first_name = null;
      this.setState({employeeError})
    }else{
      employeeError.first_name = "";
      this.setState({employeeError})
    }

    if(this.state.employeeData.last_name === ""){
      employeeError.last_name = null;
      this.setState({employeeError})
    }else{
      employeeError.last_name = "";
      this.setState({employeeError})
    }
    if(this.state.employeeData.phone_mobile === ""){
      employeeError.phone_mobile = null;
      this.setState({employeeError})
    }else{
      employeeError.phone_mobile = "";
      this.setState({employeeError})
    }if(this.state.employeeData.email === ""){
      employeeError.email = null;
      this.setState({employeeError})
    }else{
      employeeError.email = "";
      this.setState({employeeError})
    }
    if(this.state.employeeData.address === ""){
      employeeError.address = null;
      this.setState({employeeError})
    }else{
      employeeError.address = "";
      this.setState({employeeError})
    }
    if(this.state.employeeData.community === ""){
      employeeError.community = null;
      this.setState({employeeError})
    }else{
      employeeError.community = "";
      this.setState({employeeError})
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
                      Add Employee
                    </Typography>
                  </h2>
                </Grid>
            </Grid>
            <Grid container spacing={32}>
              <Grid item xs={12} sm={6} md={6} className="singleFormRight" >
                  <TextField  label="First Name" value={employeeData.first_name}
                  onChange={this.handleFormChange('first_name')}
                  style={{ width: "350px" }} placeholder=" First Name"
                  margin="normal"
                  helperText={(employeeError.first_name !== null) ? "" : "First Name field required."}
                  error={(employeeError.first_name !== null)? false: true} 
                  />   
              </Grid>
              <Grid item xs={12} sm={6} md={6} className="singleFormRight" >
                  <TextField  label="Last Name"
                    value={employeeData.last_name}
                    onChange={this.handleFormChange('last_name')}
                    style={{ width: "350px"}} placeholder=" Last Name"
                    margin="normal"
                    helperText={(employeeError.last_name !== null) ? "" : "Last Name field required."}
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
                  helperText={(employeeError.phone_mobile !== null) ? "" : "Phone field is requied"}
                  error={(employeeError.phone_mobile !== null) ? false : true}/>  
              </Grid>
              <Grid item xs={12} sm={6} md={6} className="singleFormLeft" >
                  <TextField id="email" label="Email"
                    value={employeeData.email}
                    onChange={this.handleFormChange('email')}
                    style={{ width: "350px"}} placeholder="Email"
                    margin="normal"
                    fullWidth
                    helperText={(employeeError.email !== null) ? "" : "Email field is required"}
                    error={(employeeError.email !== null) ? false : true} />  
              </Grid>
              <Grid item xs={12} sm={6} md={6} className="singleFormLeft" >
                  <TextField id="address" label="Address"
                    value={employeeData.Address}
                    onChange={this.handleFormChange('address')}
                    style={{ width: "350px"}} placeholder="Address"
                    margin="normal" 
                    fullWidth
                    helperText={(employeeError.address !== null) ? "" : "Address field is required"}
                    error={(employeeError.address !== null) ? false : true} />  
              </Grid>
              <Grid item xs={12} sm={6} md={6} className="singleFormLeft" >
                <FormControl>
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
                </FormControl>
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