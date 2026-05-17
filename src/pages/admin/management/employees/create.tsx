import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { EmployeesApi } from "@/entities/employees/api"
import type { EmployeeCreateData } from "@/entities/employees/types"
import { RolesApi } from "@/entities/roles/api"
import { getApiError } from "@/shared/api"
import { Input } from "@/shared/ui/input"
import { PasswordInput } from "@shared/password-input"
import { PhoneFormControl } from "@shared/phone-form-control"
import { CheckboxInput } from "@shared/checkbox-input"
import { SelectInput } from "@shared/select-input"
import { FormControl } from "@shared/form-control"
import CreateLayout from "@shared/create-layout"
import Card from "@shared/card"
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

  const roles = rolesData?.data?.results ?? []

  return (
    <CreateLayout
      form={form}
      title="Xodimlar"
      saveLabel={isPending ? "Saqlanmoqda..." : undefined}
      onSave={form.handleSubmit((data) => save(data))}
    >
      <Card title="Umumiy" gap={4}>
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
          <PhoneFormControl<EmployeeCreateData>
            name="phone_number"
          />

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
            <PasswordInput
              placeholder="Parol"
              autoComplete="new-password"
              data-lpignore="true"
              data-form-type="other"
            />
          </FormControl>
        </div>

        <FormControl<EmployeeCreateData>
          name="staff_role"
          label="Rol"
          required
        >
          <SelectInput
            placeholder="Rol tanlang"
            options={roles.map((r) => ({
              value: String(r.id),
              label: r.name,
            }))}
          />
        </FormControl>

        <FormControl<EmployeeCreateData> name="is_active">
          <CheckboxInput label="Faol" />
        </FormControl>
      </Card>
    </CreateLayout>
  )
}

export default EmployeeCreate
