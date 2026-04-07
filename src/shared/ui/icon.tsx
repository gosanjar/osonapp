import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

const Icon = ({
  icon,
  size = 18,
  color,
  ...props
}: {
  icon: IconSvgElement
  size?: number
  color?: string
}) => <HugeiconsIcon icon={icon} size={size} color={color} {...props} />

export default Icon
