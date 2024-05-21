import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Redirect to the maintenance page if the maintenance mode is enabled
  // Redirect only if the request path is not the maintenance page itself
  if (
    !request.nextUrl.pathname.startsWith("/maintenance") &&
    process.env.MAINTENANCE_MODE === "true"
  ) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
