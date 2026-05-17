import { useState } from "react"
import { useForm } from "react-hook-form"
import Flex from "@shared/flex"
import Card from "@shared/card"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { SaveButton } from "@shared/predefined"
import { SelectInput } from "@shared/select-input"
import { Store, Languages, CircleDollarSign } from "lucide-react"

const TABS = [
  { id: "location", label: "Do'kon manzili", icon: Store },
  { id: "language", label: "Til sozlamalari", icon: Languages },
  { id: "installment", label: "Bo'lib to'lash", icon: CircleDollarSign },
] as const

type TabId = (typeof TABS)[number]["id"]

function LocationTab() {
  return (
    <Flex direction="column">
      <div className="grid w-full grid-cols-3 gap-4">
        <SelectInput
          label="Ish vaqti"
          defaultValue="everyday"
          options={[
            { value: "everyday", label: "Har kuni" },
            { value: "weekdays", label: "Ish kunlari" },
            { value: "custom", label: "Maxsus" },
          ]}
        />

        <Input label="Dan" type="time" className="w-full" />

        <Input label="Gacha" type="time" className="w-full" />
      </div>

      <Flex direction="column">
        <p className="text-sm font-medium">Manzil:</p>
        <div className="w-full overflow-hidden rounded-md border">
          <iframe
            src="https://yandex.uz/map-widget/v1/?ll=69.279737%2C41.299496&z=14&pt=69.279737,41.299496,pm2bl"
            width="100%"
            height="480"
            frameBorder="0"
            allowFullScreen
            title="Yandex Maps"
          />
        </div>
      </Flex>
    </Flex>
  )
}

function LanguageTab() {
  return (
    <Flex direction="column">
      <h2 className="text-xl font-bold">Til sozlamalari</h2>

      <div className="grid w-full grid-cols-2 gap-4">
        <SelectInput
          label={<>Asosiy til <span className="text-destructive">*</span></>}
          defaultValue="uz"
          options={[
            { value: "uz", label: "O'zbekcha - Узбекский" },
            { value: "ru", label: "Русский" },
            { value: "en", label: "English" },
          ]}
        />

        <SelectInput
          label={<>Valyuta <span className="text-destructive">*</span></>}
          defaultValue="uzs"
          options={[
            { value: "uzs", label: "O'zbek sum" },
            { value: "usd", label: "US Dollar" },
            { value: "rub", label: "Российский рубль" },
          ]}
        />
      </div>
    </Flex>
  )
}

function InstallmentTab() {
  const form = useForm({
    defaultValues: {
      name: "",
      m3: "",
      m6: "",
      m9: "",
      m12: "",
      status: "active",
    },
  })

  return (
    <Flex direction="column">
      <h2 className="text-xl font-bold">Bo'lib to'lashni sozlash</h2>

      <Input
        label={<>Nomi <span className="text-destructive">*</span></>}
        {...form.register("name")}
        className="w-full"
      />

      <div className="grid w-full grid-cols-2 gap-4">
        <Input
          label={<>3 oyga <span className="text-destructive">*</span></>}
          {...form.register("m3")}
          className="w-full"
        />

        <Input
          label={<>6 oyga <span className="text-destructive">*</span></>}
          {...form.register("m6")}
          className="w-full"
        />

        <Input
          label={<>9 oyga <span className="text-destructive">*</span></>}
          {...form.register("m9")}
          className="w-full"
        />

        <Input
          label={<>12 oyga <span className="text-destructive">*</span></>}
          {...form.register("m12")}
          className="w-full"
        />
      </div>

      <SelectInput
        label={<>Status <span className="text-destructive">*</span></>}
        defaultValue="active"
        options={[
          { value: "active", label: "Faol" },
          { value: "inactive", label: "Nofaol" },
        ]}
      />

      <Flex justify="end">
        <SaveButton />
      </Flex>
    </Flex>
  )
}

const ShopSettings = () => {
  const [activeTab, setActiveTab] = useState<TabId>("location")

  return (
    <Flex direction="column">
      <Card>
        <Flex direction="column">
          <Flex align="center" gap={2} className="border-b pb-4">
            {TABS.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                type="button"
                variant="ghost"
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={15} />
                {label}
              </Button>
            ))}
          </Flex>

          {activeTab === "location" && <LocationTab />}
          {activeTab === "language" && <LanguageTab />}
          {activeTab === "installment" && <InstallmentTab />}
        </Flex>
      </Card>
    </Flex>
  )
}

export default ShopSettings
