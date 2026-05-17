import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { RecommendationsApi } from "@/entities/catalog/api"
import { DataTable } from "@/shared/ui/data-table/data-table"
import Flex from "@shared/flex"
import AddButton from "@shared/predefined/add-button"
import GuideButton from "@shared/predefined/guide-button"
import { getColumns } from "./columns"

const Recommendations = () => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["recommendations"],
    queryFn: () => RecommendationsApi.list(),
  })

  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => RecommendationsApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["recommendations"] }),
  })

  const recommendations = data?.data?.results ?? []

  return (
    <Flex direction="column" gap={4}>
      <Flex justify="between" align="center">
        <h1 className="text-2xl font-bold">Mahsulot tavsiyalari</h1>
        <Flex>
          <GuideButton />
          <AddButton label="Mahsulot tavsiyasini qo'shing" />
        </Flex>
      </Flex>

      <DataTable
        columns={getColumns({ onDelete: remove, isDeleting })}
        data={recommendations}
        noResultsTitle={isLoading ? "Yuklanmoqda..." : "Hech qanday tavsiya topilmadi"}
        noResultsContent="Turli toifadagi mahsulotlar uchun tavsiyalar yarating, mijozlaringizni qiziqtirishi mumkin bo'lgan o'xshash yoki qo'shimcha mahsulotlarni taklif qiling."
      />
    </Flex>
  )
}

export default Recommendations
