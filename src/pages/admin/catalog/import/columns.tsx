import type { ImportBatch } from "@/entities/catalog/types"
import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header"
import { Badge } from "@/shared/ui/badge"
import { type ColumnDef } from "@tanstack/react-table"

const statusMap: Record<ImportBatch["status"], { label: string; variant: "default" | "secondary" | "destructive" }> = {
  completed: { label: "Tugallandi", variant: "default" },
  pending: { label: "Kutilmoqda", variant: "secondary" },
  processing: { label: "Jarayonda", variant: "secondary" },
  failed: { label: "Xato", variant: "destructive" },
}

export function getColumns(): ColumnDef<ImportBatch>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nomi" />,
      cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
    },
    {
      accessorKey: "file_type",
      header: "Turi",
      cell: ({ row }) => row.original.file_type.toUpperCase(),
    },
    {
      accessorKey: "total_count",
      header: "Jami",
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.success_count}/{row.original.total_count}
        </span>
      ),
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
      accessorKey: "created_at",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Yaratilgan" />,
      cell: ({ row }) =>
        new Date(row.original.created_at).toLocaleString("uz-UZ", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
  ]
}
