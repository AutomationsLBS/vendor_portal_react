import React, {Component,Fragment} from 'react';
import {
  Grid, 
  TextField, 
  Button, 
  Typography,
 
} from '@material-ui/core';
import {withStyles, MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
const styles = theme => ({
  button: {
    color: "#ffffff"
  },
  input: {
    display: 'none'
  }
});
const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: {
      main: '#673ab7'
    }
  }
});
class LoginForm extends Component {

  constructor(props) {
    super(props);
    console.log("Login form", props);
    this.state = {
      phone_email:"",
      phone_error:"",
      password: "",
      password_error: "",
      showPassword: false,
    }
    this.handleChange = this
      .handleChange
      .bind(this);
    this.loginUser = this
      .loginUser
      .bind(this);
  }
  handleChange = name => event => {
    // console.log("Handle change", event.target.value);
    event.persist();
    this.setState({
      [name]: event.target.value,
      [name + "_error"]: (event.target.value)
        ? ""
        : name + " is required!"
    });
    console.log("in here ..")
    // this.props.updateData({username: this.state.username, password: this.state.password});
  };

  componentDidMount() {
    
  }
  componentWillReceiveProps(props) {
    
  }

  loginUser(event) {
    event.preventDefault();
    let formValid = true;
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let  phoneno = /^\d{10}$/;

    if (!this.state.phone_email) {
      this.setState({"phone_error": "Vendor/ Agency is required!"});
      formValid = false;
    }else if(re.test(this.state.phone_email)){
      formValid = true;
    }else if(phoneno.test(this.state.phone_email)){
      formValid = true;
    }else {
      this.setState({"phone_error": "Vendor/ Agency is required!"});
      formValid = false;
    }
  //  let result = re.test(this.state.email);
   // console.log('result', result)
    /*if (!result) {
      this.setState({email_error: "Valid email is required"});
      formValid = false;
    } */
    if (!this.state.password) {
      this.setState({"password_error": "Pin is required!"});
      formValid = false;
    }

    if (formValid) {      
        this.props.updateData({phone_mobile: this.state.phone_email, pin_c: this.state.password});
    }
  }


  render() {
    const {classes} = this.props;
    return (
      <Grid container>
        <Grid item sm={12} md={12} lg={12} xs={12} xl={12}>
          <Typography
            className="loginHeading preLoginHeading"
            variant="title"
            gutterBottom
            align="center">
           Vendor/ Agency Login
          </Typography>
        </Grid>
        <Grid container spacing={24} justify="center">
          <Grid className="section">
            <form onSubmit={this.loginUser}>
              <Grid container spacing={24} justify="center">
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="username"
                    label="Vendor/Agency"
                    type="text"
                    className="username"
                    value={this.state.phone_email}
                    onChange={this.handleChange('phone_email')}
                    margin="normal"
                    helperText={this.state.phone_error}
                    error={(this.state.phone_error == "")
                    ? false
                    : true}
                    fullWidth/>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="password"
                    label="Pin"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    type="password"
                    fullWidth
                    margin="normal"
                    helperText={this.state.password_error}
                    error={(this.state.password_error == "")
                    ? false
                    : true}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MuiThemeProvider theme={theme}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="btn btn-primary loginButton">
                      Login
                    </Button>
                   <div>
                    {   <Button href="./register" color="secondary" className="btn btn-link">Forgot password?</Button>  }
                    </div> 
                  </MuiThemeProvider>
                </Grid>
              </Grid>
            </form>
            <span style ={{"font-size": "16px","padding-top": "16px"}}>
        <b>Note:</b> If you are a Vendor/ Agency, please login with your Accushield login details that you registered at Kiosk.
      </span>
          </Grid>
          {/* <Grid
            className="section signupSection"
            item
            sm={12}
            md={12}
            lg={12}
            xs={12}
            xl={12}>
            <MuiThemeProvider theme={theme}>
              <div className="signupText">Still not registered</div>
              <Button
                href="./register"
                variant="outlined"
                color="primary"
                className="btn btn-secondary signupButton">
                Sign Up
              </Button>
            </MuiThemeProvider>
          </Grid> */}
      
        </Grid>
       
      </Grid>
    );
  };
}

export default withStyles(styles)(LoginForm);