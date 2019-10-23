import React, { Fragment,Component } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {Elements, StripeProvider} from 'react-stripe-elements';
import MyStoreCheckout from '../_/MyStoreCheckout';


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
  
export default class Dailgo extends  Component {
  constructor(props){
      super(props);
   this.state ={
       open: false,
       residentsData:this.props.reisdentData
   }
  }


  
  handleClose = () =>{
     
      let value = !this.state.open;
      this.setState({ open: value})
     
  }
  render(){
       const { open } = this.state;
       let closeImg = {cursor:'pointer', float:'right', marginTop: '5px', width: '20px'};

      return (
        <Fragment>
           
                <Button onClick={this.handleClose} variant="contained" color="primary" >
                      Subscribe
                    </Button>
            <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title" >    

                <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        
                </DialogTitle>
                    <DialogContent>
                    
                    <StripeProvider apiKey="pk_live_kFyopGNAuKgAh4L76QqExXpL" >
                        <div className="example">
                        
                        <Elements>
                            <MyStoreCheckout  dialogBoxClose ={ this.handleClose} residentsData={this.state.residentsData}   />
                        </Elements>
                        </div>
                    </StripeProvider>
                    </DialogContent>
                    
                   
                </Dialog>
            </Fragment>
      );
  }

}

