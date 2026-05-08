import Flex from "@/shared/ui/flex"
import AddButton from "@/shared/ui/predefined/add-button"
import { ROUTES } from "@/shared/config/routes"
import { Card, CardContent } from "@/shared/ui/card"

const GiftPromotions = () => {
  return (
    <Flex direction="column" className="w-full" gap={4}>
      <Flex justify="between" align="center" className="w-full">
        <h1 className="text-2xl font-bold">Sovg'alar</h1>
        <AddButton to={ROUTES.MARKETING_GIFT_PROMOTIONS_CREATE} />
      </Flex>

      <Card className="w-full">
        <CardContent>
          <Flex
            direction="column"
            align="center"
            gap={3}
            className="w-full py-8"
          >
            <img src="/illustrations/26.svg" alt="" className="h-48" />
            <span className="text-lg font-semibold">
              Sovg'ali aksiyalar yo'q
            </span>
            <span className="text-center text-sm text-muted-foreground">
              Xarid qilganda mijozlarni bepul sovg'alar bilan xursand qilish
              uchun aksiya yarating.
            </span>
            <AddButton to={ROUTES.MARKETING_GIFT_PROMOTIONS_CREATE} />
          </Flex>
        </CardContent>
      </Card>
    </Flex>
  )
}

export default GiftPromotions
