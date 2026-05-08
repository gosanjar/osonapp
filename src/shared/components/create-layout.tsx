import type { ReactNode } from "react"
import type { UseFormReturn, FieldValues } from "react-hook-form"
import { FormProvider } from "react-hook-form"
import Flex from "@/shared/ui/flex"
import PageHeader from "./page-header"
import { CancelButton, SaveButton } from "@/shared/ui/predefined"

interface CreateLayoutProps<T extends FieldValues> {
  form: UseFormReturn<T>
  title: string
  saveLabel?: string
  children: ReactNode
}

export default function CreateLayout<T extends FieldValues>({
  form,
  title,
  saveLabel,
  children,
}: CreateLayoutProps<T>) {
  return (
    <FormProvider {...form}>
      <Flex direction="column" className="w-full" gap={4}>
        <PageHeader title={title}>
          <CancelButton />
          <SaveButton>{saveLabel}</SaveButton>
        </PageHeader>

        <hr className="w-full" />

        {children}
      </Flex>
    </FormProvider>
  )
}
