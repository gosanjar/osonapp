import { DataTable } from "@/shared/ui/data-table/data-table"
import Flex from "@/shared/ui/flex"
import AddButton from "@/shared/ui/predefined/add-button"
import GuideButton from "@/shared/ui/predefined/guide-button"
import { ROUTES } from "@/shared/config/routes"
import { columns, type ImportRecord } from "./columns"

const data: ImportRecord[] = []

const ImportProducts = () => {
  return (
    <Flex direction="column" className="w-full" gap={4}>
      <Flex justify="between" align="center" className="w-full">
        <h1 className="text-2xl font-bold">Import</h1>
        <Flex>
          <GuideButton />
          <AddButton to={ROUTES.CATALOG_IMPORT_PRODUCTS_CREATE} />
        </Flex>
      </Flex>

      <DataTable
        columns={columns}
        data={data}
        noResultsTitle="Hech qanday import topilmadi"
        noResultsContent="Mahsulotlarni import qilish uchun 'Yangi import' tugmasini bosing."
      />
    </Flex>
  )
}

export default ImportProducts
