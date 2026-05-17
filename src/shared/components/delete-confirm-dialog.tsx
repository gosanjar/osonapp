import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/shared/ui/button"
import Modal from "./modal"

type DeleteConfirmDialogProps = {
  onConfirm: () => void
  isPending?: boolean
}

export function DeleteConfirmDialog({ onConfirm, isPending }: DeleteConfirmDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button variant="ghost" className="flex items-center gap-1.5 text-sm font-medium text-destructive hover:text-destructive/80">
          <Trash2 size={14} />
          O'chirish
        </Button>
      }
      title="O'chirishni tasdiqlang"
      description="Bu amalni qaytarib bo'lmaydi. Ma'lumot butunlay o'chirib tashlanadi."
      footer={
        <>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Bekor qilish
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() => { onConfirm(); setOpen(false) }}
          >
            {isPending ? "O'chirilmoqda..." : "O'chirish"}
          </Button>
        </>
      }
    />
  )
}
