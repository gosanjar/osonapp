import Flex from "@/shared/ui/flex"
import AddButton from "@/shared/ui/predefined/add-button"
import GuideButton from "@/shared/ui/predefined/guide-button"
import { ROUTES } from "@/shared/config/routes"
import { Card, CardContent } from "@/shared/ui/card"

const Newsletter = () => {
  return (
    <Flex direction="column" className="w-full" gap={4}>
      <Flex justify="between" align="center" className="w-full">
        <h1 className="text-2xl font-bold">SMS yuborish</h1>
        <Flex gap={2}>
          <GuideButton />
          <AddButton label="Yangi xabarnoma" to={ROUTES.MARKETING_NEWSLETTER_CREATE} />
        </Flex>
      </Flex>

      <Card className="w-full">
        <CardContent>
          <Flex direction="column" align="center" gap={4} className="w-full py-8">
            <img src="/illustrations/26.svg" alt="" className="h-48" />
            <span className="text-lg font-semibold text-center">
              Bu erda siz SMS-xabarlarni yuborishingiz va boshqarishingiz mumkin.
            </span>
            <AddButton label="Yangi xabarnoma" to={ROUTES.MARKETING_NEWSLETTER_CREATE} />
          </Flex>
        </CardContent>
      </Card>
    </Flex>
  )
}

export default Newsletter
