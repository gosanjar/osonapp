import { useForm, useWatch } from "react-hook-form"
import { Input } from "@/shared/ui/input"
import { SelectInput } from "@shared/select-input"
import { CheckboxInput } from "@shared/checkbox-input"
import { Info } from "lucide-react"
import Flex from "@shared/flex"
import StatusCard from "@shared/status-card"
import CreateLayout from "@shared/create-layout"
import Card from "@shared/card"

type ShippingForm = {
  name: string
  type: string
  price: string
  minOrder: string
  deliveryTime: string
  timeUnit: string
  allowDateSelect: boolean
  status: string
}

const ShippingCreate = () => {
  const form = useForm<ShippingForm>({
    defaultValues: {
      name: "",
      type: "fixed",
      price: "",
      minOrder: "",
      deliveryTime: "",
      timeUnit: "soat",
      allowDateSelect: false,
      status: "published",
    },
  })

  const allowDateSelect = useWatch({ control: form.control, name: "allowDateSelect" })

  return (
    <CreateLayout form={form} title="Yetkazib berish usullari">
      <div className="grid w-full grid-cols-[1fr_280px] items-start gap-4">
        <Card title="Umumiy" gap={4}>
          <Input
            label={<>Nomi <span className="text-destructive">*</span></>}
            {...form.register("name")}
            placeholder="Доставка"
            className="w-full"
          />

          <Flex direction="column" gap={1}>
            <span className="text-sm font-medium">Yetkazib berish turi <span className="text-destructive">*</span></span>
            <SelectInput
              defaultValue="fixed"
              options={[
                { value: "fixed", label: "Belgilangan summa" },
                { value: "free", label: "Bepul" },
                { value: "calculated", label: "Hisoblanadigan" },
              ]}
            />
          </Flex>

          <Input
            label={<>Yetkazib berish narxi <span className="text-destructive">*</span></>}
            {...form.register("price")}
            placeholder="20,000"
            className="w-full"
          />

          <Flex direction="column" gap={1}>
            <Input
              label="Minimal buyurtma summasi"
              type="number"
              {...form.register("minOrder")}
              placeholder="50,000"
              className="w-full"
            />
            <div className="flex gap-2 rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-600">
              <Info size={16} className="mt-0.5 shrink-0" />
              <span>
                Agar siz minimal buyurtma summasini kiritsangiz, mijozlar ushbu yetkazib berish usulini ko'rishlari uchun buyurtma summasi ko'rsatilgan qiymatdan yuqori bo'lishi kerak!
              </span>
            </div>
          </Flex>

          <div className="grid w-full grid-cols-2 gap-4">
            <Input
              label="Yetkazib berish vaqti (son)"
              {...form.register("deliveryTime")}
              className="w-full"
            />
            <Flex direction="column" gap={1}>
              <span className="text-sm font-medium">Yetkazib berish vaqti birligi</span>
              <SelectInput
                defaultValue="soat"
                options={[
                  { value: "soat", label: "soat" },
                  { value: "kun", label: "kun" },
                  { value: "hafta", label: "hafta" },
                ]}
              />
            </Flex>
          </div>

          <CheckboxInput
            value={allowDateSelect}
            onChange={(v) => form.setValue("allowDateSelect", v)}
            label="Yetkazib berish sanasi va vaqtini tanlash imkoniyatini qo'shing."
          />
        </Card>

        <StatusCard description="Yetkazib berish usuli holatini belgilang." />
      </div>
    </CreateLayout>
  )
}

export default ShippingCreate
