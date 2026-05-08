import type { Customer } from "@/entities/customer/types"
import StatusBadge from "@/shared/components/status-badge"
import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header"
import { type ColumnDef } from "@tanstack/react-table"

export const segmentViewColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ism Sharif" />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Telefon raqam" />
    ),
  },
  {
    id: "language",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Til" />
    ),
    cell: () => "O'zbek",
  },
  {
    accessorKey: "ordersCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Buyurtmalar soni" />
    ),
    cell: ({ row }) => `${row.original.ordersCount} ta`,
  },
  {
    accessorKey: "totalSpent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Buyurtmalar summasi" />
    ),
    cell: ({ row }) => `${row.original.totalSpent.toLocaleString("uz-UZ")} so'm`,
  },
  {
    id: "lastOrderDays",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Oxirgi buyurtmadan beri kunlar" />
    ),
    cell: () => `${Math.floor(Math.random() * 60)} kun`,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <StatusBadge
        label={row.original.status === "active" ? "Faol" : "Nofaol"}
        variant={row.original.status === "active" ? "green" : "gray"}
      />
    ),
  },
]
