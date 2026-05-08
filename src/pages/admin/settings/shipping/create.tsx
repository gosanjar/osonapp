import { useForm, useWatch } from "react-hook-form"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Checkbox } from "@/shared/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { Info } from "lucide-react"
import Flex from "@/shared/ui/flex"
import StatusCard from "@/shared/components/status-card"
import CreateLayout from "@/shared/components/create-layout"
import FormCard from "@/shared/components/form-card"

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
        <FormCard title="Umumiy">
          <Flex direction="column" gap={4} className="w-full">
            <Label>Nomi <span className="text-destructive">*</span></Label>
            <Input {...form.register("name")} placeholder="Доставка" className="w-full" />
          </Flex>

          <Flex direction="column" gap={4} className="w-full">
            <Label>Yetkazib berish turi <span className="text-destructive">*</span></Label>
            <Select defaultValue="fixed">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Belgilangan summa</SelectItem>
                <SelectItem value="free">Bepul</SelectItem>
                <SelectItem value="calculated">Hisoblanadigan</SelectItem>
              </SelectContent>
            </Select>
          </Flex>

          <Flex direction="column" gap={4} className="w-full">
            <Label>Yetkazib berish narxi <span className="text-destructive">*</span></Label>
            <Input {...form.register("price")} placeholder="20,000" className="w-full" />
          </Flex>

          <Flex direction="column" gap={4} className="w-full">
            <Label>Minimal buyurtma summasi</Label>
            <Input type="number" {...form.register("minOrder")} placeholder="50,000" className="w-full" />
            <div className="flex gap-2 rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-600">
              <Info size={16} className="mt-0.5 shrink-0" />
              <span>
                Agar siz minimal buyurtma summasini kiritsangiz, mijozlar ushbu yetkazib berish usulini ko'rishlari uchun buyurtma summasi ko'rsatilgan qiymatdan yuqori bo'lishi kerak!
              </span>
            </div>
          </Flex>

          <div className="grid w-full grid-cols-2 gap-4">
            <Flex direction="column" gap={4} className="w-full">
              <Label>Yetkazib berish vaqti (son)</Label>
              <Input {...form.register("deliveryTime")} className="w-full" />
            </Flex>
            <Flex direction="column" gap={4} className="w-full">
              <Label>Yetkazib berish vaqti birligi</Label>
              <Select defaultValue="soat">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="soat">soat</SelectItem>
                  <SelectItem value="kun">kun</SelectItem>
                  <SelectItem value="hafta">hafta</SelectItem>
                </SelectContent>
              </Select>
            </Flex>
          </div>

          <Flex align="center" gap={4} className="w-full">
            <Checkbox
              id="allowDateSelect"
              checked={allowDateSelect}
              onCheckedChange={(v) => form.setValue("allowDateSelect", !!v)}
            />
            <Label htmlFor="allowDateSelect" className="cursor-pointer">
              Yetkazib berish sanasi va vaqtini tanlash imkoniyatini qo'shing.
            </Label>
          </Flex>
        </FormCard>

        <StatusCard description="Yetkazib berish usuli holatini belgilang." />
      </div>
    </CreateLayout>
  )
}

export default ShippingCreate
