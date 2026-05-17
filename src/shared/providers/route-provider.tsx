import { Suspense, useMemo } from "react"
import {
  RouterProvider,
  type RouteObject,
  createBrowserRouter,
} from "react-router-dom"
import router from "../router"
import { Loader2 } from "lucide-react"
import { AuthProvider } from "./auth-provider"
import Flex from "@shared/flex"

const getSubdomain = () => {
  const hostname = window.location.hostname
  const parts = hostname.split(".")
  if (parts.length >= 3) return parts[0]
  if (parts.length === 2 && parts[1] === "localhost") return parts[0]
  return null
}

const subdomain = getSubdomain()
export const isMainDomain = subdomain === null
export const isAppDomain = subdomain === "app"
export const isShopDomain = subdomain === "shop"

export const Routes = () => {
  const routes = useMemo(
    () => createBrowserRouter(router() as RouteObject[]),
    []
  )

  const content = (
    <Suspense
      fallback={
        <Flex
          direction="column"
          align="center"
          justify="center"
          className="h-screen w-screen"
        >
          <Loader2 size={32} strokeWidth={2} className="animate-spin" />
        </Flex>
      }
    >
      <RouterProvider router={routes} />
    </Suspense>
  )

  if (isAppDomain) {
    return <AuthProvider>{content}</AuthProvider>
  }

  return content
}
