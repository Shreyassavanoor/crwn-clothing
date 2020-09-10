import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HPuL7Ka0rxmRopBURXkqnA2WuUx2G3IASzfAVSCZ0KdPexCZzbXluqQwCRlQKe8d5os59fVOB4iyiyQdh1Hk66x00MUtdsRlE';
    const onToken = (token) => {
        console.log(token);
        alert('Payment successfull');
    }
    return (
        <StripeCheckout label="Pay Now" name="CRWN Clothing" billingAddress shippingAddress image="https://sendeyo.com/up/d/f3eb2117da" description={`Your total is $${price}`} amount={priceForStripe}  panelLabel="Pay Now" token={onToken} stripeKey={publishableKey}></StripeCheckout>
    );
}

export default StripeCheckoutButton;