// CheckoutForm.js
import React from 'react';
import {injectStripe} from 'react-stripe-elements';
import axios from 'axios';
import CardSection from "../_/cardSelection";
import {  toast } from 'react-toastify';
//import AddressSection from './AddressSection';


class CheckoutForm extends React.Component {
  constructor(props){
    super(props);
    this.state ={
     


      cardnumber : false,
      ccv:false,
      expirydate:false,
      first_name:"",
      first_name_error:"",
      last_name :"",
           email:"",
      billingStreet:"",
      city:"",
      state_name:"",
      zip:"",
     last_name_error:"",
     zip_error:"",
     state_name_error:"",
     city_error:"",
     billingStreet_error:"",
     email_error:"",
     ccverror:"",
     expriyerror:"",
     carderror:"",
     loader:false,


    }

  }
  handleChange = (change)=>{
    console.log("changes",change);
    
       this.setState({
        cardnumber: change.complete
       });
    

  }
  stateUpdate = (e) =>{
    //console.log(data,"kranthisllllll");
    this.setState({[e.target.name]:e.target.value });
  }

  handleChangeCvv = (change)=>{
    console.log("changes",change);
    
       this.setState({
        ccv: change.complete
       });
    

  }

  
  handleChangeExpirydate = (change)=>{
    console.log("changes",change);
    
       this.setState({
        expirydate: change.complete
       });
    
  
  }
/*
  getTokendata = async (ev) =>{



  ev.preventDefault();
   console.log(this.state,"krat");
   
  let residentId = this.props.residentsData.resident_id
  console.log(residentId,"daaayssssaa");

  let token  = await  this.props.stripe.createToken({type: 'card',
  first_name:this.state.first_name,
  last_name:this.state.last_name,
  email:this.state.email,
  billingStreet:this.state.billingStreet,
  city:this.state.city,
  state:this.state.state_name,
  zip: this.state.zip

 });

let payload_data ={first_name:this.state.first_name,
 email:this.state.email,
 last_name:this.state.last_name,
 billingStreet:this.state.billingStreet,
 city:this.state.city,
 state:this.state.state_name,
 zip: this.state.zip}
     
  // let token  = await  this.props.stripe.createToken({type: 'card', name:"kranthi"});
   console.log("token is",token.token.id)

  let response = await axios.post(axios.websubscriptionCharges(),{stripeToken:token.token.id,resident_id:residentId,visitor_info: payload_data}) 
  window.location.reload()
  
  } */



  getTokendata = async (ev) =>{
    ev.preventDefault();
    console.log(this.props.residentsData,"00000000000000000000000000000000000000000ssss");
      let formStatus  = true;
    const onlyText =   /^[a-zA-Z]*$/;  
    let emailre = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     
    
     let formSubmitFlag = true;
     if (this.state.first_name === '' ){
      
       this.setState({first_name_error:"Please enter first name "})
       formSubmitFlag =  false;
     }else{
      this.setState({first_name_error:""})
     /* if (!onlyText.test(this.state.first_name)){
        formSubmitFlag =  false;
        this.setState({first_name_error:"Please enter alphabets only"})
      }else{
        
      } */
     }
  
     if (this.state.last_name === '' ){
      this.setState({last_name_error:"Please enter last name "})
      formSubmitFlag =  false;
    }else{
      this.setState({last_name_error:""})
     /* if (!onlyText.test(this.state.last_name)){
        formSubmitFlag =  false;
        this.setState({last_name_error:"Please enter alphabets only"})
      }else{
        
      } */
     }
  
  
    if (this.state.email === '' ){
      this.setState({email_error:"Please enter email "})
      formSubmitFlag =  false;
    }else {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))
  
