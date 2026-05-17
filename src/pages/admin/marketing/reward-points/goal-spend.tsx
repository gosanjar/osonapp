import { useForm, useWatch } from "react-hook-form"
import { Input } from "@/shared/ui/input"
import Flex from "@shared/flex"
import { SelectInput } from "@shared/select-input"
import StatusCard from "@shared/status-card"
import CreateLayout from "@shared/create-layout"
import Card from "@shared/card"

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
          <Card title="Mijozlarni ko'proq xarid qilishga undang va ularni mukofotlang" gap={4}>
            <Input
              label={<>Sarlavha <span className="text-red-500">*</span></>}
              name="title"
              placeholder="Mukofot nomi"
              className="w-full"
            />
            <Input
              label={<>Tavsif <span className="text-red-500">*</span></>}
              name="description"
              placeholder="Mukofot tavsifi"
              className="w-full"
            />
            <Input
              label={<>Minimal buyurtma miqdori <span className="text-red-500">*</span></>}
              {...form.register("minOrderAmount")}
              type="number"
              placeholder="1,000,000"
              className="w-full"
            />
            <Flex direction="column" gap={1}>
              <span className="text-sm font-medium">Mukofot turi <span className="text-red-500">*</span></span>
              <SelectInput
                defaultValue="points"
                options={[
                  { value: "points", label: "Ballar" },
                  { value: "discount", label: "Chegirma" },
                ]}
              />
            </Flex>
            <Input
              label={<>Ballar qiymati <span className="text-red-500">*</span></>}
              name="pointsValue"
              type="number"
              className="w-full"
            />
          </Card>
        </Flex>

        <Flex className="col-span-1" direction="column" gap={4}>
          <Card title="Xulosa">
            <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
              <li>{Number(minOrderAmount).toLocaleString("uz-UZ")} UZS sarflaganlik uchun</li>
              <li>Mijozingiz ball oladi</li>
              <li>Mijozingiz bu haqda xabardor qilinadi</li>
            </ul>
          </Card>
          <StatusCard description="Qoida holatini belgilang." />
        </Flex>
      </div>
    </CreateLayout>
  )
}

export default GoalSpend
