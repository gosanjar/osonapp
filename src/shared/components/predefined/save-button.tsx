import type { ReactNode } from "react"
import { Button, type ButtonProps } from "@/shared/ui/button"

interface SaveButtonProps extends ButtonProps {
  children?: ReactNode
  isPending?: boolean
}

export function SaveButton({
  children,
  isPending,
  disabled,
  size = "default",
  type = "submit",
  ...props
}: SaveButtonProps) {
  return (
    <Button type={type} size={size} disabled={isPending || disabled} {...props}>
      {children ?? "Saqlash"}
    </Button>
  )
}
