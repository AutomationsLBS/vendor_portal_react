import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions,
  Grid,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  Tooltip,
  TableSortLabel,
  IconButton,
  Modal,
  Slide,
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
  InputLabel
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FilterListIcon from '@material-ui/icons/FilterList';
import Done from '@material-ui/icons/Done';
import Info from '@material-ui/icons/Info';
import Clear from '@material-ui/icons/Clear';
import {Scrollbars} from 'react-custom-scrollbars';
import axios from 'axios';
import MainNav from '../_/navigation';
import Config from '../../container/config';
import {callUsers} from '../../actions';
import store from '../../store';
import {getAllUsers} from '../../actions';
import ListComponent from './list';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import CommonService from '../../service/commonServices';
import { ToastContainer, toast } from 'react-toastify';
import ModalDialog from '../_/modal';


const ITEM_HEIGHT = 48;
function  Transition(props) {
  return <Slide direction="up" {...props} />;
}

export default class Employees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      employeesFilterArr: [],
      anchorEl: null,
      loader: false,
      fitlerOpen: false,
      filter: {
        search: "",
        showNoData: false
      },
      doRedirect: false,
      redirectUrl: null,
      modalOpen: false,
      modalValue: false,
      modalData: {
        title: null,
        body: "",
      },
      documentModalOpen: false,
      documentModalValue: false,
      documentModalData: {
        title: null,
        body: "",
      },
      documentListData: {},
      disputeId: "",
      disputeData: {},
      dispute: {reason: "", id: ""},
      disputeError: {},
      disputeReasons: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getEmpoyeesList = this.getEmpoyeesList.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }
  componentWillMount() {}
  componentDidMount() {
    console.log("All Props", this.props);
    this.getEmpoyeesList();
  }

  addProfilePic(data) {
    // console.log("Add Profile", data);
    for(let i = 0; i< data.length; i++){
      let item = data[i];
      let id = i % 10;
      item.image = Config.images + "profiles/" + (id+1) + ".jpeg";      
    }
    console.log("Data", data);
    return data;
  }

  getEmpoyeesList() {
    let that = this;
    this.setState({loader: true});
    axios
      .get(axios.getEmployees())
      .then((response) => {
        this.setState({loader: false});
        if(this.state.employees.length > 0){
          /* toast.success("Employees List! Successfully...", {
            position: toast.POSITION.TOP_CENTER
          }); */
        }
        // debugger;
        console.log("Employee Response", response);
        let employees = response.employees;
        let services = JSON.parse(response.service_labels);
        CommonService.localStore.set("service_label", JSON.stringify(services));
        if(response.employees.length == 0){
          this.setState({showNoData: true});
        }else{
          this.setState({showNoData: false});
        }
        for(let i = 0; i< employees.length; i++){
          const item = employees[i]['employee_details'];
          const lastVisitedData = employees[i]['last_visit_date'];
          item.status = employees[i]['employee_status'];
          // if(item.name == null ){
          item.name = item.first_name + " " + item.last_name;
          item.name = CommonService.toTitleCase(item.name);
          item.status = (item.status == "defunct" || item.status == "dispute") ? "Disputed" : CommonService.toTitleCase(item.status)
          item.email = (item.email == null) ? " - " : item.email;
          item.phone = item.phone_mobile;
          item.lastVisitedData = lastVisitedData;          
          // }
          item.service = (item.service == (0 || null || undefined)) ? "-" : CommonService.toTitleCase(services[item.service]);
          if(item.image == undefined && item.image == null){
            item.image = Config.images +  "user.png";
          }

          employees[i] = item;
        }

        this.setState({
            employees: response.employees, 
            employeesFilterArr: response.employees,
            disputeReasons: JSON.parse(response.dispute_reasons)
          });

          let state = this.state;

          console.log("State ", state);
        // console.log("Employees List", this.state.employees);
      })
      /* .then(allUsers =>
            dispatch({
              type: ALL_USERS,
              users: allUsers
            })
          ) */
      .catch(function (error) {
        that.setState({loader: false});
        // debugger;
        if(error !== undefined && error.response !== undefined){
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER
          });
        }
        console.log("At First Error", error);
      });
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleToggle = () => {
    this.setState(state => ({
      fitlerOpen: !state.fitlerOpen
    }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {return;}
    this.setState({ open: false });
  };
  toggleFilter = () => {
    let state = this.state;
    state.fitlerOpen = !state.fitlerOpen
    if (state.fitlerOpen == false) {
      state.filter.search = "";
    }
    this.setState(state);
  }
  
  renderFilter = () => {
    if (this.state.fitlerOpen) {
      return (
        <Fragment>
          Rendering Filter
        </Fragment>
      )
    }
  }
  updateFilterField = (event, field) => {
    // console.log("Updating Field", field, event);

    let state = this.state;
    state.filter[field] = event.target.value;
    this.setState(state)
  }
  doSearch = event => {
    event.preventDefault();
    event.stopPropagation()
    let searchKey = this.state.filter.search;
    let obj = this.state.employees;
    let arr = {};
    let finalObj = [];
    if(searchKey !== ""){
      for(var i=0; i < obj.length; i++){
        var row = obj[i];
        for(var key in row){
            var item = row[key];
            // console.log("key", key, item);
            if(typeof item == "string"){
                item = item.toLowerCase();
                searchKey = searchKey.toLowerCase();
                if(item.indexOf(searchKey) > -1){
                    arr[i] = i;
                    // console.log("\n\ni am string\n", i, key, item, "\nArr : ", arr);
                }
            }
        }
      }
      for(var key in arr){
        finalObj.push(obj[key]);
      }
      this.setState({employeesFilterArr: finalObj});
    }else{
      this.setState({employeesFilterArr: this.state.employees});
    }
  }

  showListMessage = (data) => {
    if(data != undefined && data.length == 0){
      return(
        <div>
          <h3>No Records to show</h3>
        </div>
      )
    }
  }
  editRow = (data) => {
    if(data !== undefined && data !== null){
      this.setState({
        doRedirect: true, 
        redirectUrl: '/employees/edit/'+data.sugar_id
      });
    }
    let state = this.state;
    console.log("Editing Row At Employees", data, state);
  }
  createEmployee = () => {
    this.setState({
      doRedirect: true, 
      redirectUrl: '/employees/create/'
    });
  }
  employeeDispuite = data => {
    let message = "";
    if(data.status === "Disputed") {
      message = "Are you sure! You want to Un-Dispute \""+ data.name +"\"?"
    }else{
      message = "Are you sure! You want to Dispute \""+ data.name +"\"?"
    }
    this.setState({
      modalOpen: true,
      modalData: {body: message},
      dispute: {id: data.sugar_id},
      disputeData: data
    });
    console.log("Disputing at Employees module\n", data);    
  }

  disputeConfirm = (data) => {   
    // debugger;
    console.log("Disputed Data", data);
    this.setState({
      dispute: {id: "", reason: "", disputeData: {}, disputeError: {}},
      modalValue: false
    });
    this.setState({loader: true});
    axios
      .post(axios.disputeEmployee(data.id), {reason: data.reason})
      .then((response) => {
        this.setState({loader: false});
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER
        });
        this.getEmpoyeesList();
      })
      .catch(error => {
        this.setState({loader: false});
        if(error !== undefined && error.response !== undefined){
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER
          });
        }
        console.log("At First Error", error);
      }); 
  }
  handleModalClose = event => {
    this.setState({
      modalOpen: false,
      modalValue: false,
      modalData: {body: ""},
      dispute: {id: "", reason: ""},
      disputeData: {}
    });
  }
  handleModalOk = event => {
    event.preventDefault();
    let state = this.state;
    if(state.dispute.reason === undefined || state.dispute.reason === ""){
      state['disputeError']['reason'] = null;
    }else{
      state['modalOpen'] = false;
      state['modalValue'] = true;
      state['disputeError'] = {};
    }
    this.setState(state);
  }
  disputeFormFieldChange = name => event => {
    console.log("Dispute reson changed", name);
    let state = this.state;
    state['dispute'][name] = event.target.value;
    if(event.target.value === ""){
      state['disputeError']['reason'] = null;
    }else{
      state['disputeError'] = {};
    }
    this.setState(state);
  }

  listDocuments = data => {
    console.log("At Employees ", data);
    this.setState({
      documentModalOpen: true,
      documentModalData: {title: "Documents List", body: "Showing List of Docunets"},
      documentListData: data
    });
  }
  documentHandleModalClose = event => {
    this.setState({
      documentModalOpen: false,
      documentModalData: {body: ""}
    });
  }

  render() {
    const {
      anchorEl, 
      loader, 
      employees, 
      showNoData, 
      doRedirect, 
      redirectUrl,
      modalOpen, 
      modalValue, 
      modalData,
      documentModalOpen, 
      documentModalData,
      documentListData,
      dispute,
      disputeError,
      disputeData,
      disputeId,
      disputeReasons} = this.state;
    const open = Boolean(anchorEl);

    if (doRedirect) {
      return <Redirect to={redirectUrl}/>;
    }

    if(modalValue){
      this.disputeConfirm(dispute);
    }
    

    return (
      <Grid container>
        <Grid container>
          <Grid item sm={6}>
            <Typography className="pageTitle titleSection" variant="title" gutterBottom>
              Employees
            </Typography>
          </Grid>
          <Grid item sm={6} align="right">
            <Button className="btn btn-primary btn-round"
                    onClick={this.createEmployee}>Create</Button>
            <Button buttonRef={node => { this.anchorEl = node; }}
              			aria-owns={open ? 'menu-list-grow' : null}
              			aria-haspopup="true"
              			onClick={(event) => {
										this.handleClose(event);
										this.handleToggle();
										this.toggleFilter();
									}}>
              <FilterListIcon/>
            </Button>            
          </Grid>
          <Grid item sm={12} className={(this.state.fitlerOpen) 
																? "filterContainer active"
																: "filterContainer inactive"}>
            <Grid item className="filterContent">
              {/* <div className="filterHeading">
                <b>Filter</b>
              </div> */}
              <div className="filterFields">
                <form className="commentForm" onSubmit={this.doSearch}>
                  <div className="filterItem">
                    <label>Search</label>
                    <input
                    type="text"
                    placeholder="Search"
                    value={this.state.filter.search}
                    onChange={event => {
                      this.updateFilterField(event, 'search');
                    }}/>
                  </div>
                  <span className="submitFilterInline">
                    <button type="submit" className="btn btn-primary">Search</button>
                  </span>
                </form>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <ListComponent
            {...this.props}
            data={this.state.employeesFilterArr}
            rowEdit={this.editRow}
            dispuite={this.employeeDispuite}
            listDocuments={this.listDocuments}
            header={["name", "email", "phone", "service", "status"]}/>
            {
              (showNoData) ? (<div><h3>No records to show!</h3></div>) : null
            }
        </Grid>
        {CommonService.renderLoader(loader)}
        {/* <ToastContainer autoClose={5000} /> */}
        <Dialog
          open={modalOpen}
          onClose={this.handleModalClose}
          TransitionComponent={Transition}>
          <div className="modalHolder">
            { 
              (modalData.title !== (null || undefined)) 
                ? (<div className="modalTitle">{modalData.title}</div>)
                : ""
            }
            <form onSubmit={this.handleModalOk}>
              <div className="modalBody">
                <div>
                    <div className="disputeHeading">
                        What is the reason for dispute <b>{disputeData.name}</b>?
                    </div>
                    <div>                      
                      <FormControl xs={12} style={{'width': "100%"}} className="inputSelect">
                        <InputLabel 
                              htmlFor="disputeReason" 
                              style={{'color': (disputeError.reason === null) ? '#f44336': '#00000088'}}>
                              Reason
                        </InputLabel>
                        <Select
                          name="dispute_reason"
                          className="dispute_reason"
                          value={dispute.reason}
                          onChange={this.disputeFormFieldChange('reason')}
                          input={<Input id="dispute_reason" />}>
                          <MenuItem value="">
                            <em>-Dispute Reason-</em>
                          </MenuItem>
                          {disputeReasons.map((n, i) => {
                                if(n !== null){
                                  return (
                                    <MenuItem value={n} key={i}>
                                      {CommonService.toTitleCase(n)}
                                    </MenuItem>                            
                                  )}
                            })}
                        </Select>
                        {(disputeError.reason === null) 
                            ? <FormHelperText style={{'color': '#f44336'}}>Reason is required!</FormHelperText>
                            : ""}
                    </FormControl>
                    </div>
                </div>
              </div>
              <div className="modalFooter">
                {/* <button className="btn btn-secondary" onClick={this.handleModalClose}>No</button> */}
                <button type="submit" className="btn btn-primary margin-left-10">Dispute</button>
              </div>
            </form>
            
          </div>
        </Dialog>
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          className="documentModalContainer"
          open={documentModalOpen}
          onClose={this.documentHandleModalClose}
          aria-labelledby="max-width-dialog-title">
          <DialogTitle id="max-width-dialog-title">
            Documents List
            <a href="javascript:void(0)" className="close" onClick={this.documentHandleModalClose}>
              <Clear className="modalClose" />
            </a>
          </DialogTitle>
          <DialogContent>
              {/* JSON.stringify(documentListData) */}
              <div className="documentItemHolder">
                <div className="documentItem">
                      <div>
                            {
                              (documentListData.req_bkg_check && documentListData.req_bkg_check !== null) 
                              ? (<span title="Submited"><Done style={{'color': 'green'}} /></span>) 
                              : (<span title="Not Submited"><Clear style={{'color': 'red'}} /></span>)
                            }
                      </div>
                      <b>Background Check {/* JSON.stringify(documentListData.req_bkg_check) */}</b>
                </div>
                <div className="documentItem">
                      <div>
                            {
                              (documentListData.req_tb_test && documentListData.req_tb_test !== null) 
                              ? (<span title="Submited"><Done style={{'color': 'green'}} /></span>) 
                              : (<span title="Not Submited"><Clear style={{'color': 'red'}} /></span>)
                            }
                      </div>
                      <b>Negative TB {/* JSON.stringify(documentListData.req_tb_test) */}</b>
                </div>
                <div className="documentItem">
                      <div>
                            {
                              (documentListData.req_has_drug_screen && documentListData.req_has_drug_screen !== null) 
                              ? (<span title="Submited"><Done style={{'color': 'green'}} /></span>) 
                              : (<span title="Not Submited"><Clear style={{'color': 'red'}} /></span>)
                            }
                      </div>
                      <b>Has Drug Screen {/* JSON.stringify(documentListData.req_has_drug_screen) */}</b>
                </div>
                <div className="documentItem">
                      <div>
                            {
                              (documentListData.req_employ_verify && documentListData.req_employ_verify !== null) 
                              ? (<span title="Submited"><Done style={{'color': 'green'}} /></span>) 
                              : (<span title="Not Submited"><Clear style={{'color': 'red'}} /></span>)
                            }
                      </div>
                      <b>Employment Verification {/* JSON.stringify(documentListData.req_employ_verify) */}</b>
                </div>
                <div className="documentItem">
                      <div>
                            {
                              (documentListData.req_has_auto_ins && documentListData.req_has_auto_ins !== null) 
                              ? (<span title="Submited"><Done style={{'color': 'green'}} /></span>) 
                              : (<span title="Not Submited"><Clear style={{'color': 'red'}} /></span>)
                            }
                      </div>
                      <b>Has Auto Insurance {/* JSON.stringify(documentListData.req_has_auto_ins) */}</b>
                </div>

              </div>          
          </DialogContent>
          <DialogActions className="footerHolder">
            <div className="infoContent">
              <div><Info className="infoIcon icon icon-edit" /></div>
               <div className="infoText">Please send missing documents to support@accushield.com</div>
            </div>
            {/* <Button onClick={this.documentHandleModalClose} color="primary">
              Close
            </Button> */}
          </DialogActions>
        </Dialog>
      </Grid>
    );
  };
}