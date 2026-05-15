import type { Employee } from "@/entities/employees/types"
import StatusBadge from "@/shared/components/status-badge"
import { DeleteConfirmDialog } from "@/shared/components/delete-confirm-dialog"
import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header"
import { type ColumnDef } from "@tanstack/react-table"
import { Link } from "react-router-dom"
import { ROUTES } from "@/shared/config/routes"
import { Pencil } from "lucide-react"

type Options = {
  onDelete: (id: string) => void
  isDeleting: boolean
}

export function getColumns({ onDelete, isDeleting }: Options): ColumnDef<Employee>[] {
  return [
    {
      accessorKey: "first_name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ism" />,
    },
    {
      accessorKey: "last_name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Familiya" />,
    },
    {
      accessorKey: "phone_number",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Telefon" />,
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
        <div className="flex items-center gap-4">
          <Link
            to={ROUTES.MANAGEMENT_EMPLOYEES_EDIT.replace(":id", row.original.id)}
            className="flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-600"
          >
            <Pencil size={14} />
            Tahrirlash
          </Link>
          <DeleteConfirmDialog
            onConfirm={() => onDelete(row.original.id)}
            isPending={isDeleting}
          />
        </div>
      ),
    },
  ]
}
