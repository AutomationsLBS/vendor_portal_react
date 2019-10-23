import React, {Component, Fragment} from 'react';
import {

  Typography,
} from '@material-ui/core';
import axios from 'axios';

import 'react-credit-cards/lib/styles.scss'
import {Elements,injectStripe} from 'react-stripe-elements';
import CheckoutForm from "../_/checkOutFormUpdate";




import './style.css';
 class Mypayments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardDetails:"",
      doRedirect:"",
      redirectUrl:"",
      pageTitle:"",
      loader:false,
      displayCard:false,

      number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null,
    gateway_account_id:"",
    first_name:''

      


     }
 }
  componentWillMount() {
  }
  componentDidMount() {
    this.getCardDetails();

  }
  updateCardDetails = (data)=>{
    this.setSate({cardDetails:data }) 
   }
  getCardDetails =()=>{
    this.setState({loader: true});
   
    axios
    .get(axios.cardDetails())
    .then((response) => {
      
      this.setState({loader: false,cardDetails:response[0]['card']['masked_number'],gateway_account_id:response[0]['gateway_account_id'],first_name:response[0]['card']['first_name']}); 
      
    }).catch((error)=>{
     
      this.setState({loader: false});
    }); 

  }

  addcardDisplay = () =>{
    
    this.setState({ displayCard: !this.state.displayCard })
  }

  



  

  render() {
    const  formControl = {
      width: "60%",
      padding: "12px 20px",
      margin: "8px 0",
      display: "inline-block",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxSizing:" border-box",
    }

    var left = {
      width:"300px",
      float:"left",
      height:"100%",
      display:"none",
    }
   
    var right = {
     // marginLeft:"350px"
    }

    var dangerButton = {
      color: "#fff",
      backgroundColor: "#d9534f",
      borderColor: "#d43f3a",
      display: "inline-block",
    padding: "6px 12px",
    margin:"10px",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "1.42857143",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign:" middle",
  
    touchAction: "manipulation",
    cursor: "pointer",
 
   
    border:" 1px solid transparent",
    borderRadius: "4px",
    }
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
      
      const {displayCard ,name, number, expiry, cvc, focused, issuer, formData } = this.state;
    return (
      <div>
        {( (displayCard)? '':
        <div style={{    position: "relative" , left: "10px"}}>
              <Typography  variant="title" gutterBottom>
            <font color="#56B16F">  My Settings </font>
            </Typography>

        </div>
        ) }
        
      <div style={{    position: "relative" , left: "10px"}}>
    {(displayCard)? '': <div>Card Number : {this.state.cardDetails}</div>  }
          { (displayCard) ? "":(<div style={{    position: "relative" , right: "10px"}}> <button style={{ ...succesBtn}} onClick={this.addcardDisplay} >Update Card Details</button></div> )}
      </div>
      
   
        {
          (displayCard)? (
            <CheckoutForm  CancelButton ={this.addcardDisplay} gateway_account_id ={this.state.gateway_account_id} first_name = {this.state.first_name}   />        ): ""
        }
        
      </div>
      
    );
  };
}

export default injectStripe(Mypayments);