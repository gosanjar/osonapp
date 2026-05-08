import { useForm, useWatch } from "react-hook-form"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import Flex from "@/shared/ui/flex"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import StatusCard from "@/shared/components/status-card"
import CreateLayout from "@/shared/components/create-layout"
import FormCard from "@/shared/components/form-card"

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
          <FormCard title="Xarid uchun ballar">
            <Flex direction="column" gap={4} className="w-full">
              <Label>Sarlavha <span className="text-red-500">*</span></Label>
              <Input name="title" placeholder="Mukofot nomi" className="w-full" />
            </Flex>
            <Flex direction="column" gap={4} className="w-full">
              <Label>Tavsif <span className="text-red-500">*</span></Label>
              <Input name="description" placeholder="Mukofot tavsifi" className="w-full" />
            </Flex>
            <Flex direction="column" gap={4} className="w-full">
              <Label>Daromad qiymati <span className="text-red-500">*</span></Label>
              <div className="flex w-full overflow-hidden rounded-md border">
                <input
                  {...form.register("pointsPerAmount")}
                  type="number"
                  className="w-full border-0 bg-transparent px-3 py-2 text-sm outline-none"
                />
                <span className="flex shrink-0 items-center border-x bg-muted px-3 text-sm text-muted-foreground">
                  ball har
                </span>
                <input
                  {...form.register("amountPerPoints")}
                  type="number"
                  className="w-full border-0 bg-transparent px-3 py-2 text-sm outline-none"
                />
                <span className="flex shrink-0 items-center bg-muted px-3 text-sm text-muted-foreground">
                  UZS
                </span>
              </div>
            </Flex>
          </FormCard>
        </Flex>

        <Flex className="col-span-1" direction="column" gap={4}>
          <Card className="w-full">
            <CardHeader><CardTitle>Xulosa</CardTitle></CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                <li>Buyurtma bergani uchun</li>
                <li>Mijozingiz har {amountPerPoints} UZS uchun {pointsPerAmount} ball oladi</li>
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

export default PlaceOrder
