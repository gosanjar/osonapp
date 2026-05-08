import { useForm, useWatch } from "react-hook-form"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import Flex from "@/shared/ui/flex"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import StatusCard from "@/shared/components/status-card"
import CreateLayout from "@/shared/components/create-layout"
import FormCard from "@/shared/components/form-card"

const GoalSpend = () => {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      minOrderAmount: "1000000",
      rewardType: "points",
      pointsValue: "",
      status: "published",
    },
  })

  const minOrderAmount = useWatch({ control: form.control, name: "minOrderAmount" })

  return (
    <CreateLayout form={form} title="X sarflang, Y oling" saveLabel="Qoida yaratish">
      <div className="grid w-full grid-cols-3 gap-4">
        <Flex className="col-span-2" direction="column" gap={4}>
          <FormCard title="Mijozlarni ko'proq xarid qilishga undang va ularni mukofotlang">
            <Flex direction="column" gap={4} className="w-full">
              <Label>Sarlavha <span className="text-red-500">*</span></Label>
              <Input name="title" placeholder="Mukofot nomi" className="w-full" />
            </Flex>
            <Flex direction="column" gap={4} className="w-full">
              <Label>Tavsif <span className="text-red-500">*</span></Label>
              <Input name="description" placeholder="Mukofot tavsifi" className="w-full" />
            </Flex>
            <Flex direction="column" gap={4} className="w-full">
              <Label>Minimal buyurtma miqdori <span className="text-red-500">*</span></Label>
              <Input {...form.register("minOrderAmount")} type="number" placeholder="1,000,000" className="w-full" />
            </Flex>
            <Flex direction="column" gap={4} className="w-full">
              <Label>Mukofot turi <span className="text-red-500">*</span></Label>
              <Select defaultValue="points">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="points">Ballar</SelectItem>
                  <SelectItem value="discount">Chegirma</SelectItem>
                </SelectContent>
              </Select>
            </Flex>
            <Flex direction="column" gap={4} className="w-full">
              <Label>Ballar qiymati <span className="text-red-500">*</span></Label>
              <Input name="pointsValue" type="number" className="w-full" />
            </Flex>
          </FormCard>
        </Flex>

        <Flex className="col-span-1" direction="column" gap={4}>
          <Card className="w-full">
            <CardHeader><CardTitle>Xulosa</CardTitle></CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                <li>{Number(minOrderAmount).toLocaleString("uz-UZ")} UZS sarflaganlik uchun</li>
                <li>Mijozingiz ball oladi</li>
                <li>Mijozingiz bu haqda xabardor qilinadi</li>
              </ul>
            </CardContent>
          </Card>
          <StatusCard description="Qoida holatini belgilang." />
        </Flex>
      </div>
    </CreateLayout>
  )
}

export default GoalSpend
