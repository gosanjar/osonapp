import { type ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header"
import { Switch } from "@/shared/ui/switch"
import { Button } from "@/shared/ui/button"
import { Pencil } from "lucide-react"

export type Branch = {
  id: string
  name: string
  city: string
  address: string
  active: boolean
}

export const createColumns = (
  onToggle: (id: string) => void,
  onEdit: (id: string) => void
): ColumnDef<Branch>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nomi" />,
  },
  {
    accessorKey: "city",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Shahar" />,
  },
  {
    accessorKey: "address",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Manzil" />,
  },
  {
    accessorKey: "active",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Holati" />,
    cell: ({ row }) => (
      <Switch
        checked={row.original.active}
        onCheckedChange={() => onToggle(row.original.id)}
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600"
          onClick={(e) => { e.stopPropagation(); onEdit(row.original.id) }}
        >
          <Pencil size={14} />
          Tahrirlash
        </Button>
      </div>
    ),
  },
]
