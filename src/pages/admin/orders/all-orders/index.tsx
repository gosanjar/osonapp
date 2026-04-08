import type { Order } from "@/entities/order/types"
import { orderMocks } from "@/mocks/order-mocks"
import { Button } from "@/shared/ui/button"
import { DataTable } from "@/shared/ui/data-table/data-table"
import Flex from "@/shared/ui/flex"
import Icon from "@/shared/ui/icon"
import { TelegramIcon, Youtube } from "@hugeicons/core-free-icons"
import { columns } from "../pre-orders/columns"
import NoResults from "@/features/no-results"

const AllOrders = () => {
  return (
    <Flex direction="column" className="w-full">
      <Flex justify="end" className="w-full">
        <Button size="lg" variant="outline">
          <Icon icon={Youtube} />
          Qo'llanma
        </Button>
        <Button size="lg" variant="outline">
          <Icon icon={TelegramIcon} />
        </Button>
      </Flex>

      {orderMocks(5).length > 0 ? (
        <DataTable<Order, unknown> columns={columns} data={orderMocks(5)} />
      ) : (
        <NoResults
          title="Buyurtmalaringizni boshqaring"
          content="Bu erda siz oʻz buyurtmalaringizni koʻrishingiz, oʻzgartirishingiz va bashqarishingiz mumkin."
        />
      )}
    </Flex>
  )
}

export default AllOrders
