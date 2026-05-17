import type { ReactNode } from "react"
import {
  Card as BaseCard,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
  CardDescription,
} from "@/shared/ui/card"
import Flex from "./flex"
import { cn } from "@utils/utils"

interface CardProps {
  title?: ReactNode
  action?: ReactNode
  description?: ReactNode
  children: ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
  /** Ichidagi elementlar orasidagi bo'shliq (Flex gap). Form fieldlari uchun gap={4} */
  gap?: number
}

export default function Card({
  title,
  action,
  description,
  children,
  className,
  headerClassName,
  contentClassName,
  gap,
}: CardProps) {
  return (
    <BaseCard className={cn("w-full", className)}>
      {(title || action) && (
        <CardHeader className={headerClassName}>
          {title && <CardTitle>{title}</CardTitle>}
          {action && <CardAction>{action}</CardAction>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={contentClassName}>
        {gap !== undefined ? (
          <Flex direction="column" gap={gap}>
            {children}
          </Flex>
        ) : (
          children
        )}
      </CardContent>
    </BaseCard>
  )
}
