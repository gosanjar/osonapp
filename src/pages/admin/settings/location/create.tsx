import { useForm } from "react-hook-form"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import Flex from "@/shared/ui/flex"
import StatusCard from "@/shared/components/status-card"
import CreateLayout from "@/shared/components/create-layout"
import FormCard from "@/shared/components/form-card"

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
        <FormCard title="Umumiy">
          <Flex direction="column" gap={4} className="w-full">
            <Label>Nomi <span className="text-destructive">*</span></Label>
            <Input {...form.register("name")} className="w-full" />
          </Flex>

          <Flex direction="column" gap={4} className="w-full">
            <Label>Manzil <span className="text-destructive">*</span></Label>
            <Input {...form.register("address")} className="w-full" />
          </Flex>

          <Flex direction="column" gap={4} className="w-full">
            <Label>Uy, ofis</Label>
            <Input {...form.register("office")} className="w-full" />
          </Flex>

          <Flex direction="column" gap={4} className="w-full">
            <Label>Shahar <span className="text-destructive">*</span></Label>
            <Input {...form.register("city")} className="w-full" />
          </Flex>
        </FormCard>

        <StatusCard description="Filial holatini belgilang." />
      </div>
    </CreateLayout>
  )
}

export default LocationCreate
