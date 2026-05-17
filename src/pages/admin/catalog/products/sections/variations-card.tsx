import { Button } from "@/shared/ui/button"
import Card from "@shared/card"
import { Separator } from "@/shared/ui/separator"
import { PlusIcon } from "lucide-react"

export default function VariationsCard() {
  return (
    <Card title="Variatsiyalar" gap={4}>
      <Separator />
      <Button variant="outline" className="w-full" onClick={() => {}}>
        <PlusIcon />
        O'lcham yoki rang kabi variantlar qo'shish
      </Button>
    </Card>
  )
}
