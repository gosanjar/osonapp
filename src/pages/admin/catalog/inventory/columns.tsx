import type { Product } from "@/entities/category/types"
import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header"
import { Input } from "@/shared/ui/input"
import { type ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nomi" />
    ),
    cell: ({ row }) => {
      const image = row.original.media.images[0]
      const name = row.original.title.uz
      return (
        <div className="flex items-center gap-3 my-1">
          <div
            className="shrink-0 w-10 h-10 rounded-lg bg-cover bg-center bg-no-repeat border border-border"
            style={{ backgroundImage: image ? `url(${image})` : undefined }}
          />
          <span className="text-sm font-semibold">{name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "inventory.sku",
    header: "SKU",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.inventory.sku ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "inventory.barcode",
    header: "Shtrix-kod",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.inventory.barcode ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "inventory.quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Soni" />
    ),
    cell: ({ row }) => (
      <Input
        type="number"
        defaultValue={row.original.inventory.quantity}
        className="w-24 h-8"
        onClick={(e) => e.stopPropagation()}
      />
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Yangilandi" />
    ),
    cell: ({ row }) =>
      new Date(row.original.updatedAt).toLocaleString("uz-UZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
]
