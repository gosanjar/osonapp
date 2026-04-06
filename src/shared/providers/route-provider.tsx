import { Suspense, useMemo } from "react"
import {
  RouterProvider,
  type RouteObject,
  createBrowserRouter,
} from "react-router-dom"
import router from "../router"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"

export const Routes = () => {
  // const isAdmin = usePermissions((state) => state.isAdmin) || usePermissions.isChief()
  const routes = useMemo(
    () => createBrowserRouter(router() as RouteObject[]),
    []
  )

  return (
    <div style={{ height: "100dvh", width: "100dvw" }}>
      <Suspense fallback={<HugeiconsIcon icon={Loading03Icon} />}>
        <RouterProvider router={routes} />
      </Suspense>
    </div>
  )
}
