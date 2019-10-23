import React, { Component } from 'react';
import { Button, Grid, Menu, MenuItem, TextField, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { Scrollbars } from 'react-custom-scrollbars';
import MainNav from '../_/navigation';
import Config from '../../container/config';
import './profile.scss';

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    // console.log("Register form", props);
    this.state = {
      oldpassword: "",
      oldpassword_error: false,
      newpassword: "",
      newpassword_error: false,
      confirmpassword: '',
      confirmpassword_error: false,
      showPwdResetBlock: false,
      profileData : {
        
      }
    }
    // this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.setState({ showPwdResetBlock: false });
  }
  handleChange = name => event => {
    console.log(name, ">>>>", this.state.newpassword, this.state.confirmpassword);

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
  handleChangePassword = (event) => {
    console.log('this>', this.state);
    this.setState({ showPwdResetBlock: true });
  }

  resetPwd = (event) => {
    event.preventDefault();
    console.log(">>>>", this.state.newpassword, this.state.confirmpassword);
    let formValid = true;
    if (!this.state.oldpassword) {
      this.setState({ oldpassword_error: true });
      formValid = false;
    }
    if (!this.state.newpassword) {
      this.setState({ newpassword_error: true });
      formValid = false;
    }
    if (!this.state.confirmpassword) {
      this.setState({ confirmpassword_error: true });
      formValid = false;
    }
    if (formValid) {
      console.log('resetPwd');
      window.location.pathname = '/profile';
      // Service call
      this.setState({
        showPwdResetBlock: false,
        oldpassword: "",
        oldpassword_error: false,
        newpassword: "",
        newpassword_error: false,
        confirmpassword: '',
        confirmpassword_error: false,
        showPwdResetBlock: false
      });

    }
  }
  render() {
    return (
      <Grid container>
        <Grid container>
          <Grid item sm={11} md={11} lg={11} xs={11} xl={11}>
            <Typography className="pageTitle titleSection" variant="title" gutterBottom>
              Change Password
            </Typography>
          </Grid>
        </Grid>
        <Grid container className="block">
          <Grid item sm={6} md={4} lg={4} xs={12} xl={4}>
              <TextField
                id="oldpassword"
                label="Old Password"
                className=""
                value={this.state.oldpassword}
                onChange={this.handleChange('oldpassword')}
                margin="normal"
                maxLength="10"
                type="password"
                error={this.state.oldpassword_error}
                fullWidth
              />
              <div>
                {this.state.oldpassword_error && <span className="errorText" >{this.state.oldpassword} Enter old password</span>}
              </div>

              <TextField
                id="newpassword"
                label="New Password"
                className=""
                value={this.state.newpassword}
                onChange={this.handleChange('newpassword')}
                margin="normal"
                maxLength="10"
                type="password"
                error={this.state.newpassword_error}
                fullWidth
              />
              <div>
                {this.state.newpassword_error && <span className="errorText" >{this.state.newpassword_error} Enter new password</span>}
              </div>

              <TextField
                id="confirmpassword"
                label="Confirm Password"
                className=""
                value={this.state.confirmpassword}
                onChange={this.handleChange('confirmpassword')}
                margin="normal"
                maxLength="10"
                type="password"
                error={this.state.confirmpassword_error}
                fullWidth
              />
              <div>
                {this.state.confirmpassword_error && <span className="errorText" >{this.state.confirmpassword_error} Confirm password </span>}
              </div>
              <Button className="btn btn-primary mar-large-top"
                onClick={this.resetPwd} style={{marginRight: "20px"}}>
                Submit
              </Button>
              <Button href="/profile" className="btn btn-secondary mar-large-top ">
                Cancel
              </Button>
            </Grid>
        </Grid>
      </Grid>
    );
  };
}