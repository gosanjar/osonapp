import { useState } from "react"
import { useForm } from "react-hook-form"
import Flex from "@/shared/ui/flex"
import { Card, CardContent } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"

type BotForm = {
  token: string
  name: string
  menuLabel: string
}

function ConnectDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const form = useForm<BotForm>({
    defaultValues: { token: "", name: "", menuLabel: "" },
  })

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Telegram botni ulash</DialogTitle>
        </DialogHeader>

        <Flex direction="column" gap={4} className="w-full">
          <Flex direction="column" gap={4} className="w-full">
            <Flex align="center" gap={1}>
              <Label>Token</Label>
              <span className="text-destructive">*</span>
            </Flex>
            <Input
              {...form.register("token", { required: true })}
              placeholder="5117853047:AAGetzMGMK"
              className="w-full"
            />
          </Flex>

          <Flex direction="column" gap={4} className="w-full">
            <Flex align="center" gap={1}>
              <Label>Nomi</Label>
              <span className="text-destructive">*</span>
            </Flex>
            <Input
              {...form.register("name", { required: true })}
              placeholder="Shoppy_bot"
              className="w-full"
            />
          </Flex>

          <Flex direction="column" gap={4} className="w-full">
            <Flex align="center" gap={1}>
              <Label>Menu o'rniga ko'rsatiladigan tugma sarlavhasini kiriting.</Label>
              <span className="text-destructive">*</span>
            </Flex>
            <Input
              {...form.register("menuLabel", { required: true })}
              placeholder="Katalog"
              className="w-full"
            />
          </Flex>

          <Flex align="center" justify="between" gap={4} className="w-full">
            <Button
              variant="default"
              className="bg-foreground text-background hover:bg-foreground/90"
              onClick={onClose}
            >
              Yopish
            </Button>
            <Button onClick={() => form.handleSubmit(() => onClose())()}>
              Telegram botni ulash
            </Button>
          </Flex>
        </Flex>
      </DialogContent>
    </Dialog>
  )
}

const TelegramConnect = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Flex direction="column" className="w-full" gap={4}>
      <Flex align="center" justify="between" className="w-full">
        <h1 className="text-2xl font-bold">Telegram boti</h1>
        <Button onClick={() => setDialogOpen(true)}>Telegram botni ulash</Button>
      </Flex>

      <Card className="w-full">
        <CardContent>
          <Flex direction="column" align="center" gap={4} className="w-full py-12">
            <span className="text-xl font-bold">Botingizni osonlik bilan boshqaring</span>
            <span className="text-sm text-muted-foreground text-center max-w-md">
              Telegram botingizni ulash uchun Telegram botni ulash tugmani bosing
            </span>
            <img src="/illustrations/26.svg" alt="" className="h-56 opacity-90" />
          </Flex>
        </CardContent>
      </Card>

      <ConnectDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Flex>
  )
}

export default TelegramConnect
