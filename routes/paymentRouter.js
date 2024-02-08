import express from 'express';
import stripe from 'stripe';

const Stripe = new stripe('sk_test_51OhRsiSEj8T8KuEJiNDHq68RD6F4L9xQi0RRZXTxKG6GFxlaDAZMn1SCrvant1fDZdBcsMtDjUA7XP2mMqmfNzri005Q9RK3Jw');

const paymentRouter = express.Router();

paymentRouter.post('/pay', async (req, res) => {
    const { amount } = req.body;
    const paymentItent = await Stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        automatic_payment_methods: {
            enabled: true
        }
    });

    res.send({
        clientSecret: paymentItent.client_secret
    });
});

export default paymentRouter;