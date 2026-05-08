import type { Customer } from "@/entities/customer/types"
import { DataTable } from "@/shared/ui/data-table/data-table"
import Flex from "@/shared/ui/flex"
import { useParams } from "react-router-dom"
import { segmentViewColumns } from "./columns"

const mockSegmentNames: Record<string, string> = {
  "1": "Uxlab yotgan (30+ kun)",
  "2": "Kamida bir marta xarid qilgan",
  "3": "Qayta xaridorlar",
  "4": "Xarid qilmagan",
  "5": "Rustilidagi",
  "6": "O'zbektilidagi",
}

const SegmentView = () => {
  const { id } = useParams<{ id: string }>()
  const name = (id && mockSegmentNames[id]) ?? "Segment"

  return (
    <Flex direction="column" className="w-full" gap={4}>
      <h1 className="text-2xl font-bold">{name}</h1>

      <DataTable<Customer, unknown>
        columns={segmentViewColumns}
        data={[]}
        noResultsTitle="Mijozlar yo'q"
        noResultsContent="Bu segmentda hali mijozlar yo'q"
      />
    </Flex>
  )
}

export default SegmentView
