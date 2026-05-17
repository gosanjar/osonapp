import { useForm } from "react-hook-form"
import { Input } from "@/shared/ui/input"
import StatusCard from "@shared/status-card"
import CreateLayout from "@shared/create-layout"
import Card from "@shared/card"

type BranchForm = {
  name: string
  address: string
  office: string
  city: string
  status: string
}

const LocationCreate = () => {
  const form = useForm<BranchForm>({
    defaultValues: { name: "", address: "", office: "", city: "", status: "published" },
  })

  return (
    <CreateLayout form={form} title="Filiallar">
      <div className="grid w-full grid-cols-[1fr_280px] items-start gap-4">
        <Card title="Umumiy" gap={4}>
          <Input
            label={<>Nomi <span className="text-destructive">*</span></>}
            {...form.register("name")}
            className="w-full"
          />

          <Input
            label={<>Manzil <span className="text-destructive">*</span></>}
            {...form.register("address")}
            className="w-full"
          />

          <Input
            label="Uy, ofis"
            {...form.register("office")}
            className="w-full"
          />

          <Input
            label={<>Shahar <span className="text-destructive">*</span></>}
            {...form.register("city")}
            className="w-full"
          />
        </Card>

        <StatusCard description="Filial holatini belgilang." />
      </div>
    </CreateLayout>
  )
}

export default LocationCreate
