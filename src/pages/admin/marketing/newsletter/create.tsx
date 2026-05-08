import Flex from "@/shared/ui/flex"
import { CancelButton, SaveButton } from "@/shared/ui/predefined"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Textarea } from "@/shared/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { Search, Users, Check, Loader } from "lucide-react"
import { useState } from "react"
import { cn } from "@utils/utils"

type Lang = "RU" | "UZ"

const CreateNewsletter = () => {
  const form = useForm({
    defaultValues: {
      textRu: "",
      textUz: "",
      type: "text",
      segment: "all",
      date: new Date().toISOString().slice(0, 16),
    },
  })

  const [previewLang, setPreviewLang] = useState<Lang>("RU")
  const textRu = useWatch({ control: form.control, name: "textRu" })
  const textUz = useWatch({ control: form.control, name: "textUz" })
  const previewText = previewLang === "RU" ? textRu : textUz

  return (
    <FormProvider {...form}>
      <form className="w-full">
        <Flex direction="column" className="w-full" gap={4}>
          <Flex justify="between" align="center" className="w-full">
            <h1 className="text-2xl font-bold">SMS yuborish</h1>
            <Flex>
              <CancelButton />
              <SaveButton>Axborot byulletenini ishga tushurish</SaveButton>
            </Flex>
          </Flex>

          <hr className="w-full" />

          <div className="grid w-full grid-cols-3 gap-4">
            <Flex className="col-span-2" direction="column" gap={4}>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Sms matni</CardTitle>
                </CardHeader>
                <CardContent>
                  <Flex direction="column" gap={4} className="w-full">
                    <Flex direction="column" className="w-full">
                      <Label>
                        Rus tilidagi matn{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative w-full">
                        <Textarea
                          {...form.register("textRu")}
                          rows={6}
                          maxLength={1000}
                          className="w-full resize-none"
                        />
                        <span className="absolute right-3 bottom-2 text-xs text-muted-foreground">
                          {textRu.length} / 1000
                        </span>
                      </div>
                    </Flex>

                    <Flex direction="column" className="w-full">
                      <Label>
                        O`zbek tilida matn{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative w-full">
                        <Textarea
                          {...form.register("textUz")}
                          rows={6}
                          maxLength={1000}
                          className="w-full resize-none"
                        />
                        <span className="absolute right-3 bottom-2 text-xs text-muted-foreground">
                          {textUz.length} / 1000
                        </span>
                      </div>
                    </Flex>
                  </Flex>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Turi</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select defaultValue="text">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Matn</SelectItem>
                      <SelectItem value="image">Rasm</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Mahsulotlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Flex direction="column" gap={4} className="w-full">
                    <div className="relative w-full">
                      <Search
                        size={15}
                        className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        name="productSearch"
                        placeholder="Mahsulotlarni qidirish"
                        className="w-full pl-9"
                      />
                    </div>
                    <Flex
                      direction="column"
                      align="center"
                      className="w-full py-4"
                    >
                      <img
                        src="/illustrations/1.svg"
                        alt=""
                        className="h-36 opacity-70"
                      />
                    </Flex>
                  </Flex>
                </CardContent>
              </Card>
            </Flex>

            <Flex className="col-span-1" direction="column" gap={4}>
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

              <Card className="w-full overflow-hidden">
                <CardHeader>
                  <Flex justify="between" align="center" className="w-full">
                    <CardTitle>Oldindan ko'rish</CardTitle>
                    <div className="flex overflow-hidden rounded-md border">
                      {(["RU", "UZ"] as Lang[]).map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setPreviewLang(lang)}
                          className={cn(
                            "px-3 py-1 text-xs font-medium transition-colors",
                            previewLang === lang
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </Flex>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="min-h-48 w-full rounded-b-lg bg-[#1e2235] p-4">
                    <Flex align="center" gap={2} className="mb-4">
                      <div className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        B
                      </div>
                      <span className="text-sm font-medium text-white">
                        Bot
                      </span>
                    </Flex>
                    {previewText ? (
                      <div className="max-w-[80%] rounded-lg rounded-tl-none bg-white/10 p-3 text-sm text-white">
                        {previewText}
                      </div>
                    ) : (
                      <p className="mt-8 text-center text-xs text-white/40">
                        Oldindan ko'rish uchun matn kiriting
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader>
                  <CardTitle>general.info</CardTitle>
                </CardHeader>
                <CardContent>
                  <Flex direction="column" gap={4} className="w-full">
                    <Flex align="center" gap={3}>
                      <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                        <Users size={15} className="text-muted-foreground" />
                      </div>
                      <Flex direction="column" gap={0}>
                        <span className="text-sm font-medium">
                          Mijozlar soni
                        </span>
                        <span className="text-sm text-muted-foreground">0</span>
                      </Flex>
                    </Flex>
                    <Flex align="center" gap={3}>
                      <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                        <Check size={15} className="text-muted-foreground" />
                      </div>
                      <Flex direction="column" gap={0}>
                        <span className="text-sm font-medium">Jo`natilgan</span>
                        <span className="text-sm text-muted-foreground">0</span>
                      </Flex>
                    </Flex>
                    <Flex align="center" gap={3}>
                      <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                        <Loader size={15} className="text-muted-foreground" />
                      </div>
                      <Flex direction="column" gap={0}>
                        <span className="text-sm font-medium">Kutilmoqda</span>
                        <span className="text-sm text-muted-foreground">0</span>
                      </Flex>
                    </Flex>
                  </Flex>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Sana</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    {...form.register("date")}
                    type="datetime-local"
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

export default CreateNewsletter
