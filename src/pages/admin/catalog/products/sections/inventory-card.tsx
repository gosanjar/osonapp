import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Checkbox } from "@/shared/ui/checkbox"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Badge } from "@/shared/ui/badge"
import Flex from "@/shared/ui/flex"
import { Separator } from "@/shared/ui/separator"

export default function InventoryCard() {
  const [tracked, setTracked] = useState(false)
  const [hasSku, setHasSku] = useState(false)

  const [qty, setQty] = useState(0)
  const [sku, setSku] = useState("")
  const [barcode, setBarcode] = useState("")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Inventar va ombor</CardTitle>
      </CardHeader>

      <CardContent>
        <Flex direction="column" className="w-full" gap={4}>
          <div className="flex w-full items-center gap-2 rounded-lg bg-muted p-4">
            <Checkbox
              checked={tracked}
              onCheckedChange={(v) => setTracked(!!v)}
            />
            <Label>Miqdorni kuzatish</Label>
          </div>

          {tracked && (
            <Flex direction="column" className="w-full">
              <Flex direction="column" className="w-full">
                <h3 className="font-semibold">Ombordagi miqdor</h3>

                <div className="flex w-full items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">Asosiy ombor</p>
                    <p className="text-xs text-muted-foreground">
                      Hisobga olinadi
                    </p>
                  </div>

                  <Input
                    type="number"
                    min={0}
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    width={128}
                  />
                </div>
              </Flex>
            </Flex>
          )}

          {!tracked && (
            <div className="flex w-full items-center justify-between gap-2 rounded-lg border bg-muted p-4">
              <p className="text-sm text-muted-foreground">Kuzatilmaydi</p>

              <Badge variant="outline">Inactive</Badge>
            </div>
          )}

          <Separator />

          <Flex direction="column" className="w-full">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={hasSku}
                onCheckedChange={(v) => setHasSku(!!v)}
              />
              <Label>SKU yoki shtrix-kod mavjud</Label>
            </div>
          </Flex>

          {hasSku && (
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              <Flex direction="column">
                <Label>SKU (Artikul)</Label>
                <Input
                  placeholder="MB-001"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                />
              </Flex>

              <Flex direction="column">
                <Label>Shtrix-kod</Label>
                <Input
                  placeholder="EAN, UPC"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                />
              </Flex>
            </div>
          )}
        </Flex>
      </CardContent>
    </Card>
  )
}
