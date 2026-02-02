import React from "react";
import { Check } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { CheckoutButton } from "@clerk/nextjs/experimental";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PricingSection({ subscriptionTier = "free" }) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-16">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">
          Simple Pricing
        </h2>
        <p
          className="text-xl font-light"
          style={{ color: "#57534e" }} // stone-600
        >
          Start for free. Upgrade to become a master chef.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <Card
          className="border-2"
          style={{
            borderColor: "#e7e5e4", // stone-200
            backgroundColor: "#ffffff",
          }}
        >
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Sous Chef
            </CardTitle>

            <div
              className="text-5xl font-bold"
              style={{ color: "#1c1917" }} // stone-900
            >
              $0
              <span
                className="text-lg font-normal"
                style={{ color: "#a8a29e" }} // stone-400
              >
                /mo
              </span>
            </div>

            <CardDescription
              className="font-light text-base"
              style={{ color: "#57534e" }} // stone-600
            >
              Perfect for casual weekly cooks.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="space-y-4">
              {[
                "10 pantry scans per month",
                "5 AI meal recommendations",
                "Standard support",
                "Standard Recipes",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3"
                  style={{ color: "#44403c" }} // stone-700
                >
                  <Check
                    className="h-5 w-5 shrink-0 mt-0.5"
                    style={{ color: "#a8a29e" }} // stone-400
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter className="mt-auto">
            <Link href="/dashboard" className="w-full">
              <Button
                variant="outline"
                className="w-full border-2"
                style={{
                  borderColor: "#1c1917", // stone-900
                  color: "#1c1917",
                }}
              >
                Get Started
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card
          className="relative border-2"
          style={{
            borderColor: "#ea580c", // orange-600
            backgroundColor: "#fff7ed", // orange-50
          }}
        >
          <Badge
            className="absolute top-0 right-0 rounded-none rounded-bl-lg font-bold uppercase tracking-wide border-none"
            style={{
              backgroundColor: "#ea580c", // orange-600
              color: "#ffffff",
            }}
          >
            MOST POPULAR
          </Badge>

          <CardHeader>
            <CardTitle
              className="text-3xl font-bold"
              style={{ color: "#7c2d12" }} // orange-900
            >
              Head Chef
            </CardTitle>

            <div
              className="text-5xl font-bold"
              style={{ color: "#ea580c" }} // orange-600
            >
              $7.99
              <span
                className="text-lg font-normal"
                style={{ color: "#fdba74" }} // orange-400
              >
                /mo
              </span>
            </div>

            <CardDescription
              className="font-light text-base"
              style={{ color: "rgba(154,52,18,0.7)" }} // orange-800/70
            >
              For the serious home cook.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="space-y-4">
              {[
                "Unlimited pantry scans",
                "Unlimited AI recipes",
                "Priority Support",
                "Recipes with Nutritional analysis",
                "Chef's Tips & Tricks",
                "Ingredient Substitutions",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3"
                  style={{ color: "#431407" }} // orange-950
                >
                  <Badge
                    className="p-1 rounded-full h-6 w-6 flex items-center justify-center border-none"
                    style={{ backgroundColor: "#fed7aa" }} // orange-200
                  >
                    <Check
                      className="h-4 w-4"
                      style={{ color: "#c2410c" }} // orange-700
                    />
                  </Badge>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter>
            <SignedIn>
              <CheckoutButton
                planId="cplan_37y5uChZ9uYauQyTlDkXDh997ht"
                planPeriod="month"
                newSubscriptionRedirectUrl="/dashboard"
                checkoutProps={{
                  appearance: {
                    elements: {
                      drawerRoot: {
                        zIndex: 2000,
                      },
                    },
                  },
                }}
              >
                <Button
                  disabled={subscriptionTier === "pro"}
                  className="w-full"
                  style={{
                    backgroundColor:
                      subscriptionTier === "pro"
                        ? "#fdba74" // orange-400
                        : "#ea580c", // orange-600
                    color: "#ffffff",
                    cursor:
                      subscriptionTier === "pro"
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {subscriptionTier === "pro"
                    ? "Subscribed"
                    : "Subscribe Now"}
                </Button>
              </CheckoutButton>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="primary"
                  className="w-full"
                  style={{
                    backgroundColor: "#ea580c", // orange-600
                    color: "#ffffff",
                  }}
                >
                  Login to Subscribe
                </Button>
              </SignInButton>
            </SignedOut>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
