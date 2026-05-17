import type { Order } from "@/entities/order/types"
import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header"
import { type ColumnDef } from "@tanstack/react-table"
import StatusBadge from "@shared/status-badge"

const statusMap: Record<
  string,
  { label: string; variant: "yellow" | "green" | "red" }
> = {
  pending: { label: "Kutilmoqda", variant: "yellow" },
  paid: { label: "To'langan", variant: "green" },
  cancelled: { label: "Bekor qilingan", variant: "red" },
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "client",
    header: "Mijoz",
  },
  {
    accessorKey: "phone",
    header: "Telefon",
  },
  {
    accessorKey: "product",
    header: "Mahsulot",
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Narxi" />
    ),
    cell: ({ row }) => `${row.original.price.toLocaleString()} so'm`,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Soni" />
    ),
  },
  {
    accessorKey: "total",
    header: "Jami",
    cell: ({ row }) =>
      `${(row.original.price * row.original.quantity).toLocaleString()} so'm`,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Yaratilgan vaqt" />
    ),
  },
  {
    accessorKey: "status",
    header: "Holati",
    cell: ({ row }) => {
      const status = row.original.status
      const s = statusMap[status]
      return s ? <StatusBadge variant={s.variant} label={s.label} /> : status
    },
  },
]
