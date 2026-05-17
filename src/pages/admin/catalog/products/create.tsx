import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ProductsApi } from "@/entities/catalog/api"
import { getApiError } from "@/shared/api"
import CreateLayout from "@shared/create-layout"
import { ROUTES } from "@/shared/config/routes"
import Flex from "@shared/flex"
import MainCard from "./sections/main-card"
import MediaCard from "./sections/media-card"
import VideoCard from "./sections/video-card"
import PriceCard from "./sections/price-card"
import InventoryCard from "./sections/inventory-card"
import { ProductSidebar } from "./sections/product-sidebar"

export type ProductFormData = {
  title: { uz: string; ru: string }
  description: { uz: string; ru: string }
  price: string
  compare_price: string
  cost: string
  sku: string
  barcode: string
  quantity: string
  track_quantity: boolean
  images: string[]
  video: string
  category: string
  tags: string[]
  status: "published" | "unpublished"
  is_trend: boolean
}

const CreateProduct = () => {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const form = useForm<ProductFormData>({
    defaultValues: {
      title: { uz: "", ru: "" },
      description: { uz: "", ru: "" },
      price: "",
      compare_price: "",
      cost: "",
      sku: "",
      barcode: "",
      quantity: "0",
      track_quantity: false,
      images: [],
      video: "",
      category: "",
      tags: [],
      status: "published",
      is_trend: false,
    },
  })

  const { data: productData } = useQuery({
    queryKey: ["product", id],
    queryFn: () => ProductsApi.get(Number(id)),
    enabled: isEdit,
  })

  useEffect(() => {
    if (productData?.data) {
      const p = productData.data
      form.reset({
        title: p.title,
        description: p.description,
        price: String(p.price),
        compare_price: p.compare_price ? String(p.compare_price) : "",
        cost: p.cost ? String(p.cost) : "",
        sku: p.sku ?? "",
        barcode: p.barcode ?? "",
        quantity: String(p.quantity),
        track_quantity: p.track_quantity,
        images: p.images,
        video: p.video ?? "",
        category: p.category ? String(p.category) : "",
        tags: p.tags,
        status: p.is_active ? "published" : "unpublished",
        is_trend: p.is_trend,
      })
    }
  }, [productData])

  const { mutate: save, isPending } = useMutation({
    mutationFn: (values: ProductFormData) => {
      const data = {
        title: values.title,
        description: values.description,
        price: Number(values.price) || 0,
        compare_price: values.compare_price ? Number(values.compare_price) : null,
        cost: values.cost ? Number(values.cost) : null,
        sku: values.sku || null,
        barcode: values.barcode || null,
        quantity: Number(values.quantity) || 0,
        track_quantity: values.track_quantity,
        images: values.images,
        video: values.video || null,
        category: values.category ? Number(values.category) : null,
        tags: values.tags,
        is_active: values.status === "published",
        is_trend: values.is_trend,
      }
      return isEdit ? ProductsApi.update(Number(id), data) : ProductsApi.create(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      navigate(ROUTES.CATALOG_PRODUCTS)
    },
    onError: (err) => {
      form.setError("root", {
        message: getApiError(err, "Xatolik yuz berdi") ?? undefined,
      })
    },
  })

  return (
    <CreateLayout
      form={form}
      title={isEdit ? "Mahsulotni tahrirlash" : "Mahsulot qo'shish"}
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
          <MainCard />
          <MediaCard />
          <VideoCard />
          <PriceCard />
          <InventoryCard />
        </Flex>
        <Flex className="col-span-1" direction="column">
          <ProductSidebar />
        </Flex>
      </div>
    </CreateLayout>
  )
}

export default CreateProduct
