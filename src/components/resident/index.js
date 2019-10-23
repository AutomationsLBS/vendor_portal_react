import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import CommonService from '../../service/commonServices';
import ImageUploader from 'react-images-upload';
//import DatePicker from 'react-datepicker';

import 'react-dropzone-uploader/dist/styles.css'
import "./index.scss";
import {
  
  Grid,
  
  Typography,
  TextField,
    
  Button,
  
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import DateFnsUtils from '@date-io/date-fns';
import { ToastContainer, toast } from 'react-toastify';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';





export default class Resident extends Component {
  constructor(props) {
    super(props);
    this.inputRef  = React.createRef();
    let ud = CommonService.localStore.get('userData');
    this.state = {
      selectedDate :new Date(),
      altfile:"f",
      startdate:new Date(),
      enddate:new Date(),
      textarea:"",
      
           }
    }
  

 
    onDrop = () => {
      // POST to a test endpoint for demo purposes
      //this.inputRef.click();
      this.inputRef.current.click();
    }
    startDateChange =(date) =>{
         this.setState({startdate:date})

    }
    endDateChange =(date) =>{
      this.setState({enddate:date})

      } 
    radioButton =(event)=>{
         
        this.setState({ altfile :event.target.value})
    }

    textFeildData = (event)=>{
      console.log(event.target.value,"oooooooooooooooo")
      this.setState({textarea: event.target.value});
    }



  render() {
     
   
   
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container className="accountBlock" >
      <Grid container className="header" justify="flex-start" >
          {/* <Grid item xs={12} sm={6} md={6} > */}
          <Grid item>
              <Typography className="pageTitle titleSection" variant="title" gutterBottom align="center">
                  Document  upload from
              </Typography>
          </Grid>

      </Grid>
     
      <Grid item xs={12} sm={6} md={6} className="singleFormLeft" >
          {/* <div className="formDescp" > */}

          <input type="file" style={{display:"none"}}  ref ={this.inputRef}  />
      <span style={{"font-size": "12px",color: "rgba(0, 0, 0, 0.54)"}}> File upload </span>
          <Button onClick={this.onDrop}  variant="contained" color="primary" style={{backgroundColor:"#47b16f",margin: "6px"}} className="greenBtn"
             
          >
              BROWSE
          </Button> 
          {/* <div>
              {this.state.firstname_error && <span className="errorText" > First name is required</span>}
          </div> */}
          {/* </div> */}
      </Grid>
      <Grid item xs={12} sm={6} md={6} className="singleFormRight" >
          {/* <div className="formDescp" > */}
                 
          {/* <div>
              {this.state.lastname_error && <span className="errorText" > First name is required</span>}
          </div> */}
          {/* </div> */}
      </Grid>


      <Grid item xs={12} sm={6} md={6} className="singleFormLeft" >
          {/* <div className="formDescp" > */}
          
          <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-startdate"
          label="Start date picker"
          value={this.state.startdate}
         onChange={this.startDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    
      </Grid>
      <Grid item xs={12} sm={6} md={6} className="singleFormRight" >
          {/* <div className="formDescp" > */}
         
          <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="End date picker"
          value={this.state.enddate}
         onChange={this.endDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
          
      </Grid>


           <Grid item xs={12} sm={6} md={6} className="singleFormLeft" >
           <span style={{ "font-size": "12px",
    color: "rgba(0, 0, 0, 0.54)"}}>Alternative Doc</span>
           <RadioGroup aria-label="position" name="position" value={this.state.altfile} defaultValue="f" onChange={this.radioButton} row> 
           <FormControlLabel
          value="t"
          control={<Radio color="primary" />}
          label="Yes"
          labelPlacement="start"
        />
       <FormControlLabel
          value="f"
          control={<Radio color="primary" />}
          label="No"
          labelPlacement="start"
        />
        </RadioGroup>
    
      </Grid>
      <Grid item xs={12} sm={6} md={6} className="singleFormRight" >
      <TextField
        id="standard-full-width"
        label="Credentialing"
        style={{ width: "250px"}}
        placeholder=" Credentialing"
        
        
        onChange = {this.textFeildData}
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />   
          
      </Grid>   
      <Grid item xs={12} sm={12} md={12} className="singleFormRight"  >
     
      
     </Grid>  
      
     
      <Grid item xs={12} sm={6} md={6} justify="center"  >
            
          <Button variant="contained" color="primary" style={{backgroundColor:"#47b16f"}} className="greenBtn"
             
          >
              Submit
          </Button>
          
          <Button variant="outlined" className="outlinedBtn" href="/account"  style={{margin:"14px"}} >
              Cancel
              </Button>
          </Grid>
      
  </Grid>

</MuiPickersUtilsProvider>
          );
  };
}
