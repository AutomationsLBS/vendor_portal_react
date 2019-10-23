import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
 import axios from 'axios'
 import green from '@material-ui/core/colors/green';

import { Grid, Menu, MenuItem, TextField, Button, Typography } from '@material-ui/core';
import ListComponent from '../resident/signoutlist';
import CommonService from '../../service/commonServices';

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
        let ud = CommonService.localStore.get('userData');
         ud = JSON.parse(ud.userData);
        
       this.state = {
       
        newPin:"",
        loader:false,
        newPin_error:"",
        userspassword:ud.visitor.pin,
        oldPin:"",
        oldPin_error:"",
        confirm_pin :"",
        confirm_pin_error:"",

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
        
    updateNewPin =  ()=>{
        const onlyNumbers  = /^[0-9]+$/;
        let status  = true;   
        this.setState({loader: true});
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

        }else {
          if (!onlyNumbers.test(this.state.confirm_pin)){
            status = false;
            this.setState({confirm_pin_error:"Please enter only numbers "})  
          }else {
            if (this.state.confirm_pin.length != 6 ){
              
              status = false;
             // alert("oo"+this.state.confirm_pin.length)
              this.setState({confirm_pin_error:"Pin  number must only 6 digits  "})  
            }
          }
        }

        if (this.state.newPin === "" ){
          status = false;
          this.setState({newPin_error:"Please enter your new pin"}) 

        }else {

          if (!onlyNumbers.test(this.state.newPin)){
            status = false;
            this.setState({newPin_error:"Please enter only numbers "})  
          }else {
            if (this.state.newPin.length != 6 ){
              
              status = false;
              //alert("oo"+this.state.newPin.length)
              this.setState({newPin_error:"Pin  number must only 6 digits  "})  
            }
          }


        }
        if (status){
          axios
          .post(axios.updatePin(),{pin_c:this.state.newPin})
          .then((response) => {
            
          
          
            this.setState({loader: false});
            window.location.href = "/resident";
        
            
          }).catch((error)=>{
          
            this.setState({loader: false});
          }); 
        }    


        this.setState({loader: false});
          
    }


    render(){
      const  {loader,visitorsList,total_entries,per_page}  =  this.state
        return (
               
            <Grid container>
            <Grid item sm={6}>
              <h2>
                <Typography className="pageTitle titleSection" variant="title" gutterBottom>
                  Change your pin.
                </Typography>
              </h2>
            </Grid>
            
            {CommonService.renderLoader(this.state.loader)}

            <div style={{padding:"10px"}}>  
            <Grid container spacing={24} >
              <Grid className="section">
                <form>
                  <Grid container spacing={24} justify="center">
                  

                  <Grid item xs={12} sm={12}>
                      <TextField
                        id="username"
                        label="Current pin"
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
                        label="New pin"
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
                        label="Confirm pin"
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
                    
                    <Grid item xs={12} sm={12}>
                      <MuiThemeProvider theme={theme}>
                      
                        <Button
                          type="button"
                          variant="contained"
                          color="primary"
                          className="btn btn-primary loginButton" onClick ={()=>this.updateNewPin()}>
                          Update
                        </Button>
                       
                      </MuiThemeProvider>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
        </Grid>
        </div>
        </Grid>
       

        );
    }

} 
