import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Checkbox } from "@/shared/ui/checkbox"
import { Separator } from "@/shared/ui/separator"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/shared/ui/input-group"
import Flex from "@/shared/ui/flex"

export default function PriceCard() {
  const [sale, setSale] = useState(0)
  const [cost, setCost] = useState(0)
  const [tax, setTax] = useState(false)

  const profit = useMemo(() => sale - cost, [sale, cost])

  const margin = useMemo(() => {
    if (!sale) return 0
    return (profit / sale) * 100
  }, [profit, sale])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Narxlar</CardTitle>
      </CardHeader>

      <CardContent>
        <Flex className="w-full" direction="column" gap={4}>
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <Flex direction="column">
              <Label>Sotuv narxi</Label>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>UZS</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  value={sale}
                  onChange={(e) => setSale(Number(e.target.value))}
                  placeholder="0.00"
                />
              </InputGroup>
            </Flex>

            <Flex direction="column">
              <Label>Solishtirish narxi</Label>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>UZS</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput placeholder="0.00" />
              </InputGroup>
            </Flex>
          </div>

          <div className="flex w-full items-center gap-2 rounded-md bg-muted p-3">
            <Checkbox checked={tax} onCheckedChange={(v) => setTax(!!v)} />
            <Label>Ushbu mahsulotdan soliq undirish</Label>
          </div>

          <Separator />

          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            <Flex direction="column">
              <Label>Tannarx</Label>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>UZS</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  value={cost}
                  onChange={(e) => setCost(Number(e.target.value))}
                  placeholder="0.00"
                />
              </InputGroup>
            </Flex>

            <Flex direction="column">
              <Label>Foyda</Label>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>UZS</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput value={profit} disabled />
              </InputGroup>
              <p className="text-xs text-muted-foreground">
                {profit > 0 ? "Ijobiy" : "Salbiy"}
              </p>
            </Flex>

            <Flex direction="column">
              <Label>Marja</Label>
              <Input value={`${margin.toFixed(0)}%`} disabled />
              <p className="text-xs text-muted-foreground">
                {margin > 50 ? "Rentabel" : "Oddiy"}
              </p>
            </Flex>
          </div>
        </Flex>
      </CardContent>
    </Card>
  )
}
