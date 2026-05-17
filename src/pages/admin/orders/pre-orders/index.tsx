import Flex from "@shared/flex"
import { columns } from "./columns"
import { DataTable } from "@/shared/ui/data-table/data-table"
import type { Order } from "@/entities/order/types"
import { orderMocks } from "@/mocks/order-mocks"
import NoResults from "@/features/no-results"

const PreOrders = () => {
  return (
    <Flex direction="column">
      {orderMocks(5).length > 0 ? (
        <DataTable<Order, unknown> columns={columns} data={orderMocks(5)} />
      ) : (
        <NoResults
          title="Buyurtmalaringizni boshqaring"
          content="Bu erda siz oldindan buyurtma berishni boshqarishingiz mumkin"
        />
      )}
    </Flex>
  )
}

export default PreOrders
