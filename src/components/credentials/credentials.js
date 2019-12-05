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

export default class Credentails extends Component {
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
      historyData:false,
      showButton: false,
    }
  }
 
  componentDidMount() {
     

    let visitorType    =   CommonService.localStore.get('visitor_types').visitor_types;
  
    let  vendoerType  = (visitorType == "vendor")?  'vendor': 'vendor_agency' ;
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
    console.log("componentDidMount ", this.props);
    if(window.location.pathname =="\credentials" && this.state.prevPath == "\employee"){
      document.getElementById("addCred").style.display = "none"
    }
      let dataParams = "";
      if (CommonService.localStore.get("usr_company_id").usr_company_id !== undefined && CommonService.localStore.get("usr_company_id").usr_company_id !== "" ){
       dataParams  = {params:{company_id:CommonService.localStore.get("usr_company_id").usr_company_id}}
      }
    axios
    .get(axios.my_credentials(),dataParams)
    .then((response) => {
        console.log("response-my_credentials",response);
        this.setState({myCredentails: response.credentials, loader: false});
        this.setState({showButton : (response.credentials.old_credentials.length > 0)? true : false })
      
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
    console.log("componentDidMount ", this.props);
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

 setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  handleClickOpen = (data) => {
    console.log(data,"status__check")
    this.setState({open:!this.state.open,url:data});
     console.log(data,"urlcode")
    
    
  }

  handleClose = (e) => {
    this.setState({open:false}); 
  }
  

  handleValue = (e) => {
    this.setState({open:false}); 
  }

  showHistory = (e) =>{
    this.setState({"historyData":!this.state.historyData })
  }

  render() {
    
      if (this.state.redirect) {
        return(<Redirect to='/credentialsCreate' />)
      }
    
    return (
      <Fragment>
        <Grid container>
          <Grid container>
            <Grid item sm={6}>
              <h2>
                <Typography className="pageTitle titleSection" variant="title" gutterBottom>
                  My Credentials
                </Typography>
              </h2>
              {CommonService.renderLoader(this.state.loader)}
            </Grid>
            
      
            <Grid item xs={6} sm={6} align="right">
              <Button className="btn btn-primary btn-round" id="addCred"
              onClick={this.setRedirect}>Add Credentials</Button>

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
                    
                    <TableCell>Credential Type</TableCell>
                    <TableCell>Doc</TableCell>
                    <TableCell> Alternative Doc</TableCell>
                    <TableCell> Effective Start Date</TableCell>
                    <TableCell> Effective End Date </TableCell>
                    <TableCell> Status </TableCell>
                    <TableCell> Reason </TableCell>  
                   
                  </TableRow>
                </TableHead>
                <TableBody>
                { /*(data.docs.length > 0)?data.docs[0]["document_path"]: "--"  (data.docs.length > 0)? "": "--"  */}
              {(this.state.myCredentails)? (this.state.myCredentails.current_credentials.length  > 0) ?
              this.state.myCredentails.current_credentials.map((data,i)=>{
                  
                let docpath = (data.docs.length > 0)? data.docs[0]["document_path"]: "none"
                let alternativeDocPath =  (data.alternate_docs.length > 0)? data.alternate_docs[0]["document_path"]: "none";
                 
                return (
                  <TableRow key={i} >
                <TableCell>  { this.state.credential_types[data.credential_data.credential_type_id]} </TableCell>
                
                <TableCell> <a onClick = {(e) =>this.handleClickOpen(docpath)  }  > <i className="fas fa-file" > </i></a></TableCell>
                <TableCell> <a onClick = {(e) =>this.handleClickOpen(alternativeDocPath)  }  > <i className="fas fa-file" > </i></a></TableCell>

                <TableCell> {(data.docs.length > 0)? this.dateFormat(data.docs[0]["effective_start_date"]): "--" } </TableCell>
                <TableCell> {(data.docs.length > 0)? this.dateFormat(data.docs[0]["effective_end_date"]): "--" } </TableCell>
                <TableCell> {(data.docs.length > 0)?data.docs[0]["verification_status"]: "--" }</TableCell>
                <TableCell> {(data.docs.length > 0)?data.docs[0]["remarks"]: "" } {(data.alternate_docs.length > 0)?data.alternate_docs[0]["remarks"]: "" }</TableCell>

              
              </TableRow>

                )
              })
              :  
              <TableRow >
              <TableCell colSpan={6}> <center>No Records</center> </TableCell>
              </TableRow> 
                : 
                <TableRow >
                <TableCell colSpan={6}> <center>No Records</center> </TableCell>
                </TableRow>}



                       
                 
                       
                </TableBody>
           
              </Table>
           </Grid>






        </Grid>

        <div  align="left" style= { { "padding-bottom": "14px" , "padding-top": "14px"}}> 
                    { (this.state.historyData)?  <a href="javascript:void(0)" onClick = {this.showHistory}  style ={{"text-decoration": "none",color:"blue"}} >Hide Past Credentials  </a>  :  (this.state.showButton ) ? <a herf="javascript:void(0);" style ={{"text-decoration": "none",color:"blue"}} onClick = {this.showHistory}  > Past Credentials  </a> : null } 
                </div>
                <Grid item sm={12} align="right"> 
                  <Table className="listTable" >


                 
                  
                  { (this.state.historyData)? 
                      <TableHead>
                      <TableRow>
                          
                          <TableCell>Credential Type</TableCell>
                          <TableCell>Doc</TableCell>
                          <TableCell> Alternative Doc</TableCell>
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
                    let alternativeDocPath =  (data.alternate_docs.length > 0)? data.alternate_docs[0]["document_path"]: "none";

                    return (
                      <TableRow key={i} >
                        <TableCell>  { this.state.credential_types[data.credential_data.credential_type_id]} </TableCell>
                        
                        <TableCell> <a onClick = {(e) =>this.handleClickOpen(docpath)  }  > <i className="fas fa-file" > </i></a></TableCell>
                        <TableCell> <a onClick = {(e) =>this.handleClickOpen(alternativeDocPath)  }  > <i className="fas fa-file" > </i></a></TableCell>
                        <TableCell> {(data.docs.length > 0)? this.dateFormat(data.docs[0]["effective_start_date"]): "--" } </TableCell>
                        <TableCell> {(data.docs.length > 0)? this.dateFormat(data.docs[0]["effective_end_date"]): "--" } </TableCell>
                        <TableCell> {(data.docs.length > 0)?data.docs[0]["verification_status"]: "--" }</TableCell>
                        <TableCell> {(data.docs.length > 0)?data.docs[0]["remarks"]: "" } {(data.alternate_docs.length > 0)?data.alternate_docs[0]["remarks"]: "" }</TableCell>
                      
                      </TableRow>      
                    )
                   

                  })

                  
                  :
                  <TableRow >
                  <TableCell colSpan={6}> <center>No Records</center> </TableCell>
                  </TableRow>
                  
                  : ""}
                
                        </TableBody>

              
              
                 


                  </Table>
                </Grid>


                 



      </Grid>
        {/* <ToastContainer autoClose={50000} /> */}
      </Fragment>
    );
  };
}
