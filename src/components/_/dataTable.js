import React,{Component,Fragment} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../../index.scss"
import {Button, Grid, Menu, MenuItem, Typography} from '@material-ui/core';
import FileViewer from 'react-file-viewer';
import GoogleDocsViewer from 'react-google-docs-viewer';
import CommonService from './../../service/commonServices';
import axios from 'axios';
import { toast } from 'react-toastify';
import Config from '../../container/config';

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





export default class  RequestedCommunity extends  Component {
  constructor(props){
      super(props);
      this.popUp = React.createRef();

      this.state = {
        open:"",
        setOpen: false,
        numPages: null,
    pageNumber: 1,
    loader: false,
    requestedCredetials : "",
    credential_types: "",
   }

  }
   
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

 
 
   handleClose = () => {
    this.setState({open:false});
    console.log(this.state.open,"kranthi...........")
  };
  

  componentDidMount(){
    this.setState({loading:false})
    console.log(this.popUp,"popup")
       console.log(this.props.data,"props data")
     this.setState({ loader: true});

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
      
  }

    

  

render(){ 

    var succesBtn = {
        color: "#fff",
      backgroundColor: "#5cb85c",
      borderColor: "#4cae4c",
      display: "inline-block",
      padding: "6px 12px",
      margin: "10px",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "1.42857143",
      textAlign: "center",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
     
      touchAction: "manipulation",
      cursor: "pointer",
      
      userSelect: "none",
      backgroundImage: "none",
      border: "1px solid transparent",
      borderRadius: "4px",
      }
      
    
    
    return (
        <Fragment>
            <Button style={{display:"none"}} color="success" onClick={this.props.handleClickOpen}>
            
          </Button>

          <Dialog 
           // onEscapeKeyDown ="fasle"
           // disableBackdropClick ="false"
          
            open={ this.props.open  }
            
            Width = "1000px"
          >
          
          <div>
                  <div style={{"float":"right"}}> <i className="far fa-times-circle" onClick = {this.props.onClose}></i>  </div>
          </div>  
  
          <Grid container style={{

"padding-bottom": "34px",
"padding-left": "20px",
"padding-right": "20px",
"width": "500px",
          }} >
          <Grid item sm={12}>
            <h2>
              <Typography className="pageTitle titleSection" variant="title" gutterBottom>
              Requried Credetials 
              </Typography>
            </h2>

           
            <Table className="listTable"  width="800px" > 
            
              <TableBody>
   
               
              {  (this.props.data)?
                    (this.props.data.credentials.length > 0)?
                      (this.props.data.credentials.map(data =>{
                        return (
                          <TableRow style={{ border:"0px"}} >
                        { /*  <TableCell> {  this.state.credential_types[data.credential_type_id]}</TableCell> */}
                        <TableCell style={{  width: "3px"}}> { (data.already_set)?  <img src={Config.images+"/correct-symbol.png"} width="14px" style = {{ marginLeft:'15px',position: "relative",top: "3px"}}/> : <img src={Config.images+"/cancel-mark.png"} width="14px" style = {{ marginLeft:'15px'}}/>  }   </TableCell>
                          <TableCell> <span 
                            style={{
                              position: "relative",
                              top: "-2px",
                            }} 
                          >{ data.title} </span> </TableCell>
                          </TableRow >

                        )

                      }))
                  :
                  <TableRow    style={{border:"0px"}}>
                  <TableCell colSpan={2}> <center>No Required  Credentials </center> </TableCell>
                  </TableRow>
                  :
                  
                  <TableRow   style={{border:"0px"}}>
                  <TableCell colSpan={2}> <center>No Required  Credentials</center> </TableCell>
                  </TableRow>
                  }

                  
                 
              </TableBody>
             </Table>
          </Grid>
        </Grid>

           
                       
          </Dialog>
        </Fragment>
          
      
      );
 }
  
 }
