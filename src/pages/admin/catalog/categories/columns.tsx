import type { Category } from "@/entities/catalog/types"
import { DeleteConfirmDialog } from "@shared/delete-confirm-dialog"
import StatusBadge from "@shared/status-badge"
import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header"
import Flex from "@shared/flex"
import { type ColumnDef } from "@tanstack/react-table"
import { Pencil } from "lucide-react"
import { Link } from "react-router-dom"
import { ROUTES } from "@/shared/config/routes"

type Options = {
  onDelete: (id: number) => void
  isDeleting: boolean
}

export function getColumns({ onDelete, isDeleting }: Options): ColumnDef<Category>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nomi" />,
      cell: ({ row }) => (
        <Flex align="center" gap={3} full={false}>
          {row.original.image && (
            <div
              className="shrink-0 w-8 h-8 rounded bg-cover bg-center border border-border"
              style={{ backgroundImage: `url(${row.original.image})` }}
            />
          )}
          <span className="font-medium">{row.original.name.uz}</span>
        </Flex>
      ),
    },
    {
      accessorKey: "sort_order",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tartib" />,
    },
    {
      accessorKey: "is_active",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Holat" />,
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
        <Flex align="center" gap={4} full={false}>
          <Link
            to={`${ROUTES.CATALOG_CATEGORIES_EDIT}/${row.original.id}`}
            className="flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-600"
          >
            <Pencil size={14} />
            Tahrirlash
          </Link>
          <DeleteConfirmDialog
            onConfirm={() => onDelete(row.original.id)}
            isPending={isDeleting}
          />
        </Flex>
      ),
    },
  ]
}
