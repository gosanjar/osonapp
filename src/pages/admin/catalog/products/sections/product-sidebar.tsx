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
import { Separator } from "@/shared/ui/separator"
import Flex from "@/shared/ui/flex"
import { AddButton } from "@/shared/ui/predefined"

export function ProductSidebar() {
  return (
    <Flex direction="column" gap={4} className="sticky top-0 w-full shrink-0">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Mahsulot tafsilotlari</CardTitle>
        </CardHeader>

        <CardContent className="">
          <Flex direction="column" gap={4}>
            <Input label="Mahsulot turi" placeholder="Masalan: Kiyim" />
            <Input label="Brend" placeholder="Masalan: Nike" />

            <Separator />

            <Flex direction="column" className="w-full">
              <Label>Toifalar</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Toifalarni tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clothes">Kiyim</SelectItem>
                  <SelectItem value="electronics">Elektronika</SelectItem>
                  <SelectItem value="food">Oziq-ovqat</SelectItem>
                </SelectContent>
              </Select>
            </Flex>

            <Flex className="w-full" align="end">
              <Input label="Teglar" placeholder="Teg qo'shish..." />
              <AddButton size="default" />
            </Flex>
          </Flex>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Nashr holati</CardTitle>
        </CardHeader>

        <CardContent className="">
          <Flex direction="column" gap={4}>
            <Select defaultValue="ACTIVE">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Faol</SelectItem>
                <SelectItem value="DRAFT">Qoralama</SelectItem>
              </SelectContent>
            </Select>

            <Flex
              align="center"
              className="h-8 w-full rounded-lg border bg-muted px-2"
            >
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
              <p className="text-sm font-medium">Faol va do'konda ko'rinadi</p>
            </Flex>
          </Flex>
        </CardContent>
      </Card>
    </Flex>
  )
}
