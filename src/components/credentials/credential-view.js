import React, { Component } from "react";
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
  Radio,
  TableRow,
  TableCell,
  Table,
  TableBody
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { green } from "@material-ui/core/colors";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Config from '../../container/config';

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

const DialogTitles = withStyles(styles)(props => {
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
const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);


export default class ViewCredentialDialog extends  Component{


	constructor(props){
	   super(props	)
       this.state ={
	       open: false,
	       credentialData:this.props.credentials,
	       loading:false,
   		}
   		console.log("credentialData::"+this.state.credentialData)
  	}

	handleClose = () =>{
     
      let value = false;
      this.setState({ open: value,loading:true});
  	}
  	handleOpen = () =>{
     
      let value = true;
      this.setState({ open: value,loading:true});
  	}

	

	render(){
		const { open } = this.state;
		let closeImg = {cursor:'pointer', float:'right', marginTop: '5px', width: '20px'};
		return(
			<div>
		      <a onClick={this.handleOpen}>
		        <img src={Config.images + "/icons/white/view-form-black.png" } style = {{ width :'23px',height :'23px' }}/>
		      </a>
	      	<Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title" 
             maxWidth="false" onEscapeKeyDown ="fasle" disableBackdropClick ="false" >
	        	<div style={{width:"700px",padding:"30px"}}>
		        	<DialogTitles id="customized-dialog-title" onClose={this.handleClose} >
	                	View Credential
	                </DialogTitles>
		        	<DialogContent>
		          		<DialogContentText>
		          			<Grid container>
						        <Grid item xs={12} sm={4} md={4} className="singleFormRight" style={{marginTop:"12px"}}>
						            <InputLabel>Credential Name
						            </InputLabel>
						        </Grid>
						        <Grid item xs={12} sm={6} md={6} className="singleFormRight" style={{marginTop:"12px"}}>
						            	<span style={{marginRight:"12px"}}>{this.state.credentialData.credentialName}</span> 
						        </Grid>
						        <Grid item xs={12} sm={4} md={4} className="singleFormLeft" style={{marginTop:"12px"}}>
						            <InputLabel> Effective Start Date 
						            </InputLabel>     
						        </Grid>
						        <Grid item xs={12} sm={6} md={6} className="singleFormLeft" style={{marginTop:"12px"}}>
						            	<span style={{marginRight:"10px"}}>{this.state.credentialData.startDate}</span>   
						        </Grid>
						        <Grid item xs={12} sm={4} md={4} className="singleFormLeft" style={{marginTop:"12px"}}>
						            <InputLabel > Effective End Date</InputLabel>       
						        </Grid>
						        <Grid item xs={12} sm={6} md={6} className="singleFormLeft" style={{marginTop:"12px"}}>
						            	<span>{this.state.credentialData.endDate}</span> 
						        </Grid>
						        <Grid item xs={12} sm={12} md={12} className="singleFormLeft" style={{marginTop:"12px"}}>
						            <a href={this.state.credentialData.doc}> Doccument Link</a>       
						        </Grid>
						    </Grid>
		          		</DialogContentText>
		          		<Grid item xs={12} sm={12} md={12} className="singleFormLeft">
				        	<Table style={{borderBottomStyle:"hidden"}}>
				        		<TableBody>
          							<TableRow>
				        	 			<TableCell style={{paddingTop: "12px",paddingRight: "27px",paddingLeft:"0px"}}>	<InputLabel> Status </InputLabel></TableCell>
				        	 			<TableCell style={{paddingTop: "0px",paddingLeft: "0px", paddingRight: "0px", width:" 1px"}}>
					                    	<Radio checked={this.state.credentialData.status === 'r'}
											     value="r" name="radio-button-demo"  /> 
					                      	<InputLabel style={{marginLeft: "37px", marginTop: "-29px"}} > 
					                      			Rejected
					                      	</InputLabel>
					                    </TableCell>
		                     			<TableCell style={{paddingTop: "0px",paddingLeft: "15px", paddingRight: "0px"}}>
		                     				<GreenRadio checked={this.state.credentialData.status === 'a'}
						        				  value="a"name="radio-button-demo"/>
											<InputLabel   style={{marginLeft: "37px", marginTop: "-29px"}}> 
												Approved
											</InputLabel>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
			            </Grid>
			            <Grid item xs={12} sm={12} md={12} className="singleFormRight" style={{marginTop:"15px"}}>
                    		<InputLabel> Remarks*</InputLabel>	
                    			<TextField style={{marginRight:"10px"}} value={this.state.credentialData.remarks} fullWidth  placeholder=" Remarks" />   
                  		</Grid>
		          		
		        	</DialogContent>
			        <DialogActions>
				        <Button variant="contained" color="primary" 
            					style={{backgroundColor:"rgb(30, 88, 195)"}} 
            					className="greenBtn">
				            Submit
				        </Button>
				    </DialogActions>
			    </div>
	        </Dialog>
	    </div>
		)
	}
	
}