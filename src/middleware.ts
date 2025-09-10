import type { NextRequest } from "next/server"
import createIntlMiddleware from "next-intl/middleware"
import NextAuth from "next-auth"

import authConfig from "@/configs/auth.config"
import { authRoutes as _authRoutes, publicRoutes as _publicRoutes } from "@/configs/routes.config"
import { REDIRECT_URL_KEY } from "@/constants/app.constant"
import appConfig from "@/configs/app.config"

const { auth } = NextAuth(authConfig)

const publicRoutes = Object.entries(_publicRoutes).map(([key]) => key)
const authRoutes = Object.entries(_authRoutes).map(([key]) => key)

const apiAuthPrefix = `${appConfig.apiPrefix}/auth`

const intlMiddleware = createIntlMiddleware({
  locales: ["en", "th"],
  defaultLocale: "th",
  localePrefix: "never", // Don't add locale prefix to URLs
})

export default auth((req: NextRequest) => {
  const { nextUrl } = req
  const isSignedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  /** Skip auth middleware for api routes */
  if (isApiAuthRoute) return

  const intlResponse = intlMiddleware(req)

  if (isAuthRoute) {
    if (isSignedIn) {
      /** Redirect to authenticated entry path if signed in & path is auth route */
      return Response.redirect(new URL(appConfig.authenticatedEntryPath, nextUrl))
    }
    return intlResponse
  }

  /** Redirect to authenticated entry path if signed in & path is public route */
  if (!isSignedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }

    return Response.redirect(
      new URL(`${appConfig.unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${callbackUrl}`, nextUrl),
    )
  }

  return intlResponse
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
}
