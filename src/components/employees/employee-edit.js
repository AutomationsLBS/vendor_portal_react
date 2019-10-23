import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Grid,
  Menu,
  MenuList,
  MenuItem,
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
  TextField
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FilterListIcon from '@material-ui/icons/FilterList';
import {Scrollbars} from 'react-custom-scrollbars';
import axios from 'axios';
import Config from '../../container/config';
import {callUsers} from '../../actions';
import store from '../../store';
import {getAllUsers} from '../../actions';
import ListComponent from './list';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import CommonService from '../../service/commonServices';
import { ToastContainer, toast } from 'react-toastify';
import { matchPath } from 'react-router-dom';
import './employee.scss';

const ITEM_HEIGHT = 48;

export default class EmployeesEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      pageTitle: "",
      employee: {},
      serviceTypes: [],
      employeeData: {
        "phone_mobile": "",
        "first_name": "",
        "last_name": "",
        "email": "",
        "service_label": ""
      },
      employeeError: {},
      doRedirect: false,
      redirectUrl: null
    }
    this.getEmpoyeeListById = this.getEmpoyeeListById.bind(this);
  }
  componentWillMount() {}
  componentDidMount() {
    console.log("All Props", this.props);    
    this.getEmpoyeeListById(this.getParams());
  }

  getParams() {
    const match = matchPath(this.props.history.location.pathname, {
        path: '/employees/edit/:id',
        exact: true,
        strict: false
    });
    console.log("MATch Params", match);
    this.pageTitle(match);

    return (match !== (null || undefined) && match.params !== (null || undefined)) 
                    ? match.params.id 
                    : null;
  }

  pageTitle(match) {
    const arr = match.path.split('/');
    if(arr[2] === "edit"){
        this.setState({pageTitle: "Edit Employee"});
    }else if(match == null){
        this.setState({pageTitle: "Create Employee"});
    }
    console.log("At Page Title Method\n", this.state);
  }
  handleFormChange = name => event => {
    let state = this.state;
    state.employeeData[name] = event.target.value;
    state.employeeError[name] = (event.target.value !== null && event.target.value !== '') ? '' : null;
    this.setState(state);
  }
  handleRadioChange = event => {
    var state = this.state;
    state.employeeData.service_label = event.target.value;
    this.setState(state);
  }


  getEmpoyeeListById(id) {
    let that = this;
    if(id !== (null || undefined)){
        this.setState({loader: true});
        axios
        .get(axios.getEmployeeById(id))
        .then((response) => {
            this.setState({loader: false});
            /* toast.success("Employees List! Successfully...", {
            position: toast.POSITION.TOP_CENTER
            }); */
            // debugger;
            console.log("Employee Response", response);
            debugger;
            let employee = response.employee_data;
            let serviceLabel = CommonService.localStore.get("service_label");
            let services = JSON.parse(serviceLabel.service_label);
            this.setState({
                serviceTypes: services
            });
            if(this.getParams() !== null){
                // const lastVisitedData = employee[i]['last_visit_date'];
                const baseObj = {
                    "id": employee.sugar_id,
                    "phone_mobile": employee.phone_mobile,
                    "first_name": employee.first_name,
                    "last_name": employee.last_name,
                    "email": employee.email,
                    "service_label": services[employee.service]
                };
                console.log("Selected Record is ", employee);
                // if(item.name == null ){
                employee.name = employee.first_name + " " + employee.last_name;
                employee.name = CommonService.toTitleCase(employee.name)
                employee.status = CommonService.toTitleCase(employee.status)
                employee.email = (employee.email == null) ? " - " : employee.email;
                employee.phone = employee.phone_mobile;
                // }
                employee.service = (employee.service == ( 0 || null || undefined)) ? "-" : CommonService.toTitleCase(services[employee.service]);
                if(employee.image == undefined && employee.image == null){
                    employee.image = Config.images +  "user.png";
                }

                let obj = {
                    employee_data: employee
                }

                this.setState({
                    employee: obj,
                    serviceTypes: services,
                    employeeData: baseObj
                });

                console.log("this.state in edit employee\n", this.state);
            }else{
                this.setState({
                    doRedirect: true,
                    redirectUrl: "/employees"
                });
            }
            
        })
        .catch(function (error) {
            that.setState({loader: false});
            /* toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER
            }); */
            console.log("At First Error", error);
        });
    }
  }
  submitEmployeeForm = () => {
      console.log("Employee Creation Submitted", this.state.employeeData);
      console.log("Employee Creation Submitted", this.state.employeeData);
    let that = this;
    this.setState({loader: true});
    axios
      .post(axios.editEmployee(), this.state.employeeData)
      .then((response) => {
        this.setState({loader: false});
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER
        });
        console.log("Employee Create Response", response);
        // setTimeout(() => {
            this.setState({
                doRedirect: true,
                redirectUrl: '/employees'
            });
        // }, 3000);
      })
      .catch(function (error) {
        that.setState({loader: false});
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
        console.log("At First Error", error);
      });
  }
    
  cancelEdit = () => {
      this.setState({
          doRedirect: true,
          redirectUrl: "/employees"
      })
  }

  render() {
    const {loader, employee, pageTitle, employeeData, employeeError, serviceTypes, doRedirect, redirectUrl} = this.state;

    if (doRedirect) {
        return <Redirect to={redirectUrl}/>;
    }
    return (
      <Grid container>
        <Grid container className="header" justify="space-between" >
            <Grid item>
                <Typography className="pageTitle titleSection" variant="title" gutterBottom align="left">
                    {pageTitle}
                </Typography>
            </Grid>
        </Grid>
        <Grid container spacing={32}>
        {/* "phone_mobile": "",
        "first_name": "",
        "last_name": "",
        "email": "",
        "service_label": "" */}
            <Grid item xs={12} sm={6}>
                <TextField
                    label="First Name"
                    value={employeeData.first_name}
                    onChange={this.handleFormChange('first_name')}
                    placeholder="First Name"
                    type="text"
                    fullWidth
                    margin="normal"
                    helperText={(employeeError.first_name !== null) ? "" : "First Name field required."}
                    error={(employeeError.first_name !== null)
                    ? false
                    : true}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Last Name"
                    value={employeeData.last_name}
                    onChange={this.handleFormChange('last_name')}
                    placeholder="Last Name"
                    type="text"
                    fullWidth
                    margin="normal"
                    helperText={(employeeError.last_name !== null) ? "" : "Last Name field required."}
                    error={(employeeError.last_name !== null)
                    ? false
                    : true}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                label="Phone"
                value={employeeData.phone_mobile}
                onChange={this.handleFormChange('phone_mobile')}
                margin="normal"
                onInput = {(e) =>{
                  e.target.value = e.target.value.replace(/[^\d]/g, " ");
                  e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10);
                  e.target.value = (e.target.value == "NaN") ? "" : e.target.value;
                }}
                fullWidth
                disabled
                helperText={(employeeError.phone_mobile !== null) ? "" : "Phone field is requied"}
                error={(employeeError.phone_mobile !== null) ? false : true}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="email"
                label="Email"
                value={employeeData.email}
                onChange={this.handleFormChange('email')}
                margin="normal"
                fullWidth
                helperText={(employeeError.email !== null) ? "" : "Email field is required"}
                error={(employeeError.email !== null) ? false : true}/>
            </Grid>
        </Grid>
        <Grid container className="serviceTypeContainer1 margin-top-20" spacing={32}>
            <Grid item xs={12} sm={12}>
                <b>SERVICE TYPE</b> : {employeeData.service_label}
            </Grid>
                {
                    /* serviceTypes.map((n, i) => {
                        if(n !== null){
                            return (
                                <Grid item xs={12} sm={4} key={i}>
                                    <Radio
                                        checked={employeeData.service_label === n}
                                        onChange={this.handleRadioChange}
                                        value={n}
                                        name="serviceType"
                                        aria-label={CommonService.toTitleCase(n)}
                                        />
                                <b className="serviceTypeLabel">{CommonService.toTitleCase(n)}</b>
                                </Grid> 
                            )
                        }
                    }) */
                }
        </Grid>
        <Grid container spacing={32} className="margin-top-20">
            <Grid item xs={12} sm={12} className="btnHolder">
                <Button
                    onClick={this.cancelEdit}   
                    className="btn btn-secondary">
                    Cancel
                </Button>
                <Button
                    onClick={this.submitEmployeeForm}
                    variant="contained"
                    color="primary"
                    className="btn btn-primary">
                    Update
                </Button>
            </Grid>
        </Grid>





        {CommonService.renderLoader(loader)}
        <ToastContainer autoClose={5000} />
      </Grid>
    );
  };
}