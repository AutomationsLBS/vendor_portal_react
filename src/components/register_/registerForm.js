import React, { Component } from 'react';
//import axios from 'axios';
import {withStyles, MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
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
//import Config from '../../container/config';
import { Scrollbars } from 'react-custom-scrollbars';
//import green from '@material-ui/core/colors/green';
import './register.scss';



const styles = theme => ({
    button: {
        color: "#ffffff"
    },
    input: {
        display: 'none',
    },
    fullWidth: {
        width: '100%',
    },
    loginButton: {
        paddingTop: "8px",
        paddingBottom: "8px",
        paddingLeft: "15px",
        paddingRight: "15px",
        fontFamily: "Segoeui-regular",
        textTransform: "uppercase",
        letterSpacing: "4px",
        fontSize: "16px",
        borderRadius: "0px",
        marginTop: "35px",
        fontWeight: "bold",
    },
    errorText: {
        fontSize: '10px',
        color: 'red',
    }
});
const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#673ab7',
      },
    },
  });


export default class RegisterForm extends Component {

    constructor(props) {
        super(props);
        console.log("Register form", typeof this.props.disabled);
        this.state = {
            doRedirect: false,
            redirectUrl: null,
            formData : {
                firstname: "",
                lastname: '',
                phone:'',
                email: '',
                street: '',
                city: '', 
                state: '', 
                country: '', 
                pin: '',
                confirmPin : ''
            },

            regisError: {}
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange = name => event => {
        //   debugger;
        let state = this.state;
        state.formData[name] = event.target.value;
        state.regisError[name] = (event.target.value !== null && event.target.value !== '') ? '' : null;
        this.setState(state);
    }

    updateDetails = () => {
       // event.preventDefault();
        let regisError = this.state.regisError
        let formData = this.state.formData;
        let formValid = true;
        if(this.state.formData.firstname === ""){
          regisError.firstname = null;
          this.setState({regisError})
        }else{
          regisError.firstname = "";
          this.setState({regisError})
        }

        if(this.state.formData.lastname === ""){
          regisError.lastname = null;
          this.setState({regisError})
        }else{
          regisError.lastname = "";
          this.setState({regisError})
        }
        if(this.state.formData.phone === ""){
          regisError.phon = null;
          this.setState({regisError})
        }else{
          regisError.phone = "";
          this.setState({regisError})
        }
        if(this.state.formData.street === ""){
          regisError.street = null;
          this.setState({regisError})
        }else{
          regisError.street = "";
          this.setState({regisError})
        }
        if(this.state.formData.city === ""){
          regisError.city = null;
          this.setState({regisError})
        }else{
          regisError.city = "";
          this.setState({regisError})
        }
        if(this.state.formData.state === ""){
          regisError.state = null;
          this.setState({regisError})
        }else{
          regisError.state = "";
          this.setState({regisError})
        }
        if(this.state.formData.pin === ""){
          regisError.pin = null;
          this.setState({regisError})
        }else{
          regisError.pin = "";
          this.setState({regisError})
        }
        if(this.state.formData.confirmPin === ""){
          regisError.confirmPin = null;
          this.setState({regisError})
        }else{
          regisError.confirmPin = "";
          this.setState({regisError})
        }
        if(this.state.formData.country === ""){
          regisError.country = null;
          this.setState({regisError})
        }else{
          regisError.country = "";
          this.setState({regisError})
        }
    }
    saveForm = (event) => {
        console.log('Save form')
    }


    render() {
        const { classes } = this.props;
        const disable = this.props.disabled;
        const {regisError,formData,  redirectUrl, doRedirect} = this.state;
        if (doRedirect) {
            return <Redirect to={redirectUrl}/>;
        }
        return (
            <MuiThemeProvider theme={theme}>
                <Grid container spacing={32}>
                    <Grid item xs={12} sm={6} md={6} className="singleFormRight" >
                      <TextField  label="First Name" value={formData.firstname}
                      onChange={this.handleChange('firstname')}
                      style={{ width: "350px" }} placeholder=" First Name"
                      margin="normal"
                      helperText={(regisError.firstname !== null) ? "" : "First Name field required."}
                      error={(regisError.firstname !== null)? false: true} 
                      />   
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} className="singleFormRight" >
                      <TextField  label="Last Name"
                        value={formData.lastname}
                        onChange={this.handleChange('lastname')}
                        style={{ width: "350px"}} placeholder=" Last Name"
                        margin="normal"
                        helperText={(regisError.lastname !== null) ? "" : "Last Name field required."}
                        error={(regisError.lastname !== null)
                        ? false
                        : true} />  
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} className="singleFormLeft" >
                      <TextField disabled={disable} id="email" label="Email"
                        value={formData.email}
                        style={{ width: "350px"}} placeholder="Email"
                        margin="normal"
                        fullWidth
                        helperText={(regisError.email !== null) ? "" : "Email field is required"}
                        error={(regisError.email !== null) ? false : true} />  
                   </Grid>
                    <Grid item xs={12} sm={6} md={6} className="singleFormRight" >
                      <TextField  label="Phone Number"
                       defaultValue = {undefined}
                       value={formData.phone}
                       onChange={this.handleChange('phone')}
                       style={{ width: "350px"}} placeholder="Phone Number"
                       margin="normal" 
                       onInput = {(e) =>{
                        e.target.value = e.target.value.replace(/[^\d]/g, " ");
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10);
                        e.target.value = (e.target.value == "NaN") ? "" : e.target.value;
                      }}
                      fullWidth
                      helperText={(regisError.phone !== null) ? "" : "Phone field is requied"}
                      error={(regisError.phone !== null) ? false : true}/>  
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} className="singleFormLeft" >
                      <TextField id="street" label="Street"
                        value={formData.street}
                        onChange={this.handleChange('city')}
                        style={{ width: "350px"}} placeholder="Address"
                        margin="normal" 
                        fullWidth
                        helperText={(regisError.street !== null) ? "" : "Street field is required"}
                        error={(regisError.street !== null) ? false : true} />  
                    </Grid>
                     <Grid item xs={12} sm={6} md={6} className="singleFormLeft" >
                      <TextField id="city" label="City"
                        value={formData.city}
                        onChange={this.handleChange('city')}
                        style={{ width: "350px"}} placeholder="Address"
                        margin="normal" 
                        fullWidth
                        helperText={(regisError.city !== null) ? "" : "City field is required"}
                        error={(regisError.city !== null) ? false : true} />  
                    </Grid>
                     <Grid item xs={12} sm={6} md={6} className="singleFormLeft" >
                         <FormControl>
                            <InputLabel htmlFor="state-helper"  style={{marginTop: "15px"}}>State</InputLabel>
                              <Select  label="State" id="state"
                                  value={formData.state}
                                  onChange={this.handleChange('state')}
                                  style={{ width: "350px",marginTop: "30px"}}
                                  margin="normal">
                                   
