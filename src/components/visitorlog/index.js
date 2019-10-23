import React, {Component, Fragment} from 'react';
 import { Redirect } from 'react-router-dom';
 import Config from "../../container/config"
 import { CSVLink, CSVDownload } from "react-csv";
 
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
import axios from 'axios';
import CommonService from '../../service/commonServices';
import ListComponent from '../resident/visitorList';
import Moment from 'react-moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import './visit.scss';



export default class Visitlogs extends Component {
  csvLink = React.createRef()
    constructor(props){
        super(props)
       this.state = {
        visitorsList :"",
        visitorFilterData:"",
        doRedirect:"",
        redirectUrl:"",
        pageTitle:"",
        loader:false,
        total_entries: "",
        per_page:"",
        visitor_daterange:"",
        data1:"",
        headers:"",
        currentDate:"",
        noOfRecords:"",
        startdate:"",
        enddate:"",
        filter: {
          open: false,
          date:{}
          },
         
       }
    }

    componentWillMount() {
     // console.log( moment().subtract(30, 'days')._d,"subtact----------------------")
      console.log("componentWillMount");
     
    }
    componentDidMount() {
      this.GetFormattedDate();
      this.GetDate();
      this.getVisitorLogs();
      console.log("componentdidMount");
    }

    componentWillReceiveProps(nextProps) {
     
      //this.setState({ data: nextProps.data });  
    }


    
    
    getVisitorLogs =  (reisdentid =null,pagId = 1)=>{
      
     this.setState({loader: true});
        let ud = CommonService.localStore.get('local_resident_id');

    
    axios
    .get(axios.webvisits_history(),{params: {resident_id:ud.local_resident_id,page:pagId,start_date:this.state.filter.date.startdate,end_date:this.state.filter.date.enddate}})
    .then((response) => {
       console.log(response,"okokoko");
      this.setState({visitorsList:response.visits,loader:false,total_entries:response.total_entries,per_page:response.per_page});
      
      this.setState({ visitor_daterange:response["date_range"]});
      this.setState({loader: false});
     
  
      
    }).catch((error)=>{
      this.setState({visitorsList:"",loader:false,total_entries:"",per_page:""});
      
     
      this.setState({loader: false});
    }); 
    
       
      
      
    }



    csvVisitorLogs =(e)=>{
      e.preventDefault();
    
      let ud = CommonService.localStore.get('local_resident_id');
      axios
      .get(axios.webvisits_history(),{params: {resident_id:ud.local_resident_id,page:1,fetch_all:"all",start_date:this.state.filter.date.startdate,end_date:this.state.filter.date.enddate}})
      .then((response) => {
          let  data =  response.visits.reduce((intal,n)=>{
            

            let duration_day = Math.round(n.duration_mins);
            let session_time_end_varible = n.session_time_end
            if (n.session_time_end =="" || n.session_time_end ==null || n.session_time_end  == undefined ){
             duration_day = "In Progress"
             session_time_end_varible = "---"
            }
            intal.push({on_date:n.on_date,
              session_time_start:n.session_time_start,
              session_time_end:session_time_end_varible,
              duration_mins: duration_day,
              visitor_name:n.visitor_name,
              service_type:n.service_type,
              company_name:n.company_name,

              visitor_status:n.visitor_status,
              visitor_type:n.visitor_type,
            
            });
             return  intal;
          },[]);


         
          const   headers = [
            { label: "Date", key: "on_date" },
            { label: "Time In", key: "session_time_start" },
            { label: "Time Out", key: "session_time_end" },
            { label: "Duration (Minutes)", key: "duration_mins" },
            { label: "Visitor Name", key: "visitor_name" },
            { label: "Service Type", key: "service_type" },
            { label: "Company Name", key: "company_name" },
           
            
          ]; 
          
          this.setState({data1:data,headers},() => {
           
            this.csvLink.current.link.click()
          });
        
      }).catch((error)=>{
        console.log(error,"error......................");
       // this.setState({loader: false});
      }); 
      
     
      
      
    }

   
    GetFormattedDate = () => {
      var todayTime = new Date();
      var month = (todayTime.getMonth() + 1);
      var day = (todayTime.getDate());
      var year = (todayTime.getFullYear());
      var dates = month +"-"+ day + "-" +year;
      this.setState({currentDate:dates}) 
  }
  
