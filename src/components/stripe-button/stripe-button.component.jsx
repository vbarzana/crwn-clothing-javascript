import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_3EwbqW0naQFvIpmD4x3lF08b';

  const onToken = token=> {
    console.log(token);
    alert('Payment Successful');
  }

  return (
    <StripeCheckout
      name='Pay now'
      description={`Your total is $${price}`}// the pop-in header subtitle
      image='https://files.codegenio.com/static/2020/04/22141803/codegenio-logo.png' // the pop-in header image (default none)
      panelLabel='Please fill in the data and proceed to the payment.'
      amount={priceForStripe} // cents
      stripeKey={publishableKey}
      shippingAddress
      //billingAddress
      // Note: enabling both zipCode checks and billing or shipping address will
      // cause zipCheck to be pulled from billing address (set to shipping if none provided).
    //   zipCode={false}
    //   alipay // accept Alipay (default false)
    //   bitcoin // accept Bitcoins (default false)
      allowRememberMe // "Remember Me" option (default true)
      token={onToken} // submit callback
      //opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
      //closed={this.onClosed} // called when the checkout popin is closed (no IE6/7)
      // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
      // you are using multiple stripe keys
      //reconfigureOnUpdate={false}
      // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
      // useful if you're using React-Tap-Event-Plugin
      //triggerEvent='onTouchTap'
    >
    </StripeCheckout>
  );
};

export default StripeCheckoutButton;