                              </Select>
                          {(regisError.state === null) 
                            ? <FormHelperText style={{'color': '#f44336'}}>State is required!</FormHelperText>
                            : ""}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} className="singleFormLeft" >
                      <TextField id="country" label="Country"
                        value={formData.country}
                        onChange={this.handleChange('country')}
                        style={{ width: "350px"}} placeholder="Country"
                        margin="normal" 
                        fullWidth
                        helperText={(regisError.country !== null) ? "" : "Country field is required"}
                        error={(regisError.country !== null) ? false : true} />  
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} className="singleFormLeft" >
                      <TextField id="pin" label="Pin"
                        value={formData.pin}
                        onChange={this.handleChange('pin')}
                        style={{ width: "350px"}} placeholder="Pin"
                        margin="normal" 
                        fullWidth
                        helperText={(regisError.pin !== null) ? "" : "Pin field is required"}
                        error={(regisError.pin !== null) ? false : true} />  
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} className="singleFormLeft" >
                      <TextField id="city" label="Confirm Pin"
                        value={formData.confirmPin}
                        onChange={this.handleChange('confirmPin')}
                        style={{ width: "350px"}} placeholder="Confirm Pin"
                        margin="normal" 
                        fullWidth
                        helperText={(regisError.confirmPin !== null) ? "" : "Confirm Pin field is required"}
                        error={(regisError.confirmPin !== null) ? false : true} />  
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} justify="center" style={{marginTop: "15px"}}  >
                        <Button variant="contained" color="primary" 
                            onClick={this.updateDetails}
                            style={{backgroundColor:"#47b16f"}} 
                            className="greenBtn">
                               Submit
                        </Button>
                        <Button variant="outlined" className="outlinedBtn" 
                          onClick={this.cancelCreate}
                          href="/"  style={{margin:"14px"}} >
                                Cancel
                        </Button>
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        );
    };
}

// export default withStyles(styles)(LoginForm);
