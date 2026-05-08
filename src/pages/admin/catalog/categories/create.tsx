import Flex from "@/shared/ui/flex"
import { CancelButton, SaveButton } from "@/shared/ui/predefined"
import { FormProvider, useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"
import { Label } from "@/shared/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import ImageCard from "@/shared/components/image-card"
import StatusCard from "@/shared/components/status-card"

const CreateCategory = () => {
  const form = useForm()

  return (
    <FormProvider {...form}>
      <form className="w-full">
        <Flex direction="column" className="w-full" gap={4}>
          <Flex justify="between" align="center" className="w-full">
            <Flex direction="column" gap={0}>
              <h1 className="text-2xl font-bold">Kategoriya qo'shish</h1>
              <span className="text-sm text-muted-foreground">
                Kategoriya tafsilotlarini to'ldiring
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
                  <CardTitle>Umumiy</CardTitle>
                </CardHeader>
                <CardContent>
                  <Flex direction="column" gap={4} className="w-full">
                    <Flex direction="column" gap={1} className="w-full">
                      <Input
                        label="Kategoriya nomi *"
                        name="title"
                        placeholder="Kategoriya"
                        className="w-full"
                      />
                      <p className="text-muted-foreground text-xs">
                        Kategoriya nomi majburiy va birgalikda uni xususiy
                        qilish maslahat beriladi.
                      </p>
                    </Flex>

                    <Flex direction="column" gap={1} className="w-full">
                      <Label>Ta'rif</Label>
                      <Textarea
                        name="body_html"
                        placeholder="Ta'rif"
                        rows={6}
                        className="w-full"
                      />
                      <p className="text-muted-foreground text-xs">
                        Kategoriya tavsifi yaxshi ko'rinish uchun belgilanadi.
                      </p>
                    </Flex>

                    <Flex direction="column" gap={1} className="w-full">
                      <Label>Yuqori kategoriya</Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Yuqori kategoriyani tanlang" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Yo'q</SelectItem>
                        </SelectContent>
                      </Select>
                    </Flex>
                  </Flex>
                </CardContent>
              </Card>

              <Flex justify="end" gap={3}>
                <CancelButton />
                <SaveButton />
              </Flex>
            </Flex>

            <Flex className="col-span-1" direction="column" gap={4}>
              <ImageCard />
              <StatusCard description="Kategoriya holatini belgilang." />
            </Flex>
          </div>
        </Flex>
      </form>
    </FormProvider>
  )
}

export default CreateCategory
