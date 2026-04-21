import { Plus } from "lucide-react"
import { Button, type ButtonProps } from "../button"
import { Link } from "react-router-dom"

const AddButton = ({ to, ...props }: { to?: string } & ButtonProps) => (
  <Button size="lg" asChild={!!to} {...props}>
    {to ? (
      <Link to={to} className="flex items-center gap-2">
        <Plus size={18} /> Qo'shish
      </Link>
    ) : (
      <span className="flex items-center gap-2">
        <Plus size={18} /> Qo'shish
      </span>
    )}
  </Button>
)

export default AddButton
