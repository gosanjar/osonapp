import type { Order } from "@/entities/order/types"
import { orderMocks } from "@/mocks/order-mocks"
import { Button } from "@/shared/ui/button"
import { DataTable } from "@/shared/ui/data-table/data-table"
import Flex from "@/shared/ui/flex"
import Icon from "@/shared/ui/icon"
import { TelegramIcon } from "@hugeicons/core-free-icons"
import { columns } from "../pre-orders/columns"
import GuideButton from "@/shared/ui/predefined/guide-button"

const AllOrders = () => {
  return (
    <Flex direction="column" className="w-full">
      <Flex justify="end" className="w-full">
        <GuideButton />
        <Button size="lg" variant="outline">
          <Icon icon={TelegramIcon} />
        </Button>
      </Flex>

      {
        <DataTable<Order, unknown>
          columns={columns}
          data={orderMocks(0)}
          noResultsTitle="Buyurtmalaringizni boshqaring"
          noResultsContent="Bu erda siz oʻz buyurtmalaringizni koʻrishingiz, oʻzgartirishingiz va bashqarishingiz mumkin."
        />
      }
    </Flex>
  )
}

export default AllOrders
