import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Label } from "@/shared/ui/label"
import { Textarea } from "@/shared/ui/textarea"
import { Alert, AlertTitle } from "@/shared/ui/alert"
import { FileSearchCorner } from "lucide-react"
import { Card, CardContent } from "@/shared/ui/card"

type Language = "uz" | "ru"

const TEMPLATES = {
  uz: {
    label: "O`zbek tilidagi shablonlar",
    heading: "Push-buyurtma bildirishnomalari",
    fields: {
      NewOrder:
        "Sizning buyurtmangiz :order_id qabul qilindi. Tez orada siz bilan bog`lanamiz.",
      OrderAccepted: "Sizning buyurtmangiz :order_id qabul qilindi.",
      OrderProcessed: "Biz sizning buyurtmangizni :order_id ko`rib chiqdik.",
      OrderFulfilled:
        "Buyurtma :order_id etkazib berish xizmatiga topshiriladi.",
      OrderBeingDelivered: "Buyurtma :order_id yetkazib berilmoqda.",
      OrderDelivered: "Buyurtma :order_id muvaffaqiyatli etkazib berildi.",
      OrderCancelled: "Sizning buyurtmangiz :order_id bekor qilindi.",
    },
  },
  ru: {
    label: "Rus tilidagi shablonlar",
    heading: "Push-order notifications",
    fields: {
      NewOrder:
        "Спасибо за ваш заказ :order_id. Мы свяжемся с вами в ближайшее время.",
      OrderAccepted: "Ваш заказ :order_id принят и передан в обработку.",
      OrderProcessed: "Мы обработали ваш заказ :order_id.",
      OrderFulfilled: "Заказ :order_id собран и передан службе доставки.",
      OrderBeingDelivered: "Курьер с заказом :order_id уже направляется к вам.",
      OrderDelivered: "Заказ :order_id успешно доставлен.",
      OrderCancelled: "Ваш заказ :order_id был отменен.",
    },
  },
}

const OrdersSettings = () => {
  const [activeTab, setActiveTab] = useState<Language>("uz")
  const [texts, setTexts] = useState(() => {
    const initial: Record<string, string> = {}
    for (const lang of Object.keys(TEMPLATES) as Language[]) {
      for (const field of Object.keys(TEMPLATES[lang].fields)) {
        initial[`${lang}_${field}`] =
          TEMPLATES[lang].fields[
            field as keyof (typeof TEMPLATES)[Language]["fields"]
          ]
      }
    }
    return initial
  })

  const handleChange = (key: string, value: string) => {
    setTexts((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Card className="w-full overflow-y-auto">
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as Language)}
        >
          <TabsList className="border">
            {(Object.keys(TEMPLATES) as Language[]).map((lang) => (
              <TabsTrigger key={lang} value={lang}>
                {TEMPLATES[lang].label}
              </TabsTrigger>
            ))}
          </TabsList>

          {(Object.keys(TEMPLATES) as Language[]).map((lang) => (
            <TabsContent key={lang} value={lang}>
              <h2 className="mb-6 text-lg font-semibold">
                {TEMPLATES[lang].heading}
              </h2>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-[200px_1fr]">
                {Object.keys(TEMPLATES[lang].fields).map((field) => (
                  <div key={field} className="contents">
                    <Label className="md:pt-2 md:text-end">
                      {field.replace(/([A-Z])/g, " $1").trim()}
                    </Label>
                    <Textarea
                      value={texts[`${lang}_${field}`]}
                      onChange={(e) =>
                        handleChange(`${lang}_${field}`, e.target.value)
                      }
                      rows={3}
                    />
                  </div>
                ))}

                <Label className="md:pt-2 md:text-end">
                  Mavjud o`zgaruvchilar
                </Label>
                <Alert variant="default" className="items-center">
                  <FileSearchCorner />
                  <AlertTitle className="flex flex-col gap-1 text-sm font-normal">
                    <span>Buyurtma raqami :order_id</span>
                    <span>Mijoz ismi :name</span>
                  </AlertTitle>
                </Alert>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default OrdersSettings
