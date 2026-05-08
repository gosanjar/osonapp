import { useState } from "react"
import Flex from "@/shared/ui/flex"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@utils/utils"

type Period = "monthly" | "biannual" | "yearly"

const periodLabels: Record<Period, string> = {
  monthly: "Oylik",
  biannual: "6 oylik",
  yearly: "Yillik",
}

const discounts: Record<Period, string | null> = {
  monthly: null,
  biannual: "-15%",
  yearly: "-20%",
}

const basePrice: Record<string, number> = {
  start: 199000,
  growth: 399000,
  plus: 799000,
}

const multiplier: Record<Period, number> = {
  monthly: 1,
  biannual: 6 * 0.85,
  yearly: 12 * 0.8,
}

const plans = [
  {
    id: "start",
    name: "Start",
    description:
      "Yangi sotuvchilar va o'z biznesini endigina boshlayotganlar uchun",
    popular: false,
    features: [
      "Базовые модули",
      "Максимальное количество клиентов 500",
      "Максимальное количество товаров 50",
      "Максимальное количество сотрудников 2",
      "Максимальное количество рассылок 2",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description: "O'rta biznes va o'z biznesini rivojlantirayotganlar uchun",
    popular: true,
    features: [
      "Продвинутые модули",
      "Количество клиентов 25 000",
      "Количество товаров 10 000",
      "Количество сотрудников 10",
      "Количество рассылок 20",
    ],
  },
  {
    id: "plus",
    name: "Plus",
    description: "Katta sotuvchilar va o'z biznesini kengaytirayotganlar uchun",
    popular: false,
    features: [
      "Все модули",
      "Безконечное количество клиентов",
      "Безконечное количество товаров",
      "Безконечное количество сотрудников",
      "Безконечное количество рассылок",
    ],
  },
]

const Pricing = () => {
  const [period, setPeriod] = useState<Period>("monthly")

  return (
    <Flex direction="column" align="center" className="w-full" gap={8}>
      <Flex direction="column" align="center" gap={2}>
        <h1 className="text-3xl font-bold">Tarifingizni tanlang</h1>
        <p className="text-sm text-muted-foreground">
          Выберите подходящий тариф для вашего бизнеса
        </p>
      </Flex>

      <div className="flex items-center gap-1 rounded-xl border bg-muted p-1">
        {(["monthly", "biannual", "yearly"] as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors",
              period === p
                ? "bg-background text-foreground shadow"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {periodLabels[p]}
            {discounts[p] && (
              <span className="rounded-md bg-green-100 px-1.5 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900 dark:text-green-300">
                {discounts[p]}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const price = Math.round(basePrice[plan.id] * multiplier[period])
          return (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-6",
                plan.popular && "border-2 border-primary shadow-lg"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="px-4 py-1 text-sm">Ommabop</Badge>
                </div>
              )}

              <Flex direction="column" gap={2} className="mb-6">
                <h2 className="text-xl font-bold">{plan.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </Flex>

              <Flex align="end" gap={1} className="mb-1">
                <span className="text-4xl font-black">
                  {price.toLocaleString("uz-UZ")}
                </span>
                <span className="mb-1 text-sm text-muted-foreground">сум</span>
              </Flex>
              <p className="mb-6 text-sm text-muted-foreground">
                / {periodLabels[period]}
              </p>

              <Button
                className="mb-6 w-full"
                variant={plan.popular ? "default" : "outline"}
                size="lg"
              >
                {plan.name} ga o'tish
              </Button>

              <Flex direction="column" gap={3}>
                {plan.features.map((feature, i) => (
                  <Flex key={i} align="center" gap={2}>
                    <CheckCircle2
                      size={16}
                      className="shrink-0 text-green-500"
                    />
                    <span className="text-sm">{feature}</span>
                  </Flex>
                ))}
              </Flex>
            </div>
          )
        })}
      </div>
    </Flex>
  )
}

export default Pricing
