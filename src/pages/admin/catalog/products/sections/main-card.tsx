import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import Editor from "@/shared/ui/editor"
import Flex from "@/shared/ui/flex"
import { Input } from "@/shared/ui/input"
import { Sparkles } from "lucide-react"

export default function MainCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <span className="text-base font-semibold">Asosiy ma'lumotlar</span>
      </CardHeader>
      <CardContent>
        <Flex direction="column" gap={4} className="w-full">
          <Input
            placeholder="Masalan: Samsung Galaxy S23 smartfoni"
            label="O'zbek tilida nomi"
          />
          <Input
            placeholder="Masalan: Samsung Galaxy S23 smartfoni"
            label="Rus tilida nomi"
          />
          <Flex direction="column" className="w-full">
            <Flex align="center" justify="between" className="w-full">
              <span>Tavsif</span>
              <Button variant="outline">
                <Sparkles />
                AI Tavsif
              </Button>
            </Flex>
            <Editor />
          </Flex>
        </Flex>
      </CardContent>
    </Card>
  )
}
