import { type ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header"

export type NoResultRow = {
  id: string
  query: string
  count: number
  lastSearch: string
}

export type SearchRow = {
  id: string
  query: string
  requests: number
  createdAt: string
}

export const noResultColumns: ColumnDef<NoResultRow>[] = [
  {
    accessorKey: "query",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Qidiruv so'zi" />,
  },
  {
    accessorKey: "count",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Qidirilgan soni" />,
  },
  {
    accessorKey: "lastSearch",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Oxirgi qidiruv" />,
  },
]

export const searchColumns: ColumnDef<SearchRow>[] = [
  {
    accessorKey: "query",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Qidiruv so'zi" />,
  },
  {
    accessorKey: "requests",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Qidiruv so'rovlar soni" />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Yaratilgan vaqti" />,
  },
]
