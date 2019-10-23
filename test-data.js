import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import CommonService from '../../service/commonServices';
import ImageUploader from 'react-images-upload';
import DatePicker from 'react-datepicker';

import 'react-dropzone-uploader/dist/styles.css'
import "./index.scss";
import {
  
  Grid,
  
  Typography,
  
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableSortLabel,
  Hidden,
  Button,

  
} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';



export default class Resident extends Component {
  constructor(props) {
    super(props);
    this.inputRef  = React.createRef();
    let ud = CommonService.localStore.get('userData');
    this.state = {
      selectedDate :"08/18/2014",
      altfile:false,
           }
    }
  

 
    onDrop = () => {
      // POST to a test endpoint for demo purposes
      //this.inputRef.click();
      this.inputRef.current.click();
    }
    handleDateChange =(data) =>{


    }



  render() {
     
   
   
    return (

      
      <div>
    
        <Grid container spacing={3} style={{border:"1px"}} >
       
        <Grid item xs={12} sm={12} style ={{padding:"10px"}} >
        <Typography className="pageTitle titleSection" variant="title" gutterBottom>
              Tab 1
             
              </Typography>
        </Grid>
       
          <Grid item xs={12} sm={3} style ={{padding:"10px"}} >
         File upload:
        </Grid>
        <Grid item xs={12} sm={9} style ={{padding:"10px"}} >
       
        <input type="file" style={{display:"none"}}  ref ={this.inputRef}  />
        <button onClick={this.onDrop} className ="submitButton" >Browse</button> 
          
        </Grid>
           
        <Grid item xs={12} sm={3} style ={{padding:"10px"}} >
        
           Date Ranges:
        
          
        </Grid>
        <Grid item xs={12} sm={9} style ={{padding:"10px"}} >
        
						<div className="filterItem">
							<label style={{padding:"4px"}}>Start Date:</label>
              
              
							<div className="startDate">
								<DatePicker
								placeholderText="Start Date"
								
                dateFormat="MM/DD/YYYY"

              
								/>
							</div>
              <label style={{padding:"4px"}}>End Date:</label>
							<div className="endDate">
								<DatePicker
								placeholderText="End Date"
							
								dateFormat="MM/DD/YYYY"
							/>
							</div>
						</div>
            
        </Grid> 
    


      


        <Grid item xs={12} sm={3} style ={{padding:"10px"}} >
        
        
                   Altenative doc uplaod:  
          
        </Grid>
        <Grid item xs={12} sm={9} style ={{padding:"10px"}}>
        <input type="radio" name="alterdoc" value="true" /> Yes
                                  <input type="radio" name="alterdoc" value="false" /> No
        {(this.state.altfile)? <input type="file" name="myFile" />
            :""}
        
            
        </Grid>    


        <Grid item xs={12} sm={3} style ={{padding:"10px"}} >
        
        Credentialing:
   
        </Grid>
        <Grid item xs={12} sm={9} style ={{padding:"10px"}} >
        
        <textarea rows="4" cols="50">

             </textarea>
        
        
        </Grid>    



        <Grid item xs={12} sm={3} style ={{padding:"10px"}} >
        
           
        </Grid>
        <Grid item xs={12} sm={9} style ={{padding:"10px"}} >
        

        <Button
                  //  onClick={this.cancelEdit}   
                    className="btn btn-secondary">
                    Cancel
                </Button>
                 

                <Button
                  
                    variant="contained"
                    color="primary"
                    className="btn btn-primary">
                    Submit
                </Button>
        
        </Grid>  

       
      </Grid>
    
      </div>
    );
  };
}
