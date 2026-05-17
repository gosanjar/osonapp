import { useFormContext } from "react-hook-form"
import Card from "@shared/card"
import { Input } from "@/shared/ui/input"
import { Badge } from "@/shared/ui/badge"
import { Separator } from "@/shared/ui/separator"
import { FormControl } from "@shared/form-control"
import { CheckboxInput } from "@shared/checkbox-input"
import type { ProductFormData } from "../create"

export default function InventoryCard() {
  const { watch } = useFormContext<ProductFormData>()
  const tracked = watch("track_quantity")

  return (
    <Card title="Inventar va ombor" gap={4}>
      <FormControl<ProductFormData> name="track_quantity">
        <CheckboxInput
          label="Miqdorni kuzatish"
          className="w-full rounded-lg bg-muted p-4"
        />
      </FormControl>

      {tracked ? (
        <FormControl<ProductFormData> name="quantity" label="Ombordagi miqdor">
          <Input type="number" min={0} placeholder="0" className="w-40" />
        </FormControl>
      ) : (
        <div className="flex w-full items-center justify-between gap-2 rounded-lg border bg-muted p-4">
          <p className="text-sm text-muted-foreground">Kuzatilmaydi</p>
          <Badge variant="outline">Inactive</Badge>
        </div>
      )}

      <Separator />

      <div className="grid w-full grid-cols-2 gap-4">
        <FormControl<ProductFormData> name="sku" label="SKU (Artikul)">
          <Input placeholder="MB-001" />
        </FormControl>

        <FormControl<ProductFormData> name="barcode" label="Shtrix-kod">
          <Input placeholder="EAN, UPC" />
        </FormControl>
      </div>
    </Card>
  )
}
