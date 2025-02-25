import { Inject, Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(@Inject("STRIPE_API_KEY") private readonly apiKey: string) {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: "2025-02-24.acacia",
    });
  }

  async downloadResume() {
    return this.stripe.paymentIntents.create({
      amount: 500,
      currency: "pln",
      payment_method_types: ["card", "blik"],
    });
  }
}
