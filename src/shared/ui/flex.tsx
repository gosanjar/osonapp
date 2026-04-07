import { cn } from "@utils/utils"

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "col" | "row-reverse" | "col-reverse"
  align?: "start" | "center" | "end" | "stretch" | "baseline"
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  wrap?: "wrap" | "nowrap" | "wrap-reverse"
  gap?: string | number
  children: React.ReactNode
}

const Flex = ({
  direction = "row",
  align = "center",
  justify = "start",
  wrap = "nowrap",
  gap = 2.5,
  className,
  children,
  ...props
}: FlexProps) => {
  return (
    <div
      className={cn(
        "flex",
        `flex-${direction}`,
        `items-${align}`,
        `justify-${justify}`,
        `flex-${wrap}`,
        `gap-${gap}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Flex
