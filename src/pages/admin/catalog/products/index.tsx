import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { DataTable } from "@/shared/ui/data-table/data-table"
import Flex from "@/shared/ui/flex"
import AddButton from "@/shared/ui/predefined/add-button"
import GuideButton from "@/shared/ui/predefined/guide-button"
import { columns } from "./columns"
import { productMocks } from "@/mocks/product-mocks"
import { ROUTES } from "@/shared/config/routes"

const Products = () => {
  return (
    <Flex direction="column" className="w-full">
      <Flex justify="end" className="w-full">
        <GuideButton />
        <AddButton to={ROUTES.CATALOG_PRODUCTS_CREATE} />
      </Flex>

      <div className="grid w-full grid-cols-3 gap-4">
        <Card>
          <CardHeader>Mahsulotlar soni</CardHeader>
          <CardContent className="text-3xl">0</CardContent>
        </Card>
        <Card>
          <CardHeader>Jami mahsulotlar soni</CardHeader>
          <CardContent className="text-3xl">0</CardContent>
        </Card>
        <Card>
          <CardHeader>Jami mahsulotlar summasi</CardHeader>
          <CardContent className="text-3xl">0</CardContent>
        </Card>
      </div>

      <DataTable
        columns={columns}
        data={productMocks(1)}
        noResultsTitle="Mahsulotlaringizni qoʻshing va boshqaring"
        noResultsContent="Bu erda siz mahsulotlarni qoʻshishingiz, o`zgartirishingiz va narxlarni boshqarishingiz mumkin."
      />
    </Flex>
  )
}

export default Products
