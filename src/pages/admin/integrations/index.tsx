import Flex from "@/shared/ui/flex"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"

const Integrations = () => {
  return (
    <Flex direction="column" className="w-full" gap={4}>
      <h1 className="text-2xl font-bold">Integratsiyalar</h1>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Facebook Pixel</CardTitle>
        </CardHeader>
        <CardContent>
          <Flex align="start" gap={3} className="w-full">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 border border-blue-100">
              <svg viewBox="0 0 24 24" className="size-5 text-blue-600 fill-blue-600">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>
            <Flex direction="column" gap={1} className="w-full max-w-sm">
              <Label>Facebook Pixel ID</Label>
              <Input name="pixelId" placeholder="123456789012345" className="w-full" />
              <p className="text-xs text-muted-foreground">
                Facebook Pixel raqamli ID raqamingizni kiriting (15–16 raqam). Uni Meta Events Manager-da topishingiz mumkin.
              </p>
            </Flex>
          </Flex>
        </CardContent>
      </Card>
    </Flex>
  )
}

export default Integrations
