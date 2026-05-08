import { DataTable } from "@/shared/ui/data-table/data-table"
import Flex from "@/shared/ui/flex"
import AddButton from "@/shared/ui/predefined/add-button"
import GuideButton from "@/shared/ui/predefined/guide-button"
import { columns, type Recommendation } from "./columns"

const data: Recommendation[] = []

const Recommendations = () => {
  return (
    <Flex direction="column" className="w-full" gap={4}>
      <Flex justify="between" align="center" className="w-full">
        <h1 className="text-2xl font-bold">Mahsulot tavsiyalari</h1>
        <Flex>
          <GuideButton />
          <AddButton label="Mahsulot tavsiyasini qo'shing" />
        </Flex>
      </Flex>

      <DataTable
        columns={columns}
        data={data}
        noResultsTitle="Bu erda siz mijozlaringizga ideal xaridlarini topishda yordam berish uchun mahsulotlar turlari bo'yicha tavsiyalar qo'shishingiz mumkin"
        noResultsContent="Turli toifadagi mahsulotlar uchun tavsiyalar yarating, mijozlaringizni qiziqtirishi mumkin bo'lgan o'xshash yoki qo'shimcha mahsulotlarni taklif qiling"
      />
    </Flex>
  )
}

export default Recommendations
