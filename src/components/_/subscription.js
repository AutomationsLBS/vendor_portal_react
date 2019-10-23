import React, { Fragment,Component } from "react";
import Dialog from '@material-ui/core/Dialog';
//import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CommonService from '../../service/commonServices';
import Config from '../../container/config';


import "../register/register.scss";


import { withStyles } from '@material-ui/core/styles';


import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {
      margin: 0,
      padding: "1px",
    },
    closeButton: {
      position: 'absolute',
      right: "1px",
      top: "1px",
      color: "gray",
    },
  });
  
  const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
export default class DailgoSubscription extends  Component {
  constructor(props){
      super(props);
   this.state ={
       open: false,
       residentsData:this.props.reisdentData,
       loading:true
   }
  }

  

  handleClose = () =>{
     
      let value = !this.state.open;
      this.setState({ open: value,loading:true});

     
  }
  loadingdataa =()=>{
   
    this.setState({loading:false})
    // let  elem = document.getElementById('app').style = ``;
    // let  style ={"display":"none"};
    // style.color = "blue";
   // $("#app").hide();
   

  }
  render(){
       const { open } = this.state;
       let closeImg = {cursor:'pointer', float:'right', marginTop: '5px', width: '20px'};
      let  video =  {
        position:"absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    }

      return (
        <Fragment>
           
                <Button onClick={this.handleClose} variant="contained" color="primary" >
                Access Data
                    </Button>
            <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title" 
             maxWidth="false" 
             onEscapeKeyDown ="fasle"
             disableBackdropClick ="false"
           // contentStyle={{width: "300px", maxWidth: "none"}}
            >    
             <div style={{width: 500}}>
             
             <DialogTitle id="customized-dialog-title" onClose={this.handleClose} >
                
                </DialogTitle>
                  <div style ={{ width: "70%","align-self": "center",
                
                "font-family": "Segoeui-regular",
                "letter-spacing": "1px",
                "font-size": "12px",
                "position": "relative",
                left: "32px",
                padding:"19px",
                }} >
                 <b> NO CREDIT CARD REQUIRED :</b>Enjoy 30 days of free access and peace-of-mind! After 30 days, the Connect reports and alerts will continue for a monthly subscription of $8.99 per month and can be canceled at any time
                  </div>
                    
                   
                    {  this.state.loading? ( CommonService.renderLoader(this.state.loading) ): null }
                     
                     <iframe onLoad = {this.loadingdataa} src={Config.chargebeeurl} width="500px" height="400px" allowfullscreen  style={{border: '0px'}}/>
                    
             
             
             </div>
                    
                   
                </Dialog>
            </Fragment>
      );
  }

}

