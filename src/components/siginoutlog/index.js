import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
 
import {
  
  Grid,
  
  Typography,
  
} from '@material-ui/core';

import axios from 'axios';
import ListComponent from '../resident/signoutlist';
import CommonService from '../../service/commonServices';
import Config from "../../container/config"
import Filters from  "../_/filters";
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../visitorlog/visit.scss';
import { CSVLink, CSVDownload } from "react-csv";

export default class Siginoutlog extends Component {
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
        startdate:"",
        enddate:"",
        data1:"",
        headers1:"",
        filter: {
          open: false,
          date:{}
          },

       }
       
    }

    componentWillMount() {
    }
    componentDidMount() {
      this.GetDate();
        
     this.sigOutlog();
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

  csvVisitorLogs =(e)=>{
    e.preventDefault();



    this.setState({loader: true});
    let ud = CommonService.localStore.get('local_resident_id');
  
    axios
    .get(axios.signoutLogs(),{params: {resident_id:ud.local_resident_id,start_date:this.state.filter.date.startdate,end_date:this.state.filter.date.enddate}})
    .then((response) => {
      // console.log(response,"okokoko");
    
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
          resident_name:n.resident_name,
          expected_return_time:n.expected_return_time,
          guest_name:n.guest_name,
          destination:n.destination,
        
        });
         return  intal;
      },[]);


     
     const   headers1= [
      { label: "ON DATE ", key: "on_date" },
      { label: "LEFT AT", key: "session_time_start" },
      { label: "RETURNED AT", key: "session_time_end" },
      { label: "DURATION (MINUTES)", key: "duration_mins" },
      { label: "RESIDENT NAME", key: "resident_name" },
      {label: "EXPECTED RETURN" ,key: "expected_return_time"},
      { label: "GUEST INFO", key: "guest_name" },
      { label: "DESTINATION", key: "destination" },
    
      
    ]; 


    this.setState({data1:data,headers1},() => {
           
      this.csvLink.current.link.click()
    });
   
      this.setState({loader: false});



  
  
      
    }).catch((error)=>{
      this.setState({visitorsList:"",loader:false,total_entries:"",per_page:""});
      
    }); 
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
   //console.log("datesss",this.state)
 }



 doFilter = (field) => {
  console.log("Filter Searching", field);
  this.sigOutlog();

}

      sigOutlog =  (reidentid =null,pagId = 1)=>{
          
      this.setState({loader: true});
      let ud = CommonService.localStore.get('local_resident_id');
    
      axios
      .get(axios.signoutLogs(),{params: {resident_id:ud.local_resident_id,page:pagId,start_date:this.state.filter.date.startdate,end_date:this.state.filter.date.enddate}})
      .then((response) => {
         console.log(response,"okokoko");
        this.setState({visitorsList:response.visits,loader:false,total_entries:response.total_entries,per_page:response.per_page});
        this.setState({resident_name:response.visits[0]['resident_name'] });
        this.setState({loader: false});
        console.log(this.state,"checkingh");
    
        
      }).catch((error)=>{
        this.setState({visitorsList:"",loader:false,total_entries:"",per_page:""});
        
      }); 
    /*  
    if(residentId[0]['resident_id'] !=''){
        let residents  =  await  axios.get(axios.signoutLogs(),{params: {resident_id:residentId[0]['resident_id'],days_ago:Config.dayRange}})
          this.setState({visitorsList:residents,loader:false});
        console.log(this.state.visitorsList,"testt");

     } */ 
        
          
          
        }


    render(){
      const  {loader,visitorsList,total_entries,per_page}  =  this.state
        return (
          <Grid container>
          <Grid container>
            <Grid item sm={12}>
              <Typography className="pageTitle titleSection" variant="title" gutterBottom>
              RESIDENT SIGN-OUT REPORT
             
              </Typography>
              <div style={{width: "100%", overflow: "hidden"}}>
                  <div style={{ width: "70%", float: "left"}}> <h3>Resident Name: { this.state.resident_name } </h3>   </div>
                  <div style={{ width: "30%",float:"right" }} > 
                  {(total_entries != '') ? 
                   <button 
                   className="allScroll customButton"  onClick={(e)=>{ this.csvVisitorLogs(e)}} > Download CSV</button>
                    
                    : ""}
                    </div>
              </div>


            </Grid>
            
            <CSVLink
                         headers={this.state.headers1}
                        data={this.state.data1}
                        filename={"RESIDENT SIGN-OUT REPORT"+this.state.filter.date.startdate+" to "+this.state.filter.date.enddate+".csv"}
                        className="hidden"
                        ref={this.csvLink}
                        target="_blank" 
                    />
            {CommonService.renderLoader(loader)}
           { /*<Filters 
            handleSelectedDate  ={ (event) => { this.handleSelectedDate('start')}}
            startDate = { this.state.filter.date.start }
            endDate = { this.state.filter.date.end }
            endHandleSelectedDate =  {(event) => {this.handleSelectedDate('end')}}
            doFilter  = {this.doFilter}
           /> */}
             


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
							<button style ={{ height :"31px",
                        width:" 81px",
                      "background-color": "#56b16f",
                                 color: "white",
                                 border: "0px",
                         }}
     onClick={this.doFilter}>Submit</button>
					</div>

					</div>
					
				</Grid>
        </Grid>

            <Grid item xs={12} sm={12}>
        <ListComponent
          {...this.props}
          per_page = { per_page }
            total_entrie = { total_entries }
          data={this.state.visitorsList}
        //  rowEdit={this.editRow}
        getSignOutLogs = { this.sigOutlog}
          header={["on_date", "session_time_start", "duration_mins","session_time_end", "visitor_name", "phone_num","device_name","resident_name","visitor_type","staff_id"]}/>
          {
            (total_entries == '') ? (<div><h3>No records to show!</h3></div>) : null
          }
        </Grid>
          </Grid>
        
        </Grid>
        );
    }

} 
