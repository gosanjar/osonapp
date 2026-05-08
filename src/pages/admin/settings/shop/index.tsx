import { useState } from "react"
import { useForm } from "react-hook-form"
import Flex from "@/shared/ui/flex"
import { Card, CardContent } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { SaveButton } from "@/shared/ui/predefined"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { Store, Languages, CircleDollarSign } from "lucide-react"

const TABS = [
  { id: "location", label: "Do'kon manzili", icon: Store },
  { id: "language", label: "Til sozlamalari", icon: Languages },
  { id: "installment", label: "Bo'lib to'lash", icon: CircleDollarSign },
] as const

type TabId = (typeof TABS)[number]["id"]

function LocationTab() {
  return (
    <Flex direction="column" className="w-full">
      <div className="grid w-full grid-cols-3 gap-4">
        <Flex direction="column" className="w-full">
          <Label>Ish vaqti</Label>
          <Select defaultValue="everyday">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="everyday">Har kuni</SelectItem>
              <SelectItem value="weekdays">Ish kunlari</SelectItem>
              <SelectItem value="custom">Maxsus</SelectItem>
            </SelectContent>
          </Select>
        </Flex>

        <Flex direction="column" className="w-full">
          <Label>Dan</Label>
          <Input type="time" className="w-full" />
        </Flex>

        <Flex direction="column" className="w-full">
          <Label>Gacha</Label>
          <Input type="time" className="w-full" />
        </Flex>
      </div>

      <Flex direction="column" className="w-full">
        <Label>Manzil:</Label>
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
    <Flex direction="column" className="w-full">
      <h2 className="text-xl font-bold">Til sozlamalari</h2>

      <div className="grid w-full grid-cols-2 gap-4">
        <Flex direction="column" className="w-full">
          <Flex align="center">
            <Label>Asosiy til</Label>
            <span className="text-destructive">*</span>
          </Flex>
          <Select defaultValue="uz">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uz">O'zbekcha - Узбекский</SelectItem>
              <SelectItem value="ru">Русский</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </Flex>

        <Flex direction="column" className="w-full">
          <Flex align="center">
            <Label>Valyuta</Label>
            <span className="text-destructive">*</span>
          </Flex>
          <Select defaultValue="uzs">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uzs">O'zbek sum</SelectItem>
              <SelectItem value="usd">US Dollar</SelectItem>
              <SelectItem value="rub">Российский рубль</SelectItem>
            </SelectContent>
          </Select>
        </Flex>
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
    <Flex direction="column" className="w-full">
      <h2 className="text-xl font-bold">Bo'lib to'lashni sozlash</h2>

      <Flex direction="column" className="w-full">
        <Flex align="center">
          <Label>Nomi</Label>
          <span className="text-destructive">*</span>
        </Flex>
        <Input {...form.register("name")} className="w-full" />
      </Flex>

      <div className="grid w-full grid-cols-2 gap-4">
        <Flex direction="column" className="w-full">
          <Flex align="center">
            <Label>3 oyga</Label>
            <span className="text-destructive">*</span>
          </Flex>
          <Input {...form.register("m3")} className="w-full" />
        </Flex>

        <Flex direction="column" className="w-full">
          <Flex align="center">
            <Label>6 oyga</Label>
            <span className="text-destructive">*</span>
          </Flex>
          <Input {...form.register("m6")} className="w-full" />
        </Flex>

        <Flex direction="column" className="w-full">
          <Flex align="center">
            <Label>9 oyga</Label>
            <span className="text-destructive">*</span>
          </Flex>
          <Input {...form.register("m9")} className="w-full" />
        </Flex>

        <Flex direction="column" className="w-full">
          <Flex align="center">
            <Label>12 oyga</Label>
            <span className="text-destructive">*</span>
          </Flex>
          <Input {...form.register("m12")} className="w-full" />
        </Flex>
      </div>

      <Flex direction="column" className="w-full">
        <Flex align="center">
          <Label>Status</Label>
          <span className="text-destructive">*</span>
        </Flex>
        <Select defaultValue="active">
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Faol</SelectItem>
            <SelectItem value="inactive">Nofaol</SelectItem>
          </SelectContent>
        </Select>
      </Flex>

      <Flex justify="end" className="w-full">
        <SaveButton />
      </Flex>
    </Flex>
  )
}

const ShopSettings = () => {
  const [activeTab, setActiveTab] = useState<TabId>("location")

  return (
    <Flex direction="column" className="w-full">
      <Card className="w-full">
        <CardContent>
          <Flex direction="column" className="w-full">
            <Flex align="center" gap={2} className="w-full border-b pb-4">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </Flex>

            {activeTab === "location" && <LocationTab />}
            {activeTab === "language" && <LanguageTab />}
            {activeTab === "installment" && <InstallmentTab />}
          </Flex>
        </CardContent>
      </Card>
    </Flex>
  )
}

export default ShopSettings
