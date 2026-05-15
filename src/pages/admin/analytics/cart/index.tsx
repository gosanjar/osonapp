import { useState } from "react"
import { useForm } from "react-hook-form"
import { useWatch } from "react-hook-form"
import Flex from "@/shared/ui/flex"
import { Card, CardContent } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { SaveButton } from "@/shared/ui/predefined"
import { Checkbox } from "@/shared/ui/checkbox"
import { Textarea } from "@/shared/ui/textarea"
import { Label } from "@/shared/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { Settings2 } from "lucide-react"
import { DataTable } from "@/shared/ui/data-table/data-table"
import { columns, type CartRow } from "./columns"

const statCards = [
  { label: "Mijozlar soni", value: "0" },
  { label: "Mahsulotlar soni", value: "0" },
  { label: "Tashlab ketilgan mahsulotlar summasi", value: "0 so'm" },
]

const mockData: CartRow[] = []

type ReminderForm = {
  enabled: boolean
  delay: number
  promoEnabled: boolean
  textRu: string
  textUz: string
}

const defaultTextRu = `Уважаемый покупатель,

Вы забыли завершить покупку! В вашей корзине остались товары.

Завершите заказ сейчас и получите их быстрее.`

const defaultTextUz = `Hurmatli xaridor,

Siz xaridni yakunlashni unutdingiz! Savatchangizda mahsulotlar qoldi.

Hozir buyurtmani yakunlang va ularni tezroq oling.`

function ReminderDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const form = useForm<ReminderForm>({
    defaultValues: {
      enabled: false,
      delay: 60,
      promoEnabled: false,
      textRu: defaultTextRu,
      textUz: defaultTextUz,
    },
  })

  const [tab, setTab] = useState<"ru" | "uz">("ru")
  const enabled = useWatch({ control: form.control, name: "enabled" })
  const promoEnabled = useWatch({ control: form.control, name: "promoEnabled" })

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Eslatma sozlamalari</DialogTitle>
        </DialogHeader>

        <Flex direction="column" gap={4} className="w-full">
          <Flex align="center" gap={4} className="w-full">
            <Checkbox
              id="enabled"
              checked={enabled}
              onCheckedChange={(v) => form.setValue("enabled", !!v)}
            />
            <Label htmlFor="enabled" className="cursor-pointer">
              Eslatmalarni yoqish
            </Label>
          </Flex>

          <Flex direction="column" gap={4} className="w-full">
            <Label>Jo'natish kechikishi (daqiqa)</Label>
            <Input
              type="number"
              {...form.register("delay", { valueAsNumber: true })}
              className="w-full"
            />
          </Flex>

          <Flex align="center" gap={4} className="w-full">
            <Checkbox
              id="promoEnabled"
              checked={promoEnabled}
              onCheckedChange={(v) => form.setValue("promoEnabled", !!v)}
            />
            <Label htmlFor="promoEnabled" className="cursor-pointer">
              Promokod qo'shish
            </Label>
          </Flex>

          <Flex direction="column" gap={4} className="w-full">
            <Label>Xabar matni</Label>
            <Flex
              align="center"
              gap={4}
              className="w-full rounded-md border p-1"
            >
              <button
                type="button"
                onClick={() => setTab("ru")}
                className={`flex-1 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                  tab === "ru"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                RU
              </button>
              <button
                type="button"
                onClick={() => setTab("uz")}
                className={`flex-1 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                  tab === "uz"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                UZ
              </button>
            </Flex>
            {tab === "ru" ? (
              <Textarea
                {...form.register("textRu")}
                rows={6}
                className="w-full resize-none"
              />
            ) : (
              <Textarea
                {...form.register("textUz")}
                rows={6}
                className="w-full resize-none"
              />
            )}
          </Flex>

          <Flex align="center" justify="end" gap={4} className="w-full">
            <Button
              variant="default"
              className="bg-foreground text-background hover:bg-foreground/90"
              onClick={onClose}
            >
              Yopish
            </Button>
            <SaveButton onClick={() => form.handleSubmit(() => onClose())()} />
          </Flex>
        </Flex>
      </DialogContent>
    </Dialog>
  )
}

const CartAnalytics = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Flex direction="column" className="w-full" gap={4}>
      <h1 className="text-2xl font-bold">Savatcha bo'yicha analitika</h1>

      <Card className="w-full">
        <CardContent>
          <Flex align="center" justify="between" gap={4} className="w-full">
            <Flex
              align="center"
              gap={0}
              className="flex-1 overflow-hidden rounded-md border"
            >
              <div className="shrink-0 border-r bg-muted px-4 py-2 text-sm font-medium">
                Sanani tanlang
              </div>
              <Input
                name="dateRange"
                type="date"
                className="border-0 shadow-none focus-visible:ring-0"
              />
            </Flex>
            <Button
              variant="outline"
              className="shrink-0 gap-2"
              onClick={() => setDialogOpen(true)}
            >
              <Settings2 size={16} />
              Eslatma sozlamalari
            </Button>
          </Flex>
        </CardContent>
      </Card>

      <div className="grid w-full grid-cols-3 gap-4">
        {statCards.map((s) => (
          <Card key={s.label} className="w-full">
            <CardContent>
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <p className="mt-1 text-3xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={mockData}
        selectable={false}
        noResultsTitle="Tashlab ketilgan savatlar yo'q"
      />

      <ReminderDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Flex>
  )
}

export default CartAnalytics
