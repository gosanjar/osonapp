import Flex from "@shared/flex"
import { CancelButton, SaveButton } from "@shared/predefined"
import { FormProvider, useForm } from "react-hook-form"
import Card from "@shared/card"
import { Input } from "@/shared/ui/input"
import { SelectInput } from "@shared/select-input"
import { Button } from "@/shared/ui/button"
import { Search, Zap } from "lucide-react"
import { useState } from "react"

function generateCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}

const CreateDiscount = () => {
  const form = useForm({
    defaultValues: { code: "", discountValue: "10", usageLimit: "1" },
  })
  const [code, setCode] = useState("")

  return (
    <FormProvider {...form}>
      <form className="w-full">
        <Flex direction="column" gap={4}>
          <Flex justify="between" align="center">
            <Flex direction="column" gap={0}>
              <h1 className="text-2xl font-bold">Promo kodlar</h1>
              <span className="text-sm text-muted-foreground">
                Yangi promokod yarating
              </span>
            </Flex>
            <Flex>
              <CancelButton />
              <SaveButton />
            </Flex>
          </Flex>

          <hr className="w-full" />

          <div className="grid w-full grid-cols-3 gap-4">
            <Flex className="col-span-2" direction="column" gap={4}>
              <Card title="Promokod qo'shish" gap={4}>
                <Flex direction="column" gap={1}>
                  <Flex gap={2}>
                    <Input
                      label={<>Kod <span className="text-red-500">*</span></>}
                      name="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full"
                    />
                    <Button
                      type="button"
                      className="shrink-0 self-end bg-foreground text-background hover:bg-foreground/90"
                      onClick={() => setCode(generateCode())}
                    >
                      <Zap size={14} />
                      Generatsiya qilish
                    </Button>
                  </Flex>
                  <p className="text-xs text-muted-foreground">
                    Mijozlar buyurtma berishda ushbu kodni kiritadi.
                  </p>
                </Flex>

                <div className="grid w-full grid-cols-2 gap-3">
                  <Flex direction="column" gap={1}>
                    <span className="text-sm font-medium">Turi</span>
                    <SelectInput
                      defaultValue="percent"
                      options={[
                        { value: "percent", label: "Foiz" },
                        { value: "fixed", label: "Belgilangan summa" },
                      ]}
                    />
                  </Flex>

                  <Flex direction="column" gap={1}>
                    <span className="text-sm font-medium">Chegirma foizini kiriting</span>
                    <div className="relative w-full">
                      <Input
                        name="discountValue"
                        type="number"
                        defaultValue="10"
                        className="w-full pr-8"
                      />
                      <span className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-foreground">
                        %
                      </span>
                    </div>
                  </Flex>
                </div>
              </Card>

              <Card title="Segmentlar">
                <SelectInput
                  defaultValue="all"
                  options={[
                    { value: "all", label: "Barcha mijozlar" },
                    { value: "vip", label: "VIP mijozlar" },
                    { value: "new", label: "Yangi mijozlar" },
                  ]}
                />
              </Card>

              <Card title="Mijozni tanlang">
                <div className="relative">
                  <Search
                    size={15}
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    name="customerSearch"
                    placeholder="Mijozlarni qidirish"
                    className="w-full pl-9"
                  />
                </div>
              </Card>
            </Flex>

            <Flex className="col-span-1" direction="column" gap={4}>
              <Card title="Faol sanalar" gap={4}>
                <Input
                  label={<>Boshlanish sanasi <span className="text-red-500">*</span></>}
                  name="startDate"
                  type="datetime-local"
                  className="w-full"
                />
                <Input
                  label="Tugash sanasi"
                  name="endDate"
                  type="datetime-local"
                  className="w-full"
                />
              </Card>

              <Card title="Necha marta foydalanish mumkin?">
                <Input
                  name="usageLimit"
                  type="number"
                  defaultValue="1"
                  min="1"
                  className="w-full"
                />
              </Card>
            </Flex>
          </div>
        </Flex>
      </form>
    </FormProvider>
  )
}

export default CreateDiscount
