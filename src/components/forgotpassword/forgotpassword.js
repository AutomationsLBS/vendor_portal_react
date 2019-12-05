import React, { Component ,Fragment} from 'react';
import { Grid, Menu, MenuItem, TextField, Button, Typography } from '@material-ui/core';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Dailgo from '../_/sendOtp';
import green from '@material-ui/core/colors/green';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import CommonService from '../../service/commonServices';



import './forgotpassword.scss';
import { FastfoodOutlined } from '@material-ui/icons';

const styles = theme => ({
    button: {
        color: "#ffffff"   
    },
    input: {
      display: 'none',
    },
  });
  const theme = createMuiTheme({
    palette: {
      primary: green,
      secondary: {
        main: '#673ab7',
      },
    },
  });

  export default class Forgotpassword extends Component {
    constructor(props) {
        super(props);
        console.log("Register form", props);
        this.state = {
            phone:"",
            phone_error:"",
            password:"",
            password_error:"",
            dialogBoxFlag:false,
            enterOptDisplay:true,
            otp:"",
            otp_error:"",
            loader:false,
            pin:"",
        }
        // this.handleChange = this.handleChange.bind(this);
    }
    handleChange = name => event => {
       
        this.setState({
            [name]: event.target.value,
        });
        if (name != '') {
            let errName = name + '_error'
            console.log("Handle change", event, name, errName);
            this.setState({
                [errName]: false,
            });
        }
    };
  /*  submitMail = (event) => {
        event.preventDefault();
        let formValid = true;
        if (!this.state.email) {
            this.setState({ email_error: true });
            formValid = false;
        }
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let result = re.test(this.state.email);
        console.log('result', result)
        if (!result) {
            this.setState({ email_error: "Valid email is required" });
            formValid = false;
        }

        if(formValid){
            window.location.pathname = "/resetpassword";
            console.log('submitMail');
        }
    } */
     getOtp = (event) => {
        // this.setState({enterOptDisplay:!this.state.enterOptDisplay});
        // return false;
        this.setState({loader: true});

      let status =  true;
      if (this.state.phone ==""){
        this.setState({phone_error:"please enter Vendor/ Agency "})
        status = false;
      }
      // }else {
      //   if (this.state.phone.length !=10){
      //     status = false;
      //     this.setState({phone_error:"Phone number must be 10 digits"})
      //   }
       
      // }
       
       if (status){ 

            axios
          .post(axios.forgot_pin(),{"phone_mobile":this.state.phone})
          .then((response) => {
          
          
              this.setState({loader: false});
            
            //  this.setState({enterOptDisplay:false})
              toast.success( "OTP will be send to your Vendor/ Agency", {
                  position: toast.POSITION.TOP_CENTER,
                  className: 'rotateY animated'
                });
              setTimeout(() => {
              }, 3000);
             window.location.href ="/login";
          })
          .catch((error) => {
          // console.log((error !== undefined && error.response.data.message != undefined) ? error.response.data.message : "Failed for some reason")
            this.setState({loader: false});
              toast.error( (error !== undefined && error.response.data.message != undefined) ? error.response.data.message : "Failed for some reason", {
                  position: toast.POSITION.TOP_CENTER
                });
              
          });

       }
      

      
       
    }

    submitOTP = (event) =>{
      this.setState({enterOptDisplay:!this.state.enterOptDisplay});
      return false;
      let status  = true;
      if (this.state.otp == ""){
         status  =  false;
          this.setState({otp_error: "please enter OTP"});
          
      }

      if (status){

        axios
      .post(axios.otpSubmit(),{phone_mobile:this.state.phone,pin_c:this.state.otp})
      .then((response) => {
      
       
          this.setState({loader: false});
          CommonService.localStore.set("userData", JSON.stringify(response));
         
          let ud = CommonService.localStore.get('userData');

          ud = JSON.parse(ud.userData);
      
          window.location.href = "/updatenewpin";
          this.setState({enterOptDisplay:false})
          /* toast.success( "OTP will be send to your phone/ email", {
              position: toast.POSITION.TOP_CENTER,
              className: 'rotateY animated'
            });*/
          setTimeout(() => {
          }, 3000);
         
      })
      .catch((error) => {
        
         this.setState({loader: false});
           toast.error( (error !== undefined && error.response.data.message != undefined) ? error.response.data.message : "Failed for some reason", {
               position: toast.POSITION.TOP_CENTER
             });
          
      });

      

      }
       
      
     
    }
    render() {
        let  {loader }  =  this.state 
        return (

            <Grid container>
            {(this.state.enterOptDisplay)? 
            <Fragment>
            <Grid item sm={12} md={12} lg={12} xs={12} xl={12}>
              <Typography
                className="loginHeading preLoginHeading"
                variant="title"
                gutterBottom
                align="center">
               PLEASE ENTER YOUR VENDOR/ AGENCY
              </Typography>
            </Grid>
            {CommonService.renderLoader(loader)}
            
            <Grid container spacing={24} justify="center">
              
                <Grid item xs={12} sm={12}>
                   
                      <TextField
                        id="username"
                        label="Vendor/ Agency"
                        type="text"
                        
                        value={this.state.phone}
                        onChange={this.handleChange('phone')}
                        margin="normal"
                        helperText={this.state.phone_error}
                        error={(this.state.phone_error == "")
                        ? false
                        : true}
                       fullWidth />
                    
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <MuiThemeProvider theme={theme}>
                      
                        <Button
                          type="button"
                          variant="contained"
                          color="primary"
                          className="btn btn-primary loginButton" onClick ={()=>this.getOtp()}>
                          Get OTP
                        </Button>
                       
                      </MuiThemeProvider>
                    </Grid>
                
              
                </Grid>
             
          
            </Fragment>
             :
             <Fragment>
             
            <Grid item sm={12} md={12} lg={12} xs={12} xl={12}>
              <Typography
                className="loginHeading preLoginHeading"
                variant="title"
                gutterBottom
                align="center">
               ENTER YOUR OTP
              </Typography>
            </Grid>
           
              
                
                  <Grid container spacing={24} justify="center">
                    <Grid item xs={12} sm={12}>
                      <TextField
                        id="username"
                        label="OTP"
                        type="text"
                        className="username"
                        value={this.state.otp}
                        onChange={this.handleChange('otp')}
                        margin="normal"
                        helperText={this.state.otp_error}
                        error={(this.state.otp_error == "")
                        ? false
                        : true}
                        fullWidth/>
                    </Grid>
                    
                    <Grid item xs={12} sm={12}>
                      <MuiThemeProvider theme={theme}>
                      
                        <Button
                          type="button"
                          variant="contained"
                          color="primary"
                          className="btn btn-primary loginButton" onClick ={()=>this.submitOTP()}>
                          Submit
                        </Button>
                       
                      </MuiThemeProvider>
                    </Grid>
                  </Grid>
              
            
             
            
            </Fragment>
            }
          </Grid> 
            
        );
    }
}