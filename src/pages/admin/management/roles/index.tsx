import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { RolesApi } from "@/entities/roles/api"
import { DataTable } from "@/shared/ui/data-table/data-table"
import Flex from "@/shared/ui/flex"
import AddButton from "@/shared/ui/predefined/add-button"
import { ROUTES } from "@/shared/config/routes"
import { getColumns } from "./columns"

const RolesPage = () => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: () => RolesApi.list(),
  })

  const { mutate: remove, isPending } = useMutation({
    mutationFn: (id: string) => RolesApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["roles"] }),
  })

  const roles = data?.data?.results ?? []

  return (
    <Flex direction="column" className="w-full">
      <Flex justify="between" align="center" className="w-full">
        <h1 className="text-xl font-semibold">Rol</h1>
        <AddButton to={ROUTES.MANAGEMENT_ROLES_CREATE} />
      </Flex>

      <DataTable
        columns={getColumns({ onDelete: remove, isDeleting: isPending })}
        data={roles}
        noResultsTitle={isLoading ? "Yuklanmoqda..." : "Rollar topilmadi"}
        noResultsContent="Bu erda siz do'kon rollarini ko'rishingiz va boshqarishingiz mumkin."
      />
    </Flex>
  )
}

export default RolesPage
