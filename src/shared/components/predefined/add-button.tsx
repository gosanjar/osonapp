import { Link } from "react-router-dom"
import { Plus } from "lucide-react"
import { Button, type ButtonProps } from "@/shared/ui/button"

interface AddButtonProps extends Omit<ButtonProps, "children"> {
  to?: string
  label?: string
}

export default function AddButton({
  to,
  label = "Qo'shish",
  size = "default",
  ...props
}: AddButtonProps) {
  if (to) {
    return (
      <Button size={size} asChild {...props}>
        <Link to={to}>
          <Plus />
          {label}
        </Link>
      </Button>
    )
  }
  return (
    <Button size={size} {...props}>
      <Plus />
      {label}
    </Button>
  )
}
