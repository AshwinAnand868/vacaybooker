import stripe from "@/app/libs/getStripeServer";
import Link from "next/link";
import { LuCheckCircle2 } from "react-icons/lu";
import Stripe from "stripe";

const CheckoutResultPage = async ({
  searchParams,
}: {
  searchParams: { session_id: string };
}) => {
  if (!searchParams.session_id) {
    throw new Error("Please provide a valid checkout session id");
  }

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ["line_items", "payment_intent"],
    });

  const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;
  const paymentStatus =
    paymentIntent.status === "succeeded" ? "Payment Success" : "Payment Failed";

  if (paymentIntent.status === "succeeded") {
    const metadata = checkoutSession.metadata as Stripe.Metadata;

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reservations`, {
        method: 'POST',
        body: JSON.stringify({
            totalPrice: metadata["totalPrice"],
            startDate: new Date(metadata["startDate"]),
            endDate: new Date(metadata["endDate"]),
            listingId: metadata["listingId"],
            userId: metadata["userId"]
        })
    });
  }

  return (
    <div className="flex flex-col justify-center items-center h-[50vh]">
      {paymentIntent.status === "succeeded" && (
        <LuCheckCircle2 size={64} className="text-green-500" />
      )}
      <h2
        className={`${
          paymentIntent.status === "succeeded"
            ? "text-green-500"
            : "text-red-500"
        } text-2xl py-4`}
      >
        {paymentStatus}
      </h2>

      <h3 className="text-lg">
        Your reservation has been booked. You can check your trips{" "}
        <Link href={"/trips"} className="text-blue-500">
          on this page
        </Link>. Enjoy your stay there!
      </h3>
    </div>
  );
};
export default CheckoutResultPage;
