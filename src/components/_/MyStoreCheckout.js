import React from 'react';
import {Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from '../_/CheckoutForm2';

class MyStoreCheckout extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <Elements>
        <InjectedCheckoutForm  residentsData= {this.props.residentsData} />
      </Elements>
    );
  }
}

export default MyStoreCheckout;
