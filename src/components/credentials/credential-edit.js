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

import FormControlLabel from '@material-ui/core/FormControlLabel';
import  AlertDialog from '../_/commonModal';
import Tooltip from '@material-ui/core/Tooltip';


export default class CredentailEdit extends Component{
	constructor(props) {
	    super(props);
	    this.inputRef  = React.createRef();
    	let ud = CommonService.localStore.get('userData');
    	this.state = {
      		selectedDate :new Date(),
      		altfile:"no",
      		effectiveStartDate:new Date(),
      		effectiveEndDate: new Date(),
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
          verificationStatus:"",
          upperLimit_error:"",
          lowerLimit_error:"",
          upperLimit:"",
          lowerLimit:"",
          vendoerType:"",
          upperLimitRange_error:"",



    
        }
    }
    


handleChange = name => event => {
 
  const onlyNums = event.target.value;

  
  //console.log(name,onlyNums,"jkerr123lllr");
    this.setState({
      [name]: onlyNums.replace(/[^0-9\.]+/g, ''),
  });
  if (name != '') {
      let errName = name + '_error'
      console.log("Handle change", event, name, errName);
      this.setState({
          [errName]: false,
      });
  }
};

    handleClickOpen = (data) => {
      console.log(data,"status__check")
      this.setState({open:!this.state.open,url:data});
      
      
      
    }
    onChangedata = (e)=> {

      // let fileType  =  e.target.files[0]["name"];
      // var ext = fileType.split('.').pop();
      // if(ext=="pdf" || ext=="docx" || ext=="doc"){
      //   this.setState({file:e.target.files[0],  fileName : e.target.files[0]["name"],uploadFile_error:""})
      // } else{
      //   this.setState({file:"",  fileName :"",uploadFile_error:"Please upload only Doc/Pdf"});
      // }



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
    getDateformat = (dates)=>{
   
       //let dateformat  = dates.split("-"); 
      let data = new Date(dates)
      // //  dateformat[1]+"/"+dateformat[2]+"/"+dateformat[0]
       return data
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
     // console.log(data,"idd")
      let visitorType    =   CommonService.localStore.get('visitor_types').visitor_types;
     let  vendoerType  = (visitorType == "vendor")?  'vendor': 'agency' ;
     this.setState({vendoerType});
       this.setState({loader: true})
      axios
      .get(axios.credential_details(),{params : {'id':data,"utype":vendoerType}
      })
      .then((response) => {

          
          

          this.setState({ loader: false
          ,credential_value: response.credential_data.credentialdata.credential_type_id ,
          upperLimit:response.credential_data.credentialdata.upper_limit,
          lowerLimit:response.credential_data.credentialdata.lower_limit,
          effectiveStartDate : (response.credential_data.hasOwnProperty('docs'))? (response.credential_data.docs != null)?this.getDateformat(response.credential_data.docs.effective_start_date) : "":"", 

        //  effectiveEndDate: (response.credential_data.hasOwnProperty('doc'))? (response.credential_data.docs != null )? this.getDateformat(response.credential_data.docs.effective_end_date) : "":"",
        effectiveEndDate: this.getDateformat(response.credential_data.docs.effective_end_date),

          remarks: (response.credential_data.hasOwnProperty('docs'))? (response.credential_data.docs != null)? response.credential_data.docs.remarks : "":"",
          fileName: (response.credential_data.hasOwnProperty('docs'))? (response.credential_data.docs != null)? response.credential_data.docs.document_path : "":"",
          alterFilename:  (response.credential_data.hasOwnProperty('alternate_docs'))? (response.credential_data.alternate_docs.length >0)?response.credential_data.alternate_docs[0]["document_path"] :"" : "",
          recordId: response.credential_data.credentialdata.id,
          altfile:  (response.credential_data.hasOwnProperty('alternate_docs'))? (response.credential_data.alternate_docs.length > 0)? "yes":"no"  : "no",
          verificationStatus: (response.credential_data.hasOwnProperty('docs'))? (response.credential_data.docs != null)? response.credential_data.docs.verification_status : "":"",
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
          toast.error((error.message != undefined) ? error.message : "Failed for some reason", {
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
      console.log(this.state,"statecheck")
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




    
    

     onSubmit = async (e) => {
      e.preventDefault() 
      let visitorType    =   CommonService.localStore.get('visitor_types').visitor_types;
      console.log(visitorType,"vistor")
      let  vendoerType  = (visitorType == "vendor")?  'vendor': 'agency' ;
      
      
      let res = await this.uploadFile(this.state.file,this.state.alterFiledata);



      // let statusFlag =   true;
      

    
        
      // let  parseStartDate = Date.parse(this.state.effectiveStartDate);
      // let  parseEndDate =  Date.parse(this.state.effectiveEndDate);
      // let dates  = (parseEndDate - parseStartDate )
      // if ( dates < 0) {
      //   this.setState({startDateError_error: "Invalid date range"});
      //   statusFlag =  false;
      // }


      // if (statusFlag === false){
      //   return false;
      // }
    
      // this.setState({ loader : true});


      //  var month = (this.state.effectiveStartDate.getMonth() + 1);
      //  var day = (this.state.effectiveStartDate.getDate());
      //  var year = (this.state.effectiveStartDate.getFullYear() );
      //  var startdate = month +"/"+ day + "/" +year;
    
      //  var emonth = (this.state.effectiveEndDate.getMonth() + 1);
      //  var eday = (this.state.effectiveEndDate.getDate());
      //  var eyear = (this.state.effectiveEndDate.getFullYear() );
      //  var endtdate = emonth +"/"+ eday + "/" +eyear;

      
      //   axios
      //   .post(axios.update_credential(),{
      //     effective_start_date:startdate,
      //     effective_end_date:endtdate,
      //     id:  this.state.recordId,
      //     utype: vendoerType,
      //     remarks: this.state.remarks,


      //   })
      //   .then((response) => {

      //     this.setState({loader: false});
            
      //     let  changelab =  (CommonService.localStore.get("visitor_types").visitor_types == "vendor")?  "credentials": "agCredentials" ; 
      //      window.location.href = "/"+changelab;
          
         
      //     toast.success(
      //         (response.message != undefined) 
      //             ? "Successfully..." 
      //             : response.message, {
      //         position: toast.POSITION.TOP_CENTER,
      //         className: 'rotateY animated'
      //       });
           
      //      // console.log(response,"respose  emp data")
             
      //   })
      //   .catch((error) => {
           
      //       this.setState({loader: false});
      //       toast.error((error.message != undefined) ? error.response.data.message: "Failed for some reason", {
      //           position: toast.POSITION.TOP_CENTER
      //         });
            
      //   });
       
    
      }




      uploadFile = async (file,alterFile) => {
  

        let statusFlag =   true;
        let visitorType    =   CommonService.localStore.get('visitor_types').visitor_types;
        console.log(visitorType,"vistor")
        let  vendoerType  = (visitorType == "vendor")?  'vendor': 'agency' ;
      
        if(this.state.credential_value == ""){
              this.setState({credential_value_error: "Please select credentials Type"});
              statusFlag =  false;
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


            if (this.state.altfile  != "no"){
      
              // if (this.state.alterFiledata == ""){
              //    this.setState({alterFiledata_error: "Please upload document"});
              //    statusFlag =  false;
              // }
         
            }else {
              if(this.state.fileName == ""){
                if (this.state.file == ""){
                  this.setState({uploadFile_error: "Please upload document"});
                  statusFlag =  false;
                }
              }
               
            }
      
          }
          
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
          console.log(file,"hifile");
          formData.append('uploadDoc',file)
        }


  if(this.state.vendoerType != "vendor"){
    formData.append('lower_limit',this.state.lowerLimit);
    formData.append('upper_limit',this.state.upperLimit);
  }
         if(alterFile){
           console.log(file,"hifile");
            formData.append('alteruploadDoc',  alterFile)
         }
        
        formData.append('effective_start_date',startdate)
        formData.append('effective_end_date',endtdate)
        //formData.append('vendor_id',vendorData["visitor"]['id'])
       // formData.append('credential_type_id',this.state.credential_value)
        formData.append('utype',vendorData["visitor_type"])
        formData.append('alternate_docs', this.state.altfile)
        formData.append('id', this.state.recordId)
        formData.append('utype', vendoerType)

        formData.append('remarks',  this.state.remarks)
      
     
      
      
            
        
       
      
      
        
        return  await axios.post(axios.update_credential(),formData,{
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
                alterFilename:"",

                
      
      
          });
      
          toast.success(
            (response.message != undefined) 
                ? "Successfully..." 
                : response.message, {
            position: toast.POSITION.TOP_CENTER,
            className: 'rotateY animated'
          });
      
         let  changelab =  (CommonService.localStore.get("visitor_types").visitor_types == "vendor")?  "credentials": "agCredentials" ; 
         window.location.href = "/"+changelab;
           //  console.log(response,"data........")
        })
        .catch((error) => {
             
          this.setState({loader: false});
          toast.error((error.message != undefined) ? error.toString() : "Failed for some reason", {
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
    fileUpload2 = (e) =>{


      // let fileType  =  event.target.files[0]["name"];
      // var ext = fileType.split('.').pop();
      // if(ext=="pdf" || ext=="docx" || ext=="doc"){
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


 

	render() {
     let errorMessage = (this.state.credential_value_error == "")? false:  true  ;
     let  visitor_types   =  CommonService.localStore.get("visitor_types").visitor_types; 
    let isDisplay  =  (visitor_types != "agency")?  "" : "none"
    let isDisplayDoc  =  (this.state.altfile == "yes")?  "" : "none";
    let filename9 ="";
    if (this.state.fileName !=""){
      let data = this.state.fileName.replace(/%20/g, "")

      let fileSplit =   data.split("/");
  
      let filenames =fileSplit.length -1;
       filename9 = fileSplit[filenames]
  
    }
    let  filenameAlter = "";
    console.log(this.state.alterFilename,"opooo11");
     if (this.state.alterFilename != null && this.state.alterFilename != undefined ){
      let data = this.state.alterFilename.replace(/%20/g, "")

      let fileSplit =   data.split("/");
      
      let filenames =fileSplit.length -1;
      let filename91 = fileSplit[filenames]
      
       filenameAlter = filename91;
  
    }
   
    console.log(this.state.verificationStatus,"localdata")
    //console.log( this.state.alterFilename,"alllternatib")
    let  statusOfButton = false;
    let  buttonHideOrNot = "show";  
    if (this.state.verificationStatus == "in_progress" || this.state.verificationStatus == "not_verified" ){
      statusOfButton = true;  
    }else if( this.state.verificationStatus == "verified" || this.state.verificationStatus == "rejected" ) {
      buttonHideOrNot =  "none";     
    }

    let  statusOfVendort = ((this.state.vendoerType != "vendor")? "show"  : "none")

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

                  <input
     accept="application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.slideshow,application/vnd.openxmlformats-officedocument.presentationml.presentation"
       // className={classes.input}
        id="contained-button-file"
        multiple={true}
        type="file"
        style={{"display":"none"}}
        onChange = { this.onChangedata}
        disabled ={statusOfButton }
      />
      <label htmlFor="contained-button-file" style={{display:buttonHideOrNot }}>
      <Tooltip title = { uploadButton}  >
        <Button variant="contained" component="span" style={{ position: "relative",top: "12px"}} disabled ={statusOfButton } >
          Upload
        </Button>
        </Tooltip>
      </label>

      <span style={{
                       position: "relative",
                       color: "black",
                       top: "15px",
                     }} >{(this.state.fileName != "")? <Fragment> <a href="javascript:void(0);" style={{textDecoration:"none",color:"black"}} onClick = {(e) =>this.handleClickOpen(this.state.fileName)  }  >  {filename9} </a> </Fragment> :"--"}</span>
                     

      {/* <span style={{ position: "relative",
    top: "29px",
    padding: "2px"}}> { this.state.fileName } </span> */}

      {(this.state.uploadFile_error != null) 
                    ? <FormHelperText style={{'color': '#f44336',top: "21px",position:"relative" }}> { this.state.uploadFile_error }</FormHelperText>
                    : ""}
                      

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
                                type ="number"
                                error={this.state.lowerLimit_error}
                            />
                              
                              </Tooltip>
                        <div>
                        {(this.state.lowerLimit_error)? <FormHelperText style={{'color': '#f44336'}}> Lower Limit is required</FormHelperText>:""}
                            
                        </div> 


                          </Grid>

                   
                          <Grid item xs={12} sm={6} md={6} style={{ display: statusOfVendort  }} >
                          <Tooltip title = { upperLimitTooltip} >
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
                            <Tooltip title = { alternativeDoc} >
                            <RadioGroup aria-label="position" name="position" 
                              value={this.state.altfile} onChange={this.radioButton} row> 
                              <FormControlLabel value="yes" disabled ={statusOfButton }  control={<Radio color="primary" />}
                                label="Yes" labelPlacement="start"  />
                              <FormControlLabel value="no"  disabled ={statusOfButton } control={<Radio color="primary" />}
                                label="No" labelPlacement="start"  />
                            </RadioGroup>
                          </Tooltip>

                          </Grid>

                   
                          <Grid item xs={12} sm={6} md={6} id="alternateDoc" style={{display:isDisplayDoc,marginTop: "20px"}}>
                          

                      
                          <FormHelperText >  View Alternative Doc </FormHelperText>
                   
                     <input
                                

                                accept="application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.slideshow,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                                // className={classes.input}
                                  id="contained-button-file1"
                                  multiple
                                  type="file"
                                  style={{"display":"none"}}
                                  onChange = { this.fileUpload2}
                                  disabled ={statusOfButton }

                                />
                                <label htmlFor="contained-button-file1" style={{ position: "relative",top: "12px" ,display:buttonHideOrNot}} >
                                  <Button variant="contained" component="span" disabled ={statusOfButton }>
                                    Upload
                                  </Button>
                                </label>
                                

                                {(this.state.alterFiledata_error != null) 
                            ? <FormHelperText style={{'color': '#f44336',top: "21px",position:"relative" }}> { this.state.alterFiledata_error }</FormHelperText>
                            : ""}
     

     <span style={{
                       position: "relative",
                       color: "black",
                       top: "15px",
                     }} >{(this.state.alterFilename != "")? <a href="javascript:void(0);" style={{textDecoration:"none",color:"black"}} onClick = {(e) =>this.handleClickOpen(this.state.alterFilename)  }  > { filenameAlter }</a> :"--"}</span>
                       
                            
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
               					 Save
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