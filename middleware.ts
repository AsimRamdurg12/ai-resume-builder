import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/sign-up", "/sign-in", "/"],
};

export const middleware = async (request: NextRequest) => {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (
    !token &&
    (url.pathname.startsWith("/home") || url.pathname.startsWith("/blog"))
  ) {
    return NextResponse.json(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
};
