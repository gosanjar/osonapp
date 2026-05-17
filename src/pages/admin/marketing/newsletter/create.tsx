import Flex from "@shared/flex"
import { CancelButton, SaveButton } from "@shared/predefined"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import Card from "@shared/card"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"
import { SelectInput } from "@shared/select-input"
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
        <Flex direction="column" gap={4}>
          <Flex justify="between" align="center">
            <h1 className="text-2xl font-bold">SMS yuborish</h1>
            <Flex>
              <CancelButton />
              <SaveButton>Axborot byulletenini ishga tushurish</SaveButton>
            </Flex>
          </Flex>

          <hr className="w-full" />

          <div className="grid w-full grid-cols-3 gap-4">
            <Flex className="col-span-2" direction="column" gap={4}>
              <Card title="Sms matni" gap={4}>
                <Flex direction="column">
                  <p className="text-sm font-medium">Rus tilidagi matn <span className="text-red-500">*</span></p>
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

                <Flex direction="column">
                  <p className="text-sm font-medium">O`zbek tilida matn <span className="text-red-500">*</span></p>
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
              </Card>

              <Card title="Turi">
                <SelectInput
                  defaultValue="text"
                  options={[
                    { value: "text", label: "Matn" },
                    { value: "image", label: "Rasm" },
                    { value: "video", label: "Video" },
                  ]}
                />
              </Card>

              <Card title="Mahsulotlar" gap={4}>
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
                  className="py-4"
                >
                  <img
                    src="/illustrations/1.svg"
                    alt=""
                    className="h-36 opacity-70"
                  />
                </Flex>
              </Card>
            </Flex>

            <Flex className="col-span-1" direction="column" gap={4}>
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

              <Card
                className="overflow-hidden"
                title="Oldindan ko'rish"
                action={
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
                }
                contentClassName="p-0"
              >
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
              </Card>

              <Card title="general.info" gap={4}>
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
              </Card>

              <Card title="Sana">
                <Input
                  {...form.register("date")}
                  type="datetime-local"
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

export default CreateNewsletter
