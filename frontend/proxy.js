import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import arcjet, { shield, detectBot } from "@arcjet/next";

/* -----------------------------
   Protected Routes
------------------------------ */
const isProtectedRoute = createRouteMatcher([
  "/recipe(.*)",
  "/recipes(.*)",
  "/pantry(.*)",
  "/dashboard(.*)",
]);

/* -----------------------------
   Arcjet Setup
------------------------------ */
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:PREVIEW",
      ],
    }),
  ],
});

/* -----------------------------
   Middleware
------------------------------ */
export default clerkMiddleware(async (auth, req) => {
  // 1️⃣ Arcjet protection first
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  // 2️⃣ Call auth() ONCE
  const authResult = await auth();
  const { userId, redirectToSignIn } = authResult;

  // 3️⃣ Protect routes
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  return NextResponse.next();
});

/* -----------------------------
   Matcher
------------------------------ */
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
