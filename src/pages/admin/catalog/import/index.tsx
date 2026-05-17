import { useQuery } from "@tanstack/react-query"
import { ImportsApi } from "@/entities/catalog/api"
import { DataTable } from "@/shared/ui/data-table/data-table"
import Flex from "@shared/flex"
import AddButton from "@shared/predefined/add-button"
import GuideButton from "@shared/predefined/guide-button"
import { ROUTES } from "@/shared/config/routes"
import { getColumns } from "./columns"

const ImportProducts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["imports"],
    queryFn: () => ImportsApi.list(),
  })

  const imports = data?.data?.results ?? []

  return (
    <Flex direction="column" gap={4}>
      <Flex justify="between" align="center">
        <h1 className="text-2xl font-bold">Import</h1>
        <Flex>
          <GuideButton />
          <AddButton to={ROUTES.CATALOG_IMPORT_PRODUCTS_CREATE} />
        </Flex>
      </Flex>

      <DataTable
        columns={getColumns()}
        data={imports}
        noResultsTitle={isLoading ? "Yuklanmoqda..." : "Hech qanday import topilmadi"}
        noResultsContent="Mahsulotlarni import qilish uchun 'Yangi import' tugmasini bosing."
      />
    </Flex>
  )
}

export default ImportProducts
