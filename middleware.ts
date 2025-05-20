import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (
    request.method === "POST" &&
    request.nextUrl.pathname.startsWith("/odeme")
  ) {
    const paymentPage = `${request.nextUrl.origin}/odeme`;
    return NextResponse.redirect(paymentPage, 303);
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/odeme/:path*"],
};
