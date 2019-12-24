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
export default class Updatepin extends Component {
    constructor(props){
        super(props)
        let ud = CommonService.localStore.get('currentPin').currentPin;
        let firstname = CommonService.localStore.get('first_name').first_name;
        let last_name = CommonService.localStore.get('last_name').last_name;
        let email = CommonService.localStore.get('email').email;
       
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


  logoutUser() {
    setTimeout(() => {
      window
        .localStorage
        .clear();
      window.location.pathname = "/login";
    }, 1000);
  }





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

        }else {
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))
                {
                   
                }else {
                  status = false;
                  this.setState({email_error:"please enter your valid email"}) 

                }
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
      let  changelab =  (CommonService.localStore.get("visitor_types").visitor_types == "vendor")? "Pin"  : "Password"; 
        const onlyNumbers  = /^[0-9]+$/;
        let status  = true;   
               if (this.state.userspassword === "" ){
          status = false;
          this.setState({newPin_error:"Please enter your new "+changelab.toLowerCase()}) 

        }else {

          if(this.state.userspassword !== this.state.oldPin ){
            status = false;
            this.setState({oldPin_error:"Current "+changelab.toLowerCase()+" does not matching with old "+changelab.toLowerCase()}) 
  
          }
        } 
        
        if (this.state.confirm_pin !== this.state.newPin ){
          status = false;
          this.setState({confirm_pin_error:"please enter confirm "+changelab.toLowerCase()+" same as new "+changelab.toLowerCase()}) 

        }

        if (this.state.confirm_pin === "" ){
          status = false;
          this.setState({confirm_pin_error:"Please enter your confirm  "+changelab.toLowerCase()}) 

        }

        if (this.state.newPin === "" ){
          status = false;
          this.setState({newPin_error:"Please enter your new "+changelab.toLowerCase()}) 

        }
      
        if (status){
          this.setState({loader: true});

          axios
          .post(axios.update_pin(),{pin_c:this.state.newPin})
          .then((response) => {
            
          
          
            this.setState({loader: false});
             this.logoutUser();
        
            
          }).catch((error)=>{
          
            this.setState({loader: false});

            toast.error((error.message != undefined) ? error.message  : "Failed for some reason", {
              position: toast.POSITION.TOP_CENTER
            });
          }); 
        }    

      
          
    }


    render(){
      let  changeTabName =  (CommonService.localStore.get("visitor_types").visitor_types == "vendor")? "Change Pin"  : "Change Password"; 
      let  changelab =  (CommonService.localStore.get("visitor_types").visitor_types == "vendor")? "Pin"  : "Password"; 
      const  {loader,visitorsList,total_entries,per_page}  =  this.state
        return (
           <Fragment>


<Grid container>
            <Grid item sm={6}>
              <h2>
                <Typography className="pageTitle titleSection" variant="title" gutterBottom>
                   {changeTabName } 
                </Typography>
              </h2>
            </Grid>
            
            {CommonService.renderLoader(this.state.loader)}

            
            <Grid container spacing={24} >
              <Grid className="section">
              
                  <Grid container spacing={24} justify="center" style={{position:"absolute"}}>
                  

                  <Grid item xs={12} sm={12}>
                      <TextField
                        id="username"
                        label={"Current "+changelab}
                        type="password"
                        className="username"
                        value={this.state.oldPin}
                        onChange={this.handleChange('oldPin')}
                        margin="normal"

                        helperText={this.state.oldPin_error}
                        error={(this.state.oldPin_error == "")
                        ? false
                        : true}
                        style ={{width: '65%'}}/>
                    </Grid>


                     <Grid item xs={12} sm={12}>
                      <TextField
                        id="username"
                        label={"New "+changelab}
                        type="password"
                        className="username"
                        value={this.state.newPin}
                        onChange={this.handleChange('newPin')}
                        margin="normal"
                        helperText={this.state.newPin_error}
                        error={(this.state.newPin_error == "")
                        ? false
                        : true}
                        style ={{width: '65%'}} 
                        />
                    </Grid> 
                    <Grid item xs={12} sm={12}>
                      <TextField
                        id="username"
                      
                        label={"Confirm "+changelab}
                        type="password"
                        className="username"
                        value={this.state.confirm_pin}
                        onChange={this.handleChange('confirm_pin')}
                        margin="normal"
                        helperText={this.state.confirm_pin_error}
                        error={(this.state.confirm_pin_error == "")
                        ? false
                        : true}
                        style ={{width: '65%'}}
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={12} style= {{marginTop:"20px"}} >
                      <MuiThemeProvider theme={theme}>
                         
                        <Button
                          type="button"
                          variant="contained"
                          color="primary"
                          className="btn btn-primary loginButton" onClick ={()=>this.updateNewPin()}>
                          Update {changelab}
                        </Button>
                       
                      </MuiThemeProvider>
                    </Grid>
                  </Grid>
            
              </Grid>
        </Grid>
      
        </Grid>

           </Fragment>
        
       
           
            
            
        

        );
    }

} 
