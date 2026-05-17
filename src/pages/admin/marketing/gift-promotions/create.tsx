import Flex from "@shared/flex"
import { CancelButton, SaveButton } from "@shared/predefined"
import { FormProvider, useForm } from "react-hook-form"
import Card from "@shared/card"
import { Input } from "@/shared/ui/input"
import { SelectInput } from "@shared/select-input"
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
  <Flex direction="column" align="center" className="py-4">
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
        <Flex direction="column" gap={4}>
          <Flex justify="between" align="center">
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
              <Card title="Aksiya sozlamalari" gap={4}>
                <Input
                  label={<>Nomi <span className="text-red-500">*</span></>}
                  name="name"
                  placeholder="Masalan: 3 ta mahsulot sotib olsangiz sovg'a"
                  className="w-full"
                />

                <div className="grid w-full grid-cols-2 gap-4">
                  <Flex direction="column" gap={1}>
                    <span className="text-sm font-medium">Shart turi</span>
                    <SelectInput
                      defaultValue="quantity"
                      options={[
                        { value: "quantity", label: "Miqdor bo'yicha" },
                        { value: "amount", label: "Summa bo'yicha" },
                      ]}
                    />
                  </Flex>

                  <Flex direction="column" gap={1}>
                    <span className="text-sm font-medium">Kerakli miqdor <span className="text-red-500">*</span></span>
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
              </Card>

              <Card title="Trigger mahsulotlar" gap={4}>
                <p className="text-sm text-muted-foreground">
                  Aksiya ishga tushishi uchun sotib olinadigan mahsulotlarni
                  tanlang. Har qanday mahsulot uchun bo'sh qoldiring.
                </p>
                <SearchCard placeholder="Mahsulotlarni qidirish" />
                <EmptyIllustration />
              </Card>

              <Card
                title={<>Sovg'a mahsulot <span className="text-red-500">*</span></>}
                gap={4}
              >
                <SearchCard placeholder="Sovg'a mahsulot" />
                <EmptyIllustration />
                <Input
                  label="Sovg'alar soni"
                  name="giftQty"
                  type="number"
                  defaultValue="1"
                  min="1"
                  className="w-full"
                />
              </Card>
            </Flex>

            <Flex className="col-span-1" direction="column" gap={4}>
              <Card title="Ustunlik" gap={4}>
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
              </Card>

              <Card title="Amal qilish davri" gap={4}>
                <Input
                  label="Boshlanish sanasi"
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

              <Card title="Cheklovlar" gap={4}>
                <Flex direction="column">
                  <Input
                    label="Foydalanish limiti"
                    name="usageLimit"
                    placeholder="Cheklovsiz"
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Aksiya maksimal qo'llanish soni. Cheksiz uchun bo'sh
                    qoldiring.
                  </p>
                </Flex>
                <Flex direction="column">
                  <Input
                    label="Mijoz uchun limit"
                    name="customerLimit"
                    placeholder="Cheklovsiz"
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Bitta mijoz uchun maksimal qo'llanish soni.
                  </p>
                </Flex>
              </Card>

              <Flex justify="end" gap={4}>
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
