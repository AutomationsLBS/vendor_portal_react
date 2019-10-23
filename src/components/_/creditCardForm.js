import React,{Component} from "react"
import {
    Button,
    Grid,
    
    Typography,
    
    TextField
  } from '@material-ui/core';
 
  
export default class CreditCard extends Component {
    constructor(props) {
        super(props);
        this.state ={
           
            cardnumber:"",
            cvv:"",
            expairydate:"",
            error_cardnumber:"",
            error_cvv:"",
            error_expairydate:"",

            
                
        }
       
      }
   
   changeData =( event) => {
   this.setState({[event.target.name] : event.target.value});
  }
  submitEmployeeForm = ()=>{
      const {cardnumber,cvv,expairydate}  = this.state;
      this.props.onDataSubmit({cardnumber,cvv,expairydate});  
  }

  render(){
      const  {cardnumber,cvv,expairydate} =  this.state;
      return (
        <Grid container>
            <Grid container className="header" justify="space-between" >
               <h2>
                    <Grid item>
                        <Typography className="pageTitle titleSection" variant="title" gutterBottom align="left">
                           Update Card Details
                        </Typography>
                    </Grid>
                </h2>
            </Grid>
            <Grid container spacing={32}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        label="Card Number"
                        value = {cardnumber}
                      onChange={ (e)=>{this.changeData(e)}}
                        placeholder="Card Number"
                        name ="cardnumber"
                        type="text"
                        fullWidth
                        margin="normal"
                    //    helperText={(employeeError.first_name !== null) ? "" : "First Name field required."}
                    //   error={(employeeError.first_name !== null)
                    //   ? false
                    // : true}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={32}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        label="Name on Card"
                        value = {cardnumber}
                      onChange={ (e)=>{this.changeData(e)}}
                        placeholder="Name on Card"
                        name ="cardnumber"
                        type="text"
                        fullWidth
                        margin="normal"
                    //    helperText={(employeeError.first_name !== null) ? "" : "First Name field required."}
                    //   error={(employeeError.first_name !== null)
                    //   ? false
                    // : true}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={32}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Expire End Date"
                     value={expairydate}
                    onChange={ (e)=>{this.changeData(e)}}
                        placeholder="Expire End Date"
                        type="text"
                        name ="expairydate"
                        margin="normal"
                    //    helperText={(employeeError.first_name !== null) ? "" : "First Name field required."}
                    //   error={(employeeError.first_name !== null)
                    //   ? false
                    // : true}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="CVV"
                     value={cvv}
                     onChange={(e)=>{this.changeData(e)}}
                        placeholder="CVV"
                        type="text"
                        name ="cvv"
                        margin="normal"
                    //    helperText={(employeeError.first_name !== null) ? "" : "First Name field required."}
                    //   error={(employeeError.first_name !== null)
                    //   ? false
                    // : true}
                    />
            </Grid> 
           
            
                
            </Grid>

            
         
       </Grid>
            
      
            


      );
  }


}