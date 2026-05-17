import { useRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import Card from "@shared/card"
import { ImagePlus, Maximize2, Trash2 } from "lucide-react"
import { Button } from "@/shared/ui/button"
import Modal from "@shared/modal"
import { DialogClose } from "@/shared/ui/dialog"
import type { ProductFormData } from "../create"

export default function MediaCard() {
  const { watch, setValue } = useFormContext<ProductFormData>()
  const images = watch("images") ?? []
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [dialogIndex, setDialogIndex] = useState<number | null>(null)

  const open = () => fileRef.current?.click()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const urls = files.map((f) => URL.createObjectURL(f))
    setValue("images", [...images, ...urls])
    e.target.value = ""
  }

  const remove = (index: number) => {
    const url = images[index]
    if (url.startsWith("blob:")) URL.revokeObjectURL(url)
    setValue("images", images.filter((_, i) => i !== index))
  }

  return (
    <Card
      title="Media fayllar"
      description="Tavsiya etilgan o'lcham: 1080×1440 piksel"
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {images.map((img, i) => (
          <div
            key={i}
            className="group relative aspect-3/4 overflow-hidden rounded-lg border bg-muted transition-all hover:border-primary/50 hover:shadow-lg"
          >
            <img
              src={img}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 transition group-hover:opacity-100">
              <Button variant="secondary" onClick={() => setDialogIndex(i)}>
                <Maximize2 />
              </Button>
              <Button variant="destructive" onClick={() => remove(i)}>
                <Trash2 />
              </Button>
            </div>
          </div>
        ))}

        <div className="aspect-3/4">
          <Button
            type="button"
            onClick={open}
            className="group flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-card p-6 transition-all hover:border-muted-foreground/50 hover:bg-accent"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-muted transition group-hover:scale-110 group-hover:bg-primary">
              <ImagePlus className="text-muted-foreground group-hover:text-primary-foreground" />
            </div>
            <p className="text-sm font-semibold text-foreground group-hover:text-primary">
              Rasm qo'shish
            </p>
            <p className="text-[10px] tracking-tighter text-muted-foreground uppercase">
              JPG, PNG, WEBP (5MB)
            </p>
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            className="hidden"
            onChange={handleChange}
          />
        </div>
      </div>

      <Modal
        open={dialogIndex !== null}
        onOpenChange={() => setDialogIndex(null)}
        title="Ko'rish"
        className="w-full max-w-3xl p-6"
        footer={
          <>
            {dialogIndex !== null && (
              <Button
                variant="destructive"
                onClick={() => {
                  remove(dialogIndex)
                  setDialogIndex(null)
                }}
              >
                O'chirish
              </Button>
            )}
            <DialogClose asChild>
              <Button variant="outline">Yopish</Button>
            </DialogClose>
          </>
        }
      >
        <div className="flex min-h-100 items-center justify-center overflow-hidden rounded-lg bg-muted/50 p-4">
          {dialogIndex !== null && (
            <img
              src={images[dialogIndex]}
              className="max-h-[75vh] w-auto cursor-zoom-in rounded-lg object-contain shadow-2xl transition-transform hover:scale-105"
            />
          )}
        </div>
      </Modal>
    </Card>
  )
}
