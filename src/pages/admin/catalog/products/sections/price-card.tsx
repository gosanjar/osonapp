import { useMemo } from "react"
import { useFormContext } from "react-hook-form"
import Card from "@shared/card"
import { Input } from "@/shared/ui/input"
import { Separator } from "@/shared/ui/separator"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/shared/ui/input-group"
import { FormControl } from "@shared/form-control"
import Flex from "@shared/flex"
import type { ProductFormData } from "../create"

export default function PriceCard() {
  const { watch } = useFormContext<ProductFormData>()
  const price = Number(watch("price")) || 0
  const cost = Number(watch("cost")) || 0

  const profit = useMemo(() => price - cost, [price, cost])
  const margin = useMemo(() => (price ? (profit / price) * 100 : 0), [profit, price])

  return (
    <Card title="Narxlar" gap={4}>
      <div className="grid w-full grid-cols-2 gap-4">
        <FormControl<ProductFormData> name="price" label="Sotuv narxi" required>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>UZS</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput type="number" placeholder="0" />
          </InputGroup>
        </FormControl>

        <FormControl<ProductFormData> name="compare_price" label="Solishtirish narxi">
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>UZS</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput type="number" placeholder="0" />
          </InputGroup>
        </FormControl>
      </div>

      <Separator />

      <div className="grid w-full grid-cols-3 gap-4">
        <FormControl<ProductFormData> name="cost" label="Tannarx">
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>UZS</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput type="number" placeholder="0" />
          </InputGroup>
        </FormControl>

        <Flex direction="column" gap={1}>
          <span className="text-sm font-medium">Foyda</span>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>UZS</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput value={profit.toLocaleString()} disabled />
          </InputGroup>
          <p className="text-xs text-muted-foreground">
            {profit >= 0 ? "Ijobiy" : "Salbiy"}
          </p>
        </Flex>

        <Flex direction="column" gap={1}>
          <span className="text-sm font-medium">Marja</span>
          <Input value={`${margin.toFixed(0)}%`} disabled />
          <p className="text-xs text-muted-foreground">
            {margin >= 50 ? "Rentabel" : "Oddiy"}
          </p>
        </Flex>
      </div>
    </Card>
  )
}
