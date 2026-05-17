import { useQuery } from "@tanstack/react-query"
import { InventoryApi } from "@/entities/catalog/api"
import { DataTable } from "@/shared/ui/data-table/data-table"
import Flex from "@shared/flex"
import GuideButton from "@shared/predefined/guide-button"
import { getColumns } from "./columns"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/shared/config/routes"
import type { Product } from "@/entities/catalog/types"
import type { Row } from "@tanstack/react-table"

const Inventory = () => {
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: () => InventoryApi.list(),
  })

  const handleRowClick = (row: Row<Product>) => {
    navigate(`${ROUTES.CATALOG_PRODUCTS_EDIT}/${row.original.id}`)
  }

  const products = data?.data?.results ?? []

  return (
    <Flex direction="column">
      <Flex justify="end">
        <GuideButton />
      </Flex>

      <DataTable
        columns={getColumns()}
        data={products}
        onRowClick={handleRowClick}
        noResultsTitle={isLoading ? "Yuklanmoqda..." : "Inventarizatsiya ma'lumotlari yo'q"}
        noResultsContent="Mahsulotlar qo'shilgandan so'ng ularning inventar ma'lumotlari bu yerda ko'rinadi."
      />
    </Flex>
  )
}

export default Inventory
