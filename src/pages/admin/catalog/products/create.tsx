import { Button } from "@/shared/ui/button"
import Flex from "@/shared/ui/flex"
import { CancelButton } from "@/shared/ui/predefined"
import MediaCard from "./sections/media-card"
import VideoCard from "./sections/video-card"
import PriceCard from "./sections/price-card"
import InventoryCard from "./sections/inventory-card"
import VariationsCard from "./sections/variations-card"
import MainCard from "./sections/main-card"
import { FormProvider, useForm } from "react-hook-form"
import { ProductSidebar } from "./sections/product-sidebar"

const CreateProduct = () => {
  const form = useForm()

  return (
    <FormProvider {...form}>
      <form className="w-full">
        <Flex direction="column" className="w-full" gap={4}>
          <Flex justify="between" align="center" className="w-full">
            <Flex direction="column" gap={0}>
              <h1 className="text-2xl font-bold">Mahsulot qo'shish</h1>
              <span className="text-sm">
                Mahsulot tafsilotlarini to'ldiring
              </span>
            </Flex>
            <Flex>
              <CancelButton />
              <Button size="lg">Saqlash</Button>
            </Flex>
          </Flex>

          <hr className="w-full" />

          <div className="grid w-full grid-cols-3 gap-4">
            <Flex className="col-span-2" direction="column" gap={4}>
              <MainCard />
              <MediaCard />
              <VideoCard />
              <PriceCard />
              <InventoryCard />
              <VariationsCard />
            </Flex>
            <Flex className="col-span-1" direction="column">
              <ProductSidebar />
            </Flex>
          </div>
        </Flex>
      </form>
    </FormProvider>
  )
}

export default CreateProduct
