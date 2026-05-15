export const ROUTES = {
  ROOT: "/",

  // main routes
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",

  LANDING: "/",
  BLOG: "/blog",
  FOR_NICHE: "/for/:niche",

  DASHBOARD: "/dashboard",
  CONSTRUCTOR: "/constructor",

  // app routes
  ORDERS: "/orders",
  ORDERS_ALL: "/orders/all",
  ORDERS_PREORDERS: "/orders/preorders",
  ORDERS_SETTINGS: "/orders/settings",

  CATALOG: "/catalog",
  CATALOG_PRODUCTS: "/catalog/products",
  CATALOG_PRODUCTS_CREATE: "/catalog/products/create",
  CATALOG_PRODUCTS_EDIT: "/catalog/products/edit",

  CATALOG_CATEGORIES: "/catalog/categories",
  CATALOG_CATEGORIES_CREATE: "/catalog/categories/create",
  CATALOG_CATEGORIES_EDIT: "/catalog/categories/edit",

  CATALOG_INVENTORY: "/catalog/inventory",
  CATALOG_PRODUCT_RECOMMENDATIONS: "/catalog/product/recommendations",
  CATALOG_IMPORT_PRODUCTS: "/catalog/import/products",
  CATALOG_IMPORT_PRODUCTS_CREATE: "/catalog/import/products/create",

  CUSTOMERS: "/customers",
  CUSTOMERS_ALL: "/customers/all",
  CUSTOMERS_SEGMENTS: "/customers/segments",
  CUSTOMERS_SEGMENTS_CREATE: "/customers/segments/create",
  CUSTOMERS_SEGMENTS_VIEW: "/customers/segments/:id",

  MARKETING: "/marketing",
  MARKETING_DISCOUNT: "/marketing/discount",
  MARKETING_DISCOUNT_CREATE: "/marketing/discount/create",
  MARKETING_GIFT_PROMOTIONS: "/marketing/gift-promotions",
  MARKETING_GIFT_PROMOTIONS_CREATE: "/marketing/gift-promotions/create",
  MARKETING_NEWSLETTER: "/marketing/newsletter",
  MARKETING_NEWSLETTER_CREATE: "/marketing/newsletter/create",
  MARKETING_REVIEWS: "/marketing/reviews",
  MARKETING_REWARD_POINTS: "/marketing/reward-points",
  MARKETING_REWARD_POINTS_CREATE_ACCOUNT:
    "/marketing/reward-points/create-account",
  MARKETING_REWARD_POINTS_PLACE_ORDER: "/marketing/reward-points/place-order",
  MARKETING_REWARD_POINTS_GOAL_SPEND: "/marketing/reward-points/goal-spend",
  MARKETING_CHANNEL_POST: "/marketing/channel-post",
  MARKETING_GIVEAWAY: "/marketing/giveaway",

  ANALYTICS: "/analytics",
  ANALYTICS_GOOGLE: "/analytics/google",
  ANALYTICS_SALES: "/analytics/sales",
  ANALYTICS_HITS: "/analytics/hits",
  ANALYTICS_PRODUCTS: "/analytics/products",
  ANALYTICS_CART: "/analytics/cart",
  ANALYTICS_SEARCH: "/analytics/search",

  INTEGRATIONS: "/integrations",

  TELEGRAM_CONNECT: "/telegram/connect",
  CONVERSATIONS: "/conversations",

  SETTINGS: "/settings",
  SETTINGS_SHOP: "/settings/shop",
  SETTINGS_SHIPPING: "/settings/shipping",
  SETTINGS_SHIPPING_CREATE: "/settings/shipping/create",
  SETTINGS_SHIPPING_EDIT: "/settings/shipping/edit/:id",
  SETTINGS_LOCATION: "/settings/location",
  SETTINGS_LOCATION_CREATE: "/settings/location/create",
  SETTINGS_LOCATION_EDIT: "/settings/location/edit/:id",

  PAYMENTS: "/payments",
  PAYMENTS_ALL: "/payments/all",
  PAYMENTS_TRANSACTIONS: "/payments/transactions",
  PAYMENTS_IKPU: "/payments/products/ikpu",

  MANAGEMENT: "/management",
  MANAGEMENT_EMPLOYEES: "/management/employees",
  MANAGEMENT_EMPLOYEES_CREATE: "/management/employees/create",
  MANAGEMENT_EMPLOYEES_EDIT: "/management/employees/edit/:id",
  MANAGEMENT_ROLES: "/management/roles",
  MANAGEMENT_ROLES_CREATE: "/management/roles/create",
  MANAGEMENT_ROLES_EDIT: "/management/roles/edit/:id",

  APPLICATIONS: "/applications",
  META_FIELDS: "/meta-fields",
  PRICING: "/pricing",
} as const
