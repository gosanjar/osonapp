import { ROUTES } from "@/shared/config/routes"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  BankIcon,
  Book02Icon,
  ChatIcon,
  DashboardSquare01Icon,
  DiscountIcon,
  Home01Icon,
  Setting07Icon,
  ShoppingCart02Icon,
  Store01Icon,
  TelegramIcon,
  User03Icon,
  UserMultiple02Icon,
  WaterfallUp01Icon,
  WebDesign01Icon,
} from "@hugeicons/core-free-icons"
import type { ISidebarMenuTree } from "./types"
import { useMemo } from "react"

const useSidebar = () => {
  const menuList: ISidebarMenuTree[] = useMemo((): ISidebarMenuTree[] => {
    return [
      {
        path: ROUTES.DASHBOARD,
        icon: <HugeiconsIcon icon={Home01Icon} size={18} />,
        label: "Dashboard",
      },
      {
        path: ROUTES.CONSTRUCTOR,
        icon: <HugeiconsIcon icon={WebDesign01Icon} size={18} />,
        label: "Konstruktor",
      },
      {
        path: ROUTES.ORDERS,
        icon: <HugeiconsIcon icon={ShoppingCart02Icon} size={18} />,
        label: "Buyurtmalar",
        children: [
          {
            path: ROUTES.ORDERS_ALL,
            label: "Barcha buyurtmalar",
          },
          {
            path: ROUTES.ORDERS_PREORDERS,
            label: "Oldindan buyurtma",
          },
          {
            path: ROUTES.ORDERS_SETTINGS,
            label: "Sozlamalar",
          },
        ],
      },
      {
        path: ROUTES.CATALOG,
        icon: <HugeiconsIcon icon={Store01Icon} size={18} />,
        label: "Katalog",
        children: [
          {
            path: ROUTES.CATALOG_PRODUCTS,
            label: "Mahsulotlar",
          },
          {
            path: ROUTES.CATALOG_COLLECTIONS,
            label: "Kategoriyalar",
          },
          {
            path: ROUTES.CATALOG_INVENTORY,
            label: "Inventarizatsiya",
          },
          {
            path: ROUTES.CATALOG_PRODUCT_RECOMMENDATIONS,
            label: "Mahsulot tavsiyalari",
          },
          {
            path: ROUTES.CATALOG_IMPORT_PRODUCTS,
            label: "Import",
          },
        ],
      },
      {
        path: ROUTES.CUSTOMERS,
        icon: <HugeiconsIcon icon={User03Icon} size={18} />,
        label: "Mijozlar",
        children: [
          {
            path: ROUTES.CUSTOMERS_ALL,
            label: "Barcha mijozlar",
          },
          {
            path: ROUTES.CUSTOMERS_SEGMENTS,
            label: "Segmentlar",
          },
        ],
      },
      {
        path: ROUTES.MARKETING,
        icon: <HugeiconsIcon icon={DiscountIcon} size={18} />,
        label: "Katalog",
        children: [
          {
            path: ROUTES.MARKETING_DISCOUNT,
            label: "Promo kodlar",
          },
          {
            path: ROUTES.MARKETING_GIFT_PROMOTIONS,
            label: "Sovg'alar",
          },
          {
            path: ROUTES.MARKETING_NEWSLETTER,
            label: "SMS yuborish",
          },
          {
            path: ROUTES.MARKETING_REVIEWS,
            label: "Izohlar",
          },
          {
            path: ROUTES.MARKETING_REWARD_POINTS,
            label: "Sodiqlik dasturi",
          },
          {
            path: ROUTES.MARKETING_CHANNEL_POST,
            label: "Kanal uchun post",
          },
          {
            path: ROUTES.MARKETING_GIVEAWAY,
            label: "Giveaway",
          },
        ],
      },
      {
        path: ROUTES.ANALYTICS,
        icon: <HugeiconsIcon icon={WaterfallUp01Icon} size={18} />,
        label: "Metrikalar",
        children: [
          {
            path: ROUTES.ANALYTICS_GOOGLE,
            label: "Google Analitika",
          },
          {
            path: ROUTES.ANALYTICS_SALES,
            label: "Buyurtmalar bo`yicha analitika",
          },
          {
            path: ROUTES.ANALYTICS_HITS,
            label: "Ko`rishlar bo`yicha analitika",
          },
          {
            path: ROUTES.ANALYTICS_PRODUCTS,
            label: "Mahsulotlar bo`yicha analitika",
          },
          {
            path: ROUTES.ANALYTICS_CART,
            label: "Savatcha bo`yicha analitika",
          },
          {
            path: ROUTES.ANALYTICS_SEARCH,
            label: "Qidirish bo`yicha analitika",
          },
        ],
      },
      {
        path: ROUTES.TELEGRAM_CONNECT,
        icon: <HugeiconsIcon icon={TelegramIcon} size={18} />,
        label: "Telegram bot",
        section: "Kanallar",
      },
      {
        path: ROUTES.CONVERSATIONS,
        icon: <HugeiconsIcon icon={ChatIcon} size={18} />,
        label: "Chat",
      },
      {
        path: ROUTES.SETTINGS,
        icon: <HugeiconsIcon icon={Setting07Icon} size={18} />,
        label: "Sozlamalar",
        section: "Sozlamalar",
        children: [
          {
            path: ROUTES.SETTINGS_SHOP,
            label: "Do'kon sozlamalari",
          },
          {
            path: ROUTES.SETTINGS_SHIPPING,
            label: "Yetkazib berish usullari",
          },
          {
            path: ROUTES.SETTINGS_LOCATION,
            label: "Filiallar",
          },
        ],
      },
      {
        path: ROUTES.PAYMENTS,
        icon: <HugeiconsIcon icon={BankIcon} size={18} />,
        label: "To'lovlar",
        children: [
          {
            path: ROUTES.PAYMENTS_ALL,
            label: "To'lov tizimlari",
          },
          {
            path: ROUTES.PAYMENTS_TRANSACTIONS,
            label: "To`lov tranzaksiyalari",
          },
          {
            path: ROUTES.PAYMENTS_IKPU,
            label: "IKPU",
          },
        ],
      },
      {
        path: ROUTES.MANAGEMENT,
        icon: <HugeiconsIcon icon={UserMultiple02Icon} size={18} />,
        label: "Xodimlar",
        children: [
          {
            path: ROUTES.MANAGEMENT_EMPLOYEES,
            label: "Xodimlar",
          },
          {
            path: ROUTES.MANAGEMENT_ROLES,
            label: "Rollar",
          },
        ],
      },
      {
        path: ROUTES.APPLICATIONS,
        icon: <HugeiconsIcon icon={DashboardSquare01Icon} size={18} />,
        label: "Dastur",
      },
      {
        path: ROUTES.META_FIELDS,
        icon: <HugeiconsIcon icon={Book02Icon} size={18} />,
        label: "Maxsus ma'lumotlar",
      },
    ]
  }, [])

  return { menuList }
}

export default useSidebar
