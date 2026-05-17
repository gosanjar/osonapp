import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CategoriesApi } from "@/entities/catalog/api"
import { DataTable } from "@/shared/ui/data-table/data-table"
import Flex from "@shared/flex"
import AddButton from "@shared/predefined/add-button"
import GuideButton from "@shared/predefined/guide-button"
import { ROUTES } from "@/shared/config/routes"
import { getColumns } from "./columns"

const Categories = () => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoriesApi.list(),
  })

  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => CategoriesApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  })

  const categories = data?.data?.results ?? []

  return (
    <Flex direction="column">
      <Flex justify="end">
        <GuideButton />
        <AddButton to={ROUTES.CATALOG_CATEGORIES_CREATE} />
      </Flex>

      <DataTable
        columns={getColumns({ onDelete: remove, isDeleting })}
        data={categories}
        noResultsTitle={isLoading ? "Yuklanmoqda..." : "Mahsulotlarni kategoriyalarga boʻling"}
        noResultsContent="Onlayn do'koningiz mahsulotlarini kategoriyalar bo'yicha tartibga soling."
      />
    </Flex>
  )
}

export default Categories
