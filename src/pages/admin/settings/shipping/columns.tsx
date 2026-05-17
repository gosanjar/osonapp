import { type ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header"
import { Switch } from "@/shared/ui/switch"
import { Button } from "@/shared/ui/button"
import { Pencil, Trash2 } from "lucide-react"

export type ShippingMethod = {
  id: string
  name: string
  type: string
  updatedAt: string
  active: boolean
}

export const createColumns = (
  onToggle: (id: string) => void,
  onEdit: (id: string) => void,
  onDelete: (item: ShippingMethod) => void
): ColumnDef<ShippingMethod>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nomi" />,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Yetkazib berish turi" />,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Yangilangan vaqti" />,
  },
  {
    accessorKey: "active",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Holat" />,
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
      <div className="flex items-center justify-end gap-4">
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600"
          onClick={(e) => { e.stopPropagation(); onEdit(row.original.id) }}
        >
          <Pencil size={14} />
          Tahrirlash
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-sm text-destructive hover:text-destructive/80"
          onClick={(e) => { e.stopPropagation(); onDelete(row.original) }}
        >
          <Trash2 size={14} />
          O'chirish
        </Button>
      </div>
    ),
  },
]
