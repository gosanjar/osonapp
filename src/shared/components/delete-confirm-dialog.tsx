import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog"

type DeleteConfirmDialogProps = {
  onConfirm: () => void
  isPending?: boolean
}

export function DeleteConfirmDialog({ onConfirm, isPending }: DeleteConfirmDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1.5 text-sm font-medium text-destructive hover:text-destructive/80">
          <Trash2 size={14} />
          O'chirish
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>O'chirishni tasdiqlang</DialogTitle>
          <DialogDescription>
            Bu amalni qaytarib bo'lmaydi. Ma'lumot butunlay o'chirib tashlanadi.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
