import Flex from "@shared/flex"
import AddButton from "@shared/predefined/add-button"
import StatusBadge from "@shared/status-badge"
import { Button } from "@/shared/ui/button"
import { Eye, Pencil, Filter, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/shared/config/routes"

type Segment = {
  id: string
  name: string
  type: "Tizimli" | "Qo'lda"
  conditions: number
  customers: number
}

const mockSegments: Segment[] = [
  {
    id: "1",
    name: "Uxlab yotgan (30+ kun)",
    type: "Tizimli",
    conditions: 1,
    customers: 0,
  },
  {
    id: "2",
    name: "Kamida bir marta xarid qilgan",
    type: "Tizimli",
    conditions: 1,
    customers: 0,
  },
  {
    id: "3",
    name: "Qayta xaridorlar",
    type: "Tizimli",
    conditions: 1,
    customers: 0,
  },
  {
    id: "4",
    name: "Xarid qilmagan",
    type: "Tizimli",
    conditions: 1,
    customers: 0,
  },
  {
    id: "5",
    name: "Rustilidagi",
    type: "Tizimli",
    conditions: 1,
    customers: 0,
  },
  {
    id: "6",
    name: "O'zbektilidagi",
    type: "Tizimli",
    conditions: 1,
    customers: 0,
  },
]

const Segments = () => {
  const navigate = useNavigate()

  return (
    <Flex direction="column" gap={4}>
      <Flex justify="between" align="center">
        <h1 className="text-2xl font-bold">Segmentlar</h1>
        <AddButton to={ROUTES.CUSTOMERS_SEGMENTS_CREATE} />
      </Flex>

      <div className="w-full divide-y rounded-lg border bg-card">
        {mockSegments.map((segment) => (
          <Flex
            key={segment.id}
            align="center"
            justify="between"
            className="px-4 py-3"
          >
            <Flex align="center" gap={3}>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Users size={18} className="text-muted-foreground" />
              </div>
              <Flex direction="column" gap={0}>
                <Flex align="center" gap={2}>
                  <span className="font-semibold">{segment.name}</span>
                  <StatusBadge label={segment.type} variant="purple" />
                </Flex>
                <Flex
                  align="center"
                  gap={3}
                  className="mt-0.5 text-xs text-muted-foreground"
                >
                  <Flex align="center" gap={1}>
                    <Filter size={11} />
                    <span>Shartlar: {segment.conditions}</span>
                  </Flex>
                  <Flex align="center" gap={1}>
                    <Users size={11} />
                    <span>Segmentdagi mijozlar: {segment.customers}</span>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            <Flex gap={1}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(`/customers/segments/${segment.id}`)}
              >
                <Eye size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(ROUTES.CUSTOMERS_SEGMENTS_CREATE)}
              >
                <Pencil size={16} />
              </Button>
            </Flex>
          </Flex>
        ))}
      </div>
    </Flex>
  )
}

export default Segments
