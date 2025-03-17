import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "./auth";

export const config = {
  matcher: ["/", "/sign-in", "/sign-up"],
};

export const middleware = async (request: NextRequest) => {
  const session = await auth();

  if (
    !session &&
    !(
      request.nextUrl.pathname === "/sign-in" ||
      request.nextUrl.pathname === "/sign-up" ||
      request.nextUrl.pathname === "/"
    )
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (
    session &&
    (request.nextUrl.pathname === "/sign-in" ||
      request.nextUrl.pathname === "/sign-up")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};
