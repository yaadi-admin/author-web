'use client';
import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This test secret API key is a placeholder. Don't include personal details in requests with this key.
// To see your test secret API key embedded in code samples, sign in to your Stripe account.
// You can also find your test secret API key at https://dashboard.stripe.com/test/apikeys.
const stripePromise = loadStripe("pk_test_51O4qNBCsIeDLbbVvt4asvYBlf2b0wetUBsUWuU31BCH5MZ71mSwwB7DOyRPgEJe5KfeH62mSjc1Hjc05j41CmpFs00uQn5k19w");

const CheckoutForm = () => {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("https://succession-plan-service-dot-Narro-78490.uc.r.appspot.com/create-checkout-session", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data: any) => data?.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div className="h-screen">

      <div id="checkout" className="">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={options}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  )
}

// const Return = () => {
//   const [status, setStatus] = useState(null);
//   const [customerEmail, setCustomerEmail] = useState('');

//   useEffect(() => {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const sessionId = urlParams.get('session_id');

//     fetch(`/session-status?session_id=${sessionId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setStatus(data.status);
//         setCustomerEmail(data.customer_email);
//       });
//   }, []);

//   if (status === 'open') {
//     return (
//       <Navigate to="/checkout" />
//     )
//   }

//   if (status === 'complete') {
//     return (
//       <section id="success">
//         <p>
//           We appreciate your business! A confirmation email will be sent to {customerEmail}.

//           If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
//         </p>
//       </section>
//     )
//   }

//   return null;
// }


export default CheckoutForm;