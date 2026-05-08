import Flex from "@/shared/ui/flex"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { DataTable } from "@/shared/ui/data-table/data-table"
import {
  noResultColumns,
  searchColumns,
  type NoResultRow,
  type SearchRow,
} from "./columns"

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  time: `2026-05-08 ${String(i * 2).padStart(2, "0")}:00`,
  value: 0,
}))

const statCards = [
  { label: "Jami qidiruvlar", value: "0" },
  { label: "Noyob so'rovlar", value: "0" },
  { label: "O'rtacha natija/qidiruv", value: "0" },
  { label: "Natijalarsiz qidiruvlar", value: "0", sub: "0%" },
]

const noResultData: NoResultRow[] = []
const searchData: SearchRow[] = []

const SearchAnalytics = () => {
  return (
    <Flex direction="column" className="w-full" gap={4}>
      <h1 className="text-2xl font-bold">Qidirish bo'yicha analitika</h1>

      <Card className="w-full">
        <CardContent className="pt-4">
          <Flex
            align="center"
            gap={0}
            className="w-full overflow-hidden rounded-md border"
          >
            <div className="shrink-0 border-r bg-muted px-4 py-2 text-sm font-medium">
              Sanani tanlang
            </div>
            <Input
              name="dateRange"
              type="date"
              className="border-0 shadow-none focus-visible:ring-0"
            />
          </Flex>
        </CardContent>
      </Card>

      <div className="grid grid-cols-4 gap-4">
        {statCards.map((s) => (
          <Card key={s.label} className="w-full">
            <CardContent className="pt-4">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <p className="mt-1 text-3xl font-bold">{s.value}</p>
              {s.sub && (
                <p className="mt-1 text-sm text-muted-foreground">{s.sub}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Qidiruv hajmi</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 9 }}
                  interval={1}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Top qidiruv so'rovlari</CardTitle>
          </CardHeader>
          <CardContent>
            <Flex align="center" justify="between" className="h-48 w-full">
              <span className="text-sm text-muted-foreground">0</span>
              <span className="text-sm text-muted-foreground">1</span>
            </Flex>
          </CardContent>
        </Card>
      </div>

      <DataTable
        columns={noResultColumns}
        data={noResultData}
        selectable={false}
        noResultsTitle="Natijalarsiz qidiruvlar yo'q"
        noResultsContent=""
      />

      <DataTable
        columns={searchColumns}
        data={searchData}
        selectable={false}
        noResultsTitle="Qidirish bo'yicha analitika"
        noResultsContent=""
      />
    </Flex>
  )
}

export default SearchAnalytics