  GetDate = () => {
    var todayTime = new Date();
    var currnetdate  =  new Date();
    
   
    todayTime.setDate(todayTime.getDate() - 30);
    
    let  startdate = todayTime.toISOString().split('T')[0];

    let  enddate = currnetdate.toISOString().split('T')[0];
   // this.setState({startdate:"start",enddate:"endtsss"}) ;
    console.log(this.state,"testcheck1")
    let state = this.state.filter;
       
    state.date['start'] = moment(todayTime);

   state.date['end'] = moment(currnetdate);
   state.date['start'] = moment(todayTime);
   let  formatDate =  startdate.split("-")
   let endates  = enddate.split("-");
   state.date['startdate'] =formatDate[1]+'/'+formatDate[2]+"/"+formatDate[0] ;
   state.date['enddate'] = endates[1]+'/'+endates[2]+"/"+endates[0];

   state.date['end'] = moment(currnetdate);
   
     this.setState(...this.state,state); 
     console.log("kratiiii",this.state)  
   
    
    
}
  handleSelectedDate = name => event => {
    console.log("Selected Date", name, event, moment(event).format("MM/DD/YYYY"));
    let state = this.state.filter;
  
    state.date[name] = moment(event);
    if (name == "start"){
      
      state.date["startdate"] =  moment(event).format("MM/DD/YYYY");
    }else {
      state.date["enddate"] =  moment(event).format("MM/DD/YYYY");
    }
    
   this.setState(state);
   console.log("datesss",this.state)
 }

 doFilter = (field) => {
  console.log("Filter Searching", field);
  this.getVisitorLogs();

}
   
  
  

    render(){
         const  {loader, visitorsList,total_entries,per_page}  =  this.state
         if (this.state.doRedirect) {
            return <Redirect to={{ pathname :this.state.redirectUrl }}/>;
          }
          
          const filterItem  = {
                                "display": "inline-block",
                                "vertical-align":"middle",
                                "margin-right": "15px",
                              }





          
         
         
         
        return (
            <Grid container>
            <Grid container>
            {CommonService.renderLoader(loader)}
              <Grid item sm={12}>
                <Typography className="pageTitle titleSection" variant="title" gutterBottom>
                VISITOR REPORT
                </Typography>
                
                <div style={{width: "100%", overflow: "hidden"}}>
                  <div style={{ width: "70%", float: "left"}}>  <h3>Resident Name: {  CommonService.localStore.get('local_resident_name').local_resident_name} </h3> 
                 </div>
                  
                  
                  <div style={{ width: "30%",float:"right" }} > 
                  { (total_entries !='') ?  
                   <button 
                  className="allScroll customButton"  onClick={(e)=>{ this.csvVisitorLogs(e)}} > Download CSV</button>
                 :''}
                 </div>
              </div>
              <Grid item sm={12} className={ 
																 "filterContainer active"
																}>
              <Grid  className="filterContent">
					
					<div className="filterFields">
					
						<div className="filterItem">
							<label>Start Date:</label>
              
              
							<div className="startDate">
								<DatePicker
								placeholderText="Start Date"
								selected={this.state.filter.date.start}
                onChange={ this.handleSelectedDate('start')
                }
                
              
                dateFormat="MM/DD/YYYY"

              
								maxDate={this.state.filter.date.end}/>
							</div>
              <label style={{"padding-left":"11px"}}>End Date:</label>
							<div className="endDate">
								<DatePicker
								placeholderText="End Date"
								selected={this.state.filter.date.end}
								onChange={this.handleSelectedDate('end')}
								dateFormat="MM/DD/YYYY"
								minDate={this.state.filter.date.start}/>
							</div>
						</div>

            <div className="filterItem">
							<button style ={{ height :"31px",    border: "0px",
                        width:" 81px",
                      "background-color": "#56b16f",
                                 color: "white",
                         }}
     onClick={this.doFilter}>Submit</button>
					</div>

					</div>
					
				</Grid>
        </Grid>


              { (total_entries !='') ?  
              <div style={{fontSize: "1.17em",paddingBottom:"22px"}}>
                
                <b>Showing data from  {this.state.filter.date.startdate }  to  {this.state.filter.date.enddate}</b>
               </div>
              :""}
                
              <CSVLink
                           headers={this.state.headers}
                        data={this.state.data1}
                        filename={"Visitor Report "+this.state.filter.date.startdate+" to "+this.state.filter.date.enddate+".csv"}
                        className="hidden"
                        ref={this.csvLink}
                        target="_blank" 
                    />
               
                
              </Grid>
              
              <Grid item xs={12} sm={12}>
          <ListComponent
            {...this.props}
            data={ visitorsList }
            per_page = { per_page }
            total_entrie = { total_entries }
            getVisitorLogs = { this.getVisitorLogs}
            header={["on_date", "session_time_start", "duration_mins","session_time_end", "visitor_name", "phone_num","device_name","resident_name","visitor_type","staff_id"]}/>
            {
              (total_entries =='') ? (<div><h3>No records to show!</h3></div>) : null
            }
          </Grid>


            </Grid>
          
          </Grid>
         
        );
    }

} 
