import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Config from '../../container/config';
import {
  Grid,
  TextField,
  Checkbox,
  Radio,
  RadioGroup,
  FormGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Typography,
  Hidden,
  Select,
  Menu,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import MaskedInput from 'react-text-mask';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import {Favorite, FavoriteBorder} from '@material-ui/icons';
import CommonService from './../../service/commonServices';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import './register.scss';

const forms = [
  "Create Your Account",
  "Corporate Office Information", 
  "Company Branch/Local Office Information", 
  "Company Contact for Compliance", 
  "Billing Location Information", 
  "Service Type Your Company Offer"];

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoCompleteValue: 'Ma',
      showPassword: false,
      data: {
      "service_label_sub": [],
      "service_label": '',
      "name":'',
      "first_name":'',
      "last_name":'',
      "title": '',
      "phone_mobile": '',
      "fax": '',
      "email": '',
      "password": '',
      "comp_contact_fname": '',
      "comp_contact_lname": '',
      "comp_contact_email": '',
      "comp_contact_phone": '',
      "comp_contact_title": '',
      "child_company_name": '',
      "child_company_address": '',
      "child_company_city": '',
      "child_company_state": '',
      "child_company_zip": '',
      "child_company_contact_mail": '',
      "child_company_contact_main_phone": '',
      "child_company_contact_name": '',
      "child_company_contact_title": '',
      "child_company_contact_phone": '',
      "parent_company_name": '',
      "parent_company_address": '',
      "parent_company_city": '',
      "parent_company_state": '',
      "parent_company_zip": '',
      "parent_company_contact_mail": '',
      "parent_company_contact_main_phone": '',
      "parent_company_contact_name": '',
      "parent_company_contact_title": '',
      "parent_company_contact_phone": '',
      "billing_company_name": '',
      "billing_company_address": '',
      "billing_company_city": '',
      "billing_company_state": '',
      "billing_company_zip": '',
      "billing_company_contact_mail": '',
      "billing_company_contact_main_phone": '',
      "billing_company_contact_name": '',
      "billing_company_contact_title": '',
      "billing_company_contact_phone": '',
      "billing_email": '' },
      error: {},
      billingEmailRequired: false,
      carporateSameAddress: false,
      billingSameAddress: false
    };

    this.updateField = this.updateField.bind(this);
    this.companyContactHandleCheckboxChange = this.companyContactHandleCheckboxChange.bind(this);
  }
  
  /* Life Cycles Methods */
  componentDidMount() {
    // console.log("Component Mounted");
    let props = this.props;
    this.setState({
      data: props.formData, 
      error: props.formError,
      billingEmailRequired: ((props.formData.billing_email !== "") ? true : false)
    });
  }
  componentWillReceiveProps(props){
    this.setState({
      data: props.formData, 
      error: props.formError,
      billingEmailRequired: ((props.formData.billing_email !== "") ? true : false)
    });
    // console.log("Component will Receive Props\n", props);
  }

  /* Component Methods */
  updateField = name => event => {
    // debugger;
    let state = this.state;
    state['data'][name] = event.target.value;
    state['error'][name] = (event.target.value !== null && event.target.value !== '') ? '' : null;
    this.setState({data: state});
    // debugger;
    // console.log("this update filed", name, event.target.value, this.state.first_name);
    this.props.updateFormData(this.state);
  }

  validateFormField(type, key, value){
    console.log("Validating", type, key, value);
  }


  checkBillingEmailRequired = event => {
    // debugger;
    let state = this.state;
    state.billingEmailRequired = !state.billingEmailRequired;
    console.log("Checkbox Change", event.target.checked);
    if(!state.billingEmailRequired){
      state['data']['billing_email'] = "";
    }
    this.setState(state);
    // this.props.updateFormData(state);
  }

  companyContactHandleCheckboxChange = name => event => {
    let service_label = this.state.data;
    if (event.target.checked) {
      service_label.service_label_sub.push(name);
    } else {
      let item = service_label.service_label_sub.indexOf(name);
      if (item > -1) {
        service_label.service_label_sub.splice(item, 1);
      }
    }
    this.setState({data: service_label});
    this.props.updateFormData(this.state.data);
  };

  isBillingEmailRequired = (billing_email, dataEmail) => {
    if(this.state.billingEmailRequired){        
      return (
        <Grid item xs={12} sm={12} md={12} lg={12}>  
          <TextField
              id="billing_email"
              label="Billing Email"
              value={billing_email}
              onChange={this.updateField('billing_email')}
              margin="normal"
              fullWidth
              helperText={(dataEmail !== null) ? '' : 'Billing email field required'}
              error={(dataEmail !== null)
              ? false
              : true}/>        
        </Grid>
      )
    }      
  }

  handleRadioChange = event => {
    var value = this.state.data;
    value.service_label = event.target.value;
    this.setState(value);
    this.props.updateFormData(this.state);
  };

  isAddressSame = (evt, name) => {
    // debugger;
    let state = this.state;
    if(name === "company") {
      state.carporateSameAddress = !state.carporateSameAddress;

      state['data']["child_company_address"] = (state.carporateSameAddress) ? this.props.formData.parent_company_address : "";
      state['data']["child_company_city"] = (state.carporateSameAddress) ? this.props.formData.parent_company_city : "";
      state['data']["child_company_state"] = (state.carporateSameAddress) ? this.props.formData.parent_company_state : "";
      state['data']["child_company_zip"] = (state.carporateSameAddress) ? this.props.formData.parent_company_zip : "";
      
      this.setState(state);
    }else if(name === "billing") {
      state.billingSameAddress = !state.billingSameAddress;

      state['data']["billing_company_address"] = (state.billingSameAddress) ? this.props.formData.parent_company_address : "";
      state['data']["billing_company_city"] = (state.billingSameAddress) ? this.props.formData.parent_company_city : "";
      state['data']["billing_company_state"] = (state.billingSameAddress) ? this.props.formData.parent_company_state : "";
      state['data']["billing_company_zip"] = (state.billingSameAddress) ? this.props.formData.parent_company_zip : "";
      
      this.setState(state);
    }
  }
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  render() {
    const { data, error, billingEmailRequired } = this.state;
    const { formData, formError, us_states } = this.props;
    return (
      <Fragment>
        { /* Company Contact From */}
        {/* JSON.stringify(error) */}
        <div  style={{'display': (this.props.activeTab == forms[0]) ? 'block': 'none'}}>
          <Grid container spacing={32}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                id="name"
                label="Name"
                value={formData.name}
                onChange={this.updateField('name')}
                margin="normal"
                fullWidth
                helperText={(error.first_name !== null && error.last_name !== null) ? '' : 'Name field required'}
                error={(error.first_name !== null && error.last_name !== null) ? false : true}/>
            </Grid>
            
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="email"
                label="Email"
                margin="normal"
                value={formData.email}
                onChange={this.updateField('email')}
                fullWidth
                helperText={(error.email !== null) ? '' : 'Email field required'}
                error={(error.email !== null) ? false : true}/>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              {/* <TextField
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={this.updateField('password')}
                margin="normal"
                fullWidth
                helperText={(error.password !== null) ? "" : "Password field is required"}
                error={(error.password !== null) ? false : true}/> */}
              <FormControl fullWidth className="passwordField">
                    <InputLabel htmlFor="password" className={error.password ? 'password error' : 'password'}>Password</InputLabel>
                    <Input
                      id="password"
                      type={this.state.showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={this.updateField('password')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                          >
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      error={error.password ? true : false}
                    />
                    {error.password && <FormHelperText id="component-error-text" className="passwordHintText error">Password field is required</FormHelperText>}
                    
                  </FormControl>
            </Grid>
          </Grid>
        </div>

        <div  style={{'display': (this.props.activeTab == forms[1]) ? 'block': 'none'}}>
          <Grid container spacing={32}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                id="parent_company_name"
                label="Company Name"
                value={formData.parent_company_name}
                onChange={this.updateField('parent_company_name')}
                margin="normal"
                fullWidth
                helperText={(error.parent_company_name !== null) ? '' : 'Company name field required'}
                error={(error.parent_company_name !== null) ? false : true}/>
            </Grid>
            
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                id="parent_company_address"
                label="Address"
                margin="normal"
                value={formData.parent_company_address}
                onChange={this.updateField('parent_company_address')}
                fullWidth
                helperText={(error.parent_company_address !== null) ? '' : 'Address field required'}
                error={(error.parent_company_address !== null) ? false : true}/>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="parent_company_city"
                label="City"
                value={formData.parent_company_city}
                onChange={this.updateField('parent_company_city')}
                margin="normal"
                fullWidth
                helperText={(error.parent_company_city !== null) ? '' : 'City field required'}
                error={(error.parent_company_city !== null) ? false : true}/>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <FormControl xs={12} style={{'width': "100%"}} className="inputSelect">
                <InputLabel 
                      htmlFor="state" 
                      style={{'color': (error.child_company_state === null) ? '#f44336': '#00000088'}}>
                      State
                </InputLabel>
                <Select
                  name="parent_company_state"
                  className="parent_company_state"
                  value={formData.parent_company_state}
                  onChange={this.updateField('parent_company_state')}
                  input={<Input id="parent_company_state" />}>
                  <MenuItem value="">
                    <em>-State-</em>
                  </MenuItem>
                  {us_states.map((n, i) => {
                        if(n !== null){
                          return (
                            <MenuItem value={n.sugar_id} key={i}>
                              {CommonService.toTitleCase(n.name)}
                            </MenuItem>                            
                          )}
                    })}
                </Select>
                {(error.parent_company_state === null) 
                    ? <FormHelperText style={{'color': '#f44336'}}>State is required!</FormHelperText>
                    : ""}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="parent_company_zip"
                label="Zip"
                value={formData.parent_company_zip}
                onChange={this.updateField('parent_company_zip')}
                margin="normal"
                fullWidth
                helperText={(error.parent_company_zip !== null ) ? '' : 'Zip field required'}
                error={(error.parent_company_zip !== null)  ? false : true}/>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="parent_company_contact_name"
                label="Contact Name"
                value={formData.parent_company_contact_name}
                onChange={this.updateField('parent_company_contact_name')}
                margin="normal"
                fullWidth
                helperText={(error.parent_company_contact_name !== null) ? '' : 'Contact name field required'}
                error={(error.parent_company_contact_name !== null) ? false : true}/>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="parent_company_contact_mail"
                label="Contact Email"
                value={formData.parent_company_contact_mail}
                onChange={this.updateField('parent_company_contact_mail')}
                margin="normal"
                fullWidth
                helperText={(error.parent_company_contact_mail !== null) ? '' : 'Contact email field required'}
                error={(error.parent_company_contact_mail !== null) ? false : true}/>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="parent_company_contact_phone"
                label="Contact Phone"
                value={formData.parent_company_contact_phone}
                onChange={this.updateField('parent_company_contact_phone')}
                margin="normal"
                fullWidth
                onInput = {(e) =>{
                    e.target.value = e.target.value.replace(/[^\d]/g, "");
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                    e.target.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                    e.target.value = (e.target.value == "NaN") ? "" : e.target.value;
                }}
                helperText={(error.parent_company_contact_phone !== null) ? '' : 'Contact phone field required'}
                error={(error.parent_company_contact_phone !== null) ? false : true}/>
            </Grid>
          </Grid>
        </div>


        <div  style={{'display': (this.props.activeTab == forms[2]) ? 'block': 'none'}}>
          <Grid container spacing={32}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                id="child_company_name"
                label="Company Name"
                value={formData.child_company_name}
                onChange={this.updateField('child_company_name')}
                margin="normal"
                fullWidth
                helperText={(error.child_company_name !== null) ? '' : 'Company name field required'}
                error={(error.child_company_name !== null) ? false : true}/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControlLabel
                control={<Checkbox checked = {this.state.carporateSameAddress}
                onChange = {(event) => {this.isAddressSame(event, 'company')}}
                color = "primary" />}
                label="Address same as Corporate"/>  
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                id="child_company_address"
                label="Address"
                margin="normal"
                value={formData.child_company_address}
                onChange={this.updateField('child_company_address')}
                fullWidth
                helperText={(error.child_company_address !== null) ? '': 'Address field required'}
                error={(error.child_company_address !== null) ? false : true}/>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="child_company_city"
                label="City"
                value={formData.child_company_city}
                onChange={this.updateField('child_company_city')}
                margin="normal"
                fullWidth
                helperText={(error.child_company_city !== null) ? '' : 'City field required'}
                error={(error.child_company_city !== null) ? false : true}/>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <FormControl xs={12} style={{'width': "100%"}} className="inputSelect">
                <InputLabel 
                      htmlFor="state" 
                      style={{'color': (error.child_company_state === null) ? '#f44336': '#00000088'}}>
                      State
                </InputLabel>
                <Select
                  name="child_company_state"
                  className="child_company_state"
                  value={formData.child_company_state}
                  onChange={this.updateField('child_company_state')}
                  input={<Input id="child_company_state" />}>
                  <MenuItem value="">
                    <em>-State-</em>
                  </MenuItem>
                  {us_states.map((n, i) => {
                        if(n !== null){
                          return (
                            <MenuItem value={n.sugar_id} key={i}>
                              {CommonService.toTitleCase(n.name)}
                            </MenuItem>                            
                          )}
                    })}
                </Select>
                {(error.child_company_state === null) 
                    ? <FormHelperText style={{'color': '#f44336'}}>State is required!</FormHelperText>
                    : ""}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="child_company_zip"
                label="Zip"
                value={formData.child_company_zip}
                onChange={this.updateField('child_company_zip')}
                margin="normal"
                fullWidth
                helperText={(error.child_company_zip !== null) ? '' : 'Zip field required'}
                error={(error.child_company_zip !== null) ? false : true}/>
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="child_company_contact_name"
                label="Contact Name"
                value={formData.child_company_contact_name}
                onChange={this.updateField('child_company_contact_name')}
                margin="normal"
                fullWidth
                helperText={(error.child_company_contact_name !== null) ? '' : 'Contact name field required'}
                error={(error.child_company_contact_name !== null) ? false : true}/>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="child_company_contact_mail"
                label="Contact Email"
                value={formData.child_company_contact_mail}
                onChange={this.updateField('child_company_contact_mail')}
                margin="normal"
                fullWidth
                helperText={(error.child_company_contact_mail !== null) ? '' : 'Contact email field required'}
                error={(error.child_company_contact_mail !== null) ? false : true}/>
            </Grid>
            
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="child_company_contact_phone"
                label="Contact Phone"
                value={formData.child_company_contact_phone}
                onChange={this.updateField('child_company_contact_phone')}
                margin="normal"
                fullWidth
                onInput = {(e) =>{
                    e.target.value = e.target.value.replace(/[^\d]/g, "");
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                    e.target.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                    e.target.value = (e.target.value == "NaN") ? "" : e.target.value;
                }}
                helperText={(error.child_company_contact_phone !== null) ? ''  :'Contact phone field required'}
                error={(error.child_company_contact_phone !== null) ? false : true}/>
            </Grid>
          </Grid>
        </div>


        <div  style={{'display': (this.props.activeTab == forms[3]) ? 'block': 'none'}}>
          <Grid container spacing={32}>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="comp_contact_fname"
                label="First Name"
                value={formData.comp_contact_fname}
                onChange={this.updateField('comp_contact_fname')}
                margin="normal"
                fullWidth
                helperText={(error.comp_contact_fname !== null) ? "" : "First name field is required"}
                error={(error.comp_contact_fname !== null) ? false : true}/>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="comp_contact_lname"
                label="Last Name"
                value={formData.comp_contact_lname}
                onChange={this.updateField('comp_contact_lname')}
                margin="normal"
                fullWidth
                required={false}
                helperText={(error.comp_contact_lname !== null) ? "" : "Last name field is required"}
                error={(error.comp_contact_lname !== null) ? false : true}/>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="comp_contact_title"
                label="Title"
                value={formData.comp_contact_title}
                onChange={this.updateField('comp_contact_title')}
                margin="normal"
                fullWidth
                helperText={(error.comp_contact_title !== null) ? "" : "Title field is required"}
                error={(error.comp_contact_title !== null) ? false : true} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="comp_contact_email"
                label="Email"
                value={formData.comp_contact_email}
                onChange={this.updateField('comp_contact_email')}
                margin="normal"
                fullWidth
                helperText={(error.comp_contact_email !== null) ? "" : "Email field is required"}
                error={(error.comp_contact_email !== null) ? false : true}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="comp_contact_phone"
                label="Phone"
                value={formData.comp_contact_phone}
                onChange={this.updateField('comp_contact_phone')}
                margin="normal"
                fullWidth
                onInput = {(e) =>{
                  e.target.value = e.target.value.replace(/[^\d]/g, "");
                  e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                  e.target.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                  e.target.value = (e.target.value == "NaN") ? "" : e.target.value;
                }}
                helperText={(error.comp_contact_phone !== null) ? "" : "Phone field is required"}
                error={(error.comp_contact_phone !== null) ? false : true}/>
            </Grid>
            {/* <Grid item xs={12} sm={12} md={12} lg={12}>
              <b> Submitting As: </b>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox 
                        checked = {(formData.service_label_sub.indexOf("Corporate Owner") > -1)}
                        onChange = {this.companyContactHandleCheckboxChange('Corporate Owner')}
                        value = "Corporate Owner" color = "primary" />
                      }
                  label="Corporate Owner"/>
                <FormControlLabel
                  control={
                    <Checkbox 
                        checked = {(formData.service_label_sub.indexOf("Branch Location") > -1)}
                        onChange = {this.companyContactHandleCheckboxChange('Branch Location')}
                        value = "Branch Location" color = "primary" />
                      }
                  label="Branch Location"/>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked = {(formData.service_label_sub.indexOf("Sole Proprietorship") > -1)}
                      onChange = {this.companyContactHandleCheckboxChange('Sole Proprietorship')}
                      value = "Sole Proprietorship" color = "primary" />
                    }
                  label="Sole Proprietorship"/>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked = {(formData.service_label_sub.indexOf("Franchisee") > -1)}
                      onChange = {this.companyContactHandleCheckboxChange('Franchisee')}
                      value = "Franchisee" color = "primary" />
                    }
                  label="Franchisee"/>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked = {(formData.service_label_sub.indexOf("Franchisor") > -1)}
                      onChange = {this.companyContactHandleCheckboxChange('Franchisor')}
                      value = "Franchisor" color = "primary" />
                    }
                  label="Franchisor"/>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked = {(formData.service_label_sub.indexOf("Staffing Agency") > -1)}
                      onChange = {this.companyContactHandleCheckboxChange('Staffing Agency')}
                      value = "Staffing Agency" color = "primary" />
                    }
                  label="Staffing Agency"/>
              </FormGroup>
            </Grid> */}
          </Grid>
        </div>


        <div  style={{'display': (this.props.activeTab == forms[4]) ? 'block': 'none'}}>
          <Grid container spacing={32}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                id="billing_company_name"
                label="Company Name"
                value={formData.billing_company_name}
                onChange={this.updateField('billing_company_name')}
                margin="normal"
                fullWidth
                helperText={(error.billing_company_name !== null) ? '' : 'Company name field required'}
                error={(error.billing_company_name !== null)
                ? false
                : true}/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControlLabel
                control={<Checkbox checked = {this.state.billingSameAddress}
                onChange = {(event) => {this.isAddressSame(event, 'billing')}}
                color = "primary" />}
                label="Address same as Corporate"/>  
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                id="billing_company_address"
                label="Address"
                margin="normal"
                value={formData.billing_company_address}
                onChange={this.updateField('billing_company_address')}
                fullWidth
                helperText={(error.billing_company_address !== null) ? '' : 'Address field required'}
                error={(error.billing_company_address !== null) ? false : true}/>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="billing_company_city"
                label="City"
                value={formData.billing_company_city}
                onChange={this.updateField('billing_company_city')}
                margin="normal"
                fullWidth
                helperText={(error.billing_company_city !== null) ? '' : 'City field required'}
                error={(error.billing_company_city !== null) ? false : true}/>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <FormControl xs={12} style={{'width': "100%"}} className="inputSelect">
                <InputLabel 
                      htmlFor="state" 
                      style={{'color': (error.billing_company_state === null) ? '#f44336': '#00000088'}}>
                      State
                </InputLabel>
                <Select
                  name="billing_company_state"
                  className="billing_company_state"
                  value={formData.billing_company_state}
                  onChange={this.updateField('billing_company_state')}
                  input={<Input id="billing_company_state" />}>
                  <MenuItem value="">
                    <em>-State-</em>
                  </MenuItem>
                  {us_states.map((n, i) => {
                        if(n !== null){
                          return (
                            <MenuItem value={n.sugar_id} key={i}>
                              {CommonService.toTitleCase(n.name)}
                            </MenuItem>                            
                          )}
                    })}
                </Select>
                {(error.billing_company_state === null) 
                    ? <FormHelperText style={{'color': '#f44336'}}>State is required!</FormHelperText>
                    : ""}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="billing_company_zip"
                label="Zip"
                value={formData.billing_company_zip}
                onChange={this.updateField('billing_company_zip')}
                margin="normal"
                fullWidth
                helperText={(error.billing_company_zip !== null ) ? '' : 'Zip field required'}
                error={(error.billing_company_zip !== "") ? false : true}/>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="billing_company_contact_name"
                label="Contact Name"
                value={formData.billing_company_contact_name}
                onChange={this.updateField('billing_company_contact_name')}
                margin="normal"
                fullWidth
                helperText={(error.billing_company_contact_name !== null) ? '' : 'Contact name field required'}
                error={(error.billing_company_contact_name !== null) ? false : true}/>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="billing_company_contact_mail"
                label="Contact Email"
                value={formData.billing_company_contact_mail}
                onChange={this.updateField('billing_company_contact_mail')}
                margin="normal"
                fullWidth
                helperText={(error.billing_company_contact_mail !== null) ? '' : 'Contact email required'}
                error={(error.billing_company_contact_mail !== null) ? false : true}/>
            </Grid>
            
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="billing_company_contact_phone"
                label="Contact Phone"
                value={formData.billing_company_contact_phone}
                onChange={this.updateField('billing_company_contact_phone')}
                margin="normal"
                fullWidth
                onInput = {(e) =>{
                    e.target.value = e.target.value.replace(/[^\d]/g, "");
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                    e.target.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                    e.target.value = (e.target.value == "NaN") ? "" : e.target.value;
                }}
                helperText={(error.billing_company_contact_phone !== null) ? '' : 'Contact phone field required'}
                error={(error.billing_company_contact_phone !== null) ? false : true}/>
            </Grid>
            {/* <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControlLabel
                control={<Checkbox checked={this.state.billingEmailRequired}
                onChange = {event => {this.checkBillingEmailRequired(event)}}
                color = "primary" />}
                label="Check to receive invoice electronically"/>             
            </Grid>
            {this.isBillingEmailRequired(formData.billing_email, data.billing_email)}  */}         
          </Grid>
        </div>


        <div  style={{'display': (this.props.activeTab == forms[5]) ? 'block': 'none'}}>
          <Grid container className="serviceTypeContainer">
            <Grid item xs={12} sm={4}>
              <Radio
                checked={this.props.formData.service_label === 'DOCTOR'}
                onChange={this.handleRadioChange}
                value="DOCTOR"
                name="radio-button-demo"
                aria-label="DOCTOR"
                />
              <b style={{fontWeight: (this.props.formData.service_label === 'DOCTOR') ? 'bold' : 'normal'}}>Doctor</b>
            </Grid>    
            <Grid item xs={12} sm={4}>
              <Radio
                checked={this.props.formData.service_label === 'DME'}
                onChange={this.handleRadioChange}
                value="DME"
                name="radio-button-demo"
                aria-label="DME"
                />
              <b style={{fontWeight: (this.props.formData.service_label === 'DME') ? 'bold' : 'normal'}}>DME</b>
            </Grid>    
            <Grid item xs={12} sm={4}>
              <Radio
                checked={this.props.formData.service_label === 'HOME CARE'}
                onChange={this.handleRadioChange}
                value="HOME CARE"
                name="radio-button-demo"
                aria-label="HOME CARE"
                />
              <b style={{fontWeight: (this.props.formData.service_label === 'HOME CARE') ? 'bold' : 'normal'}}>Home Care</b>
            </Grid>    
            <Grid item xs={12} sm={4}>
              <Radio
                checked={this.props.formData.service_label === 'HOME HEALTH'}
                onChange={this.handleRadioChange}
                value="HOME HEALTH"
                name="radio-button-demo"
                aria-label="HOME HEALTH"
                />
              <b style={{fontWeight: (this.props.formData.service_label === 'HOME HEALTH') ? 'bold' : 'normal'}}>Home Health</b>
            </Grid>    
            <Grid item xs={12} sm={4}>
              <Radio
                checked={this.props.formData.service_label === 'HOSPICE'}
                onChange={this.handleRadioChange}
                value="HOSPICE"
                name="radio-button-demo"
                aria-label="HOSPICE"
                />
              <b style={{fontWeight: (this.props.formData.service_label === 'HOSPICE') ? 'bold' : 'normal'}}>Hospice</b>
            </Grid>    
            <Grid item xs={12} sm={4}>
              <Radio
                checked={this.props.formData.service_label === 'MARKETER'}
                onChange={this.handleRadioChange}
                value="MARKETER"
                name="radio-button-demo"
                aria-label="MARKETER"
                />
              <b style={{fontWeight: (this.props.formData.service_label === 'MARKETER') ? 'bold' : 'normal'}}>Marketer</b>
            </Grid>    
            <Grid item xs={12} sm={4}>
              <Radio
                checked={this.props.formData.service_label === 'OTHER NON-HEALTHCARE'}
                onChange={this.handleRadioChange}
                value="OTHER NON-HEALTHCARE"
                name="radio-button-demo"
                aria-label="OTHER NON-HEALTHCARE"
                />
              <b style={{fontWeight: (this.props.formData.service_label === 'OTHER NON-HEALTHCARE') ? 'bold' : 'normal'}}>Non-Healthcare – Other</b>
            </Grid>    
            <Grid item xs={12} sm={4}>
              <Radio
                checked={this.props.formData.service_label === 'NURSE/PA'}
                onChange={this.handleRadioChange}
                value="NURSE/PA"
                name="radio-button-demo"
                aria-label="NURSE/PA"
                />
              <b style={{fontWeight: (this.props.formData.service_label === 'NURSE/PA') ? 'bold' : 'normal'}}>Nurse/PA</b>
            </Grid>    
            <Grid item xs={12} sm={4}>
              <Radio
                checked={this.props.formData.service_label === 'PRIVATE DUTY PROVIDER/SITTER'}
                onChange={this.handleRadioChange}
                value="PRIVATE DUTY PROVIDER/SITTER"
                name="radio-button-demo"
                aria-label="PRIVATE DUTY PROVIDER/SITTER"
                />
              <b style={{fontWeight: (this.props.formData.service_label === 'PRIVATE DUTY PROVIDER/SITTER') ? 'bold' : 'normal'}}>Private Duty Sitter/Provider</b>
            </Grid>    
            <Grid item xs={12} sm={4}>
              <Radio
                checked={this.props.formData.service_label === 'OTHER HEALTHCARE'}
                onChange={this.handleRadioChange}
                value="OTHER HEALTHCARE"
                name="radio-button-demo"
                aria-label="OTHER HEALTHCARE"
                />
              <b style={{fontWeight: (this.props.formData.service_label === 'OTHER HEALTHCARE') ? 'bold' : 'normal'}}>Healthcare - Other</b>
            </Grid>    
          </Grid>
        </div>
      </Fragment>
    )
  }
}
