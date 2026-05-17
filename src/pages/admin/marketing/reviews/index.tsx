import Flex from "@shared/flex"
import { Card, CardContent } from "@/shared/ui/card"

const Reviews = () => {
  return (
    <Flex direction="column" gap={4}>
      <h1 className="text-2xl font-bold">Izohlar</h1>

      <Card className="w-full">
        <CardContent>
          <Flex direction="column" align="center" gap={3} className="py-8">
            <img src="/illustrations/26.svg" alt="" className="h-48" />
            <span className="text-lg font-semibold">Fikr-mulohazalarni to'plang</span>
            <span className="text-sm text-muted-foreground text-center">
              Do'koningizga bo'lgan ishonchni oshirish uchun mijozlardan tajribalarini bo'lishishni so'rang.
            </span>
          </Flex>
        </CardContent>
      </Card>
    </Flex>
  )
}

export default Reviews
