import Stripe from "stripe";

if(!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe Secret Key is missing!');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-09-30.acacia"
});

export default stripe;