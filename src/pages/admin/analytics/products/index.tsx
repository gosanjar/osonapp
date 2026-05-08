import Flex from "@/shared/ui/flex"
import { Card, CardContent } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { ROUTES } from "@/shared/config/routes"
import { useNavigate } from "react-router-dom"

const ProductsAnalytics = () => {
  const navigate = useNavigate()

  return (
    <Flex direction="column" className="w-full" gap={4}>
      <h1 className="text-2xl font-bold">Mahsulotlar bo'yicha analitika</h1>

      <Card className="w-full">
        <CardContent>
          <Flex direction="column" align="center" gap={3} className="w-full py-8">
            <img src="/illustrations/1.svg" alt="" className="h-48 opacity-80" />
            <span className="text-lg font-semibold text-center max-w-xl">
              ABC tahlili inventarizatsiyani samarali nazorat qilish va rentabellikni oshirish uchun tovarlarni A, B, C toifalariga ajratadi.
            </span>
            <span className="text-sm text-muted-foreground text-center">
              Ushbu xususiyat bizning Growth tarifida mavjud
            </span>
            <Button onClick={() => navigate(ROUTES.PRICING)}>
              Growth-ga o'ting
            </Button>
          </Flex>
        </CardContent>
      </Card>
    </Flex>
  )
}

export default ProductsAnalytics
