import React,{Component,Fragment} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../../index.scss"
import {Button, Grid, Menu, MenuItem, Typography} from '@material-ui/core';
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
  FormHelperText,
  
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
    vendoerType:"",
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
     this.setState({vendoerType});

     axios
     .get(axios.credential_types(),{params:{ ctype:vendoerType}})
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
            maxWidth = "xl"
  
          >
          
          
          <div><div style={{float:"left"}}></div>
                  <div style={{"float":"right",
                    position: "relative",
                    paddingRight:"10px",
                    top: "7px"
                }}> <i className="far fa-times-circle" onClick = {this.props.onClose}></i>  </div>
          </div>  
          <Grid container  >
        
          <Grid item sm={12} style={{margin:"10px"}}>
            
              <Typography style={{fontSize:"22px"}} className="pageTitle titleSection" variant="title" gutterBottom>
              <b >Required Credentials for { this.props.communityName } </b> 
              </Typography>
            
          </Grid>
          <Grid container >
          {(this.state.vendoerType != "vendor")? 

                <Grid item sm={6}>
                <div className="requredcredentilas"><b>Agency Required Credentials </b> </div>


                
                {  (this.props.data.length > 0)?
                      
                        (this.props.data.map(data =>{
                          return (
                            
                            <div > { (data.already_set)? <div class="requredcredentilasRows"> <i className="fa fa-check" style={{color:"green",    position: "relative",top: "-2px"}} aria-hidden="true"></i> <span style={{position:"relative",top:"-2px"}}>{ data.title }</span> <div> { (data.url)? <FormHelperText style={{'color': 'black',top: "0px",position:"relative",paddingLeft:"20px"  }}> <a href={data["url"]}  target="_blank" style={{ "text-decoration": "none",color:"blue"}} > { data["url"].split("?")[0] }</a></FormHelperText>  :""}  </div> </div> : <div class="requredcredentilasRows"> <i className="fa fa-times" style={{color:"red",    position: "relative",top: "-2px",paddingLeft:"20px" }} aria-hidden="true"></i> <span style={{position:"relative",top:"-2px"}}>{ data.title }</span> <div> {(data.url)?  <FormHelperText style={{'color': 'black',top: "0px",position:"relative" }}>  <a href={data["url"]}  target="_blank" style={{ "text-decoration": "none",color:"blue"}} > { data["url"].split("?")[0] }</a></FormHelperText>:""}  </div>   </div>  }   </div>
                            

                          )

                        }))
                    :
                    
                    <div >  <div class="requredcredentilasRows"><center>No Records </center> </div></div> 

                    
                    }

                    
                  
                </Grid>

          :  ""
          
          
          }
                    
              <Grid item sm={6}>
              {(this.state.vendoerType != "vendor")? <div className="requredcredentilas"> <b> Vendor Required Credentials</b>  </div> : ""}
              
             
              
              {  (this.props.dataForVendor.length >0 )?
                  
                      (this.props.dataForVendor.map(data =>{
                        let  padding= "0px";
                        if(this.state.vendoerType == "vendor"){
                          padding = "30px";
                        }
                        return (
                        

                          <div > { (data.already_set)? <div class="requredcredentilasRows"> { (this.state.vendoerType == "vendor")? <i className="fa fa-check" style={{color:"green",    position: "relative",top: "-2px",padding:"5px"}} aria-hidden="true"></i>  : "" }<span style={{position:"relative",top:"-2px",padding:"5px"}}>{ data.title }</span> <div>  { (data.url)? <FormHelperText style={{'color': 'black',top: "0px",position:"relative",paddingLeft:padding}}> <a href={data["url"]}  target="_blank" style={{ "text-decoration": "none",color:"blue"}} > { data["url"].split("?")[0] }</a></FormHelperText> :"" }  </div>  </div> : <div class="requredcredentilasRows"> { (this.state.vendoerType == "vendor")? <i className="fa fa-times" style={{color:"red",    position: "relative",top: "-2px"}} aria-hidden="true"></i> : "" } <span style={{position:"relative",top:"-2px"}}>{ data.title }</span>  <div>  {(data.url)? <FormHelperText style={{'color': 'black',top: "0px",position:"relative",paddingLeft:padding }}> <a href={data["url"]}  target="_blank" style={{ "text-decoration": "none",color:"blue"}} > { data["url"].split("?")[0] }</a></FormHelperText> : "" }  </div>  </div>  }   </div>

                          )

                        }))
                  :
                  <div >  <div class="requredcredentilasRows"><center>No Records </center> </div></div> 
                 
                 
                  }

                  
                
              </Grid>
            </Grid>
          </Grid>
        

           
                       
          </Dialog>
        </Fragment>
          
      
      );
 }
  
 }