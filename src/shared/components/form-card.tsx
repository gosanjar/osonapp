import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import Flex from "@/shared/ui/flex"

interface FormCardProps {
  title: string
  children: ReactNode
  className?: string
}

export default function FormCard({ title, children, className }: FormCardProps) {
  return (
    <Card className={`w-full ${className ?? ""}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex direction="column" gap={4} className="w-full">
          {children}
        </Flex>
      </CardContent>
    </Card>
  )
}
