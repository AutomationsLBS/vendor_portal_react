import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../../index.scss"
import CredirCard from '../_/creditCardForm'


export default class  AlertDialog extends  Component {
  constructor(props){
      super(props);

      this.state = {
        open:false,
        setOpen: false,
   }

  }
  

   handleClickOpen = () => {
    this.setState({open:true});
  };
   
  onAgreeClose = ()=>{
     
      this.props.ifAgree(this.props.residentId,"cancel");
      this.setState({open:false});
  }
   handleClose = () => {
    this.setState({open:false});
  };
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
        <div>
          <Button variant="outlined" style={{ ...succesBtn}} color="success" onClick={this.handleClickOpen}>
          Update Card Details
          </Button>
          <Dialog 
            onEscapeKeyDown ="fasle"
            disableBackdropClick ="false"
          
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >  <div className  ="DialogTitle">
                { this.props.dialogtitle} 
            </div>
           
            <div className  ="DialogContent">
            {this.props.DialogContentText}
            </div>
             <div> 
             <CredirCard />
             </div>
 
            <DialogActions>
            <Button onClick={this.onAgreeClose} color="primary" autoFocus>
                Yes
              </Button>
              <Button onClick={this.handleClose} color="primary">
                No
              </Button>
              
            </DialogActions>
          </Dialog>
        </div>
      );
 }
  
 }