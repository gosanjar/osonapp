import { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/ui/card"
import { ImagePlus, Maximize2, Trash2 } from "lucide-react"
import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { useImageUpload } from "@/shared/hooks/use-image-upload"

export default function MediaCard() {
  const { fileRef, images, handleChange, remove, open } = useImageUpload({
    multiple: true,
  })
  const [dialogIndex, setDialogIndex] = useState<number | null>(null)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Media fayllar</CardTitle>
        <CardDescription>
          Tavsiya etilgan o'lcham: 1080×1440 piksel
        </CardDescription>
      </CardHeader>

      <CardContent>
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
      </CardContent>

      <Dialog
        open={dialogIndex !== null}
        onOpenChange={() => setDialogIndex(null)}
      >
        <DialogContent className="w-full max-w-3xl p-6">
          <DialogHeader>
            <DialogTitle>Ko'rish</DialogTitle>
          </DialogHeader>
          <div className="flex min-h-100 items-center justify-center overflow-hidden rounded-lg bg-muted/50 p-4">
            {dialogIndex !== null && (
              <img
                src={images[dialogIndex]}
                className="max-h-[75vh] w-auto cursor-zoom-in rounded-lg object-contain shadow-2xl transition-transform hover:scale-105"
              />
            )}
          </div>
          <DialogFooter className="flex gap-2 sm:justify-end">
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
