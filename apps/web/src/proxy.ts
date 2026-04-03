import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "@health/auth";

const publicPaths = new Set(["/", "/sign-in"]);

function isPublic(pathname: string) {
  return publicPaths.has(pathname) || pathname.startsWith("/api/auth/");
}

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  const { pathname } = request.nextUrl;

  if (session && publicPaths.has(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!session && !isPublic(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
