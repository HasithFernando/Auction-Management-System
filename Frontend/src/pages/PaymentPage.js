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
        <div className="container mt-5">
            <div className="card mx-auto shadow-lg p-4" style={{ maxWidth: '500px' }} >
                <h4 className="text-center mb-4">Secure Payment</h4>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="border rounded p-3 mb-3" style={{ backgroundColor: '#f7f7f7' }} >
                            <CardElement />
                        </div>
                    </div>

      
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={!stripe || isProcessing}
                >
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                </button>

                {/* Error and success messages with Bootstrap alerts */}
                {error && (
                <div className="alert alert-danger mt-3" role="alert">
                    {error}
                </div>
                )}
                {success && (
                    <div className="alert alert-success mt-3" role="alert">
                        Payment Successful!
                    </div>
                )}
            </form>
            </div>
</div>
    );
};

const PaymentPage = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default PaymentPage;
