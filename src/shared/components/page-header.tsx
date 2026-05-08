import type { ReactNode } from "react"
import Flex from "@/shared/ui/flex"

interface PageHeaderProps {
  title: string
  children?: ReactNode
}

export default function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <Flex justify="between" align="center" className="w-full">
      <h1 className="text-2xl font-bold">{title}</h1>
      {children && <Flex>{children}</Flex>}
    </Flex>
  )
}
