import { ROUTES } from "@/shared/config/routes"
import {
  Landmark,
  BookOpen,
  MessageSquare,
  LayoutDashboard,
  Tag,
  Home,
  Settings,
  ShoppingCart,
  Store,
  Send,
  User,
  Users,
  TrendingUp,
  Monitor,
} from "lucide-react"
import type { ISidebarMenuTree } from "./types"
import { useMemo } from "react"
import Icon from "@shared/icon"
import { useAuthStore } from "@/shared/store/auth.store"

const useSidebar = () => {
  const user = useAuthStore((s) => s.user)

  const menuList: ISidebarMenuTree[] = useMemo((): ISidebarMenuTree[] => {
    return [
      {
        path: ROUTES.DASHBOARD,
        icon: <Icon icon={Home} />,
        label: "Dashboard",
      },
      {
        path: ROUTES.CONSTRUCTOR,
        icon: <Icon icon={Monitor} />,
        label: "Konstruktor",
      },
      {
        path: ROUTES.ORDERS,
        icon: <Icon icon={ShoppingCart} />,
        label: "Buyurtmalar",
        children: [
          { path: ROUTES.ORDERS_ALL, label: "Barcha buyurtmalar", permission: "can_order_edit" },
          { path: ROUTES.ORDERS_PREORDERS, label: "Oldindan buyurtma", permission: "can_order_edit" },
          { path: ROUTES.ORDERS_SETTINGS, label: "Sozlamalar", permission: "can_order_edit" },
        ],
      },
      {
        path: ROUTES.CATALOG,
        icon: <Icon icon={Store} />,
        label: "Katalog",
        children: [
          { path: ROUTES.CATALOG_PRODUCTS, label: "Mahsulotlar", permission: "can_product_edit" },
          { path: ROUTES.CATALOG_CATEGORIES, label: "Kategoriyalar", permission: "can_category_edit" },
          { path: ROUTES.CATALOG_INVENTORY, label: "Inventarizatsiya", permission: "can_product_edit" },
          { path: ROUTES.CATALOG_PRODUCT_RECOMMENDATIONS, label: "Mahsulot tavsiyalari", permission: "can_recommendation_edit" },
          { path: ROUTES.CATALOG_IMPORT_PRODUCTS, label: "Import", permission: "can_products_import" },
        ],
      },
      {
        path: ROUTES.CUSTOMERS,
        icon: <Icon icon={User} />,
        label: "Mijozlar",
        children: [
          { path: ROUTES.CUSTOMERS_ALL, label: "Barcha mijozlar", permission: "can_customer_edit" },
          { path: ROUTES.CUSTOMERS_SEGMENTS, label: "Segmentlar", permission: "can_customer_edit" },
        ],
      },
      {
        path: ROUTES.MARKETING,
        icon: <Icon icon={Tag} />,
        label: "Marketing",
        children: [
          { path: ROUTES.MARKETING_DISCOUNT, label: "Promo kodlar" },
          { path: ROUTES.MARKETING_GIFT_PROMOTIONS, label: "Sovg'alar" },
          { path: ROUTES.MARKETING_NEWSLETTER, label: "SMS yuborish", permission: "can_newsletter_create" },
          { path: ROUTES.MARKETING_REVIEWS, label: "Izohlar" },
          { path: ROUTES.MARKETING_REWARD_POINTS, label: "Sodiqlik dasturi" },
          { path: ROUTES.MARKETING_CHANNEL_POST, label: "Kanal uchun post" },
          { path: ROUTES.MARKETING_GIVEAWAY, label: "Giveaway" },
        ],
      },
      {
        path: ROUTES.ANALYTICS,
        icon: <Icon icon={TrendingUp} />,
        label: "Metrikalar",
        children: [
          { path: ROUTES.ANALYTICS_GOOGLE, label: "Google Analitika" },
          { path: ROUTES.ANALYTICS_SALES, label: "Buyurtmalar bo`yicha analitika" },
          { path: ROUTES.ANALYTICS_HITS, label: "Ko`rishlar bo`yicha analitika" },
          { path: ROUTES.ANALYTICS_PRODUCTS, label: "Mahsulotlar bo`yicha analitika" },
          { path: ROUTES.ANALYTICS_CART, label: "Savatcha bo`yicha analitika" },
          { path: ROUTES.ANALYTICS_SEARCH, label: "Qidirish bo`yicha analitika" },
        ],
      },
      {
        path: ROUTES.TELEGRAM_CONNECT,
        icon: <Icon icon={Send} />,
        label: "Telegram bot",
        section: "Kanallar",
        permission: "can_telegram_connect",
      },
      {
        path: ROUTES.CONVERSATIONS,
        icon: <Icon icon={MessageSquare} />,
        label: "Chat",
      },
      {
        path: ROUTES.SETTINGS,
        icon: <Icon icon={Settings} />,
        label: "Sozlamalar",
        section: "Sozlamalar",
        children: [
          { path: ROUTES.SETTINGS_SHOP, label: "Do'kon sozlamalari" },
          { path: ROUTES.SETTINGS_SHIPPING, label: "Yetkazib berish usullari", permission: "can_shipping_edit" },
          { path: ROUTES.SETTINGS_LOCATION, label: "Filiallar" },
        ],
      },
      {
        path: ROUTES.PAYMENTS,
        icon: <Icon icon={Landmark} />,
        label: "To'lovlar",
        children: [
          { path: ROUTES.PAYMENTS_ALL, label: "To'lov tizimlari", permission: "can_payment_edit" },
          { path: ROUTES.PAYMENTS_TRANSACTIONS, label: "To`lov tranzaksiyalari", permission: "can_transaction_delete" },
          { path: ROUTES.PAYMENTS_IKPU, label: "IKPU", permission: "can_ikpu_edit" },
        ],
      },
      {
        path: ROUTES.MANAGEMENT,
        icon: <Icon icon={Users} />,
        label: "Xodimlar",
        children: [
          { path: ROUTES.MANAGEMENT_EMPLOYEES, label: "Xodimlar", permission: "can_user_edit" },
          { path: ROUTES.MANAGEMENT_ROLES, label: "Rollar", permission: "can_role_edit" },
        ],
      },
      {
        path: ROUTES.APPLICATIONS,
        icon: <Icon icon={LayoutDashboard} />,
        label: "Dastur",
      },
      {
        path: ROUTES.META_FIELDS,
        icon: <Icon icon={BookOpen} />,
        label: "Maxsus ma'lumotlar",
      },
    ]
  }, [])

  function canAccess(permission?: string): boolean {
    if (!permission) return true
    if (!user) return false
    if (user.role === "owner") return true
    if (user.role === "staff") return user.permissions.includes(permission as never)
    return false
  }

  function filterMenu(items: ISidebarMenuTree[]): ISidebarMenuTree[] {
    return items
      .filter((item) => canAccess(item.permission))
      .map((item) => ({
        ...item,
        children: item.children ? filterMenu(item.children) : undefined,
      }))
  }

  return { menuList: filterMenu(menuList) }
}

export default useSidebar
