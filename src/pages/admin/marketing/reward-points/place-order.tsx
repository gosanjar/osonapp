import { useForm, useWatch } from "react-hook-form"
import { Input } from "@/shared/ui/input"
import Flex from "@shared/flex"
import StatusCard from "@shared/status-card"
import CreateLayout from "@shared/create-layout"
import Card from "@shared/card"

const PlaceOrder = () => {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      pointsPerAmount: "1",
      amountPerPoints: "1000",
      status: "published",
    },
  })

  const pointsPerAmount = useWatch({ control: form.control, name: "pointsPerAmount" })
  const amountPerPoints = useWatch({ control: form.control, name: "amountPerPoints" })

  return (
    <CreateLayout form={form} title="Xarid uchun ballar" saveLabel="Qoida yaratish">
      <div className="grid w-full grid-cols-3 gap-4">
        <Flex className="col-span-2" direction="column" gap={4}>
          <Card title="Xarid uchun ballar" gap={4}>
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
            <Flex direction="column" gap={1}>
              <span className="text-sm font-medium">Daromad qiymati <span className="text-red-500">*</span></span>
              <div className="flex w-full overflow-hidden rounded-md border">
                <Input
                  {...form.register("pointsPerAmount")}
                  type="number"
                  className="w-full border-0 bg-transparent px-3 py-2 text-sm outline-none"
                />
                <span className="flex shrink-0 items-center border-x bg-muted px-3 text-sm text-muted-foreground">
                  ball har
                </span>
                <Input
                  {...form.register("amountPerPoints")}
                  type="number"
                  className="w-full border-0 bg-transparent px-3 py-2 text-sm outline-none"
                />
                <span className="flex shrink-0 items-center bg-muted px-3 text-sm text-muted-foreground">
                  UZS
                </span>
              </div>
            </Flex>
          </Card>
        </Flex>

        <Flex className="col-span-1" direction="column" gap={4}>
          <Card title="Xulosa">
            <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
              <li>Buyurtma bergani uchun</li>
              <li>Mijozingiz har {amountPerPoints} UZS uchun {pointsPerAmount} ball oladi</li>
              <li>Mijozingiz bu haqda xabardor qilinadi</li>
            </ul>
          </Card>
          <StatusCard description="Qoida holatini belgilang." />
        </Flex>
      </div>
    </CreateLayout>
  )
}

export default PlaceOrder
