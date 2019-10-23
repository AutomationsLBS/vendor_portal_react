import React, {Component, Fragment} from 'react';
 
import MyStoreCheckout from '../_/MyStoreCheckout';
import {Elements, StripeProvider} from 'react-stripe-elements';


export default class Editcreatedcard extends Component {
    constructor(props){
        super(props)

    }

    render(){
        return (
            <div>
            <StripeProvider apiKey="pk_test_whzYd4ZyFcQURoQcqn0HZCCo003Ea3DFj0" >
        <div className="example">
         
          <Elements>
            <MyStoreCheckout  />
          </Elements>
        </div>
      </StripeProvider>
      </div>
        );
    }

} 
