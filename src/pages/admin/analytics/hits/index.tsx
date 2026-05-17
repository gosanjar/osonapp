import Flex from "@shared/flex"
import Card from "@shared/card"
import { Button } from "@/shared/ui/button"
import { ROUTES } from "@/shared/config/routes"
import { useNavigate } from "react-router-dom"

const Hits = () => {
  const navigate = useNavigate()

  return (
    <Flex direction="column" gap={4}>
      <h1 className="text-2xl font-bold">Ko'rishlar bo'yicha analitika</h1>

      <Card>
        <Flex direction="column" align="center" gap={3} className="py-8">
          <img src="/illustrations/1.svg" alt="" className="h-48 opacity-80" />
          <span className="text-lg font-semibold text-center">
            Savdo, davomat va konversiya bo'yicha batafsil tahlillarni oling
          </span>
          <span className="text-sm text-muted-foreground text-center">
            Ushbu xususiyat bizning Growth tarifida mavjud
          </span>
          <Button onClick={() => navigate(ROUTES.PRICING)}>
            Growth-ga o'ting
          </Button>
        </Flex>
      </Card>
    </Flex>
  )
}

export default Hits
