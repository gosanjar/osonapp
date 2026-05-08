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
import StatusCard from "@/shared/components/status-card"

export function ProductSidebar() {
  return (
    <Flex direction="column" gap={4} className="sticky top-0 w-full shrink-0">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Mahsulot tafsilotlari</CardTitle>
        </CardHeader>

        <CardContent>
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

      <StatusCard description="Mahsulot holatini belgilang." />
    </Flex>
  )
}
