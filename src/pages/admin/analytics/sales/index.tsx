import Flex from "@/shared/ui/flex"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const months = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentyabr",
  "Oktyabr",
  "Noyabr",
  "Dekabr",
]

const monthlyData = months.map((name) => ({
  name,
  avgOrder: 0,
  totalSales: 0,
}))

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  time: `2026-05-08 ${String(i).padStart(2, "0")}:00`,
  value: 0,
}))

const statCards = [
  { label: "Jami sotuvlar", value: "0 so'm" },
  { label: "Buyurtmalar soni", value: "0" },
  { label: "O'rtacha buyurtmalar summasi", value: "0 so'm" },
  { label: "Naqd pul", value: "0 so'm" },
  { label: "Payme", value: "0 so'm" },
  { label: "Click", value: "0 so'm" },
]

const SalesAnalytics = () => {
  return (
    <Flex direction="column" className="w-full" gap={4}>
      <h1 className="text-2xl font-bold">Buyurtmalar bo'yicha analitika</h1>

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
              placeholder="Sana oralig'ini tanlang"
              className="border-0 shadow-none focus-visible:ring-0"
            />
          </Flex>
        </CardContent>
      </Card>

      <div className="grid w-full grid-cols-3 gap-4">
        {statCards.map((s) => (
          <Card key={s.label} className="w-full">
            <CardContent className="pt-4">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <p className="mt-1 text-2xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Jami sotuvlar</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                name="Bugungi umumiy sotuvlar"
                stroke="#22c55e"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Oylar bo'yicha buyurtma statistikasi</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="avgOrder"
                name="O'rtacha buyurtma summasi"
                fill="#22c55e"
                barSize={8}
              />
              <Bar
                dataKey="totalSales"
                name="Umumiy savdo hajmi"
                fill="#3b82f6"
                barSize={8}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Flex>
  )
}

export default SalesAnalytics
