import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {
  Grid,
  Typography,
  
} from '@material-ui/core';

import 'react-credit-cards/lib/styles.scss';

//import  DailgoSubscription  from  '../_/subscription';
import DailgoSubscriptions from "../_/chargebeedailogboxUpdate"; 
import Dailobox from "../_/dialog";
import { ToastContainer, toast } from 'react-toastify';





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
    first_name:'',
    activeButtonstatus: false,
    resident_id: 0,
      


     }
 }
  componentWillMount() {
  }
  componentDidMount() {
    //this.getCardDetails();
    //this.getResidents();
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
  
  UpdateSubcription = () =>{
    
    this.setState({ displayCard: !this.state.displayCard })
  }
  
  //changeSubcription(n.visit,'cancel')

  changeSubscriptions = (resident_id,type) => {

    let messageType = type;
    
    if(true){
      axios.post(axios.changeSubscription(),{resident_id:resident_id,update_type:type})

    .then((response)=>{
      
       
      this.setState({ activeButtonstatus:false });
    
       toast.success( "Successfully, Deactivated Your Subscription", {
         position: toast.POSITION.TOP_CENTER,
         className: 'rotateY animated'
       });
      // window.location.reload();  
      // this.setState({chargeBeeStatus:0}); 
     
    }).catch((error)=>{
       
      if(error !== undefined && error.response !== undefined){
        toast.error("Something went worng ,Please contact us", {
          position: toast.POSITION.TOP_CENTER
        });
      }
     
   
    });

    }
    

  }

  
  getResidents =()=>{
    this.setState({loader: true});
   
    axios
    .get(axios.residentslist())
    .then((response) => {
      
      
   
           
    
      if (response.find((data)=> { 
         console.log("data ...", data.days_left_trial)
        if (!data.days_left_trial){
         
        
          this.setState({ activeButtonstatus:true,resident_id: data['visit'].resident_id});
          
        }
     }));
       
         
    }).catch((error)=>{
      console.log(error,"error......................");
      this.setState({loader: false});
    }); 

   
    console.log(this.state ,"state..............................")
    
  }

  render() {

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
      textTransform: "uppercase",
    
      }
    
      
      const {displayCard ,name, number, expiry, cvc, focused, issuer, formData } = this.state;
    return (
      <div>
        <div style={{    position: "relative" , left: "10px"}}>
          <h2>
            <Typography  variant="title" gutterBottom>
            <font color="#56B16F">  My Settings </font>
            </Typography>
          </h2>
        </div>
        <Grid container>
        <Grid item xs={12} sm={12}>

        <button style={{ ...succesBtn}} onClick={this.addcardDisplay} >Update Card Details</button> 
       
        
        </Grid>

        <Grid item xs={12} sm={12}>
        
        {(this.state.activeButtonstatus)? <Dailobox 
        DialogContentText = "Are you sure want to cancel subscription ?"
          residentId ={ this.state.resident_id }
          ifAgree =  {this.changeSubscriptions}
          buttonTitle  = {"Cancel Subscription"}
          dialogtitle = { "Cancel Subscription" }
        /> : "" }
        
        </Grid>
  
           
        </Grid>
        

      
   
        {
          (displayCard)? (
          < DailgoSubscriptions  updatestate = "true"
           typeofButton = "0" />) : ""
        }

       <Grid container>
       <Grid item xs={12} sm={12}>
        </Grid>
       </Grid>
       
      </div>
       
    );
  };
}

export default Mypayments;