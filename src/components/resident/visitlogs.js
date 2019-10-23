import React, {Component, Fragment} from 'react';
 import { Redirect } from 'react-router-dom';
 import { CSVLink, CSVDownload } from "react-csv";
 
import {
  
  Grid,
 
  Typography,
 
} from '@material-ui/core';
import axios from 'axios';
import CommonService from '../../service/commonServices';
import ListComponent from './visitorList';
import Moment from 'react-moment';
import Config from "../../container/config"
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../visitorlog/visit.scss';



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
        total_entries:'',
        per_page:"",
        residentId:"",
        visitor_daterange:"",
        reisdent_name:"",
        data1:"",
        headers:"",
        currentDate:"",
        startdate:"",
        enddate:"",

        filter: {
          open: false,
          date:{}
          },

       }
    }

    componentWillMount() {
    }
    componentDidMount() {
        this.GetFormattedDate();
        this.GetDate()
     this.getVisitorLogs(this.getParams());
   //  this.csvVisitorLogs(this.getParams());
    }


    getParams() {
       
         let id  = this.props.history.location.pathname.split("/")
         this.setState({residentId:id[3]});
         this.setState({reisdent_name:id[4]});
        
        return id[3]
      
      }


  pageTitle(match) {
    const arr = match.path.split('/');
    if(arr[2] === "visitorlog"){
        this.setState({pageTitle: "Visitor Log"});
    }else if(match == null){
        this.setState({pageTitle: "Resident List"});
    }
    console.log("At Page Title Method\n", this.state);
  }
    
    getVisitorLogs =(id =null,pageId)=>{
      
      this.setState({loader: true});
     
      axios
      .get(axios.webvisits_history(),{params: {resident_id:id,page:pageId,start_date:this.state.filter.date.startdate,end_date:this.state.filter.date.enddate}})
      .then((response) => {
        this.setState({visitorsList:response.visits,loader:false,total_entries:response.total_entries,per_page:response.per_page});
      //  this.setState({ visitor_daterange:response["date_range"]});
        
        /*const dataarray  =  this.state.residentList.reduce((previous,primary)=>{
          previous.push({resident_id:primary.resident_id,resident_name:primary.resident_name,
            rnameesident_postgres_id:primary.rnameesident_postgres_id,
            shipping_city:primary.shipping_city,shipping_zip:primary.shipping_zip
          })
          return previous
         },[])
         
        this.setState({ visitorFilterData: dataarray });*/
      //  this.setState({loader: false});
        
      }).catch((error)=>{
        this.setState({visitorsList:"",loader:false,total_entries:"",per_page:""});
        console.log(error,"error......................");
        this.setState({loader: false});
      }); 
  
  
      
      
    }


   GetDate = () => {
     var todayTime = new Date();
     var currnetdate  =  new Date();
    
   
     todayTime.setDate(todayTime.getDate() - 30);
    
     let  startdate = todayTime.toISOString().split('T')[0];

     let  enddate = currnetdate.toISOString().split('T')[0];
 
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
      console.log("kratiiiikumar",this.state)  
   
    
     }

    csvVisitorLogs =(e)=>{
      e.preventDefault();
    
     
      axios
      .get(axios.webvisits_history(),{params: {resident_id:this.state.residentId,page:1,fetch_all:"all",start_date:this.state.filter.date.startdate,end_date:this.state.filter.date.enddate}})
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
          //  { label: "Visitor status", key: "visitor_status" },
            
          ]; 


        /*  const   headers = [
            { label: "Date", key: "Date" },
            { label: "Sign-in", key: "Sign-in" },
            { label: "Sign-Out", key: "Sign-Out" },
            { label: "Duration", key: "Duration" },
            { label: "Visitor", key: "Visitor" },
            { label: "Service Type", key: "Service Type" },
            { label: "Company name", key: "Company name" },
            { label: "Visitor status", key: "Visitor status" },
            
          ]; */ 
          this.setState({data1:data,headers},() => {
           
            this.csvLink.current.link.click()
          });
        
      }).catch((error)=>{
        console.log(error,"error......................");
       // this.setState({loader: false});
      }); 
      
     
      
      
    }
    editRow = (data) => {
     
      
      if(data !== undefined && data !== null){
        this.setState({
          doRedirect: true,
          redirectUrl: '/resident/visitorlog/'+data.resident_id
        });
      }
      let state = this.state;
      let residentName = data.resident_name;
      
      console.log("Editing Row At Employees000000", state);
    }
  
   
  
     GetFormattedDate = () => {
      var todayTime = new Date();
      var month = (todayTime.getMonth() + 1);
      var day = (todayTime.getDate());
      var year = (todayTime.getFullYear());
      var dates = month+"-" +day + "-"+year;
      this.setState({currentDate:dates}) 
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
  this.getVisitorLogs(this.getParams());

}
   


    render(){
         const  {loader,total_entries,per_page }  =  this.state
         if (this.state.doRedirect) {
            return <Redirect to={{ pathname :this.state.redirectUrl }}/>;
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
                  <div style={{ width: "70%", float: "left"}}>  <h3>Resident Name: { this.state.reisdent_name } </h3>  </div>
                  <div style={{ width: "30%",float:"right" }} > 
                  {(total_entries != '') ? 
                   <button 
                   className="allScroll customButton"  onClick={(e)=>{ this.csvVisitorLogs(e)}} > Download CSV</button>
                    
                    : ""}
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
							<button style ={{ height :"31px",
                        width:" 81px",border: "0px",
                      "background-color": "#56b16f",
                                 color: "white",
                         }}
     onClick={this.doFilter}>Submit</button>
					</div>

					</div>
					
				</Grid>
        </Grid>
             
   
              {(total_entries != '') ? 
                  <div style={{fontSize: "1.17em",paddingBottom:"22px"}}>
                  
                  <b>Showing data from  {this.state.filter.date.startdate }  to  { this.state.filter.date.enddate }</b>
                  </div>
                  :""
              }
                
                               { /*
                  <CSVLink 
                  data={this.state.data}
                  headers={this.state.headers}
                 
                  onClick={(event, done) => {
                //   this.csvVisitorLogs(this.getParams());
                     done(this.csvVisitorLogs(this.getParams())); // REQUIRED to invoke the logic of component
                   
                  }}
                  >Download me</CSVLink>; */
               } 
               
               <div>
              


              <CSVLink
                         headers={this.state.headers}
                        data={this.state.data1}
                        filename={"Visitor Report "+this.state.filter.date.startdate+" to "+this.state.filter.date.enddate+".csv"}
                        className="hidden"
                        ref={this.csvLink}
                        target="_blank" 
                    />
            </div>
                
              </Grid>
              
            

              <Grid item xs={12} sm={12}>
          <ListComponent
            {...this.props}
            data={this.state.visitorsList}
            rowEdit={this.editRow}
            per_page = { per_page }
            total_entrie = { total_entries }
            getVisitorLogs = { this.getVisitorLogs}
            residentId = {this.state.residentId}
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
