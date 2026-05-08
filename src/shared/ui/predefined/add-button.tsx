import { Plus } from "lucide-react"
import { Button, type ButtonProps } from "../button"
import { Link } from "react-router-dom"

const AddButton = ({
  to,
  label = "Qo'shish",
  ...props
}: { to?: string; label?: string } & ButtonProps) => (
  <Button size="lg" asChild={!!to} {...props}>
    {to ? (
      <Link to={to} className="flex items-center gap-2">
        <Plus size={18} /> {label}
      </Link>
    ) : (
      <span className="flex items-center gap-2">
        <Plus size={18} /> {label}
      </span>
    )}
  </Button>
)

export default AddButton
