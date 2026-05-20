import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { upsertSubscription } from "@/lib/subscriptions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId || "";
      const email = session.metadata?.email || session.customer_email || "";

      if (userId && email) {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        const priceId = subscription.items.data[0]?.price.id;

        let plan: "pro" | "agency" = "pro";
        if (priceId === process.env.STRIPE_AGENCY_PRICE_ID) {
          plan = "agency";
        }

        await upsertSubscription({
          userId,
          email,
          plan,
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: session.subscription as string,
          currentPeriodEnd: new Date(subscription.items.data[0]?.current_period_end * 1000).toISOString(),
        });
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      const customer = await stripe.customers.retrieve(customerId);
      if (customer.deleted) break;

      const email = customer.email || "";
      const priceId = subscription.items.data[0]?.price.id;

      let plan: "pro" | "agency" = "pro";
      if (priceId === process.env.STRIPE_AGENCY_PRICE_ID) {
        plan = "agency";
      }

      await upsertSubscription({
        userId: subscription.metadata?.userId || customerId,
        email,
        plan,
        stripeSubscriptionId: subscription.id,
        currentPeriodEnd: new Date(subscription.items.data[0]?.current_period_end * 1000).toISOString(),
      });
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;

      await upsertSubscription({
        userId: subscription.metadata?.userId || (subscription.customer as string),
        email: "",
        plan: "free",
        stripeSubscriptionId: subscription.id,
        currentPeriodEnd: new Date().toISOString(),
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
