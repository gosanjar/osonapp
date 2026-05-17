
import Card from "@shared/card"
import Flex from "@shared/flex"
import { Input } from "@/shared/ui/input"
import { SelectInput } from "@shared/select-input"
import { CancelButton, SaveButton } from "@shared/predefined"
import { DownloadIcon } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"

const now = new Date()
const defaultName = `Import ${now.toLocaleDateString("uz-UZ")} ${now.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })}`

const CreateImport = () => {
  const form = useForm({ defaultValues: { name: defaultName } })

  return (
    <FormProvider {...form}>
      <form className="w-full">
        <Flex direction="column" gap={4}>
          <Flex justify="between" align="center">
            <h1 className="text-2xl font-bold">Import</h1>
            <Flex>
              <CancelButton />
              <SaveButton />
            </Flex>
          </Flex>

          <hr className="w-full" />

          <div className="grid w-full grid-cols-3 gap-4">
            <Flex className="col-span-2" direction="column" gap={4}>
              <Card title="Import" gap={4}>
                <Input
                  label="Nomi *"
                  {...form.register("name")}
                  className="w-full"
                />

                <div className="grid grid-cols-2 gap-4">
                  <SelectInput
                    label="Turi"
                    defaultValue="standart"
                    options={[
                      { value: "standart", label: "Standart" },
                    ]}
                  />

                  <SelectInput
                    label="Harakatlar"
                    defaultValue="import"
                    options={[
                      { value: "import", label: "Mahsulotlarni import qilish" },
                    ]}
                  />
                </div>

                <Flex direction="column" gap={1}>
                  <p className="text-sm font-medium">Fayl *</p>
                  <input
                    type="file"
                    accept=".csv"
                    className="w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium"
                  />
                  <p className="text-xs text-muted-foreground">
                    Faylni CSV formatida yuklang
                  </p>
                </Flex>

                <a
                  href="#"
                  className="flex w-fit items-center gap-2 text-sm text-green-600 hover:underline"
                >
                  <DownloadIcon size={16} />
                  Import namunasini yuklab oling
                </a>
              </Card>

              <Flex justify="end" gap={3}>
                <CancelButton />
                <SaveButton>Import</SaveButton>
              </Flex>
            </Flex>

            <Flex className="col-span-1" direction="column" gap={4}>
              <Card title="Holat">
                <Flex direction="column" gap={1}>
                  <Flex align="center" gap={2}>
                    <span className="size-2.5 rounded-full bg-blue-500" />
                    <span className="text-sm font-medium">
                      Amalga oshirish jarayonida
                    </span>
                  </Flex>
                  <p className="text-xs text-muted-foreground">
                    Faylni CSV formatida yuklang
                  </p>
                </Flex>
              </Card>
            </Flex>
          </div>
        </Flex>
      </form>
    </FormProvider>
  )
}

export default CreateImport
