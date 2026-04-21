import type { Order } from "@/entities/order/types"
import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header"
import { type ColumnDef } from "@tanstack/react-table"

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

      const styles = {
        pending: "bg-yellow-100 text-yellow-700",
        paid: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
      }

      const labels = {
        pending: "Kutilmoqda",
        paid: "To‘langan",
        cancelled: "Bekor qilingan",
      }

      return (
        <span className={`rounded px-2 py-1 text-xs ${styles[status]}`}>
          {labels[status]}
        </span>
      )
    },
  },
]
