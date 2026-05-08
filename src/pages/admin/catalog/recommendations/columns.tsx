import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header"
import { Switch } from "@/shared/ui/switch"
import { type ColumnDef } from "@tanstack/react-table"

export type Recommendation = {
  id: string
  productType: string
  recommendations: string[]
  limit: number
  isActive: boolean
}

export const columns: ColumnDef<Recommendation>[] = [
  {
    accessorKey: "productType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mahsulot turi" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.original.productType}</span>
    ),
  },
  {
    accessorKey: "recommendations",
    header: "Tavsiyalar",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.original.recommendations.join(", ")}
      </span>
    ),
  },
  {
    accessorKey: "limit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Limit" />
    ),
    cell: ({ row }) => row.original.limit,
  },
  {
    accessorKey: "isActive",
    header: "Holati",
    cell: ({ row }) => <Switch defaultChecked={row.original.isActive} />,
  },
]
