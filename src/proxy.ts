import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
  // opengraph-image is skipped so /sk/opengraph-image (the og:image URL) answers 200 instead of redirecting.
  matcher: "/((?!api|_next|_vercel|.*opengraph-image|.*\\..*).*)",
}
