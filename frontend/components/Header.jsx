import React from "react";
import { Button } from "./ui/button";
import { Cookie, Refrigerator, Sparkles } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import HowToCookModal from "./HowToCookModal";
import PricingModal from "./PricingModal";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";
import { Badge } from "./ui/badge";
import UserDropdown from "./UserDropdown";

export default async function Header() {
  const user = await checkUser();

  return (
    <header
      className="fixed top-0 w-full border-b backdrop-blur-md z-50 supports-backdrop-filter:bg-stone-50/60"
      style={{
        borderColor: "#e7e5e4", // stone-200
        backgroundColor: "rgba(250,250,249,0.8)", // stone-50/80
      }}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={user ? "/dashboard" : "/"}
          className="flex items-center gap-2 group"
        >
          <Image
            src="/orange-logo.png"
            alt="Servd Logo"
            width={60}
            height={60}
            className="w-16"
          />
        </Link>

        {/* Navigation Links */}
        <div
          className="hidden md:flex items-center space-x-8 text-sm font-medium"
          style={{ color: "#57534e" }} // stone-600
        >
          <Link
            href="/recipes"
            className="transition-colors flex gap-1.5 items-center"
            style={{ color: "#57534e" }}
          >
            <Cookie className="w-4 h-4" />
            My Recipes
          </Link>
          <Link
            href="/pantry"
            className="transition-colors flex gap-1.5 items-center"
            style={{ color: "#57534e" }}
          >
            <Refrigerator className="w-4 h-4" />
            My Pantry
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <HowToCookModal />

          <SignedIn>
            {user && (
              <PricingModal subscriptionTier={user.subscriptionTier}>
                <Badge
                  variant="outline"
                  className="flex h-8 px-3 gap-1.5 rounded-full text-xs font-semibold transition-all"
                  style={
                    user.subscriptionTier === "pro"
                      ? {
                          background:
                            "linear-gradient(to right, #ea580c, #f59e0b)", // orange-600 → amber-500
                          color: "#ffffff",
                          border: "none",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                        }
                      : {
                          backgroundColor: "rgba(231,229,228,0.5)", // stone-200/50
                          color: "#57534e", // stone-600
                          borderColor: "#e7e5e4",
                          cursor: "pointer",
                        }
                  }
                >
                  <Sparkles
                    className="h-3 w-3"
                    style={
                      user.subscriptionTier === "pro"
                        ? {
                            color: "#ffffff",
                            fill: "rgba(255,255,255,0.2)",
                          }
                        : { color: "#78716c" } // stone-500
                    }
                  />
                  <span>
                    {user.subscriptionTier === "pro"
                      ? "Pro Chef"
                      : "Free Plan"}
                  </span>
                </Badge>
              </PricingModal>
            )}

            <UserDropdown />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="font-medium"
                style={{ color: "#57534e" }} // stone-600
              >
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button
                variant="primary"
                className="rounded-full px-6"
                style={{
                  backgroundColor: "#ea580c", // orange-600
                  color: "#ffffff",
                }}
              >
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
