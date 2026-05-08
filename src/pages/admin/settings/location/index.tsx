import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Flex from "@/shared/ui/flex"
import { ROUTES } from "@/shared/config/routes"
import { DataTable } from "@/shared/ui/data-table/data-table"
import { createColumns, type Branch } from "./columns"
import { AddButton } from "@/shared/ui/predefined"
import PageHeader from "@/shared/components/page-header"

const mockBranches: Branch[] = [
  {
    id: "1",
    name: "jizzakh",
    city: "Jizzakh",
    address: "Jizzakh District",
    active: true,
  },
]

const LocationSettings = () => {
  const navigate = useNavigate()
  const [branches, setBranches] = useState(mockBranches)

  const toggleActive = (id: string) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b))
    )
  }

  const columns = createColumns(toggleActive, () =>
    navigate(ROUTES.SETTINGS_LOCATION_CREATE)
  )

  return (
    <Flex direction="column" className="w-full" gap={4}>
      <PageHeader title="Filiallar">
        <AddButton to={ROUTES.SETTINGS_LOCATION_CREATE} />
      </PageHeader>

      <DataTable
        columns={columns}
        data={branches}
        selectable={false}
        noResultsTitle="Filiallar yo'q"
      />
    </Flex>
  )
}

export default LocationSettings
