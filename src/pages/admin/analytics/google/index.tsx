import Flex from "@shared/flex"
import Card from "@shared/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import StatusBadge from "@shared/status-badge"
import { ArrowLeftRight, Monitor, Globe } from "lucide-react"

const periods = ["Bugun", "Kecha", "Hafta", "Oy"]
const activePeriods = ["5 kun", "28 kun", "90 kun"]

function PeriodSelect({ options = periods }: { options?: string[] }) {
  return (
    <Select defaultValue={options[0]}>
      <SelectTrigger className="h-8 w-28 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o} className="text-xs">
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function StatCard({
  title,
  value,
  showChange = true,
  periodOptions,
}: {
  title: string
  value: string
  showChange?: boolean
  periodOptions?: string[]
}) {
  return (
    <Card>
      <Flex justify="between" align="start" className="mb-2">
        <span className="text-sm text-muted-foreground">{title}</span>
        <PeriodSelect options={periodOptions} />
      </Flex>
      <span className="text-3xl font-bold">{value}</span>
      {showChange && (
        <Flex align="center" gap={1} className="mt-2">
          <span className="text-sm text-muted-foreground">0% Barqaror</span>
          <ArrowLeftRight size={13} className="text-muted-foreground" />
        </Flex>
      )}
    </Card>
  )
}

function SessionChartCard({
  title,
  icon: Icon,
  color,
}: {
  title: string
  icon: typeof Monitor
  color: string
}) {
  return (
    <Card>
      <Flex justify="between" align="center" className="mb-4">
        <Flex align="center" gap={2}>
          <Icon size={18} className={color} />
          <span className="font-medium">{title}</span>
          <StatusBadge label="0" variant="yellow" />
        </Flex>
        <PeriodSelect />
      </Flex>
      <div className="h-32 w-full rounded bg-muted/30" />
    </Card>
  )
}

function TableCard({ title }: { title: string }) {
  return (
    <Card>
      <Flex justify="between" align="center" className="mb-4">
        <span className="text-sm text-muted-foreground">{title}</span>
        <PeriodSelect />
      </Flex>
      <div className="h-24 w-full" />
    </Card>
  )
}

const GoogleAnalytics = () => {
  return (
    <Flex direction="column" gap={4}>
      <h1 className="text-2xl font-bold">Google Analitika</h1>

      <div className="grid w-full grid-cols-2 gap-4">
        <StatCard title="Sahifa ko'rishlar soni" value="0" />
        <StatCard title="Noyob foydalanuvchilar" value="0" />
        <StatCard title="Sessiyalar" value="0" />
        <StatCard title="O'rtacha sessiya davomiyligi" value="00:00:00" />
        <StatCard
          title="Faol foydalanuvchilar (1 kun)"
          value="0"
          showChange={false}
          periodOptions={activePeriods}
        />
        <StatCard
          title="Faol foydalanuvchilar (7 kun)"
          value="0"
          showChange={false}
          periodOptions={activePeriods}
        />
        <SessionChartCard
          title="Sessiyalar"
          icon={Monitor}
          color="text-yellow-500"
        />
        <SessionChartCard
          title="Sessiyalar"
          icon={Globe}
          color="text-yellow-500"
        />
        <TableCard title="Eng ko'p tashrif buyurilgan sahifalar" />
        <TableCard title="Eng ko'p manbalar" />
      </div>
    </Flex>
  )
}

export default GoogleAnalytics
