import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { EmployeesApi } from "@/entities/employees/api"
import { DataTable } from "@/shared/ui/data-table/data-table"
import Flex from "@shared/flex"
import AddButton from "@shared/predefined/add-button"
import { ROUTES } from "@/shared/config/routes"
import { getColumns } from "./columns"

const EmployeesPage = () => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: () => EmployeesApi.list(),
  })

  const { mutate: remove, isPending } = useMutation({
    mutationFn: (id: string) => EmployeesApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees"] }),
  })

  const employees = data?.data?.results ?? []

  return (
    <Flex direction="column">
      <Flex justify="between" align="center">
        <h1 className="text-xl font-semibold">Xodimlar</h1>
        <AddButton to={ROUTES.MANAGEMENT_EMPLOYEES_CREATE} />
      </Flex>

      <DataTable
        columns={getColumns({ onDelete: remove, isDeleting: isPending })}
        data={employees}
        noResultsTitle={isLoading ? "Yuklanmoqda..." : "Xodimlar topilmadi"}
        noResultsContent="Bu erda siz o'z xodimlaringizni ko'rishingiz va boshqarishingiz mumkin."
      />
    </Flex>
  )
}

export default EmployeesPage
