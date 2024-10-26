'use server';

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import stripe from "../libs/getStripeServer";
import { formatAmountForStripe } from "../libs/utils";
import { StripeData } from "../types";

export default async function createCheckoutSession(data: StripeData) {
    const lineItems = [
        {
            price_data: {
                currency: 'USD',
                unit_amount: formatAmountForStripe(data.totalPrice, 'usd'),
                product_data: {
                    name: data.name,
                    images: [data.image]
                }
            },
            quantity: 1,
        },
    ];
    
    const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        submit_type: "book",
        success_url:
        `${headers().get('origin')}/rent/item/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${headers().get('origin')}`,
    });

    redirect(checkoutSession.url as string);
}