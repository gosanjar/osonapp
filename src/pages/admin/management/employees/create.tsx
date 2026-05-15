import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { EmployeesApi } from "@/entities/employees/api"
import type { EmployeeCreateData } from "@/entities/employees/types"
import { RolesApi } from "@/entities/roles/api"
import { getApiError } from "@/shared/api"
import { Input } from "@/shared/ui/input"
import { PhoneInput } from "@/shared/ui/phone-input"
import { Checkbox } from "@/shared/ui/checkbox"
import { Label } from "@/shared/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { FormControl } from "@/shared/ui/form-control"
import Flex from "@/shared/ui/flex"
import CreateLayout from "@/shared/components/create-layout"
import FormCard from "@/shared/components/form-card"
import { ROUTES } from "@/shared/config/routes"

const EmployeeCreate = () => {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const form = useForm<EmployeeCreateData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      password: "",
      staff_role: "",
      is_active: false,
    },
  })

  const { data: rolesData } = useQuery({
    queryKey: ["roles"],
    queryFn: () => RolesApi.list(),
  })

  const { data: employeeData } = useQuery({
    queryKey: ["employee", id],
    queryFn: () => EmployeesApi.get(id!),
    enabled: isEdit,
  })

  useEffect(() => {
    if (employeeData?.data) {
      const e = employeeData.data
      form.reset({
        first_name: e.first_name,
        last_name: e.last_name,
        phone_number: e.phone_number,
        password: "",
        staff_role: String(e.staff_role),
        is_active: e.is_active,
      })
    }
  }, [employeeData])

  const { mutate: save, isPending } = useMutation({
    mutationFn: (data: EmployeeCreateData) =>
      isEdit ? EmployeesApi.update(id!, data) : EmployeesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] })
      navigate(ROUTES.MANAGEMENT_EMPLOYEES)
    },
    onError: (err) => {
      form.setError("root", {
        message: getApiError(err, "Xatolik yuz berdi") ?? undefined,
      })
    },
  })

  const isActive = form.watch("is_active")
  const roles = rolesData?.data?.results ?? []

  return (
    <CreateLayout
      form={form}
      title="Xodimlar"
      saveLabel={isPending ? "Saqlanmoqda..." : undefined}
      onSave={form.handleSubmit((data) => save(data))}
    >
      <FormCard title="Umumiy">
        <Input type="text" autoComplete="username" className="hidden" aria-hidden="true" />
        <Input type="password" autoComplete="new-password" className="hidden" aria-hidden="true" />
        {form.formState.errors.root && (
          <p className="text-sm text-destructive">
            {form.formState.errors.root.message}
          </p>
        )}

        <div className="grid w-full grid-cols-2 gap-4">
          <FormControl<EmployeeCreateData>
            name="first_name"
            label="Ism"
            required
          >
            <Input placeholder="Ism" />
          </FormControl>
          <FormControl<EmployeeCreateData>
            name="last_name"
            label="Familiya"
            required
          >
            <Input placeholder="Familiya" />
          </FormControl>
        </div>

        <div className="grid w-full grid-cols-2 gap-4">
          <FormControl<EmployeeCreateData>
            name="phone_number"
            label="Telefon raqami"
            required
          >
            <PhoneInput placeholder="901234567" />
          </FormControl>

          <FormControl<EmployeeCreateData>
            name="password"
            label="Parol"
            required={!isEdit}
            labelRight={
              isEdit ? (
                <span className="text-xs text-muted-foreground">
                  (o'zgartirmasangiz bo'sh qoldiring)
                </span>
              ) : undefined
            }
          >
            <Input
              type="password"
              placeholder="Parol"
              autoComplete="new-password"
              data-lpignore="true"
              data-form-type="other"
            />
          </FormControl>
        </div>

        <Controller
          control={form.control}
          name="staff_role"
          rules={{ required: "Maydon to'ldirilishi shart" }}
          render={({ field, fieldState: { error } }) => (
            <div className="flex w-full flex-col gap-1.5">
              <Label>
                Rol <span className="text-destructive">*</span>
              </Label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Rol tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r.id} value={String(r.id)}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {error && (
                <p className="text-xs text-destructive">{error.message}</p>
              )}
            </div>
          )}
        />

        <Flex align="center" gap={4} className="w-full">
          <Checkbox
            id="is_active"
            checked={isActive}
            onCheckedChange={(v) => form.setValue("is_active", !!v)}
          />
          <Label htmlFor="is_active" className="cursor-pointer">
            Faol
          </Label>
        </Flex>
      </FormCard>
    </CreateLayout>
  )
}

export default EmployeeCreate
