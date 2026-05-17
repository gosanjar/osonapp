import { useState } from "react"
import { useForm } from "react-hook-form"
import Flex from "@shared/flex"
import Card from "@shared/card"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import Modal from "@shared/modal"

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
    <Modal open={open} onOpenChange={onClose} title="Telegram botni ulash">
      <Flex direction="column" gap={4}>
          <Input
            label={
              <>
                Token <span className="text-destructive">*</span>
              </>
            }
            {...form.register("token", { required: true })}
            placeholder="5117853047:AAGetzMGMK"
            className="w-full"
          />

          <Input
            label={
              <>
                Nomi <span className="text-destructive">*</span>
              </>
            }
            {...form.register("name", { required: true })}
            placeholder="Shoppy_bot"
            className="w-full"
          />

          <Input
            label={
              <>
                Menu o'rniga ko'rsatiladigan tugma sarlavhasini kiriting.{" "}
                <span className="text-destructive">*</span>
              </>
            }
            {...form.register("menuLabel", { required: true })}
            placeholder="Katalog"
            className="w-full"
          />

          <Flex align="center" justify="between" gap={4}>
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
    </Modal>
  )
}

const TelegramConnect = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Flex direction="column" gap={4}>
      <Flex align="center" justify="between">
        <h1 className="text-2xl font-bold">Telegram boti</h1>
        <Button onClick={() => setDialogOpen(true)}>
          Telegram botni ulash
        </Button>
      </Flex>

      <Card>
        <Flex direction="column" align="center" gap={4} className="py-12">
          <span className="text-xl font-bold">
            Botingizni osonlik bilan boshqaring
          </span>
          <span className="max-w-md text-center text-sm text-muted-foreground">
            Telegram botingizni ulash uchun Telegram botni ulash tugmani
            bosing
          </span>
          <img
            src="/illustrations/26.svg"
            alt=""
            className="h-56 opacity-90"
          />
        </Flex>
      </Card>

      <ConnectDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Flex>
  )
}

export default TelegramConnect
