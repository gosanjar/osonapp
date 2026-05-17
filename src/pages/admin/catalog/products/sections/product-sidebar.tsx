import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { CategoriesApi } from "@/entities/catalog/api"
import Card from "@shared/card"
import { Input } from "@/shared/ui/input"
import { Badge } from "@/shared/ui/badge"
import { Separator } from "@/shared/ui/separator"
import { SelectInput } from "@shared/select-input"
import { FormControl } from "@shared/form-control"
import { CheckboxInput } from "@shared/checkbox-input"
import { Button } from "@/shared/ui/button"
import { X } from "lucide-react"
import Flex from "@shared/flex"
import StatusCard from "@shared/status-card"
import type { ProductFormData } from "../create"

export function ProductSidebar() {
  const { watch, setValue } = useFormContext<ProductFormData>()
  const tags = watch("tags") ?? []
  const [tagInput, setTagInput] = useState("")

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoriesApi.list(),
  })
  const categories = categoriesData?.data?.results ?? []

  const addTag = () => {
    const val = tagInput.trim()
    if (val && !tags.includes(val)) {
      setValue("tags", [...tags, val])
    }
    setTagInput("")
  }

  const removeTag = (tag: string) => {
    setValue(
      "tags",
      tags.filter((t) => t !== tag)
    )
  }

  return (
    <Flex direction="column" gap={4} className="sticky top-0 shrink-0">
      <Card title="Mahsulot tafsilotlari" gap={4}>
        <FormControl<ProductFormData> name="category" label="Toifa">
          <SelectInput
            placeholder="Toifani tanlang"
            options={[
              { value: "a", label: "Toifsiz" },
              ...categories.map((c) => ({
                value: String(c.id),
                label: c.name.uz,
              })),
            ]}
          />
        </FormControl>

        <Separator />

        <Flex direction="column" gap={2}>
          <p className="text-sm font-medium">Teglar</p>
          <Flex gap={2}>
            <Input
              placeholder="Teg qo'shish..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTag())
              }
            />
            <Button type="button" variant="outline" onClick={addTag}>
              +
            </Button>
          </Flex>
          {tags.length > 0 && (
            <Flex gap={1} wrap="wrap">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <X
                    size={10}
                    className="cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </Flex>
          )}
        </Flex>

        <Separator />

        <FormControl<ProductFormData> name="is_trend">
          <CheckboxInput label="Trend mahsulot" />
        </FormControl>
      </Card>

      <StatusCard description="Mahsulot holatini belgilang." />
    </Flex>
  )
}
