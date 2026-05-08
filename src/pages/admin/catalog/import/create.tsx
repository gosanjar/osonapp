
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import Flex from "@/shared/ui/flex"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { CancelButton, SaveButton } from "@/shared/ui/predefined"
import { DownloadIcon } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"

const now = new Date()
const defaultName = `Import ${now.toLocaleDateString("uz-UZ")} ${now.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })}`

const CreateImport = () => {
  const form = useForm({ defaultValues: { name: defaultName } })

  return (
    <FormProvider {...form}>
      <form className="w-full">
        <Flex direction="column" className="w-full" gap={4}>
          <Flex justify="between" align="center" className="w-full">
            <h1 className="text-2xl font-bold">Import</h1>
            <Flex>
              <CancelButton />
              <SaveButton />
            </Flex>
          </Flex>

          <hr className="w-full" />

          <div className="grid w-full grid-cols-3 gap-4">
            <Flex className="col-span-2" direction="column" gap={4}>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Import</CardTitle>
                </CardHeader>
                <CardContent>
                  <Flex direction="column" gap={4} className="w-full">
                    <Input
                      label="Nomi *"
                      {...form.register("name")}
                      className="w-full"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Flex direction="column" gap={1}>
                        <Label>Turi</Label>
                        <Select defaultValue="standart">
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standart">Standart</SelectItem>
                          </SelectContent>
                        </Select>
                      </Flex>

                      <Flex direction="column" gap={1}>
                        <Label>Harakatlar</Label>
                        <Select defaultValue="import">
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="import">
                              Mahsulotlarni import qilish
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </Flex>
                    </div>

                    <Flex direction="column" gap={1}>
                      <Label>Fayl *</Label>
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
                  </Flex>
                </CardContent>
              </Card>

              <Flex justify="end" gap={3}>
                <CancelButton />
                <SaveButton>Import</SaveButton>
              </Flex>
            </Flex>

            <Flex className="col-span-1" direction="column" gap={4}>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Holat</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </Flex>
          </div>
        </Flex>
      </form>
    </FormProvider>
  )
}

export default CreateImport
