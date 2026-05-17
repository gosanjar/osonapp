import type { LucideIcon } from "lucide-react"

const Icon = ({
  icon: IconComponent,
  size = 18,
  color,
  className,
  strokeWidth = 2,
}: {
  icon: LucideIcon
  size?: number
  color?: string
  strokeWidth?: number
  className?: string
}) => (
  <IconComponent
    size={size}
    color={color}
    className={`shrink-0 ${className ?? ""}`}
    strokeWidth={strokeWidth}
  />
)

export default Icon
