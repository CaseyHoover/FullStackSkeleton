import { auth } from "@skeleton/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = new Set(["/", "/sign-in"]);

function isPublic(pathname: string) {
  return publicPaths.has(pathname) || pathname.startsWith("/api/auth/");
}

export async function proxy(request: NextRequest) {
  let session;
  try {
    session = await auth.api.getSession({ headers: request.headers });
  } catch {
    // Database unavailable — treat as unauthenticated
  }
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
