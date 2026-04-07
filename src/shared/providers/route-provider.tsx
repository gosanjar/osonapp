import { Suspense, useMemo } from "react"
import {
  RouterProvider,
  type RouteObject,
  createBrowserRouter,
} from "react-router-dom"
import router from "../router"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"
import Flex from "@/shared/ui/flex"

export const Routes = () => {
  const routes = useMemo(
    () => createBrowserRouter(router() as RouteObject[]),
    []
  )

  return (
    <Flex direction="column" className="h-screen w-screen justify-center">
      <Suspense fallback={<HugeiconsIcon icon={Loading03Icon} size={32} />}>
        <RouterProvider router={routes} />
      </Suspense>
    </Flex>
  )
}
