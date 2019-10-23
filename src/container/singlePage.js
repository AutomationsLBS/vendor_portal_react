import React, {Component} from 'react';
import {Button, Grid, Menu, MenuItem} from '@material-ui/core';
import {Scrollbars} from 'react-custom-scrollbars';
import MainNav from '../components/_/navigation';
import Header from '../components/_/header';
import {Footer} from "../components/_/elements";
import "../scss/singlePage.scss";

import Forgotpassword from '../components/forgotpassword/forgotpassword';
import Resetpassword from '../components/forgotpassword/resetPassword';
import Register from '../components/register/register';
import UserRegistration from '../components/user-register/register';
import { ToastContainer, toast } from 'react-toastify';
import Chargebee  from '../components/subscription';

export default class LoadSinglePage extends Component {
  constructor(props) {
    super(props);
  };
  checkView() {
    const path = this.props.location.pathname;
    if (path.indexOf('/forgotpassword') !== -1) {
      return (
        <div><Forgotpassword/></div>
      );
    } else if (path.indexOf('/register') !== -1) {
      return (<UserRegistration {...this.props}/>);
    } else if (path.indexOf('/resetpassword') !== -1) {
      return (
        <div><Resetpassword/></div>
      );
    } else if (path.indexOf('/chargebeedata') !== -1) {
      
      return (
        <div><Chargebee /></div>
      );
    }

  }
  render() {
    return (
      <div>
        <Header {...this.props} showProfile={false}/>
        <Grid container className="bodyContainer">
          <Grid
            className="bodyContent forgotPassword"
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}>
            <Scrollbars
              renderTrackVertical={props => <div {...props} 
              className="track-vertical"/>}>
              <div className="bodySection">
                {this.checkView()}
              </div>
            </Scrollbars>
          </Grid>
        </Grid>
        <ToastContainer autoClose={8000} />
        <Footer/>
      </div>
    )
  }
}
