import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
 import axios from 'axios'
 import green from '@material-ui/core/colors/green';

import { Grid, Menu, MenuItem, TextField, Button, Typography } from '@material-ui/core';
import ListComponent from '../resident/signoutlist';
import CommonService from '../../service/commonServices';
import { ToastContainer, toast } from 'react-toastify';

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
export default class UpdateProfile extends Component {
    constructor(props){
        super(props)
        let ud = CommonService.localStore.get('currentPin').currentPin;
        let firstname = CommonService.localStore.get('first_name').first_name;
        let last_name = CommonService.localStore.get('last_name').last_name;
        let email = CommonService.localStore.get('phone_mobile_user').phone_mobile_user;
       
       this.state = {
       
        newPin:"",
        loader:false,
        newPin_error:"",
        userspassword:ud,
        oldPin:"",
        oldPin_error:"",
        confirm_pin :"",
        confirm_pin_error:"",
        firstname: firstname,
        firstname_error:"",
        email_error:"",
        email:email,
        lastname:last_name,
        lastname_error:"",


       }
    }

    componentWillMount() {
    }
    componentDidMount() {
        
     
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



   updateProfile =  ()=>{
        const onlyNumbers  = /^[0-9]+$/;
        let status  = true;   
               if (this.state.firstname === "" ){
          status = false;
          this.setState({firstname_error:"Please enter your first name"}) 

        }
        
        if (this.state.email === "" ){
          status = false;
          this.setState({email_error:"please enter your email"}) 

        }

        if (this.state.lastname === "" ){
          status = false;
          this.setState({lastname_error:"Please enter your last name"}) 

        }
       
    
       
        if (status){
          
          this.setState({loader: true});

          axios
          .post(axios.update_profile(),{first_name:this.state.firstname,email: this.state.email,
           last_name: this.state.lastname
        })
          .then((response) => {
            
            CommonService.localStore.set("first_name", this.state.firstname)
            CommonService.localStore.set("last_name", this.state.lastname)
            CommonService.localStore.set("email", this.state.email)
          
            this.setState({loader: false});
            window.location.reload();
        
            
          }).catch((error)=>{
          
            this.setState({loader: false});

            toast.error((error.message != undefined) ? error.message  : "Failed for some reason", {
              position: toast.POSITION.TOP_CENTER
            });
          }); 
        }    

      
          
    }

        
    updateNewPin =  ()=>{
        const onlyNumbers  = /^[0-9]+$/;
        let status  = true;   
               if (this.state.userspassword === "" ){
          status = false;
          this.setState({newPin_error:"Please enter your new pin"}) 

        }else {

          if(this.state.userspassword !== this.state.oldPin ){
            status = false;
            this.setState({oldPin_error:"Current pin does not matching with old pin"}) 
  
          }
        } 
        
        if (this.state.confirm_pin !== this.state.newPin ){
          status = false;
          this.setState({confirm_pin_error:"please enter confirm pin same as new pin"}) 

        }

        if (this.state.confirm_pin === "" ){
          status = false;
          this.setState({confirm_pin_error:"Please enter your confirm  pin"}) 

        }

        if (this.state.newPin === "" ){
          status = false;
          this.setState({newPin_error:"Please enter your new pin"}) 

        }
      
        if (status){
          this.setState({loader: true});

          axios
          .post(axios.update_pin(),{pin_c:this.state.newPin})
          .then((response) => {
            
          
          
            this.setState({loader: false});
            window.location.href = "/";
        
            
          }).catch((error)=>{
          
            this.setState({loader: false});

            toast.error((error.message != undefined) ? error.message  : "Failed for some reason", {
              position: toast.POSITION.TOP_CENTER
            });
          }); 
        }    

      
          
    }


    render(){
      const  {loader,visitorsList,total_entries,per_page}  =  this.state
       let  visitor_types   =  CommonService.localStore.get("visitor_types").visitor_types; 
         
        return (
          <div>
          <Grid container>
            <Grid item sm={6}>
              <h2>
                <Typography className="pageTitle titleSection" variant="title" gutterBottom>
                  Update profile details 
                  {CommonService.renderLoader(this.state.loader)}
                </Typography>
              </h2>
            </Grid>
            
           

            <div style={{padding:"10px"}}>  
            <Grid container spacing={24} >
              <Grid className="section">
                <form>
                  <Grid container spacing={24} justify="center">
                  

                  <Grid item xs={12} sm={12}>
                      <TextField
                        id="firstname"
                        label="First Name"
                        type="text"
                        className="username"
                        value={this.state.firstname}
                        onChange={this.handleChange('firstname')}
                        margin="normal"

                        helperText={this.state.firstname_error}
                        error={(this.state.firstname_error == "")
                        ? false
                        : true}
                        style ={{width: '65%'}}/>
                    </Grid>


                     <Grid item xs={12} sm={12}>
                      <TextField
                        id="username"
                        label="Last Name"
                        type="text"
                        className="username"
                        value={this.state.lastname}
                        onChange={this.handleChange('lastname')}
                        margin="normal"
                        helperText={this.state.lastname_error}
                        error={(this.state.lastname_error == "")
                        ? false
                        : true}
                        style ={{width: '65%'}} 
                        />
                    </Grid> 

                  { (visitor_types == "agency") ? 
                  
                  <Grid item xs={12} sm={12}>
                  <TextField
                    id="username"
                    label="Email"
                    type="text"
                    className="username"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    margin="normal"
                    helperText={this.state.email_error}
                    error={(this.state.email_error == "")
                    ? false
                    : true}
                    style ={{width: '65%'}}
                    disabled	
                    />
                </Grid>
                :
                <Grid item xs={12} sm={12}>
                <TextField
                id="username"
                label="phone"
                type="text"
                className="username"
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin="normal"
                helperText={this.state.email_error}
                error={(this.state.email_error == "")
                ? false
                : true}
                style ={{width: '65%'}}
                disabled	
                />

            </Grid>

                }
                   
                    
                    <Grid item xs={12} sm={12}>
                      <MuiThemeProvider theme={theme}>
                      
                        <Button
                          type="button"
                          variant="contained"
                          color="primary"
                          className="btn btn-primary loginButton" onClick ={()=>this.updateProfile()}>
                          Update Profile
                        </Button>
                       
                      </MuiThemeProvider>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
        </Grid>
        </div>
        </Grid>
       
           
    </div>
          
        );
    }

} 
