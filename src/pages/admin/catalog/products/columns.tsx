import type { Product } from "@/entities/category/types"
import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header"
import { Switch } from "@/shared/ui/switch"
import { type ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nomi" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Narxi" />
    ),
    cell: ({ row }) => `${row.original.pricing.price.toLocaleString()} so'm`,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Soni" />
    ),
    cell: ({ row }) => row.original.inventory.quantity,
  },
  {
    accessorKey: "active",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Holati" />
    ),
    cell: ({ row }) => <Switch defaultChecked={row.original.is_active} />,
  },
  {
    accessorKey: "trend",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trend" />
    ),
    cell: ({ row }) => <Switch defaultChecked={row.original.is_trend} />,
  },
]
