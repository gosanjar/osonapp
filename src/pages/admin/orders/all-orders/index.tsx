import type { Order } from "@/entities/order/types"
import { orderMocks } from "@/mocks/order-mocks"
import { Button } from "@/shared/ui/button"
import { DataTable } from "@/shared/ui/data-table/data-table"
import Flex from "@shared/flex"
import { Send } from "lucide-react"
import { columns } from "../pre-orders/columns"
import GuideButton from "@shared/predefined/guide-button"

const AllOrders = () => {
  return (
    <Flex direction="column">
      <Flex justify="end">
        <GuideButton />
        <Button size="lg" variant="outline">
          <Send size={18} strokeWidth={2} />
        </Button>
      </Flex>

      {
        <DataTable<Order, unknown>
          columns={columns}
          data={orderMocks(5)}
          noResultsTitle="Buyurtmalaringizni boshqaring"
          noResultsContent="Bu erda siz oʻz buyurtmalaringizni koʻrishingiz, oʻzgartirishingiz va bashqarishingiz mumkin."
        />
      }
    </Flex>
  )
}

export default AllOrders
