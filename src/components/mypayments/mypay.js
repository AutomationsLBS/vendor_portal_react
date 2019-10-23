import React, {Component, Fragment} from 'react';
 
import axios from 'axios';
import Card from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss'

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from './utils';


import './style.css';
export default class Mypayments extends Component {
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
      


     }
 }
  componentWillMount() {
  }
  componentDidMount() {
    this.getCardDetails();

  }
  getCardDetails =()=>{
    /*this.setState({loader: true});
   
    axios
    .get(axios.cardDetails())
    .then((response) => {
      
      this.setState({loader: false,cardDetails:response[0]['card']['masked_number'],gateway_account_id:response[0]['gateway_account_id']}); 
      console.log(this.state,"datasis ");
    }).catch((error)=>{
     
      this.setState({loader: false});
    }); */

  }

  addcardDisplay = () =>{
    
    this.setState({ displayCard: !this.state.displayCard })
  }

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    console.log("jkkkkkkkkkkkkkkkkkkk",formData);

    this.form.reset();

  };


  

  render() {
    const  formControl = {
      width: "100%",
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
       <h2> My Settings</h2>
       <h4> Card Number : {this.state.cardDetails}</h4> { (displayCard) ? "":(<div> <button style={{ ...succesBtn}} onClick={this.addcardDisplay} >Update Card Details</button></div> )} 
   
        {
          (displayCard)? (
            <div key="Payment">
            <div className="App-payment">
              <h2>Update Credit Card Details</h2>
              
              <div style={{ ...left}}>
              <Card
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focused}
                callback={this.handleCallback}
              />
              </div>
              <div style={{...right}} >
              <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="tel"
                    name="number"
                    style={{...formControl}}
                    placeholder="Card Number"
                    pattern="[\d| ]{19}"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                  
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    style = {{...formControl}}
                    placeholder="Name"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      type="tel"
                      name="expiry"
                      style = {{...formControl}}
                      placeholder="Valid Thru"
                      pattern="\d\d/\d\d"
                      required
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="tel"
                      name="cvc"
                      style = {{...formControl}}
                      placeholder="CVC"
                      pattern="\d{3,4}"
                      required
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                  </div>
                </div>
                <input type="hidden" name="issuer" value={issuer} />
                <div className="form-actions">
                  <button style={{ ...succesBtn}}>Save</button> 
                  <button style={{ ...dangerButton}} onClick={this.addcardDisplay}>Cancel</button>
                </div>
              </form>

              </div>
            
            
            </div>
            
          </div>

          ): ""
        }
        
      </div>
      
    );
  };
}