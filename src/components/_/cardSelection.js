// CardSection.js
import React,{Fragment} from 'react';
import {CardNumberElement,
  CardCVCElement,CardExpiryElement} from 'react-stripe-elements';
 import {
  
  Typography,
  TextField
  
} from '@material-ui/core';
import CommonService from '../../service/commonServices';

class CardSection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      first_name:"",
      first_name_error:"",
      last_name :"",
      last_name_error:"",
    }


  }
  
  inputChange = (e) =>{
    this.setState({[e.target.name]:e.target.value })
    //this.props.stateUpdate({key:e.target.name,value:e.target.value})
  }


  render() {
    const  error_padding = {
      margin: "10px",
      fontSize: "13px",
      color: "red",
      
     }
    const stylecss = {
      
    width: "500px",
    paddingBottom: "8px",
    margin: "10px",
    borderBottom :"1px solid gray",

    }
    const  padding ={
      paddingBottom: "8px"
    }
    
    const inputFormData = {
      backgroundColor: "transparent",
     border: "none",
     display: "block",
     fontFamily: "sans-serif",
    margin: 0,
    padding: 0,
    width: "100%",
    fontSize: "1em",
    lineHeight: "1.2em",
    height: "1.2em",
    color: "#32325d",
    fontSize: "16px",
    outline: "none",
    
      
    }

    const styles = {
      base: {
        
        '::-webkit-input-placeholder': {
            color: "red"
        }
        
      },
    
      
    };

    return (
    <Fragment>
 
 <div style={{  padding: "10px"}}>
 {CommonService.renderLoader(this.props.loaderImage)}
  {(this.props.headerType ==='cardflag')? 
  
  <Typography className="pageTitle titleSection" variant="title" gutterBottom>
      Card Details
            </Typography>

  :
  <Fragment>
    <Typography className="pageTitle titleSection" variant="title" gutterBottom>
    Accushield Connect Subscription Payment
            </Typography>
    <div>
      <font color ="#394d6e">
        The cost of the Accushield Connect service is $8.99 (monthly) after your 30 days free trial.  
      </font>

      </div>
      <div>
      <font color ="#394d6e">
     <b> Note:</b> Once payment information is entered, your access to the Resident Visitor Report and Resident sign-out Report can be accessed.  Cancel service at any time.
      </font>
      </div>

  </Fragment>

}
    
  </div>
  <div style = {stylecss}>
    <div style ={ padding} >
      First Name 
     </div>
    
    <input type="text" name ="first_name" value ={this.props.first_name} onChange = {(e)=>this.props.statusUpdate1(e) }  
    //placeholder ="First name"
       style={{...inputFormData,...styles.base}} />
  </div>
  <div style ={ error_padding}>
      { this.props.firstNameError }
      </div>
  <div style = {stylecss}>
    <div style ={ padding} >
      Last Name 
     </div>
     <input type="text" name ="last_name" value ={this.props.last_name} onChange = {(e)=>this.props.statusUpdate1(e) }
      // placeholder ="Last Name"  
        style={{...inputFormData}} />
    </div>
    <div style ={ error_padding}>
      { this.props.lastNameError }
      </div>
    <div style = {stylecss}>
    <div style ={ padding} >
      Email 
     </div>
     <input type="text" name ="email" value ={this.props.email} onChange = {(e)=>this.props.statusUpdate1(e) } 
     // placeholder ="Email" 
        style={{...inputFormData}} />
    </div>
    <div style ={ error_padding}>
      { this.props.emailError }
      </div>

      <div style = {stylecss}>
      <div style ={ padding} > Credit Card Number</div>
       <CardNumberElement style={{
         base :{
  
   
          color: '#303238',
          fontSize: '16px',
          color: "#32325d",
          fontSmoothing: 'antialiased',
          '::placeholder': {
            color: '#ccc',
          
          },
          border: "1px",
          margin: "10px 10px",
        
      
        }
       }}   placeholder ="0000-0000-0000-0000"
       onChange={this.props.handleChange}
       />
       </div>
       <div style ={ error_padding}>
      { this.props.cardError }
       </div>
       
       
       <div style = {stylecss}>
       <div style ={ padding} > Expiration date</div>
       <CardExpiryElement  onChange = {this.props.handleChangeExpirydate}
       style={{
        base :{
 
  
         color: '#303238',
         fontSize: '16px',
         color: "#32325d",
         fontSmoothing: 'antialiased',
         '::placeholder': {
           color: '#ccc',
         
         },
         border: "1px",
         margin: "10px 10px",
       
     
       }
      }}  />

</div>
<div style ={ error_padding}>
      { this.props.expriyError }
 </div>
<div style = {stylecss}>
    <div style ={ padding} >CVC</div>
       <CardCVCElement 
       onChange = {this.props.handleChangeCvv}
       style={{
        base :{
 
  
         color: '#303238',
         fontSize: '16px',
         color: "#32325d",
         fontSmoothing: 'antialiased',
         '::placeholder': {
           color: '#ccc',
         
         },
         border: "1px",
         margin: "10px 10px",
       
     
       }
      }} />
      </div>
      <div style ={ error_padding}>
      { this.props.ccvError }
      </div>

    <div style = {stylecss}>
      <div style ={ padding} >
      Billing Address Street
      </div>
     <input type="text" name ="billingStreet" value ={this.props.billingStreet} onChange = {(e)=>this.props.statusUpdate1(e) }    style={{...inputFormData}} />
    </div>
    <div style ={ error_padding}>
      { this.props.billingStreetError }
      </div>
    <div style = {stylecss}>
      <div style ={ padding} >
      City 
      </div>
     <input type="text" name ="city" value ={this.props.City} onChange = {(e)=>this.props.statusUpdate1(e) }   style={{...inputFormData}} />
    </div>
    <div style ={ error_padding}>
      { this.props.cityError }
      </div>
    <div style = {stylecss}>
      <div style ={ padding} >
      State
      </div>
     <input type="text" name ="state_name" value ={this.props.state_name} onChange = {(e)=>this.props.statusUpdate1(e) }   style={{...inputFormData}} />
    </div>
    <div style ={ error_padding}>
      { this.props.stateNameerror }
      </div>
    <div style = {stylecss}>
      <div style ={ padding} >
       Zip
      </div>
    
     <input type="text"  maxlength="5" name ="zip" value ={this.props.zip} onChange = {(e)=>this.props.statusUpdate1(e) }    style={{...inputFormData}} />
    </div>
    <div style ={ error_padding}>
      { this.props.zipError }
      </div>
     </Fragment>
         );
  }
}




export default CardSection;
