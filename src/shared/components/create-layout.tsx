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
  onSave?: () => void
  children: ReactNode
}

export default function CreateLayout<T extends FieldValues>({
  form,
  title,
  saveLabel,
  onSave,
  children,
}: CreateLayoutProps<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={onSave} autoComplete="off" noValidate className="w-full">
        <input type="password" autoComplete="new-password" className="hidden" aria-hidden="true" />
        <Flex direction="column" className="w-full" gap={4}>
          <PageHeader title={title}>
            <CancelButton />
            <SaveButton type="submit">{saveLabel}</SaveButton>
          </PageHeader>

          <hr className="w-full" />

          {children}
        </Flex>
      </form>
    </FormProvider>
  )
}
