import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import MainNav from './components/_/navigation';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Config from './container/config';
import Appheader from './components/_/header';
import {Footer} from './components/_/elements';
import Root from './container/root';
import { ToastContainer, toast } from 'react-toastify';

class App extends Component {
  static propTypes = {}
  render() {    
    return (
      <Router>
        <Grid className="mainContainer">
          <Root />
          <ToastContainer autoClose={8000} />
        </Grid>
      </Router>
    );
  }
}



const mapStateToProps = state => {
  console.log("\n\nAt App Checking  Rexux\n", state);
  const obj = state;
  return obj;
}



export default connect(mapStateToProps, null)(App);
