import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header"
import { Badge } from "@/shared/ui/badge"
import { type ColumnDef } from "@tanstack/react-table"

export type ImportRecord = {
  id: string
  name: string
  type: string
  action: string
  status: "completed" | "pending" | "failed"
  createdAt: string
}

const statusMap: Record<ImportRecord["status"], { label: string; variant: "default" | "secondary" | "destructive" }> = {
  completed: { label: "Tugallandi", variant: "default" },
  pending: { label: "Jarayonda", variant: "secondary" },
  failed: { label: "Xato", variant: "destructive" },
}

export const columns: ColumnDef<ImportRecord>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nomi" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "type",
    header: "Turi",
    cell: ({ row }) => row.original.type,
  },
  {
    accessorKey: "action",
    header: "Harakatlar",
    cell: ({ row }) => row.original.action,
  },
  {
    accessorKey: "status",
    header: "Holati",
    cell: ({ row }) => {
      const { label, variant } = statusMap[row.original.status]
      return <Badge variant={variant}>{label}</Badge>
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Yaratilgan vaqti" />
    ),
    cell: ({ row }) => row.original.createdAt,
  },
]
