import { cn } from "@utils/utils"

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column" | "row-reverse" | "column-reverse"
  align?: "start" | "center" | "end" | "stretch" | "baseline"
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  wrap?: "wrap" | "nowrap" | "wrap-reverse"
  gap?: number
  children: React.ReactNode
}

const justifyMap: Record<NonNullable<FlexProps["justify"]>, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
}

const alignMap: Record<NonNullable<FlexProps["align"]>, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
}

const Flex = ({
  direction = "row",
  align = "start",
  justify = "start",
  wrap = "nowrap",
  gap = 2.5,
  className,
  children,
  ...props
}: FlexProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        alignItems: alignMap[align],
        justifyContent: justifyMap[justify],
        flexWrap: wrap,
        gap: gap * 4,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  )
}

export default Flex
