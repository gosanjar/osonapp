import type { Role } from "@/entities/roles/types"
import { DeleteConfirmDialog } from "@shared/delete-confirm-dialog"
import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header"
import Flex from "@shared/flex"
import { type ColumnDef } from "@tanstack/react-table"
import { Link } from "react-router-dom"
import { ROUTES } from "@/shared/config/routes"
import { Pencil } from "lucide-react"

type Options = {
  onDelete: (id: string) => void
  isDeleting: boolean
}

export function getColumns({ onDelete, isDeleting }: Options): ColumnDef<Role>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Rol" />,
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Yaratilgan vaqti" />,
      cell: ({ row }) => new Date(row.original.created_at).YMD(),
    },
    {
      accessorKey: "updated_at",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Yangilangan vaqti" />,
      cell: ({ row }) => new Date(row.original.updated_at).YMD(),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Flex align="center" gap={4} full={false}>
          <Link
            to={ROUTES.MANAGEMENT_ROLES_EDIT.replace(":id", String(row.original.id))}
            className="flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-600"
          >
            <Pencil size={14} />
            Tahrirlash
          </Link>
          <DeleteConfirmDialog
            onConfirm={() => onDelete(String(row.original.id))}
            isPending={isDeleting}
          />
        </Flex>
      ),
    },
  ]
}
