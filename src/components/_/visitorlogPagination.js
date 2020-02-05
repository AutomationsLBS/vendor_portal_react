import React, {Component, Fragment} from 'react';
import {
  Table,
  TableHead,
  TableBody,
  
  TableRow,
  TableCell,
  
  Hidden,
  
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import Avatar from '@material-ui/core/Avatar';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/en_US';

export default class ListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pgCurrent: 1,
      pgPerPage: 20,
    };
  //  const totalData = [];
    this.onPaginationChange = this
      .onPaginationChange
      .bind(this);
  }

  
  componentDidMount() {
    /* this.mediaSize['mobile'] = ['xs'];
    this.mediaSize['desktop'] = ['sm', 'md', 'lg', 'xl']; */
  }
  onPaginationChange = (page) => {
     console.log(page); 
    
    this.setState({pgCurrent: page});
    let reisentId = (this.props.residentId == null)? null : this.props.residentId ;
    this.props.getVisitorLogs(reisentId,page);
   
    
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
   
    let array = this.props.data;
    
    

    let page_number = this.state.pgCurrent;
    let page_size = this.props.per_page;
    --page_number; // because pages logically start with 1, but technically with 0
    if(array != null && array.length > 0){
       let slicedata =  array.slice();
       
       
      return slicedata
    }else{
      return [];
    }
  }

  render() {
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
              listDocuments={this.props.listDocuments}/>
        <Pagination
          defaultCurrent={1}
          onChange={this.onPaginationChange}
          current={this.state.pgCurrent}
          hideOnSinglePage={true}
          locale={localeInfo}
          total={this.props.total_entrie}
          pageSize={this.props.per_page}/>
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
      debugger;
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
              <TableCell>Date</TableCell>
              <TableCell>Time In</TableCell>
              <TableCell>Time Out</TableCell>
              <TableCell>Duration (Minutes)</TableCell>
              <TableCell>Visitor Name</TableCell>
              <TableCell>Service Type</TableCell>
              <TableCell>Resident/Staff</TableCell>
      { /*  <TableCell>Visitor status </TableCell> */ }
              
            { /*  <TableCell>Photo</TableCell> */} 
              
            </TableRow>
          </TableHead>
          <TableBody>
            {props
              .data
              .map((n, i) => {
                 const dates  = n.on_date.split("/")
                 const year  = dates[2];
                 let day = dates[1]
                    day =  (day[0] == 0)? day[1] :day;
                 let  month = dates[0]
                 month  = (month[0] == 0) ?month[1] :month;
                  let duration_day = (n.duration_mins)?n.duration_mins.toFixed(0):n.duration_mins ;
                 let session_time_end_varible = n.session_time_end
                 if (n.session_time_end =="" || n.session_time_end ==null || n.session_time_end  == undefined ){
                  duration_day = "In Progress"
                  session_time_end_varible = "---"
                 }
                return (
                  <TableRow key={i}>
                   
                    <TableCell>{n.on_date}</TableCell>
                    <TableCell>{n.session_time_start}</TableCell>
                    <TableCell>{session_time_end_varible}</TableCell>
                    <TableCell>{duration_day}</TableCell>
                    <TableCell>{n.visitor_name}</TableCell>
                    <TableCell>{n.service_type}</TableCell>

                    <TableCell>{n.resident_name}</TableCell>
                  { /*   <TableCell>{n.visitor_status}</TableCell> <TableCell><img width="90px" height="80px" src={  "https://s3.amazonaws.com/accushield-uploads-prod/"+year+"/"+month+"/"+day+"/visit-"+n.session_id+"-0.jpg" }  /></TableCell> */ }
                    
                   
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
              <TableCell>Date</TableCell>
              <TableCell>Sign-in</TableCell>
              <TableCell>Sign-Out</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Visitor</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>status </TableCell>
              
              <TableCell>Visitor Type</TableCell>
              <TableCell>Device Name</TableCell>
              
              <TableCell>Resident/staff</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props
                .data
                .map((n, i) => {
                  /* console.log(n) */

                  const dates  = n.on_date.split("/")
                  const year  = dates[2];
                  let day = dates[1]
                     day =  (day[0] == 0)? day[1] :day;
                  let  month = dates[0]
                  month  = (month[0] == 0) ?month[1] :month;
                   let duration_day = (n.duration_mins)?n.duration_mins.toFixed(0):n.duration_mins ;
                  let session_time_end_varible = n.session_time_end
                  if (n.session_time_end =="" || n.session_time_end ==null || n.session_time_end  == undefined ){
                   duration_day = "In Progress"
                   session_time_end_varible = "---"
                  }

                  return (
                    <TableRow key={i}>
                    
                      <TableCell>{n.on_date}</TableCell>
                    <TableCell>{n.session_time_start}</TableCell>
                    <TableCell>{n.session_time_end}</TableCell>
                    <TableCell>{Math.round(n.duration_mins)}</TableCell>
                    <TableCell>{n.visitor_name}</TableCell>

                    <TableCell>{n.phone_num}</TableCell>
                    <TableCell>{n.visitor_status}</TableCell>
                    <TableCell>{n.visitor_type}</TableCell>
                    <TableCell>{n.device_name}</TableCell>
                   
                    <TableCell>{n.resident_name}</TableCell>
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