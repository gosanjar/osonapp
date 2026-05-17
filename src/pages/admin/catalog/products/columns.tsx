import type { Product } from "@/entities/catalog/types"
import { DeleteConfirmDialog } from "@shared/delete-confirm-dialog"
import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header"
import { Switch } from "@/shared/ui/switch"
import Flex from "@shared/flex"
import { type ColumnDef } from "@tanstack/react-table"
import { Pencil } from "lucide-react"
import { Link } from "react-router-dom"
import { ROUTES } from "@/shared/config/routes"

type Options = {
  onDelete: (id: number) => void
  isDeleting: boolean
}

export function getColumns({ onDelete, isDeleting }: Options): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "title",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nomi" />,
      cell: ({ row }) => {
        const image = row.original.images[0]
        const name = row.original.title.uz
        return (
          <Flex align="center" gap={3} full={false} className="my-1">
            <div
              className="shrink-0 w-10 h-10 rounded-lg bg-cover bg-center bg-no-repeat border border-border"
              style={{ backgroundImage: image ? `url(${image})` : undefined }}
            />
            <span className="text-sm font-semibold">{name}</span>
          </Flex>
        )
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Narxi" />,
      cell: ({ row }) => `${Number(row.original.price).toLocaleString()} so'm`,
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Soni" />,
    },
    {
      accessorKey: "is_active",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Holati" />,
      cell: ({ row }) => <Switch defaultChecked={row.original.is_active} />,
    },
    {
      accessorKey: "is_trend",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Trend" />,
      cell: ({ row }) => <Switch defaultChecked={row.original.is_trend} />,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Flex align="center" gap={4} full={false}>
          <Link
            to={`${ROUTES.CATALOG_PRODUCTS_EDIT}/${row.original.id}`}
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
