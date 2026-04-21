export const ROUTES = {
  ROOT: "/",
  DASHBOARD: "/dashboard",
  CONSTRUCTOR: "/constructor",

  // Orders
  ORDERS: "/orders",
  ORDERS_ALL: "/orders/all",
  ORDERS_PREORDERS: "/orders/preorders",
  ORDERS_SETTINGS: "/orders/settings",

  // Catalog
  CATALOG: "/catalog",
  CATALOG_PRODUCTS: "/catalog/products",
  CATALOG_PRODUCTS_CREATE: "/catalog/products/create",
  CATALOG_PRODUCTS_EDIT: "/catalog/products/edit",
  CATALOG_COLLECTIONS: "/catalog/collections",
  CATALOG_INVENTORY: "/catalog/inventory",
  CATALOG_PRODUCT_RECOMMENDATIONS: "/catalog/product/recommendations",
  CATALOG_IMPORT_PRODUCTS: "/catalog/import/products",

  // Customers
  CUSTOMERS: "/customers",
  CUSTOMERS_ALL: "/customers/all",
  CUSTOMERS_SEGMENTS: "/segments",

  // Marketing
  MARKETING: "/marketing",
  MARKETING_DISCOUNT: "/marketing/discount",
  MARKETING_GIFT_PROMOTIONS: "/marketing/gift-promotions",
  MARKETING_NEWSLETTER: "/marketing/newsletter",
  MARKETING_REVIEWS: "/marketing/reviews",
  MARKETING_REWARD_POINTS: "/marketing/reward-points",
  MARKETING_CHANNEL_POST: "/marketing/channel-post",
  MARKETING_GIVEAWAY: "/marketing/giveaway",

  // Analytics / Metrics
  ANALYTICS: "/analytics",
  ANALYTICS_GOOGLE: "/analytics/google",
  ANALYTICS_SALES: "/analytics/sales",
  ANALYTICS_HITS: "/analytics/hits",
  ANALYTICS_PRODUCTS: "/analytics/products",
  ANALYTICS_CART: "/analytics/cart",
  ANALYTICS_SEARCH: "/analytics/search",

  // Channels
  TELEGRAM_CONNECT: "/telegram/connect",
  CONVERSATIONS: "/conversations",

  // Settings
  SETTINGS: "/settings",
  SETTINGS_SHOP: "/settings/shop",
  SETTINGS_SHIPPING: "/settings/shipping",
  SETTINGS_LOCATION: "/settings/location",

  // Finance / Payments
  PAYMENTS: "/payments",
  PAYMENTS_ALL: "/payments/all",
  PAYMENTS_TRANSACTIONS: "/payments/transactions",
  PAYMENTS_IKPU: "/payments/products/ikpu",

  // Management / Employees
  MANAGEMENT: "/management",
  MANAGEMENT_EMPLOYEES: "/management/employees",
  MANAGEMENT_ROLES: "/management/roles",

  // Applications
  APPLICATIONS: "/applications",

  // Meta fields
  META_FIELDS: "/meta-fields",
} as const
