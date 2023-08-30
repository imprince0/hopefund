const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
console.log(process.env.STRIPE_SECRET_KEY);
export default async (req, res) => {
    console.log("first");
    const host = `${process.env.NEXT_PUBLIC_DEPLOYED}`;
    const { email, amount, fundraiserTitle } = req.body;
    const transformedItem = ({
        // description: fundraiserTitle,
        quantity: 1,
        price_data: {
            currency: 'inr',
            unit_amount: amount * 100,
            product_data: {
                name: fundraiserTitle
            },
        }
    });
    console.log("fir");

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [transformedItem],
        mode: 'payment',
        success_url: `${host}/fundraiser/${fundraiserTitle}`,
        cancel_url: `${host}/`,
    })
    console.log("fir");
    res.status(200).json({id:session.id});
}




// const https = require('https');
// /*
// * You can get this utility from https://developer.paytm.com/docs/checksum/
// */
// const PaytmChecksum = require('./PaytmChecksum');

// export default async function handler(req, res) {
//     if (req.method == "POST") {
//         var paytmParams = {};
//         paytmParams.body = {
//             "requestType": "Payment",
//             "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
//             "websiteName": "HopeFund",
//             "orderId": req.body.oid,
//             "callbackUrl": `${process.env.NEXT_PUBLIC_DEPLOYED}/api/postTransaction`,
//             "txnAmount": {
//                 "value": req.body.amount,
//                 "currency": "INR",
//             },
//             "userInfo": {
//                 "custId": req.body.email,
//             },
//         };

//         /*
//         * Generate checksum by parameters we have in body
//         * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
//         */
//         const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.NEXT_PUBLIC_PAYTM_MKEY)
//         paytmParams.head = {
//             "signature": checksum
//         };

//         var post_data = JSON.stringify(paytmParams);

//         const requestAsync = async () => {
//             new Promise((resolve, reject) => {
//                 var options = {
//                     /* for Staging */
//                     // hostname: 'securegw-stage.paytm.in',

//                     /* for Production */
//                     hostname: 'securegw.paytm.in',

//                     port: 443,
//                     path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Content-Length': post_data.length
//                     }
//                 };

//                 var response = "";
//                 var post_req = https.request(options, function (post_res) {
//                     post_res.on('data', function (chunk) {
//                         response += chunk;
//                     });

//                     post_res.on('end', function () {
//                         console.log('Response: ', response);
//                         resolve(JSON.parse(response).body);
//                     });
//                 });

//                 post_req.write(post_data);
//                 post_req.end();

//             })
//         }

//         let myr = await requestAsync();
//         res.status(200).json(myr);
//     };
// }