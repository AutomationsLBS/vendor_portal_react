import React, {Component, Fragment} from 'react';
import CommonService from '../../service/commonServices';
import {
  
  Grid,
  InputLabel,
  Typography,
  TextField,
  Select,
  Button,
  FormHelperText,
  FormControl,
  RadioGroup,
  Radio
  
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';

import DateFnsUtils from '@date-io/date-fns';
import { ToastContainer, toast } from 'react-toastify';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import  AlertDialog from '../_/commonModal';


export default class CredentailEdit extends Component{
	constructor(props) {
	    super(props);
	    this.inputRef  = React.createRef();
    	let ud = CommonService.localStore.get('userData');
    	this.state = {
      		selectedDate :new Date(),
      		altfile:"no",
      		effectiveStartDate:new Date(),
      		effectiveEndDate:new Date(),
      		textarea:"",
          remarks : "",
          credential_types:"",
          loader:true,
          credential_value:"",
          uploadFile:"",
          alterFiledata:"",
          file:"",
          remarks_error:"",
          credential_value_error:"",
          fileName: "",
          alterFilename: "",
          uploadFile_error :"",
          alterFilename_error:"",
          open:"",
          url: "",
          recordId:"",
          
        }
    }
    

    handleClickOpen = (data) => {
      console.log(data,"status__check")
      this.setState({open:!this.state.open,url:data});
      
      
      
    }
    onChangedata = (e)=> {

      let fileType  =  e.target.files[0]["name"];
      var ext = fileType.split('.').pop();
      if(ext=="pdf" || ext=="docx" || ext=="doc"){
        this.setState({file:e.target.files[0],  fileName : e.target.files[0]["name"],uploadFile_error:""})
      } else{
        this.setState({file:"",  fileName :"",uploadFile_error:"Please upload only Doc/Pdf"});
      }
       
        
    }
    getDateformat = (dates)=>{
   
       //let dateformat  = dates.split("-"); 
     //  let data = new Date(dates)
       //  dateformat[1]+"/"+dateformat[2]+"/"+dateformat[0]
       return dates
    }
    getParams =()=> {
       
      let id  = this.props.history.location.pathname.split("/")
      console.log( id," kranthis----")
     // this.setState({communitId:id[3]})
      console.log(this.state.communitId,"iikt");
  
     return id[3]
    }

    handleClose = (e) => {
      this.setState({open:false}); 
    }

    credentails  = (data)=>{
      console.log(data,"idd")
      let visitorType    =   CommonService.localStore.get('visitor_types').visitor_types;
     let  vendoerType  = (visitorType == "vendor")?  'vendor': 'agency' ;
       this.setState({loader: true})
      axios
      .get(axios.credential_details(),{params : {'id':data,"utype":vendoerType}
      })
      .then((response) => {

           console.log(response,"dsds")
          

          this.setState({ loader: false
          ,credential_value: response.credential_data.credentialdata.credential_type_id ,
         
          effectiveStartDate : (response.credential_data.hasOwnProperty('docs'))? (response.credential_data.docs != null)?this.getDateformat(response.credential_data.docs.effective_start_date) : "":"", 

          effectiveEndtDate : (response.credential_data.hasOwnProperty('doc'))? (response.credential_data.docs  )? this.getDateformat(response.credential_data.docs.effective_end_date) : "":"",

          remarks: (response.credential_data.hasOwnProperty('docs'))? (response.credential_data.docs != null)? response.credential_data.docs.remarks : "":"",
          fileName: (response.credential_data.hasOwnProperty('docs'))? (response.credential_data.docs != null)? response.credential_data.docs.document_path : "":"",
          alterFilename:  (response.credential_data.hasOwnProperty('alternate_docs'))? response.credential_data.alternate_docs.document_path : "",
          recordId: response.credential_data.credentialdata.id,
          altfile:  (response.credential_data.hasOwnProperty('alternate_docs'))? (response.credential_data.alternate_docs.length > 0)? "yes":"no"  : "no",

          });
        
          toast.success(
              (response.message != undefined) 
                  ? "Successfully..." 
                  : response.message, {
              position: toast.POSITION.TOP_CENTER,
              className: 'rotateY animated'
            });
            console.log( this.state ,"stateset")
      })

     
      .catch((error) => {
         
          this.setState({loader: false});
          toast.error((error.message != undefined) ? error.response.data.message : "Failed for some reason", {
              position: toast.POSITION.TOP_CENTER
            });
          
      });
     }
  
  
  	onDrop = () => {
      // POST to a test endpoint for demo purposes
      //this.inputRef.click();
      this.inputRef.current.click();
    }
    startDateChange =(date) =>{
         this.setState({effectiveStartDate:date})

    }
    endDateChange =(date) =>{
      this.setState({effectiveEndDate:date})

      }
    radioButton =(event)=>{
        if(event.target.value == "yes"){
          document.getElementById("alternateDoc").style.display = 'inline'
        }else {
          document.getElementById("alternateDoc").style.display = 'none'
        }
        this.setState({ altfile :event.target.value})
    }

    remarksOnChange = (e) =>{
      console.log(e,"11122")
      this.setState({[e.target.name] : e.target.value})
    }


    cancelRedirect = (e)=>{
       let  changelab =  (CommonService.localStore.get("visitor_types").visitor_types == "vendor")?  "credentials": "agCredentials" ; 
        window.location.href = "/"+changelab;
    }

  
  	componentDidMount() {
      let visitorType    =   CommonService.localStore.get('visitor_types').visitor_types;
      console.log(visitorType,"vistor")
      let  vendoerType  = (visitorType == "vendor")?  'vendor': 'vendor_agency' ;
    
      axios
      .get(axios.credential_types()+"?ctype="+vendoerType)
      .then((response) => {
          console.log("SSS",response.data)
          this.setState({credential_types: response.credentials, loader: false});
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


      /*  get credetails */
      this.credentails(this.getParams());


    }




    
    

     onSubmit =  (e) => {
      e.preventDefault() 
      let visitorType    =   CommonService.localStore.get('visitor_types').visitor_types;
      console.log(visitorType,"vistor")
      let  vendoerType  = (visitorType == "vendor")?  'vendor': 'agency' ;
      //let res = await this.uploadFile(this.state.file,this.state.alterFiledata);



      let statusFlag =   true;
      

    
        
      let  parseStartDate = Date.parse(this.state.effectiveStartDate);
      let  parseEndDate =  Date.parse(this.state.effectiveEndDate);
      let dates  = (parseEndDate - parseStartDate )
      if ( dates < 0) {
        this.setState({startDateError_error: "Invalid date range"});
        statusFlag =  false;
      }


      if (statusFlag === false){
        return false;
      }
    
      this.setState({ loader : true});


       var month = (this.state.effectiveStartDate.getMonth() + 1);
       var day = (this.state.effectiveStartDate.getDate());
       var year = (this.state.effectiveStartDate.getFullYear() );
       var startdate = month +"/"+ day + "/" +year;
    
       var emonth = (this.state.effectiveEndDate.getMonth() + 1);
       var eday = (this.state.effectiveEndDate.getDate());
       var eyear = (this.state.effectiveEndDate.getFullYear() );
       var endtdate = emonth +"/"+ eday + "/" +eyear;

      
        axios
        .post(axios.update_credential(),{
          effective_start_date:startdate,
          effective_end_date:endtdate,
          id:  this.state.recordId,
          utype: vendoerType,
          remarks: this.state.remarks,


        })
        .then((response) => {

          this.setState({loader: false});
            
          let  changelab =  (CommonService.localStore.get("visitor_types").visitor_types == "vendor")?  "credentials": "agCredentials" ; 
           window.location.href = "/"+changelab;
          
         
          toast.success(
              (response.message != undefined) 
                  ? "Successfully..." 
                  : response.message, {
              position: toast.POSITION.TOP_CENTER,
              className: 'rotateY animated'
            });
           
           // console.log(response,"respose  emp data")
             
        })
        .catch((error) => {
           
            this.setState({loader: false});
            toast.error((error.message != undefined) ? error.response.data.message: "Failed for some reason", {
                position: toast.POSITION.TOP_CENTER
              });
            
        });
       
    
      }
  

     
    dropdownValue = (event)=>{
       this.setState({credential_value:event.target.value }) 
       this.setState({credential_value_error: ""});
    }

    fileUpload = (event) =>{

      event.preventDefault()
    
       // Adapter.uploadFile(this.state.type, formData).then(r => r.json() )

           this.setState({uploadFile: event.target.files[0]})
           
    }
    fileUpload2 = (event) =>{


      let fileType  =  event.target.files[0]["name"];
      var ext = fileType.split('.').pop();
      if(ext=="pdf" || ext=="docx" || ext=="doc"){
        this.setState({alterFiledata: event.target.files[0], alterFilename : event.target.files[0]["name"],alterFiledata_error:"" })
      } else{
        
        this.setState({alterFiledata:"", alterFilename :"",alterFiledata_error:"Please upload only Doc/Pdf" })
      }
    
     
    }


 

	render() {
     let errorMessage = (this.state.credential_value_error == "")? false:  true  ;
     let  visitor_types   =  CommonService.localStore.get("visitor_types").visitor_types; 
    let isDisplay  =  (visitor_types != "agency")?  "" : "none"
    let isDisplayDoc  =  (this.state.altfile == "yes")?  "" : "none"

		return (
      		<Fragment>
      			 <MuiPickersUtilsProvider utils={DateFnsUtils}>
				        <Grid item>
				          <h2>
            				<Typography className="pageTitle titleSection" variant="title" gutterBottom>
             					Update Credential 
           					</Typography>
         					</h2>
                   {CommonService.renderLoader(this.state.loader)}
				        </Grid>
                <Grid container spacing={32} style={{marginTop:"25px"}}>
                  <Grid item xs={12} sm={6} md={6} className="singleFormRight" >
                        <FormControl   error ={ errorMessage} >
                            <InputLabel htmlFor="community-helper"  style={{"marginTop": "15px"}}>Credential Type</InputLabel>
                            <Select disabled label="Credentialing" id="credentialing" value={this.state.credential_value} onChange ={this.dropdownValue}
                                style={{ width: "260px",marginTop: "30px"}}

                                margin="normal">
                                { (this.state.credential_types)?
                                  this.state.credential_types.map(data => {
                                    return (
                                      <MenuItem value={data.id}>{data.name}</MenuItem>
                                      
                                    )
                                  })
                                : 
                                  null}
                          
                            </Select>
                    {(this.state.credential_value_error != "") 
                    ? <FormHelperText style={{'color': '#f44336'}}> Credential Type is required!</FormHelperText>
                    : ""}
                           
                          </FormControl>




                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="singleFormLeft"  >

                  <AlertDialog  
                      buttonTitle = {"testignore"}
                      open = {this.state.open}
                      url = {this.state.url}
                      onClose = { this.handleClose}

                      
                      />

                  <FormHelperText >  View Doc </FormHelperText>
                     <span style={{
                       position: "relative",
                       color: "black",
                       top: "15px",
                     }} >{(this.state.fileName != "")? <a href="javascript:void(0);" onClick = {(e) =>this.handleClickOpen(this.state.fileName)  }  > <i className="fas fa-file" style={{color:"black"}} > </i></a> :"--"}</span>
                     
                      

     { /* 
      <span style={{ position: "relative",
    top: "29px",
    padding: "2px"}}> { this.state.fileName } </span>

      {(this.state.uploadFile_error != null) 
                    ? <FormHelperText style={{'color': '#f44336',top: "21px",position:"relative" }}> { this.state.uploadFile_error }</FormHelperText>
                    : ""}

    
    */} 

  
                   { /* <input type="file" style={{display:"none"}}  ref ={this.inputRef}  />
                    <span style={{color: "rgba(0, 0, 0, 0.54)" ,marginLeft:"4px", 
                    fontFamily: "Roboto, Helvetica, Arial, sans-serif"}}> Upload Document </span>
                    <div>
                    <Button onClick={this.onDrop}  variant="contained" color="primary" 
                    style={{backgroundColor:"#47b16f",margin: "6px"}} className="greenBtn">
                       Upload Doc
                    </Button> 
                                </div> */}

                  </Grid>
  				      	<Grid item xs={12} sm={6} md={6} className="singleFormRight" style={{width: "350px",marginTop: "30px"}}>
            				 { /*	<InputLabel style={{ color: "rgba(0, 0, 0, 0.54)",marginRight:"10px",fontFamily: "Roboto, Helvetica, Arial, sans-serif"}}>
                      Effective Start Date</InputLabel>
                      <KeyboardDatePicker disableToolbar  variant="inline"
            					format ="MM/dd/yyyy" margin="normal"  value ={this.state.effectiveStartDate} id="date-picker-inline"  onChange={this.startDateChange}
                              KeyboardButtonProps={{'aria-label': 'change date', }} style={ {marginTop:"0px"}}  /> */ }

                        <KeyboardDatePicker
                                  disableToolbar
                                  variant="inline"
                                  format="MM/dd/yyyy"
                                  margin="normal"
                                  id="date-picker-inline"
                                  label="Effective Start Date"
                                  value={this.state.effectiveStartDate}
                                  onChange={this.startDateChange}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                           />
                      
                     
                     {(this.state.startDateError_error != null) 
                            ? <FormHelperText style={{'color': '#f44336',top: "0px",position:"relative" }}> { this.state.startDateError_error }</FormHelperText>
                            : ""}


        					</Grid>
        					<Grid item xs={12} sm={6} md={6} className="singleFormRight" style={{width: "350px", marginTop: "30px"}}>
            		    { /*<InputLabel style={{ color: "rgba(0, 0, 0, 0.54)",marginRight:"10px",fontFamily: "Roboto, Helvetica, Arial, sans-serif"}}>
                      Effective End Date</InputLabel>	
                      <KeyboardDatePicker disableToolbar  variant="inline"
            					format="MM/dd/yyyy" margin="normal" id="date-picker-inline"  value={this.state.effectiveEndDate} KeyboardButtonProps={{'aria-label': 'change date', }} 
                      style={{ marginTop:"0px"}}
                                onChange={this.endDateChange} */ }


                                <KeyboardDatePicker
                                  disableToolbar
                                  variant="inline"
                                  format="MM/dd/yyyy"
                                  margin="normal"
                                  id="date-picker-inline"
                                  label="Effective End Date"
                                  value={this.state.effectiveEndDate}
                                  onChange={this.endDateChange}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                
                                />


{(this.state.startDateError_error != null) 
                            ? <FormHelperText style={{'color': '#f44336',top: "0px",position:"relative" }}> { this.state.startDateError_error }</FormHelperText>
                            : ""}


        					</Grid>

                   
                          <Grid item xs={12} sm={6} md={6} className="singleFormLeft"  
                          style={{"marginTop": "25px" ,display:isDisplay  }}>
                              <FormHelperText > Alternative Doc</FormHelperText>
                              
                            <RadioGroup aria-label="position" name="position"  disabled
                              value={this.state.altfile} onChange={this.radioButton} row> 
                              <FormControlLabel value="yes" disabled control={<Radio color="primary" />}
                                label="Yes" labelPlacement="start"  />
                              <FormControlLabel value="no" disabled control={<Radio color="primary" />}
                                label="No" labelPlacement="start"  />
                            </RadioGroup>


                          </Grid>

                   
                          <Grid item xs={12} sm={6} md={6} id="alternateDoc" style={{display:isDisplayDoc,marginTop: "20px"}}>
                          

                      
                          <FormHelperText >  View Alternative Doc </FormHelperText>
                     <span style={{
                       position: "relative",
                       color: "black",
                       top: "15px",
                     }} >{(this.state.alterFilename != "")? <a href="javascript:void(0);" onClick = {(e) =>this.handleClickOpen(this.state.alterFilename)  }  > <i className="fas fa-file" style={{color:"black"}} > </i></a> :"--"}</span>
                     
                                

                              
                            
                          </Grid>

                      

                    

                  

        					<Grid item xs={12} sm={12} md={12} className="singleFormRight" style={{marginTop:"7px"}}>
                    <TextField  label="Remarks" name="remarks" onChange={(e) => {this.remarksOnChange(e)}} fullWidth value={this.state.remarks}
                     helperText={this.state.remarks_error}
                     error={(this.state.remarks_error == "")
                     ? false
                     : true}
                    placeholder=" Remarks" />   
                  </Grid>
        					
        					<Grid item xs={12} sm={6} md={6} justify="center" style={{marginTop:"25px"}} >
            				<Button variant="contained" color="primary" onClick = {this.onSubmit}
            					style={{backgroundColor:"#47b16f"}} 
            					className="greenBtn">
               					 Update Credetials
            					</Button>
  					        <Button variant="outlined" className="outlinedBtn" 
  					          href="javascript:void(0);"  onClick={  this.cancelRedirect} style={{marginLeft:"14px"}} >
                					Cancel
                				</Button>
            			</Grid>
                </Grid>
				</MuiPickersUtilsProvider>
      		</Fragment>
      	)
	}

}