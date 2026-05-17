import { ROUTES } from "@/shared/config/routes"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import Flex from "@/shared/ui/flex"
import { ArrowUpRight, Bell } from "lucide-react"
import { NavLink } from "react-router-dom"
import Chart from "./chart"
import { Checkbox } from "@/shared/ui/checkbox"

const Dashboard = () => {
  const setupSteps = [
    {
      to: ROUTES.TELEGRAM_CONNECT,
      color: "bg-green-500",
      title: "Telegram botni ulash",
      description:
        "Telegram orqali buyurtma qabul qilish va do`koningizni boshqarish uchun telegram botni ulang.",
    },
    {
      to: ROUTES.CATALOG_CATEGORIES,
      color: "bg-blue-500",
      title: "Kategoriyalar qo`shish",
      description:
        "Mijozlar kerakli mahsulotni oson topishlari uchun kategoriyalar qo`shing.",
    },
    {
      to: ROUTES.CATALOG_PRODUCTS,
      color: "bg-amber-500",
      title: "Mahsulot qo`shish",
      description:
        "Do'koningizga mahsulotlaringizni qo'shing, shunda mijozlar ularni ko'rishlari va sotib olishlari mumkin.",
    },
    {
      to: ROUTES.SETTINGS_SHIPPING,
      color: "bg-blue-500",
      title: "Yetkazib berish usullarini qo`shish",
      description:
        "Mijozlar mahsulotni olishning qulay usulini tanlashlari uchun yetkazib berish usullarini qo'shing.",
    },
    {
      to: ROUTES.PAYMENTS,
      color: "bg-amber-500",
      title: "To`lov tizimlarini qo`shish",
      description:
        "To'lov usullarini qo'shing, shunda mijozlar o'zlariga qulay to'lov usulini tanlashlari mumkin.",
    },
    {
      to: ROUTES.SETTINGS_SHOP,
      color: "bg-green-500",
      title: "Do`kon haqida ma`lumot qo`shish",
      description:
        "Mijozlar siz haqingizda ko'proq ma'lumot olishlari uchun do'kon ma'lumotlarini qo'shing.",
    },
  ]

  return (
    <Flex direction="column" className="w-full" gap={5}>
      <Flex
        align="center"
        className="w-full rounded-lg bg-blue-500 p-3 text-white"
      >
        <Bell size={18} strokeWidth={2} />
        <div>
          <span className="font-medium">
            Sizning obunangiz 5 kundan keyin tugaydi.
          </span>
          <span>
            {" "}
            Iltimos, tanlangan tarif uchun to'lovni vaqtida amalga oshiring.
          </span>
        </div>
      </Flex>

      <div className="grid w-full grid-cols-1 place-items-center gap-2.5 rounded-lg bg-linear-to-r from-[#E47400] to-[#F8AC02] p-6 sm:grid-cols-2">
        <Flex direction="column" gap={3} className="text-white">
          <span className="text-xl font-semibold">Google Analitika</span>
          <span className="font-light text-gray-100">
            Google saytga qancha foydalanuvchi kirganini, qayerdan kelganini,
            nima qilayotganini (sahifalar, bosishlar, xaridlar) va qaysi
            kanallar savdo qilishini ko'rsatadi. Marketing, reklama va
            konversiyani oshirish uchun ishlatiladi.
          </span>
          <NavLink
            className="flex items-center gap-2 rounded-md bg-white/25 px-2 py-1 text-xs"
            to={ROUTES.ANALYTICS_GOOGLE}
          >
            <span>Google Analitika</span>
            <ArrowUpRight size={14} strokeWidth={2} />
          </NavLink>
        </Flex>
        <img src="/illustrations/1.svg" alt="" className="h-50" />
      </div>

      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-3">
        <Card className="w-full">
          <CardHeader>Jami sotuvlar</CardHeader>
          <CardContent className="text-2xl">0 so'm</CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>Buyurtmalar soni</CardHeader>
          <CardContent className="text-2xl">0</CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>O'rtacha buyurtmalar summasi</CardHeader>
          <CardContent className="text-2xl">0 so'm</CardContent>
        </Card>
      </div>

      <Chart />

      <Flex className="w-full">
        <Card className="w-full pt-0">
          <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
            <div className="grid flex-1 gap-1">
              <CardTitle>Birinchi 10 ta sotuv qiling</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <CardDescription>
              Botingizga ko'proq tashrif buyuruvchilarni jalb qilish,
              mijozlaringizning ishonchini qozonish va sotishni boshlash uchun
              quyidagi amallarni bajaring.
            </CardDescription>

            {setupSteps.map((step) => (
              <Flex key={step.to} align="center" gap={4}>
                <span className={`h-10 w-1 rounded-full ${step.color}`} />
                <Checkbox />
                <Flex direction="column" gap={0}>
                  <NavLink
                    to={step.to}
                    className="font-medium hover:text-blue-400"
                  >
                    {step.title}
                  </NavLink>
                  <span className="text-xs">{step.description}</span>
                </Flex>
              </Flex>
            ))}
          </CardContent>
        </Card>
      </Flex>

      <Flex
        gap={0}
        direction="column"
        className="w-full rounded-lg bg-violet-600 p-3.5 text-sm"
      >
        <span className="text-white">
          Bizning Telegram kanalimizga obuna bo`ling
        </span>
        <span className="">
          Yangi o'zgarish va yangiliklardan xabardor bo'lish uchun bizning
          telegram kanalimiz{" "}
          <NavLink to="https://t.me/osonapp_uz" className="hover:text-white">
            @osonapp_uz
          </NavLink>{" "}
          ga obuna bo'ling.
        </span>
      </Flex>
    </Flex>
  )
}

export default Dashboard
