import StatusBadge from "@/shared/components/status-badge"
import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header"
import { type ColumnDef } from "@tanstack/react-table"

export type PromoCode = {
  id: string
  code: string
  type: "percent" | "fixed"
  discount: number
  usageLimit: number
  usedCount: number
  startDate: string
  endDate: string
  status: "active" | "expired" | "inactive"
}

export const columns: ColumnDef<PromoCode>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kod" />
    ),
    cell: ({ row }) => (
      <span className="font-mono font-semibold">{row.original.code}</span>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Turi" />
    ),
    cell: ({ row }) => (row.original.type === "percent" ? "Foiz" : "Belgilangan"),
  },
  {
    accessorKey: "discount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Chegirma" />
    ),
    cell: ({ row }) =>
      row.original.type === "percent"
        ? `${row.original.discount}%`
        : `${row.original.discount.toLocaleString("uz-UZ")} so'm`,
  },
  {
    accessorKey: "usedCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Foydalanilgan" />
    ),
    cell: ({ row }) => `${row.original.usedCount} / ${row.original.usageLimit}`,
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tugash sanasi" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Holat" />
    ),
    cell: ({ row }) => {
      const map = {
        active: { label: "Faol", variant: "green" },
        expired: { label: "Tugagan", variant: "gray" },
        inactive: { label: "Nofaol", variant: "red" },
      } as const
      const s = map[row.original.status]
      return <StatusBadge label={s.label} variant={s.variant} />
    },
  },
]
