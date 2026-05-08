import Flex from "@/shared/ui/flex"
import { CancelButton, SaveButton } from "@/shared/ui/predefined"
import { FormProvider, useForm, useFieldArray } from "react-hook-form"
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
import { Button } from "@/shared/ui/button"
import { Plus, Trash2, Users } from "lucide-react"

const fieldOptions = [
  { value: "orders_count", label: "Buyurtmalar soni" },
  { value: "orders_total", label: "Buyurtmalar summasi" },
  { value: "last_order_days", label: "Oxirgi buyurtmadan beri kunlar" },
  { value: "language", label: "Til" },
]

const operatorOptions = [
  { value: "gte", label: "katta yoki teng" },
  { value: "lte", label: "kichik yoki teng" },
  { value: "eq", label: "teng" },
  { value: "gt", label: "katta" },
  { value: "lt", label: "kichik" },
]

type ConditionRow = { field: string; operator: string; value: string }
type FormValues = { name: string; match: string; conditions: ConditionRow[] }

const CreateSegment = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      match: "all",
      conditions: [{ field: "orders_count", operator: "gte", value: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "conditions",
  })

  return (
    <FormProvider {...form}>
      <form className="w-full">
        <Flex direction="column" className="w-full" gap={4}>
          <Flex justify="between" align="center" className="w-full">
            <Flex direction="column" gap={0}>
              <h1 className="text-2xl font-bold">Segment yaratish</h1>
              <span className="text-sm text-muted-foreground">
                Segment tafsilotlarini to'ldiring
              </span>
            </Flex>
            <Flex>
              <CancelButton />
              <SaveButton />
            </Flex>
          </Flex>

          <hr className="w-full" />

          <div className="grid w-full grid-cols-3 gap-4">
            <Flex className="col-span-2" direction="column" gap={4}>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Segment yaratish</CardTitle>
                </CardHeader>
                <CardContent>
                  <Flex direction="column" gap={4} className="w-full">
                    <Flex direction="column" gap={1} className="w-full">
                      <Input
                        label="Nomi *"
                        name="name"
                        placeholder="Masalan: VIP mijozlar"
                        className="w-full"
                      />
                    </Flex>

                    <Flex direction="column" gap={1} className="w-full">
                      <Label>Shartlar mosligi</Label>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">
                            Barcha shartlar (VA)
                          </SelectItem>
                          <SelectItem value="any">
                            Istalgan shart (YOKI)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </Flex>
                  </Flex>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Shartlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Flex direction="column" gap={3} className="w-full">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid w-full grid-cols-[1fr_1fr_1fr_auto] gap-2 rounded-lg border p-3"
                      >
                        <Flex direction="column" gap={1}>
                          <Label className="text-xs text-muted-foreground">
                            Maydon
                          </Label>
                          <Select defaultValue={field.field}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {fieldOptions.map((o) => (
                                <SelectItem key={o.value} value={o.value}>
                                  {o.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Flex>

                        <Flex direction="column" gap={1}>
                          <Label className="text-xs text-muted-foreground">
                            Operator
                          </Label>
                          <Select defaultValue={field.operator}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {operatorOptions.map((o) => (
                                <SelectItem key={o.value} value={o.value}>
                                  {o.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Flex>

                        <Flex direction="column" gap={1}>
                          <Label className="text-xs text-muted-foreground">
                            Qiymat
                          </Label>
                          <Input
                            name={`conditions.${index}.value`}
                            placeholder=""
                            className="w-full"
                          />
                        </Flex>

                        <Flex align="end" className="pb-0.5">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            disabled={fields.length === 1}
                          >
                            <Trash2
                              size={16}
                              className="text-muted-foreground"
                            />
                          </Button>
                        </Flex>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        append({
                          field: "orders_count",
                          operator: "gte",
                          value: "",
                        })
                      }
                    >
                      <Plus size={16} />
                      Shart qo'shish
                    </Button>
                  </Flex>
                </CardContent>
              </Card>
            </Flex>

            <Flex className="col-span-1" direction="column" gap={4}>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>general.info</CardTitle>
                </CardHeader>
                <CardContent>
                  <Flex align="center" gap={3}>
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Users size={18} className="text-muted-foreground" />
                    </div>
                    <Flex direction="column" gap={0}>
                      <span className="text-sm font-medium">
                        Segmentdagi mijozlar
                      </span>
                      <span className="text-sm text-muted-foreground">0</span>
                    </Flex>
                  </Flex>
                </CardContent>
              </Card>
            </Flex>
          </div>
        </Flex>
      </form>
    </FormProvider>
  )
}

export default CreateSegment
