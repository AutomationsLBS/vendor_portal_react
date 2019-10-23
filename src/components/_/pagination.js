import React, {Component, Fragment} from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableSortLabel,
  Hidden,
  Grid,
  
} from '@material-ui/core';
import Pagination from 'rc-pagination';
import DeleteIcon from '@material-ui/icons/Delete';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircle from '@material-ui/icons/CheckCircle';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import localeInfo from 'rc-pagination/lib/locale/en_US';
import Button from '@material-ui/core/Button';
import  DailgoSubscription  from  './subscription';
import  Dailgo   from './dialogbox';
import Moment from 'react-moment';
import axios from 'axios';
import ModalDialog from '../_/modal';



export default class ListComponent extends Component {
  constructor(props) {
    super(props);
    /* console.log("props", props); */
    this.state = {
      pgCurrent: 1,
      pgPerPage: 10,
      resident_iddata:"",
    };
    const totalData = [];
    this.onPaginationChange = this
      .onPaginationChange
      .bind(this);
  }
  componentDidMount() {
   /* const el = document.createElement('script');
    el.onload = () => {
      window.Chargebee.init({
        "site": "derp-test"
      });
      window.Chargebee.registerAgain();
      // this.setState({ chargebeeReady: true });
    };
    el.setAttribute('data-cb-site', 'derp-test');
    el.setAttribute('src', 'https://js.chargebee.com/v2/chargebee.js');
    document.body.appendChild(el);
    
  
    /* this.mediaSize['mobile'] = ['xs'];
    this.mediaSize['desktop'] = ['sm', 'md', 'lg', 'xl']; */
  }
  onPaginationChange = (page) => {
    /* console.log(page); */
    this.setState({pgCurrent: page});
  }
  doPaginate(data) {
    /* this.setState({...this.state, pgData: {data: data}}); */
    this.totalData = data;
  }
  showTotalRows = (data, arr) => {
    let actualData = [];
    for (let i = arr[0]; i <= arr[1]; i++) {
      let row = this.props.data[i - 1];
      actualData.push(row);
    }
    this.totalData = actualData;
    // this.doPaginate(actualData);
    /* console.log("Show Total Rows", data, arr); */
  }
  showPaginate() {
    // debugger;
    let array = this.props.data;
    let page_number = this.state.pgCurrent;
    let page_size = this.state.pgPerPage;
    --page_number; // because pages logically start with 1, but technically with 0
    if(array != null && array.length > 0){
      return array.slice(page_number * page_size, (page_number + 1) * page_size);
    }else{
      return [];
    }
  }

  
  
  
  render() {
   // const classes = useStyles();  


    // debugger;
    const {data} = this.props;
    const count = (data == undefined) ? 0 : data.length;
    return (
      <Fragment>
        <RenderPageItems 
              data={this.showPaginate()} 
              header={this.props.header} 
              view={this.props.view}
              rowEdit = {this.props.rowEdit}
              dispuite={this.props.dispuite}
              listDocuments={this.props.listDocuments}
              signout =  {this.props.signout}
              changeSubscriptionProp = {this.props.changeSubscriptionProp}
              chargeBeeStatus = {this.props.chargeBeeStatus}
              />
        <Pagination
          defaultCurrent={1}
          onChange={this.onPaginationChange}
          current={this.state.pgCurrent}
          hideOnSinglePage={true}
          locale={localeInfo}
          total={count}
          pageSize={this.state.pgPerPage}/>
      </Fragment>
    );
  }
}

const RenderPageItems = (props) => {
  const data = props;
  const desktopMedia = ['xs'];
  const mobileMedia = ['sm', 'md', 'lg', 'xl'];
  const doPaginate = (props) => {
    // console.log("At Render Page Items", props);
  }
  doPaginate(props);
  const showOptions = () => {}
  const renderImage = (key, data) => {
    if (key == 0 && data.hasOwnProperty('image')) {
      return (
        <div className="profileImage"><img src={data.image}/></div>
      );
    }
  }

  const rowsRender = (props) => {
    console.log("All Props at child RowsRender", props);

    const desktopMedia = ['xs'];
    const mobileMedia = ['sm', 'md', 'lg', 'xl'];

    if (props.data.length > 0) {
      return (
        <Fragment>
          <div className="paginationHolder">
            <Hidden only={desktopMedia}>
            
            </Hidden>
            <Hidden only={mobileMedia}>
              {props
                .data
                .map((n, i) => {
                  return (
                    <div key={i} className="mobilePagitnationItem">
                      <RenderRow data={n}/>
                    </div>
                  )
                })
              }
            </Hidden>
          </div>
        </Fragment>
      )
    } else {
      return (
        <div>
          {/* <h3>No Records to show</h3> */}
        </div>
      )
    }
  }

  const loadView = (props, view) => {
    console.log("At Load View", props, view);
    switch(props.view) {
      case "employees":
        return <Employees {...props} device={view} />;          
      break;
      default: 
        return "No View Found";
    }
  }

  return (
    <Fragment>
      <div className="paginationHolder">
        <Hidden only={desktopMedia}>
          {loadView(props, "desktop")}
        </Hidden>
        <Hidden only={mobileMedia}>
          {loadView(props, "mobile")}
        </Hidden>
      </div>
    </Fragment>
  )
}

const RenderRow = (props) => {
  const view = window.location.pathname;
  const render = () => {
    if (view == "/employees") {
      return (
        <Fragment>
          <Employees {...props.data}/>
        </Fragment>
      )
    } else if (view == "/visit") {
      return (
        <div>Rendering Visit</div>
      )
    } else if (view == "/communities") {
      return (
        <div>Rendering Communities</div>
      )
    } else {
      return (
        <div>No View</div>
      )
    }
  }
  return (
    <div>
      {render()}
      {/* JSON.stringify(props.data) */}
    </div>
  )
}

