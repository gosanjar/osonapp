import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

const Icon = ({
  icon,
  size = 18,
  color,
  className,
  strokeWidth,
  ...props
}: {
  icon: IconSvgElement
  size?: number
  color?: string
  strokeWidth?: number
  className?: string
}) => (
  <HugeiconsIcon
    icon={icon}
    size={size}
    color={color}
    className={`shrink-0 ${className || ""}`}
    strokeWidth={strokeWidth}
    {...props}
  />
)

export default Icon
