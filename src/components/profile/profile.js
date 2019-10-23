import React, { Component } from 'react';
import { Button, Grid, Menu, MenuItem, TextField, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { Scrollbars } from 'react-custom-scrollbars';
import MainNav from '../_/navigation';
import Config from '../../container/config';
import './profile.scss';

export default class Profile extends Component {
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
              Profile
            </Typography>
          </Grid>
          <Grid item sm={1} md={1} lg={1} xs={1} xl={1} className="EditGrid" >
            <Button href="/profile/edit" variant="fab" aria-label="Edit" className="editBtn" >
              <Icon>edit_icon</Icon>
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item sm={3} md={3} lg={3} xs={12} xl={3}>
            <div className="profilePic imgRound">
              <img src={Config.images + "profilePic.jpg"} />
            </div>
          </Grid>
          <Grid item sm={9} md={9} lg={9} xs={12} xl={9}>
            <div className="title"> Angelina </div>
            <div className="subTitle">Software Engineer</div>

            <Grid style={{paddingTop: '10px', paddingBottom: '10px',}} >
              <div className="title1" > Sugar ID :</div>
              <div className="subTitle1" > 82f72939-735e-53a2-0944-5418c4edae2a </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="block">
          <Grid item sm={3} md={3} lg={3} xs={12} xl={3}>

          </Grid>
          <Grid item sm={9} md={9} lg={9} xs={12} xl={9}>
            {/* <Typography className="pageTitle titleSection" variant="title" gutterBottom>
              Details
            </Typography> */}
            <Grid>
              <Grid item xs={12} sm={6} md={6} className="formBlock" >
                <div className="formTitle" > Phone : </div>
                <div className="formDescp" > (123) - 123 - 4123 </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6} className="formBlock" >
                <div className="formTitle" > Email : </div>
                <div className="formDescp" > newportrichey@accushield.com </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} className="formBlock" >
                <div className="formTitle" > US State : </div>
                <div className="formDescp" > Florida, New Jersey, New York </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
}