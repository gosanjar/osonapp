import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Flex from "@shared/flex"
import { Button } from "@/shared/ui/button"
import Modal from "@shared/modal"
import { AlertTriangle } from "lucide-react"
import { ROUTES } from "@/shared/config/routes"
import { DataTable } from "@/shared/ui/data-table/data-table"
import { createColumns, type ShippingMethod } from "./columns"
import { AddButton } from "@shared/predefined"
import PageHeader from "@shared/page-header"

const mockMethods: ShippingMethod[] = [
  {
    id: "1",
    name: "Standard",
    type: "Belgilangan summa",
    updatedAt: "1 oy avval",
    active: true,
  },
]

const ShippingSettings = () => {
  const navigate = useNavigate()
  const [methods, setMethods] = useState(mockMethods)
  const [deleteTarget, setDeleteTarget] = useState<ShippingMethod | null>(null)

  const toggleActive = (id: string) => {
    setMethods((prev) =>
      prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m))
    )
  }

  const handleDelete = () => {
    if (deleteTarget) {
      setMethods((prev) => prev.filter((m) => m.id !== deleteTarget.id))
      setDeleteTarget(null)
    }
  }

  const columns = createColumns(
    toggleActive,
    () => navigate(ROUTES.SETTINGS_SHIPPING_CREATE),
    setDeleteTarget
  )

  return (
    <Flex direction="column" gap={4}>
      <PageHeader title="Yetkazib berish usullari">
        <AddButton to={ROUTES.SETTINGS_SHIPPING_CREATE} />
      </PageHeader>

      <DataTable
        columns={columns}
        data={methods}
        selectable={false}
        noResultsTitle="Yetkazib berish usullari yo'q"
      />

      <Modal
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        className="max-w-md text-center"
      >
        <Flex direction="column" align="center" className="pt-2">
          <div className="flex size-14 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle size={24} className="text-destructive" />
          </div>
          <h2 className="text-lg font-bold">Ogohlantirish</h2>
          <p className="text-sm text-muted-foreground">
            Siz rostdan ham ushbu yetkazib berish usulini o'chirmoqchimisiz:{" "}
            {deleteTarget?.name}?
          </p>
          <div className="grid w-full grid-cols-2 gap-4">
            <Button variant="outline" className="w-full" onClick={() => setDeleteTarget(null)}>
              Qaytarish
            </Button>
            <Button variant="destructive" className="w-full" onClick={handleDelete}>
              Yetkazib berish usulini o'chirish
            </Button>
          </div>
        </Flex>
      </Modal>
    </Flex>
  )
}

export default ShippingSettings
