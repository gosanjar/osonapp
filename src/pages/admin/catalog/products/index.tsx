import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ProductsApi } from "@/entities/catalog/api"
import Card from "@shared/card"
import { DataTable } from "@/shared/ui/data-table/data-table"
import Flex from "@shared/flex"
import AddButton from "@shared/predefined/add-button"
import GuideButton from "@shared/predefined/guide-button"
import { ROUTES } from "@/shared/config/routes"
import { getColumns } from "./columns"

const Products = () => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductsApi.list(),
  })

  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => ProductsApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  })

  const products = data?.data?.results ?? []
  const total = data?.data?.total ?? 0
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0)
  const totalQty = products.reduce((sum, p) => sum + p.quantity, 0)

  return (
    <Flex direction="column">
      <Flex justify="end">
        <GuideButton />
        <AddButton to={ROUTES.CATALOG_PRODUCTS_CREATE} />
      </Flex>

      <div className="grid w-full grid-cols-3 gap-4">
        <Card title="Mahsulotlar soni" contentClassName="text-3xl">{total}</Card>
        <Card title="Jami mahsulotlar soni" contentClassName="text-3xl">{totalQty}</Card>
        <Card title="Jami mahsulotlar summasi" contentClassName="text-3xl">{totalValue.toLocaleString()} so'm</Card>
      </div>

      <DataTable
        columns={getColumns({ onDelete: remove, isDeleting })}
        data={products}
        noResultsTitle={isLoading ? "Yuklanmoqda..." : "Mahsulotlaringizni qoʻshing va boshqaring"}
        noResultsContent="Bu erda siz mahsulotlarni qoʻshishingiz, o'zgartirishingiz va narxlarni boshqarishingiz mumkin."
      />
    </Flex>
  )
}

export default Products
