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
  TextField,
  
    InputLabel,


    Select,
  
    FormHelperText,
    FormControl,
   
  
} from '@material-ui/core';
import axios from 'axios';
import CommonService from '../../service/commonServices';
import ListComponent from '../resident/visitorList';
import Moment from 'react-moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import './visit.scss';
import { ToastContainer, toast } from 'react-toastify';



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
        loader:true,
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
          mycommunitys:"",
          communityId:"",
       }
    }

    componentWillMount() {
     // console.log( moment().subtract(30, 'days')._d,"subtact----------------------")
      console.log("componentWillMount");
     
    }
    componentDidMount() {
      this.setState({loader: true});
      this.GetFormattedDate();
      this.GetDate();
      
      console.log("componentdidMount");

    

      axios
      .get(axios.myCommunitys())
      .then((response) => {
          //console.log(response,"rta")
          let communitiesData = []
          if(response){
           response.communities.map((data)=>{
             // console.log(data,"data13");
              communitiesData.push({ id:data.community.sugar_id,name:data.community.name })
      
            } 
                  
            );
            this.setState({communityId: communitiesData[0]['id']});

          }
          this.setState({mycommunitys: communitiesData, loader: false});
          this.getVisitorLogs();
          this.setState({loader: false});
          toast.success(
              (response.message != undefined) 
                  ? "Successfully..." 
                  : response.message, {
              position: toast.POSITION.TOP_CENTER,
              className: 'rotateY animated'
            });
         
      })
      .catch((error) => {
         
          this.setState({loader: false});
          toast.error((error.message != undefined) ? error.toString() : "Failed for some reason", {
              position: toast.POSITION.TOP_CENTER
            });
          
      });



    }

    componentWillReceiveProps(nextProps) {
     
      //this.setState({ data: nextProps.data });  
    }


    
    
    getVisitorLogs =  (reisdentid =null,pagId = 1)=>{
      this.setState({loader: true});
    
    axios
    .get(axios.visits_history(),{params: {page:pagId,per_page:Config.perPage,
      start_date:this.state.filter.date.startdate,
      end_date:this.state.filter.date.enddate,
      community_id:this.state.communityId}})
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
      .get(axios.visits_history(),{params: {page:1,fetch_all:"all",start_date:this.state.filter.date.startdate,end_date:this.state.filter.date.enddate}})
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
              resident_name:n.resident_name,
            
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
            { label: "Resident/Staff Name", key: "resident_name" },
           
            
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


dropdownValue = (event)=>{
  this.setState({communityId:event.target.value }) 
  this.setState({communityId_error: ""});
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
               <h2> VISITOR REPORT</h2>  
                </Typography>
                
                <div style={{width: "100%", overflow: "hidden"}}>
                  {/* <div style={{ width: "70%", float: "left"}}>  <h3>Resident Name: {  CommonService.localStore.get('local_resident_name').local_resident_name} </h3> 
                 </div> */}
                  
                  
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
                className = "datePickerFont"
              
                dateFormat="MM/DD/YYYY"

                style = {{ fontSize: "15px !important"}}
								maxDate={this.state.filter.date.end}/>
							</div>
              <label style={{"padding-left":"11px"}}>End Date:</label>
							<div className="endDate">
								<DatePicker
                className = "datePickerFont"
								placeholderText="End Date"
								selected={this.state.filter.date.end}
								onChange={this.handleSelectedDate('end')}
								dateFormat="MM/DD/YYYY"
								minDate={this.state.filter.date.start}
                style = {{ fontSize: "15px !important"}}
                />
                
							</div>

             
							<div className="endDate" style={{position:"relative",top:"-5px"}}>
              <FormControl   error ={this.state.communityId_error } >
                           
                            <Select  label="Credentialing" id="credentialing" value={this.state.communityId} onChange ={this.dropdownValue}
                                style={{ width: "250x",marginTop: "0px",padding:"10px 10px"}}

                                margin="normal">
                                { (this.state.mycommunitys)?
                                  this.state.mycommunitys.map(data => {
                                    return (
                                      <MenuItem value={data.id}>{data.name}</MenuItem>
                                      
                                    )
                                  })
                                : 
                                  null}
                            </Select>
                    {(this.state.communityId_error != "" && this.state.communityId =="") 
                    ? <FormHelperText style={{'color': '#f44336'}}> Community is required!</FormHelperText>
                    : ""}
                           
                          </FormControl>

							</div>
						</div>
             
            

            <div className="filterItem">
							<button style ={{ height :"40px",    border: "0px",
                        width:" 81px",
                      "background-color": "#4CAF50",
                                 color: "white",
                                 fontSize:"16px",

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