      {
        formSubmitFlag =  true;
        this.setState({email_error:""})
      }else {
        this.setState({email_error:"Please enter valid  email "})
        formSubmitFlag =  false;
      }
    }
  
  
    if (this.state.billingStreet === '' ){
      this.setState({billingStreet_error:"Please enter street"});
      formSubmitFlag =  false;
  
    }else{
      if(this.state.billingStreet.length > 69){
        this.setState({billingStreet_error:"Please enter below 70 characters only"});
        formSubmitFlag =  false;
      }else{
        this.setState({billingStreet_error:""});
      }
    }
  
  
  
    if (this.state.state_name === '' ){
      this.setState({state_name_error:"Please enter state name"});
      formSubmitFlag =  false;
    }else{
      this.setState({state_name_error:""})
    /*  if (!onlyText.test(this.state.state_name)){
        formSubmitFlag =  false;
        this.setState({state_name_error:"Please enter alphabets only"})
      }else{
        this.setState({state_name_error:""})
      } */
     }
  
  
  
    if (this.state.city === '' ){
      this.setState({city_error:"Please enter city name"});
      formSubmitFlag =  false;
    }else{
      this.setState({city_error:""})
     /* if (!onlyText.test(this.state.city)){
        formSubmitFlag =  false;
        this.setState({city_error:"Please enter alphabets only"})
      }else{
        this.setState({city_error:""})
      }*/
     }
  
  
    if (this.state.cardnumber === false){
      this.setState({carderror:"Please enter card number"});
      formSubmitFlag =  false;
    }else {
      this.setState({carderror:""});
    }
    if (this.state.expirydate === false){
      this.setState({expriyerror:"Please enter expiry date"});
      formSubmitFlag =  false;
    } else{
      this.setState({expriyerror:""});
    }
    if (this.state.ccv === false){
      this.setState({ccverror:"Please enter cvc"});
      formSubmitFlag =  false;
    }else{
      this.setState({ccverror:""});
    }



    if (this.state.zip === '' ){
      this.setState({zip_error:"Please enter zip code"});
      formSubmitFlag =  false;
    }else{
     
       if  (this.state.zip.length !=5 ){
        this.setState({zip_error:"Zip code must be 5 digits"});
        formSubmitFlag =  false;
  
       }else{
        this.setState({zip_error:""});
       } 
    }
   
    if(formSubmitFlag){
      this.setState({loader:true}); 
    
    let residentId = this.props.residentsData.resident_id
    

    let cardPayload  = {type: 'card',
    first_name:this.state.first_name,
    name: this.state.first_name +' '+this.state.last_name,
    email:this.state.email,
   // address_line1:this.state.billingStreet,
    address_city:this.state.city,
    address_state:this.state.state_name,
    address_zip: this.state.zip,
    address_country:"US"

   };
    if (this.state.billingStreet.length >35){
      const address1 = this.state.billingStreet.slice(0,35)
      const address2 = this.state.billingStreet.slice(35,70)
      //cardPayload.push( {address_line1:address1});
      cardPayload['address_line1'] =address1 ;
      cardPayload['address_line2'] =address2 ;

    }else {
      cardPayload['address_line1'] =this.state.billingStreet ;
      
     
    }

   /* {type: 'card',
    name: this.state.first_name +' '+this.state.last_name,
    email:this.state.email,
    address_line1:this.state.billingStreet,
    address_city:this.state.city,
    address_state:this.state.state_name,
    address_zip: this.state.zip,
    address_country:"US"

  } */
    let token  = await  this.props.stripe.createToken(cardPayload);

  let validate =  await token;
  if(validate.error){
    this.setState({loader:false});
    toast.error(
            
      " Your card is not supported! " 
      , {
      position: toast.POSITION.TOP_CENTER,
      className: 'rotateY animated'
      });
    return false;
  }

  let payload_data ={first_name:this.state.first_name,
  email:this.state.email,
  last_name:this.state.last_name,
  billingStreet:this.state.billingStreet,
  city:this.state.city,
  state:this.state.state_name,
  zip: this.state.zip}
  this.setState({loader:false});
    // let token  = await  this.props.stripe.createToken({type: 'card', name:"kranthi"});
    console.log("token is",token.token.id)
    
 
    let response = await axios.post(axios.websubscriptionCharges(),{stripeToken:token.token.id,resident_id:residentId,visitor_info: payload_data}) 
     
    window.location.reload()
  
    }
    
  
    }
  
  render() {
    
    return (
      <form onSubmit={(ev)=>this.getTokendata(ev)}>
       
        <CardSection handleChange = {this.handleChange} 
          handleChangeExpirydate  = {this.handleChangeExpirydate}
          handleChangeCvv = {this.handleChangeCvv}
        //  stateUpdate1 = {this.stateUpdate}
          // first_name = {this}  
          statusUpdate1  =  {this.stateUpdate}
          lastNameError = {this.state.last_name_error}
          firstNameError = {this.state.first_name_error}
          zipError = {this.state.zip_error}
          stateNameerror = {this.state.state_name_error}
          cityError = {this.state.city_error}
         
          billingStreetError =  {this.state.billingStreet_error}
          emailError =  {this.state.email_error}
          cardError =  {this.state.carderror}
          expriyError = {this.state.expriyerror}
          ccvError  =  {this.state.ccverror}
          loaderImage = {this.state.loader}
          headerType  ={"subscription"}
 
          />

<div style={{  padding: "10px"}}>
 <button style={{ backgroundColor: "#4CAF50",
        border: "none",
        color: "white",
        padding: "8px 32px",
        textAlign: "center",
        textDecoration: "none",
                display: "inline-block",
        fontSize: "16px",
        marginTop: "10px",
      }} > Subscribe </button>
 </div>      
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
