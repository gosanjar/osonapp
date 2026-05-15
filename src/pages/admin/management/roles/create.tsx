import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { RolesApi } from "@/entities/roles/api"
import type { RoleCreateData, Permission } from "@/entities/roles/types"
import { getApiError } from "@/shared/api"
import { Input } from "@/shared/ui/input"
import { Checkbox } from "@/shared/ui/checkbox"
import { FormControl } from "@/shared/ui/form-control"
import Flex from "@/shared/ui/flex"
import CreateLayout from "@/shared/components/create-layout"
import FormCard from "@/shared/components/form-card"
import { ROUTES } from "@/shared/config/routes"

function groupPermissions(permissions: Permission[]) {
  return permissions.reduce<Record<string, Permission[]>>((acc, p) => {
    const match = p.key.match(/^can_([^_]+)/)
    const group = match ? match[1].toUpperCase() : "OTHER"
    if (!acc[group]) acc[group] = []
    acc[group].push(p)
    return acc
  }, {})
}

const RoleCreate = () => {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const form = useForm<RoleCreateData>({
    defaultValues: { name: "", key: "", permissions: [] },
  })

  const { data: roleData } = useQuery({
    queryKey: ["role", id],
    queryFn: () => RolesApi.get(id!),
    enabled: isEdit,
  })

  const { data: permissionsData } = useQuery({
    queryKey: ["permissions"],
    queryFn: () => RolesApi.permissions(),
  })

  useEffect(() => {
    if (roleData?.data) {
      form.reset({
        name: roleData.data.name,
        key: roleData.data.key,
        permissions: roleData.data.permissions.map((p) => p.key),
      })
    }
  }, [roleData])

  const { mutate: save, isPending } = useMutation({
    mutationFn: (data: RoleCreateData) =>
      isEdit ? RolesApi.update(id!, data) : RolesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] })
      navigate(ROUTES.MANAGEMENT_ROLES)
    },
    onError: (err) => {
      form.setError("root", {
        message: getApiError(err, "Xatolik yuz berdi") ?? undefined,
      })
    },
  })

  const allPermissions = permissionsData?.data ?? []
  const grouped = groupPermissions(allPermissions)

  return (
    <CreateLayout
      form={form}
      title="Rol"
      saveLabel={isPending ? "Saqlanmoqda..." : undefined}
      onSave={form.handleSubmit((data) => save(data))}
    >
      <Flex direction="column" gap={4} className="w-full">
        <FormCard title="Umumiy">
          {form.formState.errors.root && (
            <p className="text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
          <div className="grid w-full grid-cols-2 gap-4">
            <FormControl<RoleCreateData> name="name" label="Rol nomi" required>
              <Input placeholder="Rol nomi" />
            </FormControl>

            <Controller
              control={form.control}
              name="key"
              rules={{
                required: "Maydon to'ldirilishi shart",
                pattern: {
                  value: /^[a-z_-]+$/,
                  message: "Faqat kichik harf (a-z), _ va - belgisi",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div className="flex w-full flex-col gap-1.5">
                  <label className="text-sm font-medium">
                    Key <span className="text-destructive">*</span>
                  </label>
                  <Input
                    {...field}
                    placeholder="manager"
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/[^a-z_-]/g, "")
                      field.onChange(e)
                    }}
                  />
                  {error && (
                    <p className="text-xs text-destructive">{error.message}</p>
                  )}
                </div>
              )}
            />
          </div>
        </FormCard>

        <FormCard title="Ruxsatlar">
          <Controller
            control={form.control}
            name="permissions"
            render={({ field }) => (
              <Flex direction="column" gap={6} className="w-full">
                {Object.entries(grouped).map(([group, perms]) => (
                  <div key={group} className="w-full">
                    <p className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      {group}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {perms.map((perm) => (
                        <label
                          key={perm.id}
                          className="flex cursor-pointer items-center gap-2.5 rounded-md border border-border px-3 py-2.5 text-sm transition-colors hover:bg-muted"
                        >
                          <Checkbox
                            checked={field.value.includes(perm.key)}
                            onCheckedChange={() => {
                              const current = field.value
                              field.onChange(
                                current.includes(perm.key)
                                  ? current.filter((k) => k !== perm.key)
                                  : [...current, perm.key]
                              )
                            }}
                          />
                          {perm.label}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </Flex>
            )}
          />
        </FormCard>
      </Flex>
    </CreateLayout>
  )
}

export default RoleCreate
