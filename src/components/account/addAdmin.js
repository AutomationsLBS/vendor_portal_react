import React, {Component, Fragment} from 'react';
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

import FormControlLabel from '@material-ui/core/FormControlLabel';
import RegisterForm from '../register_/registerForm'

export default class AddAdmin extends Component { 
  constructor(props){
    super(props)
    this.state = {
        disabled : false
      }
  }

  render(){

    return(
      <Fragment>
         <Grid container>
            <Grid container className="header" justify="flex-start" >
               <Grid item>
                  <h2>
                    <Typography className="pageTitle titleSection" variant="title" gutterBottom>
                      Add Admin
                    </Typography>
                  </h2>
                </Grid>
                <RegisterForm disabled = {this.state.disabled} />
            </Grid>
          </Grid>
      </Fragment>
    )

  }
}