import { type ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header"

export type CartRow = {
  id: string
  customer: string
  name: string
  count: number
  orderedAt: string
  createdAt: string
}

export const columns: ColumnDef<CartRow>[] = [
  {
    accessorKey: "customer",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Mijoz" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nomi" />,
  },
  {
    accessorKey: "count",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Soni" />,
  },
  {
    accessorKey: "orderedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Buyurtma berishga o'tdi" />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Yaratilgan vaqti" />,
  },
]
