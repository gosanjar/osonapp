import type { Customer } from "@/entities/customer/types"
import { customerMocks } from "@/mocks/customer-mocks"
import { DataTable } from "@/shared/ui/data-table/data-table"
import Flex from "@/shared/ui/flex"
import AddButton from "@/shared/ui/predefined/add-button"
import { columns } from "./columns"

const AllCustomers = () => {
  return (
    <Flex direction="column" className="w-full">
      <Flex justify="end" className="w-full">
        <AddButton />
      </Flex>

      <DataTable<Customer, unknown>
        columns={columns}
        data={customerMocks(15)}
        noResultsTitle="Mijozlar topilmadi"
        noResultsContent="Bu erda siz o'z mijozlaringizni ko'rishingiz va boshqarishingiz mumkin."
      />
    </Flex>
  )
}

export default AllCustomers
