import Flex from "@/shared/ui/flex"
import { SaveButton } from "@/shared/ui/predefined"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { Label } from "@/shared/ui/label"
import {
  UserRound,
  ShoppingBag,
  Crown,
  MessageSquare,
  ArrowRight,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/shared/config/routes"

const rules = [
  {
    icon: UserRound,
    title: "Ro'yxatdan o'tish",
    description: "Botda ro'yxatdan o'tgan mijozlarni mukofotlang",
    soon: false,
    path: ROUTES.MARKETING_REWARD_POINTS_CREATE_ACCOUNT,
  },
  {
    icon: ShoppingBag,
    title: "Xarid uchun ballar",
    description: "Buyurtma berganlik uchun sodiqlik ballarini taklif qiling",
    soon: false,
    path: ROUTES.MARKETING_REWARD_POINTS_PLACE_ORDER,
  },
  {
    icon: Crown,
    title: "X sarflang, Y oling",
    description:
      "Mijozlarni ko'proq xarid qilishga undang va ularni mukofotlang",
    soon: false,
    path: ROUTES.MARKETING_REWARD_POINTS_GOAL_SPEND,
  },
  {
    icon: MessageSquare,
    title: "Mahsulot haqida sharh yozing",
    description: "Har bir mahsulot sharhi uchun ball oling",
    soon: true,
    path: "",
  },
]

const RewardPoints = () => {
  const navigate = useNavigate()

  return (
    <Flex direction="column" className="w-full" gap={4}>
      <Flex justify="between" align="center" className="w-full">
        <h1 className="text-2xl font-bold">Ballar</h1>
        <Button
          variant="outline"
          className="border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          Sodiqlik dasturi o'chirilgan
        </Button>
      </Flex>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Ballar to'plang</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {rules.map((rule) => (
              <Flex
                key={rule.title}
                align="center"
                justify="between"
                className="px-6 py-4"
              >
                <Flex align="center" gap={3}>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <rule.icon size={18} className="text-muted-foreground" />
                  </div>
                  <Flex direction="column" gap={0}>
                    <Flex align="center" gap={2}>
                      <span className="font-semibold">{rule.title}</span>
                      {rule.soon && (
                        <Badge className="text-xs">Tez orada!</Badge>
                      )}
                    </Flex>
                    <span className="text-sm text-muted-foreground">
                      {rule.description}
                    </span>
                  </Flex>
                </Flex>

                {rule.soon ? (
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    Tez orada! <ArrowRight size={14} />
                  </span>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(rule.path)}
                  >
                    Sozlash <ArrowRight size={14} />
                  </Button>
                )}
              </Flex>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Ballarni konvertatsiya kursi</CardTitle>
        </CardHeader>
        <CardContent>
          <Flex direction="column" gap={4} className="w-full">
            <Flex align="center" gap={3}>
              <span className="shrink-0 text-sm font-medium">1 ball =</span>
              <Input
                name="rate"
                type="number"
                defaultValue="1"
                className="w-36"
              />
              <span className="text-sm text-muted-foreground">UZS</span>
            </Flex>
            <Flex justify="end" className="w-full">
              <SaveButton />
            </Flex>
          </Flex>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Keshbekni ishlatish qoidalari</CardTitle>
        </CardHeader>
        <CardContent>
          <Flex direction="column">
            <div className="grid w-full grid-cols-3 gap-4">
              <Flex direction="column" className="w-full">
                <Label>Minimal foydalanish (ball)</Label>
                <Input name="minUsage" type="number" defaultValue="0" />
              </Flex>
              <Flex direction="column" className="w-full">
                <Label>Buyurtma summasidan maksimum (%)</Label>
                <Input name="maxPercent" type="number" defaultValue="100" />
              </Flex>
              <Flex direction="column" className="w-full">
                <Label>Kiritish qadami</Label>
                <Input name="step" type="number" defaultValue="1" />
              </Flex>
            </div>
            <Flex justify="end" className="w-full">
              <SaveButton />
            </Flex>
          </Flex>
        </CardContent>
      </Card>
    </Flex>
  )
}

export default RewardPoints
