import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import Flex from "@/shared/ui/flex"
import { Controller, useFormContext } from "react-hook-form"

interface StatusCardProps {
  name?: string
  description?: string
}

export default function StatusCard({
  name = "status",
  description = "Holatni belgilang.",
}: StatusCardProps) {
  const { control, watch } = useFormContext()
  const status = watch(name, "published")

  return (
    <Card className="w-full">
      <CardHeader>
        <Flex align="center" justify="between" className="w-full">
          <CardTitle>Holat</CardTitle>
          <span
            className={`size-3 rounded-full ${status === "published" ? "bg-green-500" : "bg-gray-400"}`}
          />
        </Flex>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <Controller
          control={control}
          name={name}
          defaultValue="published"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Faol</SelectItem>
                <SelectItem value="unpublished">O'chirilgan</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <p className="text-muted-foreground text-xs mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}
