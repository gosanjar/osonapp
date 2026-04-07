import MainLayout from "@/layouts/main-layout"
import { lazy } from "react"
import { Navigate, type RouteObject } from "react-router-dom"
import { ROUTES } from "../config/routes"

const router = (): RouteObject[] => {
  return [
    {
      path: ROUTES.ROOT,
      // errorElement: <ErrorBoundary />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: <Navigate to={ROUTES.DASHBOARD} />,
            },
            {
              path: ROUTES.DASHBOARD,
              Component: lazy(() => import("@pages/admin/dashboard")),
            },
            {
              path: ROUTES.CONSTRUCTOR,
              Component: lazy(() => import("@pages/admin/index")),
            },
            {
              path: ROUTES.ORDERS,
              children: [
                {
                  path: ROUTES.ORDERS_ALL,
                  Component: lazy(() => import("@pages/admin/index")),
                },
                {
                  path: ROUTES.ORDERS_PREORDERS,
                  Component: lazy(() => import("@pages/admin/index")),
                },
                {
                  path: ROUTES.ORDERS_SETTINGS,
                  Component: lazy(() => import("@pages/admin/index")),
                },
              ],
            },
            {
              path: ROUTES.ANALYTICS,
              children: [
                {
                  path: ROUTES.ANALYTICS_SALES,
                  Component: lazy(() => import("@pages/admin/index")),
                },
              ],
            },
          ],
        },
        // {
        //   path: ROUTES.LOGIN,
        //   Component: lazy(() => import("@/pages/auth/login")),
        // },
        // {
        //   path: ROUTES.LOGOUT,
        //   Component: lazy(() => import("@/pages/auth/logout")),
        // },
        {
          path: "*",
          Component: lazy(() => import("@/features/not-found")),
        },
      ],
    },
  ]
}
export default router