const Employees = (props) => {
  console.log("At Employees Table", props);
  const renderImage = (data) => {
    if (data.hasOwnProperty('image')) {
      return (
        <div className="profileImage"><img src={data.image}/></div>
      );
    }
  }
  const editingRow = (id) => {
    // console.log("Editing Row", id);
    props.rowEdit(id);
  }

  const  signout =(id)=>{

    props.signout(id);
  }
  const changeSubcription =(id,type)=>{
    props.changeSubscriptionProp(id,type);
  }
  const chargeBeeStatus = ()=>{
     return props.chargeBeeStatus 
  }
  const dispuiteEmployee = data => {
    // console.log("Disputing Employee at Pagination", data);
    if(data.status !== "Disputed"){
      props.dispuite(data);
    }
  }
  const listDocuments = data => {
    console.log("Showing List at Pagination of Documents", data);
    props.listDocuments(data);
  }
  const renderView = (props) => {
    console.log("\n\n/////////// At Render View Pagination \n", props);
    if(props.device == "desktop"){
      return (
        <Table className="listTable">
          <TableHead>
            <TableRow>
            <TableCell>Resident Name</TableCell>
              <TableCell>Community Name</TableCell>
              
              <TableCell>Community City</TableCell>
             
              <TableCell>Latest Visit</TableCell>
              <TableCell> Status</TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {props
              .data
              .map((n, i) => {
                /* console.log(n) */
              //  let chargeBee = 
                              return (
                  <TableRow key={i}>
                  
                  <TableCell>{n.visit.resident_name}</TableCell>
                    <TableCell>{n.visit.name}</TableCell>
                   
                    <TableCell>{n.visit.shipping_city}</TableCell>
                   
                    <TableCell> <Moment format="MM/DD/YYYY" >{n.visit.latest_visit}</Moment></TableCell>
                    
                    <TableCell>
                      
                    { (n.access_resident_data ==true )? (n.resident_subscription_id !='' && n.resident_subscription_id !=null )? (
                      
                      <div>
                        {(n.chargebee_status != "Inactive")?
                          <div>
                          <div>
                          
                            <Button   variant="contained" onClick={() => {changeSubcription(n.visit,'cancel')}}   color="primary"  >Cancel</Button>
                          </div>
                         { /* <div> 
                            <a href="javascript:void(0)"  style ={{textDecoration: "none"}}    onClick={() => {changeSubcription(n.visit,'cancel')}} color="primary"  >Cancel Subscription</a>
                         </div> */}
                           </div>
                               :
                               <div>
                              
                               <div>
                               <Button  variant="contained" onClick={() => {changeSubcription(n.visit,"resume")}} color="primary"  >Reactivate</Button> 
                             </div>
                            { /* <div>
                                <a href="javascript:void(0)" style ={{textDecoration: "none"}}    onClick={() => {changeSubcription(n.visit,"resume")}} color="primary"  >Reactivate  Subscription</a>
                            </div>  */}
                        </div>
                           }
                          
                        
                        </div> ) : (
                            <div>  <DailgoSubscription /> </div>
                             
                           // <Dailgo reisdentData = {n.visit} /> 
                     )
                    : ""
                    }
                   
                  
                      </TableCell>

                      <TableCell>
                      {  (n.access_resident_data ==true )? (n.resident_subscription_id !=null && n.resident_subscription_id !='')? (
                          <div>
                           {(n.chargebee_status != "Inactive")?
                           <div>
                             <a href="javascript:void(0)"  style ={{textDecoration: "none"}}
                          onClick={() => {editingRow(n.visit)}}>
                          
                          Visitor Report
                         
                      </a>
                           </div>
                          :""}
                          </div>
                    
                      ) : ("" )  : "" }
                        
                      </TableCell>


                  <TableCell>
                  {  (n.access_resident_data ==true )? (n.resident_subscription_id !=null && n.resident_subscription_id !='')? (
                          <div>
                      {(n.chargebee_status != "Inactive")?
                                <div>
                                 <a href="javascript:void(0)" style ={{textDecoration: "none"}} 
                          onClick={() => {signout(n.visit)}}>
                          
                          Resident Sign-out Report
                                           </a> 
                                           </div>
                                           : "" }

                          </div>
                                             
                      ) : (
                      
                          ""
                      ) : ""}
                        
                 
                  </TableCell>
                      

                   
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      );
    }else if(props.device === "mobile"){
      return(
        <div className="mobilePagitnationItem">
          <Table className="listTable">
            <TableHead>
              <TableRow>
              <TableCell>Resident Name</TableCell>
              <TableCell>Community Name</TableCell>
              
              <TableCell>Shipping City</TableCell>
              <TableCell>Shipping Zip</TableCell>
              <TableCell>Latest Vist</TableCell>
              <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props
                .data
                .map((n, i) => {
                  /* console.log(n) */
                  return (
                    <TableRow key={i}>
                      
                      <TableCell>{n.visit.resident_id}</TableCell>
                    <TableCell>{n.visit.name}</TableCell>
                    <TableCell>{n.visit.rnameesident_postgres_id}</TableCell>
                    <TableCell>{n.visit.shipping_city}</TableCell>
                    <TableCell>{n.visit.shipping_zip}</TableCell>
                    <TableCell>{n.visit.latest_visit}</TableCell>
                  
                    <TableCell>
                        <a href="javascript:void(0)" ><EditIcon className="icon icon-edit"/></a>
                       
                      </TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </div>
      ) 
    }
  }

  return (
    <Fragment>
      {renderView(props)}
    </Fragment>
  )
}