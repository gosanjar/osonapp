import type { ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/shared/ui/dialog"
import { cn } from "@utils/utils"

interface ModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: ReactNode
  title?: ReactNode
  description?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  className?: string
}

export default function Modal({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  className,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={cn("max-w-lg", className)}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </DialogHeader>
        )}
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}
