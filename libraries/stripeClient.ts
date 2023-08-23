import { loadStripe, Stripe } from "@stripe/stripe-js";
let stripeRequestHandler: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripeRequestHandler) {
    stripeRequestHandler = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
    );
  }
  return stripeRequestHandler;
};
