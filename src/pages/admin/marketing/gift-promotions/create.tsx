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
import { Search } from "lucide-react"

const SearchCard = ({ placeholder }: { placeholder: string }) => (
  <div className="relative w-full">
    <Search
      size={15}
      className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
    />
    <Input name="" placeholder={placeholder} className="w-full pl-9" />
  </div>
)

const EmptyIllustration = () => (
  <Flex direction="column" align="center" className="w-full py-4">
    <img src="/illustrations/1.svg" alt="" className="h-36 opacity-70" />
  </Flex>
)

const CreateGiftPromotion = () => {
  const form = useForm({
    defaultValues: { name: "", requiredQty: "1", giftQty: "1", priority: "0" },
  })

  return (
    <FormProvider {...form}>
      <form className="w-full">
        <Flex direction="column" className="w-full" gap={4}>
          <Flex justify="between" align="center" className="w-full">
            <Flex direction="column" gap={0}>
              <h1 className="text-2xl font-bold">Sovg'alar</h1>
              <span className="text-sm text-muted-foreground">
                Yangi aksiya yarating
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
                  <CardTitle>Aksiya sozlamalari</CardTitle>
                </CardHeader>
                <CardContent>
                  <Flex direction="column" gap={4} className="w-full">
                    <Flex direction="column" gap={1} className="w-full">
                      <Label>
                        Nomi <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        name="name"
                        placeholder="Masalan: 3 ta mahsulot sotib olsangiz sovg'a"
                        className="w-full"
                      />
                    </Flex>

                    <div className="grid w-full grid-cols-2 gap-4">
                      <Flex direction="column" className="w-full">
                        <Label>Shart turi</Label>
                        <Select defaultValue="quantity">
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quantity">
                              Miqdor bo'yicha
                            </SelectItem>
                            <SelectItem value="amount">
                              Summa bo'yicha
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </Flex>

                      <Flex direction="column" className="w-full">
                        <Label>
                          Kerakli miqdor <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative w-full">
                          <Input
                            name="requiredQty"
                            type="number"
                            defaultValue="1"
                            min="1"
                            className="w-full pr-12"
                          />
                          <span className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-foreground">
                            dona
                          </span>
                        </div>
                      </Flex>
                    </div>
                  </Flex>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Trigger mahsulotlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Flex direction="column" gap={4} className="w-full">
                    <p className="text-sm text-muted-foreground">
                      Aksiya ishga tushishi uchun sotib olinadigan mahsulotlarni
                      tanlang. Har qanday mahsulot uchun bo'sh qoldiring.
                    </p>
                    <SearchCard placeholder="Mahsulotlarni qidirish" />
                    <EmptyIllustration />
                  </Flex>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader>
                  <CardTitle>
                    Sovg'a mahsulot <span className="text-red-500">*</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Flex direction="column" gap={4} className="w-full">
                    <SearchCard placeholder="Sovg'a mahsulot" />
                    <EmptyIllustration />
                    <Flex direction="column" gap={1} className="w-full">
                      <Label>Sovg'alar soni</Label>
                      <Input
                        name="giftQty"
                        type="number"
                        defaultValue="1"
                        min="1"
                        className="w-full"
                      />
                    </Flex>
                  </Flex>
                </CardContent>
              </Card>
            </Flex>

            <Flex className="col-span-1" direction="column" gap={4}>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Ustunlik</CardTitle>
                </CardHeader>
                <CardContent>
                  <Flex direction="column" gap={4} className="w-full">
                    <Input
                      name="priority"
                      type="number"
                      defaultValue="0"
                      min="0"
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Raqam qancha katta bo'lsa, ustunlik shuncha yuqori.
                      Ziddiyat bo'lsa, eng yuqori ustunlikdagi aksiya
                      qo'llaniladi.
                    </p>
                  </Flex>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Amal qilish davri</CardTitle>
                </CardHeader>
                <CardContent>
                  <Flex direction="column" gap={4} className="w-full">
                    <Flex direction="column" className="w-full">
                      <Label>Boshlanish sanasi</Label>
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
                  <CardTitle>Cheklovlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Flex direction="column" gap={4} className="w-full">
                    <Flex direction="column" className="w-full">
                      <Label>Foydalanish limiti</Label>
                      <Input
                        name="usageLimit"
                        placeholder="Cheklovsiz"
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Aksiya maksimal qo'llanish soni. Cheksiz uchun bo'sh
                        qoldiring.
                      </p>
                    </Flex>
                    <Flex direction="column" className="w-full">
                      <Label>Mijoz uchun limit</Label>
                      <Input
                        name="customerLimit"
                        placeholder="Cheklovsiz"
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Bitta mijoz uchun maksimal qo'llanish soni.
                      </p>
                    </Flex>
                  </Flex>
                </CardContent>
              </Card>

              <Flex justify="end" gap={4} className="w-full">
                <CancelButton />
                <SaveButton />
              </Flex>
            </Flex>
          </div>
        </Flex>
      </form>
    </FormProvider>
  )
}

export default CreateGiftPromotion
