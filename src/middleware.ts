import { auth } from "@/auth";
import { routes } from "./config/routes";
import { NextResponse } from "next/server";
import { env } from "@/env";

const setRequestHeaders = (requestHeaders: Headers) => {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    image-src 'self' blob: data:;
    font-src 'self';
    base-uri 'self';
    object-src 'none';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `;
  requestHeaders.set("x-auth-token", `Bearer ${env.X_AUTH_TOKEN}`);
  const contentSecurityPolicy = cspHeader.replace(/\s{2,}/g, " ").trim();
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicy);
};

export default auth((req) => {
  const nextUrl = req.nextUrl.clone();
  const requestHeaders = new Headers(req.headers);

  setRequestHeaders(requestHeaders);

  if (req.auth) {
    if (req.auth.requires2FA === true) {
      if (nextUrl.pathname === routes.challenge) {
        return NextResponse.next();
      }
      const challengeUrl = new URL(routes.challenge, req.url);
      return NextResponse.redirect(challengeUrl);
    } else if (req.auth.requires2FA === false) {
      if (
        nextUrl.pathname === routes.challenge ||
        nextUrl.pathname === routes.signIn
      ) {
        const adminUrl = new URL(routes.admin.dashboard, req.url);
        return NextResponse.redirect(adminUrl);
      }
    }
  } else {
    if (
      nextUrl.pathname.startsWith("/admin") ||
      nextUrl.pathname === routes.challenge
    ) {
      const signInUrl = new URL(routes.signIn, req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
  return NextResponse.next({
    // WARNING: IMPORTANT: do not do this 👇
    // WARNING: headers: requestHeaders - it interferes with server action requests
    // INFO: instead, do this 👇
    request: {
      headers: requestHeaders,
    },
  });
});

export const config = {
  matcher:
    "/((?!api/auth|_next/static|_next/image|favicon.ico|manifest.json|logo.svg).*)",
};
