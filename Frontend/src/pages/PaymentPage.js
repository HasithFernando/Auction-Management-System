// src/pages/PaymentPage.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-publishable-key'); // Replace with your Stripe publishable key

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmCardPayment('your-client-secret', {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (error) {
            setError(error.message);
            setIsProcessing(false);
        } else {
            setSuccess(true);
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || isProcessing}>
                {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">Payment Successful!</div>}
        </form>
    );
};

const PaymentPage = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default PaymentPage;
