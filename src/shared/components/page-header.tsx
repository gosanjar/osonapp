import type { ReactNode } from "react"
import Flex from "@shared/flex"

interface PageHeaderProps {
  title: string
  children?: ReactNode
}

export default function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <Flex justify="between" align="center">
      <h1 className="text-2xl font-bold">{title}</h1>
      {children && <Flex>{children}</Flex>}
    </Flex>
  )
}
