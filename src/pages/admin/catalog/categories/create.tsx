import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CategoriesApi } from "@/entities/catalog/api"
import { getApiError } from "@/shared/api"
import CreateLayout from "@shared/create-layout"
import StatusCard from "@shared/status-card"
import { ROUTES } from "@/shared/config/routes"
import Card from "@shared/card"
import { FormControl } from "@shared/form-control"
import { Input } from "@/shared/ui/input"
import { SelectInput } from "@shared/select-input"
import { Button } from "@/shared/ui/button"
import { ImageIcon, X } from "lucide-react"
import Flex from "@shared/flex"

type CategoryFormData = {
  name: { uz: string; ru: string }
  parent: string
  sort_order: string
  image: string
  status: "published" | "unpublished"
}

const CreateCategory = () => {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const fileRef = useRef<HTMLInputElement | null>(null)

  const form = useForm<CategoryFormData>({
    defaultValues: {
      name: { uz: "", ru: "" },
      parent: "",
      sort_order: "0",
      image: "",
      status: "published",
    },
  })

  const image = form.watch("image")

  const { data: categoryData } = useQuery({
    queryKey: ["category", id],
    queryFn: () => CategoriesApi.get(Number(id)),
    enabled: isEdit,
  })

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoriesApi.list({ page_size: 100 }),
  })
  const categories = (categoriesData?.data?.results ?? []).filter(
    (c) => !isEdit || c.id !== Number(id)
  )

  useEffect(() => {
    if (categoryData?.data) {
      const c = categoryData.data
      form.reset({
        name: c.name,
        parent: c.parent ? String(c.parent) : "",
        sort_order: String(c.sort_order),
        image: c.image ?? "",
        status: c.is_active ? "published" : "unpublished",
      })
    }
  }, [categoryData])

  const { mutate: save, isPending } = useMutation({
    mutationFn: (values: CategoryFormData) => {
      const data = {
        name: values.name,
        parent: values.parent ? Number(values.parent) : null,
        sort_order: Number(values.sort_order) || 0,
        image: values.image || null,
        is_active: values.status === "published",
      }
      return isEdit
        ? CategoriesApi.update(Number(id), data)
        : CategoriesApi.create(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      navigate(ROUTES.CATALOG_CATEGORIES)
    },
    onError: (err) => {
      form.setError("root", {
        message: getApiError(err, "Xatolik yuz berdi") ?? undefined,
      })
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    form.setValue("image", url)
    e.target.value = ""
  }

  const removeImage = () => {
    const current = form.getValues("image")
    if (current.startsWith("blob:")) URL.revokeObjectURL(current)
    form.setValue("image", "")
  }

  return (
    <CreateLayout
      form={form}
      title={isEdit ? "Kategoriyani tahrirlash" : "Kategoriya qo'shish"}
      saveLabel={isPending ? "Saqlanmoqda..." : undefined}
      onSave={form.handleSubmit((data) => save(data))}
    >
      {form.formState.errors.root && (
        <p className="text-sm text-destructive">
          {form.formState.errors.root.message}
        </p>
      )}

      <div className="grid w-full grid-cols-3 gap-4">
        <Flex className="col-span-2" direction="column" gap={4}>
          <Card title="Asosiy ma'lumotlar" gap={4}>
            <FormControl<CategoryFormData>
              name="name.uz"
              label="O'zbek tilida nomi"
              required
            >
              <Input placeholder="Masalan: Elektronika" />
            </FormControl>

            <FormControl<CategoryFormData>
              name="name.ru"
              label="Rus tilida nomi"
            >
              <Input placeholder="Например: Электроника" />
            </FormControl>

            <FormControl<CategoryFormData>
              name="parent"
              label="Yuqori kategoriya"
            >
              <SelectInput
                placeholder="Yuqori kategoriyani tanlang"
                options={[
                  { value: "0", label: "Yo'q" },
                  ...categories.map((c) => ({
                    value: String(c.id),
                    label: c.name.uz,
                  })),
                ]}
              />
            </FormControl>

            <FormControl<CategoryFormData>
              name="sort_order"
              label="Tartib raqami"
            >
              <Input type="number" min={0} placeholder="0" />
            </FormControl>
          </Card>
        </Flex>

        <Flex className="col-span-1" direction="column" gap={4}>
          <Card title="Rasm" contentClassName="flex flex-col items-center gap-3">
            <div
              className="relative aspect-square w-full max-w-48 cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted transition-colors hover:border-muted-foreground/50"
              onClick={() => fileRef.current?.click()}
            >
              {image ? (
                <>
                  <img src={image} className="h-full w-full object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 size-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeImage()
                    }}
                  >
                    <X size={12} />
                  </Button>
                </>
              ) : (
                <div className="flex h-full w-full items-end justify-center pb-3">
                  <ImageIcon className="text-muted-foreground" size={20} />
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept=".png,.jpg,.jpeg"
              className="hidden"
              onChange={handleImageChange}
            />
            <p className="text-center text-xs text-muted-foreground">
              Faqat *.png, *.jpg va *.jpeg formatdagi, 2 MB gacha bo'lgan rasm
              qabul qilinadi.
            </p>
          </Card>

          <StatusCard description="Kategoriya holatini belgilang." />
        </Flex>
      </div>
    </CreateLayout>
  )
}

export default CreateCategory
