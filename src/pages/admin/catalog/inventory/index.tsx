import { DataTable } from "@/shared/ui/data-table/data-table"
import Flex from "@/shared/ui/flex"
import GuideButton from "@/shared/ui/predefined/guide-button"
import { productMocks } from "@/mocks/product-mocks"
import { columns } from "./columns"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/shared/config/routes"
import type { Product } from "@/entities/category/types"
import type { Row } from "@tanstack/react-table"

const Inventory = () => {
  const navigate = useNavigate()

  const handleRowClick = (row: Row<Product>) => {
    navigate(`${ROUTES.CATALOG_PRODUCTS_EDIT}/${row.original.id}`)
  }

  return (
    <Flex direction="column" className="w-full">
      <Flex justify="end" className="w-full">
        <GuideButton />
      </Flex>

      <DataTable
        columns={columns}
        data={productMocks(10)}
        onRowClick={handleRowClick}
        noResultsTitle="Inventarizatsiya ma'lumotlari yo'q"
        noResultsContent="Mahsulotlar qo'shilgandan so'ng ularning inventar ma'lumotlari bu yerda ko'rinadi."
      />
    </Flex>
  )
}

export default Inventory
