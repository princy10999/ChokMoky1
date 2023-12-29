import React, { useState } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { makeStyles } from "tss-react/mui";
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import StyledButton2 from './Common/StyledButton2';
import { Grid, TextField } from '@mui/material';
import StyledButton3 from './Common/StyledButton3';
import swal from "sweetalert";
import { useLocation, useNavigate } from 'react-router-dom';
import { ApiPost } from '../Api/Api';
import { useDispatch } from 'react-redux';
import { getCount, getCountTemp } from '../Redux/Actions/AuthUser';
import { isLoader } from '../Redux/Actions/loaderSlice';

// Replace with your actual Stripe public API key
const stripePromise = loadStripe('pk_test_51NDnaxKBpr5FioRxSNJDHv6tsZXZcusVBoaJkaGJJgfJVMS0I7HF2zPtAdfiGvIIf3vz5b8B8bAPKONgD8ATtYOB00q7eR6ivz');
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const useStyles = makeStyles()((theme) => {
  return {
    textField: {
      marginTop: "24px",
      [`& label`]: {
        fontFamily: "League Spartan !important",
        fontWeight: "400 !important",
        fontSize: "19px !important",
        color: "#7E7F84",
        lineHeight: "30px",
        [theme.breakpoints.down("iph")]: {
          fontSize: "16px !important",
          lineHeight: "22px",
        },
      },
      [`& fieldset`]: {
        borderRadius: 0,
      },
      [`& div`]: {
        fontFamily: "League Spartan !important",
        fontWeight: "400 !important",
        fontSize: "19px !important",
        color: "#7E7F84",
        borderRadius: "0px !important",
        [theme.breakpoints.down("iph")]: {
          fontSize: "16px !important",
          height: "50px !important",
        },
      },
    },
  };
});

function PaymentForm() {
  const { classes } = useStyles();
  const userDetail = JSON.parse(localStorage.getItem("userData"));
  const stripe = useStripe();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  const elements = useElements();
  const [data, setData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null
  });


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
 
    try {
      const response = await axios.post(`https://api.stripe.com/v1/payment_intents`, {
        amount: location?.state?.total * 100, // Replace with the actual amount
        currency: 'INR', // Replace with the actual currency code
        payment_method: paymentMethod.id, // Pass the payment method ID as the payment source
        payment_method_types: ["card"],
        capture_method: "automatic",
        confirm: true,
      },
        {
          headers: {
            Authorization: `Bearer sk_test_51NDnaxKBpr5FioRxy7N9yV5sNADvTGiJFnQHJGMMDnw3yLcoDFkV1SGv90xFwB4QUT9oAoS1ftFI1Ekjo8AA9Yzw00t5KYiXbe`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

      if (response && response?.data?.status === "succeeded") {
        dispatch(isLoader(true));
        var formData = new FormData();
        if (!location?.state?.addressBookId) {
          formData.append("billing_city",location?.state?.data?.billing_city)
          formData.append("billing_country",location?.state?.data?.billing_country)
          formData.append("billing_email",location?.state?.data?.billing_email)
          formData.append("billing_phone",location?.state?.data?.billing_phone)
          formData.append("billing_postcode",location?.state?.data?.billing_postcode)
          formData.append("billing_state",location?.state?.data?.billing_state)
          formData.append("total_amount", response?.data?.amount / 100);
          formData.append("payment_method", "O");
          formData.append("is_saved_address", "N",);
          formData.append("is_saved_billing_address", location?.state?.data?.billing !== "newAddress" ? 'Y' : 'N');
          formData.append('is_saved_shipping_address', location?.state?.data?.shipping !== "newAddress" ? 'Y' : 'N');
          formData.append('shipping_fees', location?.state?.shippingCharge);
          formData.append('billing_fname', location?.state?.data?.billing_first_name);
          formData.append('billing_lname', location?.state?.data?.billing_last_name);
          formData.append('billing_street_address', location?.state?.data?.billing_address);
          formData.append('currency_code', "IN");
          formData.append('tran_id', paymentMethod.id);
        } else {
          formData.append('currency_code', "IN");
          formData.append('total_amount', response?.data?.amount / 100);
          formData.append("payment_method", "O");
          formData.append('shipping_fees', location?.state?.shippingCharge);
          formData.append("is_saved_address", "N",);
          formData.append("is_saved_billing_address", location?.state?.data?.billing !== "newAddress" ? 'Y' : 'N');
          formData.append('is_saved_shipping_address', location?.state?.data?.shipping !== "newAddress" ? 'Y' : 'N');
          formData.append('billing_address_book_id', location?.state?.addressBookId);
          formData.append('tran_id', paymentMethod.id);
        }

        delete formData?.billing_address
        delete formData?.billing_first_name
        delete formData?.billing_last_name
        ApiPost("order-place", formData).then((res) => {
          if (res?.data?.message) {

            swal({
              title: "Success",
              text: res.data.message,
              icon: "success",
            }).then(function () {
              const body = {
                params: {
                  session_id: sessionStorage.getItem("sessionId"),
                },
              };
              navigate("/order-history");
              if (userDetail) {
                dispatch(getCount());
              } else {
                dispatch(getCountTemp(body));
              }
            });
          } else if (res.data.error) {
            swal({
              title: "Error",
              text: res.data.error,
              icon: "error",
            });
          }
          dispatch(isLoader(false));
        });
      } else {
        swal({
          title: "Error",
          text: 'Something went wrong',
          icon: "Error",
        })
      }

      // Handle the clientSecret and complete the payment
    } catch (error) {
      swal({
        title: "Error",
        text: "error?.response?.data?.error?.code",
        icon: "Error",
      })
    }
    // }
  };

  return (
    <Grid container md={12} justifyContent="center" sx={{ p: '24px', mt: '0px' }}>
      <Grid item md={6} mt={8}>
        <div key='Payment'>
          <div className='App-payment'>
            <h1>Enter your payment details</h1>
            <Typography mb={2}>please input your information below</Typography>
            <CardElement options={{ hidePostalCode: true }} />
            <Box my={2}>
              <StyledButton3 text="Submit" width='150px' onClick={handleSubmit} />
            </Box>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}


const Payment = () => {
  const handleToken = (token) => {
  };
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default Payment;