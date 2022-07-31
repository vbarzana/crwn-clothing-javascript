import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

import './stripe-button.styles.scss';

const publishableKey = 'pk_test_d5aXvKEuhBTxYhyL7F3L95jU009Zmhh81e';
const stripePromise = loadStripe(publishableKey);

const StripeCheckoutButton = ({ price, cartItems }) => {
  const priceForStripe = price * 100;

  const handleClick = async () => {
    try {
      // Get Stripe.js instance
      const stripe = await stripePromise;
      const description = cartItems.reduce((acc, item) => {
        acc.push(`${item.quantity} ${item.name}`);
        return acc;
      }, []);
      // Call your backend to create the Checkout Session
      const { data: session } = await axios({
        url: '/create-checkout-session',
        method: 'POST',
        data: {
          amount: priceForStripe,
          productsDescription: description.join(', '),
          // @todo: in the future pass all products here
          quantity: 1
        }
      });
      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        console.error(result.error);
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className='stripe-button' onClick={handleClick}>
      Pay now
    </button>
  );
};

export default StripeCheckoutButton;
