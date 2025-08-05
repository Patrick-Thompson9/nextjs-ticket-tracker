import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: NextResponse) {
    //console.log(req)
  },
  {
    isReturnToCurrentPage: true,
  }
);

export const config = {
  matcher: [
    /* Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (Next.js image optimization files)
     * - auth
     * - favicon.ico (favicon file)
     * - robots.txt
     * - login (login page)
     * - images
     * - homepage (represented with $ after beginning /)
     */
    "/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|login|images|$).*)",
  ],
};
