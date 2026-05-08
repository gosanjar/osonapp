import { DataTable } from "@/shared/ui/data-table/data-table"
import Flex from "@/shared/ui/flex"
import AddButton from "@/shared/ui/predefined/add-button"
import GuideButton from "@/shared/ui/predefined/guide-button"
import { productMocks } from "@/mocks/product-mocks"
import { ROUTES } from "@/shared/config/routes"
import { columns } from "./columns"

const Categories = () => {
  return (
    <Flex direction="column" className="w-full">
      <Flex justify="end" className="w-full">
        <GuideButton />
        <AddButton to={ROUTES.CATALOG_CATEGORIES_CREATE} />
      </Flex>

      <DataTable
        columns={columns}
        data={productMocks(0)}
        noResultsTitle="Mahsulotlarni kategoriyalarga boʻling"
        noResultsContent="Onlayn do`koningiz mahsulotlarini kategoriyalar bo`yicha tartibga soling."
      />
    </Flex>
  )
}

export default Categories
