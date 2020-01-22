import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Grid, Menu, MenuItem, Typography} from '@material-ui/core';
import {Scrollbars} from 'react-custom-scrollbars';
import axios from 'axios';
import MainNav from '../_/navigation';
import Config from '../../container/config';
import {toastNotify} from '../../actions';
import store from '../../store';
// import {connect, dispatch  } from 'react-redux';
import {getAllUsers} from '../../actions';
import {Link } from 'react-router-dom'
import CommonService from './../../service/commonServices';
import { ToastContainer, toast } from 'react-toastify';
import { Dialog } from '@material-ui/core';
import  AlertDialog from '../_/commonModal';
import GoogleDocsViewer from 'react-google-docs-viewer';
import TooltipOwn from  "../_/Tooltip";


import {
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableSortLabel,
  Hidden,

  
} from '@material-ui/core';

export default class AgCredentails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      prevPath: '',
      myCredentails:"",
      loader:true,
      credential_types:"",
      open: false,
      url:"",
      backButton:false,
      historyData:false,
      showButton: false,
      recordValue: "",
      doRedirect:false,
      redirectUrl:"",
    }
  }
 
  componentDidMount() {
    
    let visitorType    =   CommonService.localStore.get('visitor_types').visitor_types;
    console.log(visitorType,"vistor")
    let  vendoerType  = (visitorType == "vendor")?  'vendor': 'vendor_agency' ;
    this.getParams();
    axios
    .get(axios.credential_types(),{params:{ ctype:"vendor"}})
    .then((response) => {
     let  data  = response.credentials.reduce((intails,recent)=>{
          intails[recent.id] = recent.name
          return intails
 
        },{});
       console.log("data-update",data)
        this.setState({credential_types: data, loader: false});
         
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
    console.log(this.state.credential_types,"test--------------")
   
    this.credetailsData(this.getParams())
  }
  
  
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.location !== this.props.location) {
  //     this.setState({ prevPath: this.props.location })
  //   }
  //   console.log("Component will Receive Props",this.state.prevPath)

  // }

  dateFormat = (fdate)=>{
    var dateformat = new Date(fdate)
    var emonth = (dateformat.getMonth() + 1);
    var eday = (dateformat.getDate());
    var eyear = (dateformat.getFullYear() - 1);
    var endtdate = emonth +"/"+ eday + "/" +eyear;
    return endtdate
  }


  backButton =()=>{
    this.setState({
      backButton:true

    })

  }

  handleClickOpen = (data) => {
   
    this.setState({open:!this.state.open,url:data});
    
    
    
  }

  handleClose = (e) => {
    this.setState({open:false}); 
  }
  

  handleValue = (e) => {
    this.setState({open:false}); 
  }



  getParams =()=> {
       
    let id  = this.props.history.location.pathname.split("/")
    console.log(id[3]," kranthis----")
    this.setState({communitId:id[3]});
    console.log(this.state.communitId,"iikt");
    CommonService.localStore.set("_communityId",id[3] );

   return id[3]
  }


  getCredetailsData = (data)=>{
   
   
        
    if(data !== undefined && data !== null){
      this.setState({
        doRedirect: true,
         redirectUrl: "/credentials/editCredentials/"+data+"?vid=vendor"
      });
   
    }
    //config.()
  }
  


  credetailsData =(data)=>{
   let utype =  "vendor"
    let vendorType  = CommonService.localStore.get("routerR").routerR
    if (vendorType == "/employees"){
      utype = "vendor"
    }
    axios
    .get(axios.my_credentials(),{params:{employee:data,utype: utype}})
    .then((response) => {
        console.log(response.credentials,"ere")
        this.setState({myCredentails: response.credentials, loader: false});
        console.log( this.state.myCredentails,"test data")
       // this.setState({showButton : (response.credentials.old_credentials.length > 0)? true : false })
       // this.setState({myCredentails: response, loader: false});
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
  

  recordToBedisplayed = (data) => {
    //e.preventDefault();

  if (data === this.state.recordValue){
    this.setState({"recordValue": null })
  }else {
    this.setState({"recordValue": data })
  }

}

  addcredetailsRequried= ()=>{

    this.setState({
      doRedirect: true,
       redirectUrl: "/credentialsCreate/"+this.getParams()+"?vid=vendor"
      });
     
  }

  showHistory = (e) =>{
    this.setState({"historyData":!this.state.historyData })
  }

  credetails =()=>{
    this.setState({
      doRedirect: true,
       redirectUrl: "/employees"
      });

  }
 

  render() {

     if(this.state.doRedirect){
      return(<Redirect to={this.state.redirectUrl} />)

     }
    
      if (this.state.redirect) {
        return(<Redirect to='/credentialsCreate' />)
      }
      
      if (this.state.backButton) {
        return(<Redirect to='/employees' />)
      }

    return (
      <Fragment>
        <Grid container>
          <Grid container>
            <Grid item sm={6}>
              <h2>
                <Typography className="pageTitle titleSection" variant="title" gutterBottom>
                Credentials of { CommonService.localStore.get("employeeName_c").employeeName_c  }
                  </Typography>
              </h2>
              {CommonService.renderLoader(this.state.loader)}
            </Grid>
            
      
            <Grid item xs={6} sm={6} align="right">
              <Button className="btn btn-primary btn-round" id="addCred" style={{"margin-right":"17px"}} onClick={ this.addcredetailsRequried}
              >Add Credential</Button> 

<Button className="btn btn-primary btn-round" id="addCred"
              onClick={this.credetails}>Back</Button>

          <AlertDialog  
           buttonTitle = {"testignore"}
           open = {this.state.open}
           url = {this.state.url}
           onClose = { this.handleClose}
          
          />
            </Grid>
            <Grid item sm={12} align="right"> 
              <Table className="listTable" >
                <TableHead>
                  <TableRow>
                    
                    <TableCell>Credential  Name</TableCell>
                    <TableCell>Doc</TableCell>
                    <TableCell> Start Date</TableCell>
                    <TableCell> End Date </TableCell>
                    <TableCell> Status </TableCell>
                    <TableCell> Reason </TableCell>  
                    <TableCell> </TableCell>  
                    <TableCell> </TableCell>  
                    
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                { /*(data.docs.length > 0)?data.docs[0]["document_path"]: "--"  (data.docs.length > 0)? "": "--"  */}
                          {(this.state.myCredentails)? (this.state.myCredentails.credentials.length  > 0) ?
                          this.state.myCredentails.credentials.map((data,i)=>{
                              
                            let docpath = (data.docs.length > 0)? data.docs[0]["document_path"]: "none"
                           
                          let trimedData  = decodeURI(docpath);
                          let docname = trimedData.split('/').splice(-1,1);
                            
                            return (
                              <Fragment>
                             <TableRow key={i} >
                              <TableCell style={{width: "20%"}}>  { this.state.credential_types[data.credential_data.credential_type_id]} </TableCell>
                              
                              <TableCell style={{
                                                    "text-decoration": "none",
                                                    "word-break": "break-word",
                                                    "width": "20%"
                                                  }}
                              
                              >{(docpath != "none")? <a href="javascript:void(0);" style={{"text-decoration":"none"}} onClick = {(e) =>this.handleClickOpen(docpath)  }  > { (docname !="")?docname :"--" } </a> :"--"} </TableCell>

                              <TableCell style={{width: "10%"}} > {(data.docs.length > 0)? this.dateFormat(data.docs[0]["effective_start_date"]): "--" } </TableCell>
                              <TableCell style={{width: "10%"}} > {(data.docs.length > 0)? this.dateFormat(data.docs[0]["effective_end_date"]): "--" } </TableCell>
                             {/* <TableCell> {(data.docs.length > 0)? Config.credetailStatus[data.docs[0]["verification_status"]] : "--" }</TableCell>*/}  
                             <TableCell style={{width: "10%"}} >   {(data.docs.length > 0)?  <Button style={{ "background": Config.credetailStatusColors[data.docs[0]["verification_status"]] ,color:"white",cursor: "default !important"  }} > {  Config.credetailStatus[data.docs[0]["verification_status"]] }</Button>     : "--" } </TableCell> 
                              <TableCell style ={{width: "20%" }} > {(data.docs.length > 0)?data.docs[0]["remarks"]: "--" }</TableCell>
                              
                              <TableCell style ={{width: "5%" }} >
                                  <a href="javascript:void(0);" style={{textDecoration:"none"}} onClick= {(e) =>  this.getCredetailsData(data.credential_data.id) }   >  <img src={Config.images + "/fevicon_icon/edit.png" } style = {{ width :'23px',height :'23px' }}/></a> 
                                </TableCell> 
                              <TableCell  >
                          {(data.old_credentials.length > 0)? (this.state.recordValue == i)? <i class="fa fa-minus-circle" aria-hidden="true" onClick = { () => {this.recordToBedisplayed(i)}} ></i> : <i class="fa fa-plus-circle" aria-hidden="true" onClick = { (e) => {this.recordToBedisplayed(i)} } ></i> :"" }
                              
                              </TableCell> 
                        
                          </TableRow>
 
                          

                          { ((this.state.recordValue  ==  i ) && (data.old_credentials.length > 0)) ?
                                <Fragment>
                                <TableRow  style={{padding:"10px",boder:"solid"}} >
                                <TableCell colSpan = {8}>
                                <Table className="listTable"  style={{"border-color":"#FFFFFF",
                                   "border-style": "solid",
                                   "border-width" : "thin"
                              }} >
                               
                                 
                                { (data.old_credentials.length > 0)? data.old_credentials.map((olddata) =>{
                                    let docpath = (olddata.docs.length > 0)? olddata.docs[0]["document_path"]: "none";
                                    let trimedData  = decodeURI(docpath);
                                    let docname = trimedData.split('/').splice(-1,1);
                                   
                                  //  let alternativeDocPath =  (olddata.alternate_docs.length > 0)? (olddata.alternate_docs[0]["document_path"] != "" )? olddata.alternate_docs[0]["document_path"] : "none" : "none";
                                  return(
                                    <Fragment>
                                
                                      <TableRow 
                                     
                                      key={i} 
                                      style={{"border-color":"#EAEAEA",
                                   "border-style": "solid",
                                   "border-width" : "thin"
                              }}
                                      
                                      >
                                          
                                              <TableCell width="19%"> </TableCell>
                                              
                                                  <TableCell 
                                                  
                                                  style={{
                                                    "text-decoration": "none",
                                                    "word-break": "break-word",
                                                    "width": "20%"
                                                  }}
                                                  >{(docpath != "none" && docpath != undefined )? <a href="javascript:void(0);" style={{"text-decoration": "none"}} onClick = {(e) =>this.handleClickOpen(docpath)  }   >{ (docname !="")?docname:"--" }  </a> :"--"} </TableCell>
                                                 
  
                                                  <TableCell style={{ width:"10%"}} > {(olddata.docs.length > 0)? this.dateFormat(olddata.docs[0]["effective_start_date"]): "--" } </TableCell>
                                                  <TableCell style={{ width:"10%"}} > {(olddata.docs.length > 0)?  this.dateFormat(olddata.docs[0]["effective_end_date"]) : "--" } </TableCell>
                                                 {/* <TableCell style={{ width:"10%"}}  > {(olddata.docs.length > 0)? <span style={{ }} > { Config.credetailStatus[olddata.docs[0]["verification_status"]] } </span>  : "--" }  }</TableCell> */} 
                                                 <TableCell  
                                                   style={{
                                                     width:"12%"
                                                   }}
                                                  >  {(olddata.docs.length > 0)?    Config.credetailStatus[olddata.docs[0]["verification_status"]] : "--" } </TableCell>

                                                  <TableCell  style={{ width: "30%" }} > {(olddata.docs.length > 0)?olddata.docs[0]["remarks"]: "--" }</TableCell>
                                                  
                                            </TableRow>
                                      
                                  
                                     
                                    </Fragment>
                                  ) 
                                }): 
                                 ""
                                }
                                 </Table>
                                 </TableCell>
                                </TableRow>
                                </Fragment>
                             : "" } 

                          </Fragment>      

                ) 
              }) :
              <TableRow >
              <TableCell colSpan={8}> <center>No Records</center> </TableCell>
              </TableRow>  
                
                :
                
                
                <TableRow >
                <TableCell colSpan={8}> <center>No Records</center> </TableCell>
                </TableRow>  
                
                }
                       
              
                 
                </TableBody>
              </Table>
           </Grid>
        </Grid>


        {/* <div  align="left" style= { { "padding-bottom": "14px" , "padding-top": "14px"}}> 
                    { (this.state.historyData)?  <a href="javascript:void(0)" onClick = {this.showHistory}  style ={{"text-decoration": "none",color:"blue"}} >Hide Past Credentials  </a>  :  (this.state.showButton ) ? <a herf="javascript:void(0);" style ={{"text-decoration": "none",color:"blue"}} onClick = {this.showHistory}  > Past Credentials  </a> : null } 
                </div>
                <Grid item sm={12} align="right"> 
                  <Table className="listTable" > */}


{/*                  
                  
                  { (this.state.historyData)? 
                      <TableHead>
                      <TableRow>
                          
                          <TableCell>Credential Type</TableCell>
                          <TableCell>Doc</TableCell>
                          <TableCell> Effective Start Date</TableCell>
                          <TableCell> Effective End Date </TableCell>
                          <TableCell> Status </TableCell>
                          <TableCell> Reason </TableCell>  
                      
                      </TableRow>
                      </TableHead>
                     : "" }

                      <TableBody >
                          {(this.state.historyData)? (this.state.myCredentails)? 
                              

                              this.state.myCredentails.old_credentials.map((data,i) => {
                              let docpath = (data.docs.length > 0)? data.docs[0]["document_path"]: "none"

                              return (
                                  <TableRow key={i} >
                                  <TableCell>  { this.state.credential_types[data.credential_data.credential_type_id]} </TableCell>
                                  
                                  <TableCell>{ (docpath != "none")? <a onClick = {(e) =>this.handleClickOpen(docpath)  }  > <i className="fas fa-file" style={{color:"black"}} > </i></a> : "--"} </TableCell>
                  
                                  <TableCell> {(data.docs.length > 0)? this.dateFormat(data.docs[0]["effective_start_date"]): "--" } </TableCell>
                                  <TableCell> {(data.docs.length > 0)? this.dateFormat(data.docs[0]["effective_end_date"]): "--" } </TableCell>
                                  <TableCell> {(data.docs.length > 0)?data.docs[0]["verification_status"]: "--" }</TableCell>
                                  <TableCell style ={{width: "120px" }}> {(data.docs.length > 0)?data.docs[0]["remarks"]: "--" }</TableCell>
                                 </TableRow>      
                              )
                              

                              })

                              
                              :
                              
                              <TableRow >
                              <TableCell colSpan={6}> <center>No Records</center> </TableCell>
                              </TableRow>                  
                              
                              
                              : 
                              null
                              
                              }

                        </TableBody>

              
              
                 


                  </Table>
                </Grid>  */}



      </Grid>
        {/* <ToastContainer autoClose={50000} /> */}
      </Fragment>
    );
  };
}