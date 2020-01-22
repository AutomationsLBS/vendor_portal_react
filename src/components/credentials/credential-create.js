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
import Config from '../../container/config';

import DateFnsUtils from '@date-io/date-fns';
import { ToastContainer, toast } from 'react-toastify';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import TooltipOwn from  "../_/Tooltip";
import Tooltip from '@material-ui/core/Tooltip';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  Redirect
} from "react-router-dom";



export default class CredentailCreate extends Component{
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
          credential_types:[],
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
          docTypes: {doc:"doc","docx":"docx",pdf:"pdf","jpg":"jpg","png":"png",gif:"gif",jpeg:"jpeg"},
          upperLimit_error:"",
          lowerLimit_error:"",
          upperLimit:"",
          lowerLimit:"",
          vendoerType:"",
          upperLimitRange_error:"",
          doRedirect: false,
          redirectUrl: "",
          
        }
  	}
    onChangedata = (e)=> {
      if (e.target.files.length >0){
        
        let filesizes = Math.round((  e.target.files[0]["size"]/ 1024))
        let  filesizelimit  = Config.filesize;
        if (filesizes < filesizelimit ){
          let fileType  =  e.target.files[0]["name"];
          var ext = fileType.split('.').pop();
          if(ext== this.state.docTypes[ext]){
            this.setState({file:e.target.files[0],  fileName : e.target.files[0]["name"],uploadFile_error:""})
          } else{
            this.setState({file:"",  fileName :"",uploadFile_error:"Please upload only Doc/Pdf/images"});
          }
          
        }else{
  
          this.setState({file:"",  fileName :"",uploadFile_error:"File size must below 10 mb"});
  
        }
      }

        
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
      
      this.setState({[e.target.name] : e.target.value})
    }


    cancelRedirect = (e)=>{
       let  changetab =  (CommonService.localStore.get("visitor_types").visitor_types == "vendor")?  "credentials": "agCredentials" ; 
       this.setState({
        doRedirect: true,
         redirectUrl: "/"+changetab
        });



    }


    getParams =()=> {
    
      let result  = this.props.history.location.pathname.split("/")
    

     let searchPath  = this.props.history.location.search;
    if (searchPath.split("=")[1] != undefined){
         result.push(searchPath.split("=")[1]);
      }
      
      
      return result
    }
  
  	componentDidMount() {
       
      let visitorType    =   CommonService.localStore.get('visitor_types').visitor_types;
      console.log(visitorType,"vistor")
      let  vendoerType  = (visitorType == "vendor")?  'vendor': 'vendor_agency' ;
      this.setState({vendoerType});
        
      if(this.getParams().length > 2 ){
        console.log(this.getParams(),"datak")
       vendoerType = this.getParams()[3] ;
     }
    
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

     this.getParams();
    }
    
    

     onSubmit = async (e) => {
      e.preventDefault() 
      let res = await this.uploadFile(this.state.file,this.state.alterFiledata);
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
    fileUpload2 = (e) =>{


      // let fileType  =  event.target.files[0]["name"];
      // var ext = fileType.split('.').pop();
      // if(ext== this.state.docTypes[ext]){
      //   this.setState({alterFiledata: event.target.files[0], alterFilename : event.target.files[0]["name"],alterFiledata_error:"" })
      // } else{
        
      //   this.setState({alterFiledata:"", alterFilename :"",alterFiledata_error:"Please upload only Doc/Pdf" })
      // }
    

      if (e.target.files.length >0){
        
        let filesizes = Math.round((  e.target.files[0]["size"]/ 1024))
        let  filesizelimit  = Config.filesize;
        if (filesizes < filesizelimit ){
          let fileType  =  e.target.files[0]["name"];
          var ext = fileType.split('.').pop();
          if(ext== this.state.docTypes[ext]){
            
            this.setState({alterFiledata: e.target.files[0], alterFilename : e.target.files[0]["name"],alterFiledata_error:"" })
          } else{
            this.setState({file:"",  fileName :"",uploadFile_error:"Please upload only Doc/Pdf/images"});
            this.setState({alterFiledata:"", alterFilename :"",alterFiledata_error:"Please upload only Doc/Pdf" })
          }
          
        }else{
          this.setState({alterFiledata:"", alterFilename :"",alterFiledata_error:"File size must below 10 mb" })
          
  
        }
      }

     
    }


 uploadFile = async (file,alterFile) => {
  

  let statusFlag =   true;
   

  if(this.state.credential_value == ""){
        this.setState({credential_value_error: "Please select credentials Type"});
        statusFlag =  false;
    }    
    
    if (this.state.altfile  != "no"){

      if (this.state.alterFiledata == ""){
         this.setState({alterFiledata_error: "Please upload document"});
         statusFlag =  false;
      }
 
    }else {
      if (this.state.file == ""){
        this.setState({uploadFile_error: "Please upload document"});
        statusFlag =  false;
      }
    }
    
    let  parseStartDate = Date.parse(this.state.effectiveStartDate);
    let  parseEndDate =  Date.parse(this.state.effectiveEndDate);
    let dates  = (parseEndDate - parseStartDate )
    if ( dates < 0) {
      this.setState({startDateError_error: "Invalid date range"});
      statusFlag =  false;
    }
    
    if (statusFlag == false){
      return false;
    }

    if(this.state.vendoerType != "vendor"){
      
      if(this.state.lowerLimit == ""){
        statusFlag  =  false;
        this.setState({lowerLimit_error: true});
        return false;

     }else {
        statusFlag  =  true;

     }
    
      if(this.state.upperLimit ==""){
         statusFlag  =  false;
         this.setState({upperLimit_error: true});
         return false;
      }else {
         statusFlag  =  true;
      }


      

      let data  = ( this.state.upperLimit - this.state.lowerLimit);
    
      if(data > 0 ){
       
        statusFlag  =  true;
        this.setState({upperLimit_error: false});
        this.setState({upperLimitRange_error:false})
      }else {
        this.setState({upperLimit_error: true});
        this.setState({upperLimitRange_error:true})
        statusFlag  =  false;
        return false;
      }

    }

    
    if (statusFlag == false){
      console.log("your data","00090");
      return false;
      
    }


   

  

   
  var month = (this.state.effectiveStartDate.getMonth() + 1);
  var day = (this.state.effectiveStartDate.getDate());
  var year = (this.state.effectiveStartDate.getFullYear() );
  var startdate = month +"/"+ day + "/" +year;

  var emonth = (this.state.effectiveEndDate.getMonth() + 1);
  var eday = (this.state.effectiveEndDate.getDate());
  var eyear = (this.state.effectiveEndDate.getFullYear()  );
  var endtdate = emonth +"/"+ eday + "/" +eyear;

  let vendorId = CommonService.localStore.get("userData");
  let vendorData = JSON.parse(vendorId.userData);
  let efdate  = startdate;
  let efenddate  = endtdate;
  const formData = new FormData();
  this.setState({loader:true})
  if(file){
    
    formData.append('uploadDoc',file)
  }

  if(this.state.vendoerType != "vendor"){
    formData.append('lower_limit',this.state.lowerLimit);
    formData.append('upper_limit',this.state.upperLimit);
  }
  formData.append('utype',vendorData["visitor_type"]);
  formData.append('vendor_id',vendorData["visitor"]['id'])
  console.log( this.getParams() ,"testdd");
  let redirectUrl = false;
  if(this.getParams().length > 2 ){
    formData.append('employee_id',this.getParams()[2]);
    formData.append('vendor_id',this.getParams()[2]);
    formData.append('utype', this.getParams()[3]);
    redirectUrl = true;    

  }

  formData.append('effective_start_date',startdate)
  formData.append('effective_end_date',endtdate)
 // formData.append('vendor_id',vendorData["visitor"]['id'])
  formData.append('credential_type_id',this.state.credential_value)
  
  formData.append('alternate_docs', this.state.altfile)
  formData.append('alteruploadDoc',  alterFile)
  formData.append('remarks',  this.state.remarks)


  if (CommonService.localStore.get("usr_company_id").usr_company_id !== undefined && CommonService.localStore.get("usr_company_id").usr_company_id !== "" ){
   
   formData.append('company_id',  CommonService.localStore.get("usr_company_id").usr_company_id)
  }



      
  
 


  
  return  await axios.post(axios.add_credential(),formData,{
      headers: {
          'content-type': 'multipart/form-data'
      }
  }).then((response)=>{

   
    this.setState({
      altfile:"no",
      		effectiveStartDate:new Date(),
      		effectiveEndDate:new Date(),
      	
          remarks : "",
        
          loader:false,
          credential_value:"",
          uploadFile:"",
          alterFiledata:"",
          file:"",
          fileName:"",
          alterFilename:""
          


    });

    toast.success(
      (response.message != undefined) 
          ? "Successfully..." 
          : response.message, {
      position: toast.POSITION.TOP_CENTER,
      className: 'rotateY animated'
    });

   if(redirectUrl){
    this.setState({
      doRedirect: true,
       redirectUrl: "/agCredentials/credentials/"+this.getParams()[2]
      });
       
   }else {
    this.cancelRedirect();
   }
   
   
  })
  .catch((error) => {
       
    this.setState({loader: false});
    toast.error((error.message != undefined) ? error.toString() : "Failed for some reason", {
        position: toast.POSITION.TOP_CENTER
      });
    
});
}


handleChange = name => event => {

 
  const onlyNums = event.target.value;

  
      //console.log(name,onlyNums,"jkerr123lllr");
        this.setState({
          [name]: onlyNums.replace(/[^0-9\.]+/g, ''),
      });
     console.log(this.state.lowerLimit,"testtt,,,,");
  

  
  if (name != '') {
      let errName = name + '_error'
      console.log("Handle change", event, name, errName);
      this.setState({
          [errName]: false,
      });
  }
};



	render() {


       
    if (this.state.doRedirect) {
      return(<Redirect to={ this.state.redirectUrl} />)
    }
     let errorMessage = (this.state.credential_value_error == "")? false:  true  ;
     let  visitor_types   =  CommonService.localStore.get("visitor_types").visitor_types; 
    let isDisplay  =  (visitor_types != "agency")?  "" : "none";
    let  statusOfVendort = ((this.state.vendoerType != "vendor")? "show"  : "none")
    let credentialnote =   this.state.credential_types.filter((data)=> data.id == this.state.credential_value);
    if (credentialnote.length > 0){
      console.log(credentialnote[0]["notes"],"909");
    }
    const styles = {
      tooltip: {
        color: "lightblue",
        backgroundColor: "green"
      }
    };

    const  lowerLimitTooltip  = "If Applicable, Please enter the lower limit of the credentials Ex. For liability insurance your lower limit is 500,000 Please enter 500,000";
    const  upperLimitTooltip  = "If Applicable, Please enter the upper limit of the credentials Ex. For liability insurance your upper limit is 2,000,000 Please enter 2,000,000";
    const  EffectiveStartDateTooltip = "Please enter the start date of the selected credentials";
    const  EffectiveEndDateTooltip = "Please enter the end date of the selected credentials";
    const uploadButton = "Upload the document by clicking the UPLOAD button ";
    const alternativeDoc = "if a supporting document or alternative document is available, please Select 'Yes' and upload the document";


		return (
      		<Fragment>
      			 <MuiPickersUtilsProvider utils={DateFnsUtils}>
				        <Grid item>
				          <h2>
            				<Typography className="pageTitle titleSection" variant="title" gutterBottom>
                   
                    Add Credential 
                  
             					
           					</Typography>
         					</h2>
                   {CommonService.renderLoader(this.state.loader)}
				        </Grid>
                <Grid container spacing={32} style={{marginTop:"25px"}}>
                  <Grid item xs={12} sm={6} md={6} className="singleFormRight" >
                        <FormControl   error ={ errorMessage} >
                            <InputLabel htmlFor="community-helper"  style={{"marginTop": "15px"}}>Credential Type</InputLabel>
                            <Select  label="Credentialing" id="credentialing" value={this.state.credential_value} onChange ={this.dropdownValue}
                                style={{ width: "276px",marginTop: "30px"}}

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


                  <input
     accept="application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.slideshow,application/vnd.openxmlformats-officedocument.presentationml.presentation"
       // className={classes.input}
        id="contained-button-file"
        multiple={true}
        type="file"
        style={{"display":"none"}}
        onChange = { this.onChangedata}
      />
      <label htmlFor="contained-button-file">
      <Tooltip title = { uploadButton} style={{color:"red"}} >
       
      <Button variant="contained" component="span" style={{ position: "relative",top: "19px"}} >
          Upload
        </Button>
       </Tooltip>
      
      </label>
      <span style={{ position: "relative",
    top: "29px",
    padding: "2px"}}> { this.state.fileName } </span>

      {(this.state.uploadFile_error != null) 
                    ? <FormHelperText style={{'color': '#f44336',top: "21px",position:"relative" }}> { this.state.uploadFile_error }</FormHelperText>
                    : ""}


  
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
                         <Tooltip title = { EffectiveStartDateTooltip} >
                         
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
                        </Tooltip>
                     
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
                               <Tooltip title = { EffectiveEndDateTooltip} >
                               
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
                                </Tooltip>



{(this.state.startDateError_error != null) 
                            ? <FormHelperText style={{'color': '#f44336',top: "0px",position:"relative" }}> { this.state.startDateError_error }</FormHelperText>
                            : ""}


        					</Grid>



                  <Grid item xs={12} sm={6} md={6} className="singleFormLeft"  
                          style={{"marginTop": "0px", display: statusOfVendort }}>
                          <Tooltip title = { lowerLimitTooltip} >
                             <TextField
                                id="lowerLimit"
                                style = {{width: "276px"}}
                                label="Lower limit"
                                className="formFont"
                                value={this.state.lowerLimit}
                                onChange={this.handleChange('lowerLimit')}
                                margin="normal"
                                maxLength="100"
                                type ="text"
                                error={this.state.lowerLimit_error}
                                
                            />
                              </Tooltip>
                          
                        <div>
                        {(this.state.lowerLimit_error)? <FormHelperText style={{'color': '#f44336'}}> Lower Limit is required</FormHelperText>:""}
                            
                        </div> 


                          </Grid>

                   
                          <Grid item xs={12} sm={6} md={6} style={{"marginTop": "0px", display: statusOfVendort }} >
                          <Tooltip  title={upperLimitTooltip}  >
                          <TextField
                                id="upperLimit"
                                style = {{width: "276px"}}
                                label="Upper limit"
                                className="formFont"
                                value={this.state.upperLimit}
                                onChange={this.handleChange('upperLimit')}
                                margin="normal"
                                maxLength="100"
                                type ="number"
                                pattern="[0-9]{10}"
                                error={this.state.upperLimit_error}
                            />

                            </Tooltip>

                          
                        <div>
                        
                            
                            { (this.state.upperLimitRange_error !="")? <FormHelperText style={{'color': '#f44336'}}> Upper Limit is range is invalid</FormHelperText> : (this.state.upperLimit_error)? <FormHelperText style={{'color': '#f44336'}}> Upper Limit is required</FormHelperText>:""  }
                        </div> 
                          </Grid>


                   
                          <Grid item xs={12} sm={6} md={6} className="singleFormLeft"  
                          style={{"marginTop": "25px" ,display:isDisplay  }}>
                              <FormHelperText > Alternative Doc</FormHelperText>
                            <Tooltip title ={ alternativeDoc} >
                              
                            <RadioGroup aria-label="position" name="position" 
                              value={this.state.altfile} onChange={this.radioButton} row> 
                              <FormControlLabel value="yes" control={<Radio color="primary" />}
                                label="Yes" labelPlacement="start"  />
                              <FormControlLabel value="no"  control={<Radio color="primary" />}
                                label="No" labelPlacement="start"  />
                            </RadioGroup>
                            </Tooltip>

                          </Grid>

                   
                          <Grid item xs={12} sm={6} md={6} id="alternateDoc" style={{display:"none","marginTop": "20px"}}>
                          

                          <input
                                

                                accept="application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.slideshow,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                                // className={classes.input}
                                  id="contained-button-file1"
                                  multiple
                                  type="file"
                                  style={{"display":"none"}}
                                  onChange = { this.fileUpload2}

                                />
                                <label htmlFor="contained-button-file1" style={{ position: "relative",top: "19px"}}>
                                  <Button variant="contained" component="span" >
                                    Upload
                                  </Button>
                                </label>
                                <span style={{ position: "relative",top: "29px",padding: "2px"}}> {this.state.alterFilename } </span>

                                {(this.state.alterFiledata_error != null) 
                            ? <FormHelperText style={{'color': '#f44336',top: "21px",position:"relative" }}> { this.state.alterFiledata_error }</FormHelperText>
                            : ""}

                            
                          </Grid>

                  


                        

                    

                  

        					<Grid item xs={12} sm={12} md={12} className="singleFormRight" style={{marginTop:"7px"}}>
                    <TextField  label="Remarks" name="remarks" onChange={(e) => {this.remarksOnChange(e)}} fullWidth value={this.state.remarks}
                     helperText={this.state.remarks_error}
                     error={(this.state.remarks_error == "")
                     ? false
                     : true}
                    placeholder="Remarks" />   
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} className="singleFormRight" style={{marginTop:"7px"}}>
                  { /* <FormHelperText style={{'color': 'black',top: "0px",position:"relative" }}> { (credentialnote.length > 0) ? (credentialnote[0]["url"] !=null)?<Fragment> <span>URL:</span> <a href={credentialnote[0]["url"]}  target="_blank" style={{ "text-decoration": "none"}} > { credentialnote[0]["url"] }</a> </Fragment> :"" : ""}</FormHelperText>  */ } 
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} className="singleFormRight" style={{marginTop:"7px"}}>
                  <FormHelperText style={{'color': 'black',top: "0px",position:"relative" }}> { (credentialnote.length > 0) ? (credentialnote[0]["notes"] !=null)? "Note: "+ credentialnote[0]["notes"]:"" : ""}</FormHelperText> 
                  </Grid>
        					<Grid item xs={12} sm={6} md={6} justify="center" style={{marginTop:"25px"}} >
            				<Button variant="contained" color="primary" onClick = {this.onSubmit}
            					style={{backgroundColor:"#47b16f"}} 
            					className="greenBtn">
               					 Submit
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