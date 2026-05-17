import { useNavigate } from "react-router-dom"
import { Button, type ButtonProps } from "@/shared/ui/button"

interface CancelButtonProps extends ButtonProps {
  label?: string
}

export function CancelButton({
  label = "Bekor qilish",
  size = "default",
  variant = "outline",
  onClick,
  ...props
}: CancelButtonProps) {
  const navigate = useNavigate()
  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      onClick={onClick ?? (() => navigate(-1))}
      {...props}
    >
      {label}
    </Button>
  )
}
