import Flex from "@shared/flex"
import { CancelButton, SaveButton } from "@shared/predefined"
import { FormProvider, useForm, useFieldArray } from "react-hook-form"
import Card from "@shared/card"
import { Input } from "@/shared/ui/input"
import { SelectInput } from "@shared/select-input"
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
        <Flex direction="column" gap={4}>
          <Flex justify="between" align="center">
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
              <Card title="Segment yaratish" gap={4}>
                <Flex direction="column" gap={1}>
                  <Input
                    label="Nomi *"
                    name="name"
                    placeholder="Masalan: VIP mijozlar"
                    className="w-full"
                  />
                </Flex>

                <SelectInput
                  label="Shartlar mosligi"
                  defaultValue="all"
                  options={[
                    { value: "all", label: "Barcha shartlar (VA)" },
                    { value: "any", label: "Istalgan shart (YOKI)" },
                  ]}
                />
              </Card>

              <Card title="Shartlar" gap={3}>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid w-full grid-cols-[1fr_1fr_1fr_auto] gap-2 rounded-lg border p-3"
                  >
                    <SelectInput
                      label={<span className="text-xs text-muted-foreground">Maydon</span>}
                      defaultValue={field.field}
                      options={fieldOptions}
                    />

                    <SelectInput
                      label={<span className="text-xs text-muted-foreground">Operator</span>}
                      defaultValue={field.operator}
                      options={operatorOptions}
                    />

                    <Input
                      label={<span className="text-xs text-muted-foreground">Qiymat</span>}
                      name={`conditions.${index}.value`}
                      placeholder=""
                      className="w-full"
                    />

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
              </Card>
            </Flex>

            <Flex className="col-span-1" direction="column" gap={4}>
              <Card title="general.info">
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
              </Card>
            </Flex>
          </div>
        </Flex>
      </form>
    </FormProvider>
  )
}

export default CreateSegment
