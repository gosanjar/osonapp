import MainLayout from "@/layouts/main-layout"
import { AuthGuard } from "@/shared/components/auth-guard"
import { lazy } from "react"
import { Navigate, type RouteObject } from "react-router-dom"
import { ROUTES } from "../config/routes"
import {
  isAppDomain,
  isMainDomain,
  isShopDomain,
} from "../providers/route-provider"

const mainDomainRoutes = (): RouteObject[] => [
  { index: true, Component: lazy(() => import("@/pages/public/landing")) },
  { path: ROUTES.LOGIN, Component: lazy(() => import("@/pages/public/auth/login")) },
  { path: ROUTES.REGISTER, Component: lazy(() => import("@/pages/public/auth/register")) },
  { path: ROUTES.FORGOT_PASSWORD, Component: lazy(() => import("@/pages/public/auth/forgot-password")) },
  { path: ROUTES.PRICING, Component: lazy(() => import("@/pages/public/pricing")) },
  { path: ROUTES.BLOG, Component: lazy(() => import("@/pages/public/blog")) },
  { path: ROUTES.FOR_NICHE, Component: lazy(() => import("@/pages/public/niche")) },
]

const appDomainRoutes = (): RouteObject[] => [
  {
    element: <AuthGuard />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Navigate to={ROUTES.DASHBOARD} replace /> },
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
                Component: lazy(() => import("@pages/admin/orders/all-orders")),
              },
              {
                path: ROUTES.ORDERS_PREORDERS,
                Component: lazy(() => import("@pages/admin/orders/pre-orders")),
              },
              {
                path: ROUTES.ORDERS_SETTINGS,
                Component: lazy(() => import("@pages/admin/orders/settings")),
              },
            ],
          },
          {
            path: ROUTES.CATALOG,
            children: [
              {
                path: ROUTES.CATALOG_PRODUCTS,
                Component: lazy(() => import("@pages/admin/catalog/products")),
              },
              {
                path: ROUTES.CATALOG_PRODUCTS_CREATE,
                Component: lazy(
                  () => import("@pages/admin/catalog/products/create")
                ),
              },
              {
                path: ROUTES.CATALOG_PRODUCTS_EDIT,
                Component: lazy(
                  () => import("@pages/admin/catalog/products/create")
                ),
              },
              {
                path: ROUTES.CATALOG_CATEGORIES,
                Component: lazy(
                  () => import("@pages/admin/catalog/categories")
                ),
              },
              {
                path: ROUTES.CATALOG_CATEGORIES_CREATE,
                Component: lazy(
                  () => import("@pages/admin/catalog/categories/create")
                ),
              },
              {
                path: ROUTES.CATALOG_CATEGORIES_EDIT,
                Component: lazy(
                  () => import("@pages/admin/catalog/categories/create")
                ),
              },
              {
                path: ROUTES.CATALOG_INVENTORY,
                Component: lazy(() => import("@pages/admin/catalog/inventory")),
              },
              {
                path: ROUTES.CATALOG_PRODUCT_RECOMMENDATIONS,
                Component: lazy(
                  () => import("@pages/admin/catalog/recommendations")
                ),
              },
              {
                path: ROUTES.CATALOG_IMPORT_PRODUCTS,
                Component: lazy(() => import("@pages/admin/catalog/import")),
              },
              {
                path: ROUTES.CATALOG_IMPORT_PRODUCTS_CREATE,
                Component: lazy(
                  () => import("@pages/admin/catalog/import/create")
                ),
              },
            ],
          },
          {
            path: ROUTES.CUSTOMERS,
            children: [
              {
                path: ROUTES.CUSTOMERS_ALL,
                Component: lazy(() => import("@pages/admin/customers/all")),
              },
              {
                path: ROUTES.CUSTOMERS_SEGMENTS,
                Component: lazy(
                  () => import("@pages/admin/customers/segments")
                ),
              },
              {
                path: ROUTES.CUSTOMERS_SEGMENTS_CREATE,
                Component: lazy(
                  () => import("@pages/admin/customers/segments/create")
                ),
              },
              {
                path: ROUTES.CUSTOMERS_SEGMENTS_VIEW,
                Component: lazy(
                  () => import("@pages/admin/customers/segments/view")
                ),
              },
            ],
          },
          {
            path: ROUTES.MARKETING,
            children: [
              {
                path: ROUTES.MARKETING_DISCOUNT,
                Component: lazy(
                  () => import("@pages/admin/marketing/discount")
                ),
              },
              {
                path: ROUTES.MARKETING_DISCOUNT_CREATE,
                Component: lazy(
                  () => import("@pages/admin/marketing/discount/create")
                ),
              },
              {
                path: ROUTES.MARKETING_GIFT_PROMOTIONS,
                Component: lazy(
                  () => import("@pages/admin/marketing/gift-promotions")
                ),
              },
              {
                path: ROUTES.MARKETING_GIFT_PROMOTIONS_CREATE,
                Component: lazy(
                  () => import("@pages/admin/marketing/gift-promotions/create")
                ),
              },
              {
                path: ROUTES.MARKETING_NEWSLETTER,
                Component: lazy(
                  () => import("@pages/admin/marketing/newsletter")
                ),
              },
              {
                path: ROUTES.MARKETING_NEWSLETTER_CREATE,
                Component: lazy(
                  () => import("@pages/admin/marketing/newsletter/create")
                ),
              },
              {
                path: ROUTES.MARKETING_REVIEWS,
                Component: lazy(() => import("@pages/admin/marketing/reviews")),
              },
              {
                path: ROUTES.MARKETING_REWARD_POINTS,
                Component: lazy(
                  () => import("@pages/admin/marketing/reward-points")
                ),
              },
              {
                path: ROUTES.MARKETING_REWARD_POINTS_CREATE_ACCOUNT,
                Component: lazy(
                  () =>
                    import("@pages/admin/marketing/reward-points/create-account")
                ),
              },
              {
                path: ROUTES.MARKETING_REWARD_POINTS_PLACE_ORDER,
                Component: lazy(
                  () =>
                    import("@pages/admin/marketing/reward-points/place-order")
                ),
              },
              {
                path: ROUTES.MARKETING_REWARD_POINTS_GOAL_SPEND,
                Component: lazy(
                  () =>
                    import("@pages/admin/marketing/reward-points/goal-spend")
                ),
              },
            ],
          },
          {
            path: ROUTES.ANALYTICS,
            children: [
              {
                path: ROUTES.ANALYTICS_GOOGLE,
                Component: lazy(() => import("@pages/admin/analytics/google")),
              },
              {
                path: ROUTES.ANALYTICS_SALES,
                Component: lazy(() => import("@pages/admin/analytics/sales")),
              },
              {
                path: ROUTES.ANALYTICS_HITS,
                Component: lazy(() => import("@pages/admin/analytics/hits")),
              },
              {
                path: ROUTES.ANALYTICS_SEARCH,
                Component: lazy(() => import("@pages/admin/analytics/search")),
              },
              {
                path: ROUTES.ANALYTICS_PRODUCTS,
                Component: lazy(
                  () => import("@pages/admin/analytics/products")
                ),
              },
              {
                path: ROUTES.ANALYTICS_CART,
                Component: lazy(() => import("@pages/admin/analytics/cart")),
              },
            ],
          },
          {
            path: ROUTES.INTEGRATIONS,
            Component: lazy(() => import("@pages/admin/integrations")),
          },
          {
            path: ROUTES.TELEGRAM_CONNECT,
            Component: lazy(() => import("@pages/admin/telegram")),
          },
          {
            path: ROUTES.CONVERSATIONS,
            Component: lazy(() => import("@pages/admin/conversations")),
          },
          {
            path: ROUTES.SETTINGS,
            children: [
              {
                path: ROUTES.SETTINGS_SHOP,
                Component: lazy(() => import("@pages/admin/settings/shop")),
              },
              {
                path: ROUTES.SETTINGS_SHIPPING,
                Component: lazy(() => import("@pages/admin/settings/shipping")),
              },
              {
                path: ROUTES.SETTINGS_SHIPPING_CREATE,
                Component: lazy(
                  () => import("@pages/admin/settings/shipping/create")
                ),
              },
              {
                path: ROUTES.SETTINGS_SHIPPING_EDIT,
                Component: lazy(
                  () => import("@pages/admin/settings/shipping/create")
                ),
              },
              {
                path: ROUTES.SETTINGS_LOCATION,
                Component: lazy(() => import("@pages/admin/settings/location")),
              },
              {
                path: ROUTES.SETTINGS_LOCATION_CREATE,
                Component: lazy(
                  () => import("@pages/admin/settings/location/create")
                ),
              },
              {
                path: ROUTES.SETTINGS_LOCATION_EDIT,
                Component: lazy(
                  () => import("@pages/admin/settings/location/create")
                ),
              },
            ],
          },
          {
            path: ROUTES.MANAGEMENT,
            children: [
              {
                path: ROUTES.MANAGEMENT_EMPLOYEES,
                Component: lazy(() => import("@pages/admin/management/employees")),
              },
              {
                path: ROUTES.MANAGEMENT_EMPLOYEES_CREATE,
                Component: lazy(() => import("@pages/admin/management/employees/create")),
              },
              {
                path: ROUTES.MANAGEMENT_EMPLOYEES_EDIT,
                Component: lazy(() => import("@pages/admin/management/employees/create")),
              },
              {
                path: ROUTES.MANAGEMENT_ROLES,
                Component: lazy(() => import("@pages/admin/management/roles")),
              },
              {
                path: ROUTES.MANAGEMENT_ROLES_CREATE,
                Component: lazy(() => import("@pages/admin/management/roles/create")),
              },
              {
                path: ROUTES.MANAGEMENT_ROLES_EDIT,
                Component: lazy(() => import("@pages/admin/management/roles/create")),
              },
            ],
          },
        ],
      },
    ],
  },
]

const shopDomainRoutes = (): RouteObject[] => {
  const MainSiteRedirect = () => {
    window.location.replace(
      import.meta.env.VITE_MAIN_URL || "https://osonapp.uz"
    )
    return null
  }

  return [
    { index: true, element: <MainSiteRedirect /> },
    { path: ":subdomain", Component: lazy(() => import("@/pages/store/shop")) },
  ]
}

const router = (): RouteObject[] => {
  if (isMainDomain) return [...mainDomainRoutes(), { path: "*", Component: lazy(() => import("@/features/not-found")) }]
  if (isAppDomain) return [...appDomainRoutes(), { path: "*", Component: lazy(() => import("@/features/not-found")) }]
  if (isShopDomain) return [...shopDomainRoutes(), { path: "*", Component: lazy(() => import("@/features/not-found")) }]
  return [{ path: "*", Component: lazy(() => import("@/features/not-found")) }]
}

export default router
