import Flex from "@/shared/ui/flex"
import { CancelButton, SaveButton } from "@/shared/ui/predefined"
import { FormProvider, useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
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
        <Flex direction="column" className="w-full" gap={4}>
          <Flex justify="between" align="center" className="w-full">
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
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Promokod qo'shish</CardTitle>
                </CardHeader>
                <CardContent>
                  <Flex direction="column" gap={4} className="w-full">
                    <Flex direction="column" gap={1} className="w-full">
                      <Label>
                        Kod <span className="text-red-500">*</span>
                      </Label>
                      <Flex gap={2} className="w-full">
                        <Input
                          name="code"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          className="w-full"
                        />
                        <Button
                          type="button"
                          className="shrink-0 bg-foreground text-background hover:bg-foreground/90"
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
                      <Flex direction="column" className="w-full">
                        <Label>Turi</Label>
                        <Select defaultValue="percent">
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percent">Foiz</SelectItem>
                            <SelectItem value="fixed">
                              Belgilangan summa
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </Flex>

                      <Flex direction="column" className="w-full">
                        <Label>Chegirma foizini kiriting</Label>
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
                  </Flex>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Segmentlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Barcha mijozlar</SelectItem>
                      <SelectItem value="vip">VIP mijozlar</SelectItem>
                      <SelectItem value="new">Yangi mijozlar</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Mijozni tanlang</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </Flex>

            <Flex className="col-span-1" direction="column" gap={4}>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Faol sanalar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Flex direction="column" className="w-full" gap={4}>
                    <Flex direction="column" className="w-full">
                      <Label>
                        Boshlanish sanasi{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        name="startDate"
                        type="datetime-local"
                        className="w-full"
                      />
                    </Flex>
                    <Flex direction="column" className="w-full">
                      <Label>Tugash sanasi</Label>
                      <Input
                        name="endDate"
                        type="datetime-local"
                        className="w-full"
                      />
                    </Flex>
                  </Flex>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Necha marta foydalanish mumkin?</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    name="usageLimit"
                    type="number"
                    defaultValue="1"
                    min="1"
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </Flex>
          </div>
        </Flex>
      </form>
    </FormProvider>
  )
}

export default CreateDiscount
