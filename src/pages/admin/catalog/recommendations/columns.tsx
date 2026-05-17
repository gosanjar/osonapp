import type { Recommendation } from "@/entities/catalog/types"
import { DeleteConfirmDialog } from "@shared/delete-confirm-dialog"
import StatusBadge from "@shared/status-badge"
import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header"
import { type ColumnDef } from "@tanstack/react-table"

type Options = {
  onDelete: (id: number) => void
  isDeleting: boolean
}

export function getColumns({ onDelete, isDeleting }: Options): ColumnDef<Recommendation>[] {
  return [
    {
      accessorKey: "product_title",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mahsulot" />,
      cell: ({ row }) => (
        <span className="font-medium">{row.original.product_title?.uz ?? "—"}</span>
      ),
    },
    {
      accessorKey: "recommended_products_data",
      header: "Tavsiyalar",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {row.original.recommended_products_data.map((p) => p.title.uz).join(", ") || "—"}
        </span>
      ),
    },
    {
      accessorKey: "limit",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Limit" />,
    },
    {
      accessorKey: "is_active",
      header: "Holati",
      cell: ({ row }) => (
        <StatusBadge
          label={row.original.is_active ? "Faol" : "Nofaol"}
          variant={row.original.is_active ? "green" : "gray"}
        />
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DeleteConfirmDialog
          onConfirm={() => onDelete(row.original.id)}
          isPending={isDeleting}
        />
      ),
    },
  ]
}
