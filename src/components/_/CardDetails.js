import React from 'react';
import {Elements,StripeProvider} from 'react-stripe-elements';

import InjectedCheckoutForm from '../mypayments1';


class UpdateCardDetails extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
        <StripeProvider apiKey="pk_live_kFyopGNAuKgAh4L76QqExXpL" >
            <Elements>
                <InjectedCheckoutForm   />
            </Elements>
        </StripeProvider>
      
    );
  }
}

export default UpdateCardDetails;