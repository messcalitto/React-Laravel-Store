import React, { useState, useEffect, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { axCreatePaymentIntent, axPaymentDone, PaymentData } from '../components/AxiosFunctions.tsx';
import { PulseLoader } from 'react-spinners';
import  Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import './Checkout.css';
import { config } from '../config';

// Load your publishable key from Stripe
const stripePromise = loadStripe(config.stripeKey);

const CheckoutForm: React.FC = () => {
    const navigate = useNavigate();
    const { dataContext } = useContext(DataContext);
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState<number>(0); // Amount in cents
    const [clientSecret, setClientSecret] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');

    useEffect(() => {
        
        const fetchClientSecret = async () => {
            setIsLoading(true);
            // Create a payment intent on the server
            const response = await axCreatePaymentIntent();
            setClientSecret(response.clientSecret);
            setAmount(response.amount);
            setIsLoading(false);
        };

        fetchClientSecret();
        
    }, []);
    

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardNumberElement = elements.getElement(CardNumberElement);

        

        setIsLoading(true);
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardNumberElement!,
            },
        });
       
        if (error) {
            setErrorMsg(error.message || 'Payment failed');
            // console.error(error.message);
        } else {
            // console.log('PaymentIntent:', paymentIntent);
            const data: PaymentData = {
                amount: paymentIntent!.amount,
                id: paymentIntent!.id,
                paid: true
            };
            // Send the paymentIntent.id to your server to complete the payment
            const res = await axPaymentDone(data);
            
            if (res.status === 'success') {
                
                dataContext.cartItems = [];
                
                Swal.fire({
                        title: 'Success!',
                        text: 'Payment done successfully!',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        customClass: {
                            confirmButton: 'btn btn-primary',
                            cancelButton: 'btn btn-danger'
                        },
                    })
                    .then(() => {
                        navigate('/orders');
                    })
            } else {
                setErrorMsg('Payment failed');
            }
            
        }
        setIsLoading(false);
    };

    

    return (
        <form onSubmit={handleSubmit}>
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
            
            <CheckoutFormRow title="Card Number" id="cardNumber" Component={CardNumberElement} />
            <CheckoutFormRow title="Expiration Date" id="cardExpiry" Component={CardExpiryElement} />
            <CheckoutFormRow title="CVC" id="cardCvc" Component={CardCvcElement} />

            {isLoading?  <PulseLoader color="#0d6efd" size={12} className="ml-4 mt-1" /> :
            <button type="submit" disabled={!stripe}>
                Pay ${amount}
            </button>
            }
        </form>
    );
};

interface CheckoutFormRowProps {
    title: string;
    id: string;
    Component: React.ElementType;
}

const CheckoutFormRow: React.FC<CheckoutFormRowProps> = ({ title, id, Component }) => {
    const options = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };

    return (
        <div className="form-group">
            <label htmlFor={id}>{title}</label>
            <Component id={id} options={options} />
        </div>
    );
};



const Checkout: React.FC = () => {
    return (
        <div className="my-5" style={{ maxWidth: '400px', margin: 'auto' }}>
            <Elements stripe={stripePromise}>
                <div className="form-container">
                    <strong>Checkout</strong><br /><br />
                    <CheckoutForm />
                </div>
            </Elements>
        </div>
    );
};

export default Checkout;