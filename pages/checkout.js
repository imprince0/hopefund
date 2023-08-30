import Head from 'next/head'
import Script from 'next/script'
import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const Checkout = () => {
    const initiatePayment = async () => {
        const host = `${process.env.NEXT_PUBLIC_DEPLOYED}`;
        const fundraiserTitle=localStorage.getItem("fundraiserTitle")

        const stripe = await stripePromise;
        const checkOutSession = await fetch(`${host}/api/preTransaction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: "mohitKukreja2002mohit@gmail.com",
                amount: 1,
                fundraiserTitle: fundraiserTitle
            })
        });
        const checkOutSessionData = await checkOutSession.json();
        console.log(checkOutSessionData)
        console.log(checkOutSessionData.id)

        

        const result= await stripe.redirectToCheckout({
            sessionId:checkOutSessionData.id,
        })

        if(result.error) alert(result.error.message)
    }

    return (
        <>
            <div>Checkout</div>
            <button role='link' onClick={()=>initiatePayment()}>Pay</button>
        </>
    )
}

export default Checkout






















// import Head from 'next/head'
// import Script from 'next/script'
// import React from 'react'

// const Checkout = () => {
//     const initiatePayment = async () => {
//         let oid = Math.floor(Math.random * Date.now())
//         let txnToken;
//         let amount = 1;


//         const data = { oid,amount,email };
//         let a = await fetch(`${process.env.NEXT_PUBLIC_HOST }/api/preTransaction`, {
//             method: 'POST', // or 'PUT'
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         })
//         let txnRes = await a.json()
//         txnToken = txnRes.txnToken
//         // console.log(b)
//         var config = {
//             flow: "DEFAULT",
//             //Optional to hide paymode label when only one paymode is available
//             hidePaymodeLabel: true,
//             data: {
//                 orderId: oid,
//                 amount: amount,
//                 token: txnToken,
//                 tokenType: "TXN_TOKEN"
//             },
//             style: {
//                 //Optional: global style that will apply to all paymodes
//                 bodyColor: "#9c3353"
//             },
//             merchant: {
//                 mid: process.env.NEXT_PUBLIC_PAYTM_MID
//             },
//             handler: {
//                 notifyMerchant: function (eventType, data) {
//                     console.log("notify merchant called", eventType, data);
//                 }
//             }
//         };
//         window.Paytm.CheckoutJS.init(config).then(function
//             onSuccess() {
//             // after successfully updating configuration, invoke JS Checkout
//             window.Paytm.CheckoutJS.invoke();
//         }).catch(function onError(error) {
//             console.log("error => ", error);
//         });

//     }
//     return (
//         <>
//             <Head>
//                 <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
//                 <Script type="application/javascript" crossorigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}></Script>
//             </Head>
//             <div>Checkout</div>
//             <button onClick={initiatePayment}>Pay</button>

//         </>
//     )
// }

// export default Checkout