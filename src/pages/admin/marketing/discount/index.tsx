import { DataTable } from "@/shared/ui/data-table/data-table"
import Flex from "@shared/flex"
import AddButton from "@shared/predefined/add-button"
import { ROUTES } from "@/shared/config/routes"
import { columns, type PromoCode } from "./columns"

const Discount = () => {
  return (
    <Flex direction="column">
      <Flex justify="between" align="center">
        <h1 className="text-2xl font-bold">Promo kodlar</h1>
        <AddButton to={ROUTES.MARKETING_DISCOUNT_CREATE} />
      </Flex>

      <DataTable<PromoCode, unknown>
        columns={columns}
        data={[]}
        noResultsTitle="Bu erda siz chegirma kodlarini yaratishingiz va boshqarishingiz mumkin"
        noResultsContent="Chegirma kodlarini yaratishingiz va boshqarishingiz mumkin"
      />
    </Flex>
  )
}

export default Discount
