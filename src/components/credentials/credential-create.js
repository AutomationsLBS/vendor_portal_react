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

import DateFnsUtils from '@date-io/date-fns';
import { ToastContainer, toast } from 'react-toastify';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import FormControlLabel from '@material-ui/core/FormControlLabel';


export default class CredentailCreate extends Component{
	constructor(props) {
	    super(props);
	    this.inputRef  = React.createRef();
    	let ud = CommonService.localStore.get('userData');
    	this.state = {
      		selectedDate :new Date(),
      		altfile:"f",
      		effectiveStartDate:new Date(),
      		effectiveEndDate:new Date(),
      		textarea:"",
          remarks : ""
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
        if(event.target.value == "t"){
          document.getElementById("alternateDoc").style.display = 'inline'
        }else {
          document.getElementById("alternateDoc").style.display = 'none'
        }
        this.setState({ altfile :event.target.value})
    }

    remarksOnChange = (e) =>{
      this.setState({[e.target.name] : e.target.value})
    }

  	componentWillMount() {
    	console.log("Component Will Mount");
  	}
  	componentDidMount() {
  	  console.log("componentDidMount ", this.props);
  	}

	render() {
		return (
      		<Fragment>
      			 <MuiPickersUtilsProvider utils={DateFnsUtils}>
				        <Grid item>
				          <h2>
            				<Typography className="pageTitle titleSection" variant="title" gutterBottom>
             					Add Credential
           					</Typography>
         					</h2>
				        </Grid>
                <Grid container spacing={32} style={{marginTop:"25px"}}>
                  <Grid item xs={12} sm={6} md={6} className="singleFormRight" >
                     <FormControl>
                            <InputLabel htmlFor="community-helper"  style={{"marginTop": "15px"}}>Credential Type</InputLabel>
                            <Select  label="Credentialing" id="credentialing" value={this.state.enddate}
                                style={{ width: "260px",marginTop: "30px"}}
                                margin="normal">
                            </Select>
                          </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="singleFormLeft"  >
                    <input type="file" style={{display:"none"}}  ref ={this.inputRef}  />
                    <span style={{color: "rgba(0, 0, 0, 0.54)" ,marginLeft:"4px", 
                    fontFamily: "Roboto, Helvetica, Arial, sans-serif"}}> Upload Document </span>
                    <div>
                    <Button onClick={this.onDrop}  variant="contained" color="primary" 
                    style={{backgroundColor:"#47b16f",margin: "6px"}} className="greenBtn">
                       Upload Doc
                    </Button> 
                    </div>
                  </Grid>
  				      	<Grid item xs={12} sm={6} md={6} className="singleFormRight" style={{width: "350px",marginTop: "30px"}}>
            					<InputLabel style={{ color: "rgba(0, 0, 0, 0.54)",marginRight:"10px",fontFamily: "Roboto, Helvetica, Arial, sans-serif"}}>
                      Effective Start Date</InputLabel>
                      <KeyboardDatePicker disableToolbar  variant="inline"
            					format ="MM/dd/yyyy" margin="normal"  value ={this.state.effectiveStartDate} id="date-picker-inline"  onChange={this.startDateChange}
                      KeyboardButtonProps={{'aria-label': 'change date', }} style={ {marginTop:"0px"}}  />
        					</Grid>
        					<Grid item xs={12} sm={6} md={6} className="singleFormRight" style={{width: "350px", marginTop: "30px"}}>
            				<InputLabel style={{ color: "rgba(0, 0, 0, 0.54)",marginRight:"10px",fontFamily: "Roboto, Helvetica, Arial, sans-serif"}}>
                      Effective End Date</InputLabel>	
                      <KeyboardDatePicker disableToolbar  variant="inline"
            					format="MM/dd/yyyy" margin="normal" id="date-picker-inline"  value={this.state.effectiveEndDate} KeyboardButtonProps={{'aria-label': 'change date', }} 
                      style={{ marginTop:"0px"}}
          					    onChange={this.endDateChange}
                    />
        					</Grid>
  				      	<Grid item xs={12} sm={6} md={6} className="singleFormLeft"  
                  style={{"marginTop": "25px"}}>
                     <InputLabel style={{ color: "rgba(0, 0, 0, 0.54)",marginRight:"10px",fontFamily: "Roboto, Helvetica, Arial, sans-serif"}}>
                      Alternative Doc </InputLabel>
                    <RadioGroup aria-label="position" name="position" 
                      value={this.state.altfile} onChange={this.radioButton} row> 
                      <FormControlLabel value="t" control={<Radio color="primary" />}
                        label="Yes" labelPlacement="start"  />
                      <FormControlLabel value="f"  control={<Radio color="primary" />}
                        label="No" labelPlacement="start"  />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} id="alternateDoc" style={{display:"none","marginTop": "20px"}}>
                     <input type="file" style={{display:"none"}}  ref ={this.inputRef}  />
                      <span style={{color: "rgba(0, 0, 0, 0.54)" ,marginLeft:"4px", 
                      fontFamily: "Roboto, Helvetica, Arial, sans-serif"}}> Alternate Upload Document </span>
                      <div>
                        <Button onClick={this.onDrop}  variant="contained" color="primary" 
                          style={{backgroundColor:"#47b16f",marginTop: "6px"}} className="greenBtn">
                           Upload  Doc
                        </Button> 
                      </div>
                  </Grid>
        					<Grid item xs={12} sm={12} md={12} className="singleFormRight" style={{marginTop:"7px"}}>
                    <TextField  label="Remarks" onChange={(e) => {this.remarksOnChange(e)}} fullWidth value={this.state.remark} placeholder=" Remarks" />   
                  </Grid>
        					
        					<Grid item xs={12} sm={6} md={6} justify="center" style={{marginTop:"25px"}} >
            				<Button variant="contained" color="primary" 
            					style={{backgroundColor:"#47b16f"}} 
            					className="greenBtn">
               					 Submit
            					</Button>
  					        <Button variant="outlined" className="outlinedBtn" 
  					          href="/credentials"  style={{marginLeft:"14px"}} >
                					Cancel
                				</Button>
            			</Grid>
                </Grid>
				</MuiPickersUtilsProvider>
      		</Fragment>
      	)
	}

}