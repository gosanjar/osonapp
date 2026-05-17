import { CirclePlay } from "lucide-react"
import { Button, type ButtonProps } from "@/shared/ui/button"

interface GuideButtonProps extends ButtonProps {
  label?: string
}

export default function GuideButton({
  label = "Qo'llanma",
  size = "default",
  variant = "outline",
  ...props
}: GuideButtonProps) {
  return (
    <Button size={size} variant={variant} {...props}>
      <CirclePlay />
      {label}
    </Button>
  )
}
