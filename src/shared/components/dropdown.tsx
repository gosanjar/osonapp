import type { ReactNode } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"

export interface DropdownItem {
  label: ReactNode
  onClick?: () => void
  className?: string
}

interface DropdownProps {
  trigger: ReactNode
  items: DropdownItem[]
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
}

export default function Dropdown({ trigger, items, align, side }: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align={align} side={side}>
        {items.map((item, i) => (
          <DropdownMenuItem key={i} onClick={item.onClick} className={item.className}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
