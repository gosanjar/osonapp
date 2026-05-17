import { useState } from "react"
import { useForm } from "react-hook-form"
import { useWatch } from "react-hook-form"
import Flex from "@shared/flex"
import Card from "@shared/card"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { SaveButton } from "@shared/predefined"
import { CheckboxInput } from "@shared/checkbox-input"
import { Textarea } from "@/shared/ui/textarea"
import Modal from "@shared/modal"
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
    <Modal open={open} onOpenChange={onClose} title="Eslatma sozlamalari">
      <Flex direction="column" gap={4}>
        <CheckboxInput
          value={enabled}
          onChange={(v) => form.setValue("enabled", v)}
          label="Eslatmalarni yoqish"
        />

        <Input
          type="number"
          label="Jo'natish kechikishi (daqiqa)"
          {...form.register("delay", { valueAsNumber: true })}
          className="w-full"
        />

        <CheckboxInput
          value={promoEnabled}
          onChange={(v) => form.setValue("promoEnabled", v)}
          label="Promokod qo'shish"
        />

        <Flex direction="column" gap={4}>
          <span className="text-sm font-medium">Xabar matni</span>
          <Flex align="center" gap={4} className="rounded-md border p-1">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setTab("ru")}
              className={`flex-1 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                tab === "ru"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              RU
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setTab("uz")}
              className={`flex-1 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                tab === "uz"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              UZ
            </Button>
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

        <Flex align="center" justify="end" gap={4}>
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
    </Modal>
  )
}

const CartAnalytics = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Flex direction="column" gap={4}>
      <h1 className="text-2xl font-bold">Savatcha bo'yicha analitika</h1>

      <Card>
        <Flex align="center" justify="between" gap={4}>
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
      </Card>

      <div className="grid w-full grid-cols-3 gap-4">
        {statCards.map((s) => (
          <Card key={s.label}>
            <span className="text-sm text-muted-foreground">{s.label}</span>
            <p className="mt-1 text-3xl font-bold">{s.value}</p>
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
