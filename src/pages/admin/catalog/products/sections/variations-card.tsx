import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import Flex from "@/shared/ui/flex"
import { Separator } from "@/shared/ui/separator"
import { PlusIcon } from "lucide-react"

export default function VariationsCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Variatsiyalar</CardTitle>
      </CardHeader>

      <CardContent>
        <Flex className="w-full" direction="column" gap={4}>
          <Separator />
          <Button variant="outline" className="w-full" onClick={() => {}}>
            <PlusIcon />
            O'lcham yoki rang kabi variantlar qo'shish
          </Button>
        </Flex>
      </CardContent>
    </Card>
  )
}
