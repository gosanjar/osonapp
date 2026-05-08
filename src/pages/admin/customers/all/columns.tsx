import type { Customer } from "@/entities/customer/types"
import StatusBadge from "@/shared/components/status-badge"
import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header"
import { type ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mijoz" />
    ),
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.name}</div>
        <div className="text-xs text-muted-foreground">{row.original.email}</div>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Telefon" />
    ),
  },
  {
    accessorKey: "ordersCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Buyurtmalar" />
    ),
    cell: ({ row }) => `${row.original.ordersCount} ta`,
  },
  {
    accessorKey: "totalSpent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jami xarid" />
    ),
    cell: ({ row }) => `${row.original.totalSpent.toLocaleString("uz-UZ")} so'm`,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ro'yxatdan o'tgan" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Holat" />
    ),
    cell: ({ row }) => (
      <StatusBadge
        label={row.original.status === "active" ? "Faol" : "Nofaol"}
        variant={row.original.status === "active" ? "green" : "gray"}
      />
    ),
  },
]
