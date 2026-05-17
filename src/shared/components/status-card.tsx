import Card from "./card"
import { SelectInput } from "./select-input"
import { FormControl } from "./form-control"
import { useFormContext } from "react-hook-form"

interface StatusCardProps {
  name?: string
  description?: string
}

export default function StatusCard({
  name = "status",
  description = "Holatni belgilang.",
}: StatusCardProps) {
  const { watch } = useFormContext()
  const status = watch(name, "published")

  return (
    <Card
      title="Holat"
      action={
        <span
          className={`size-3 rounded-full ${status === "published" ? "bg-green-500" : "bg-gray-400"}`}
        />
      }
    >
      <FormControl name={name}>
        <SelectInput
          options={[
            { value: "published", label: "Faol" },
            { value: "unpublished", label: "O'chirilgan" },
          ]}
        />
      </FormControl>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </Card>
  )
}
