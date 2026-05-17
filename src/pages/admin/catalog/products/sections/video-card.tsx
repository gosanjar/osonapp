import { useRef } from "react"
import { useFormContext } from "react-hook-form"
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card"
import { Upload, Trash2 } from "lucide-react"
import { Button } from "@/shared/ui/button"
import type { ProductFormData } from "../create"

export default function VideoCard() {
  const { watch, setValue } = useFormContext<ProductFormData>()
  const video = watch("video") || null
  const inputRef = useRef<HTMLInputElement | null>(null)

  const openPicker = () => {
    inputRef.current?.click()
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setValue("video", url)
    e.target.value = ""
  }

  const removeVideo = () => {
    if (video?.startsWith("blob:")) URL.revokeObjectURL(video)
    setValue("video", "")
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-2">
        <CardTitle>Video</CardTitle>
        <span className="rounded-full bg-secondary px-2 py-1 text-xs text-muted-foreground">
          Tavsiya etilgan format: MP4, maksimal hajm: 50MB
        </span>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {!video && (
            <div
              onClick={openPicker}
              className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-card p-10 transition-all hover:border-muted-foreground/50 hover:bg-accent"
            >
              <Upload className="mb-3 h-10 w-10 text-muted-foreground" />

              <p className="mb-1 text-sm font-semibold text-foreground">
                Video yuklash
              </p>

              <p className="text-xs text-muted-foreground">
                Tortib tashlang yoki tanlash uchun bosing
              </p>

              <input
                ref={inputRef}
                type="file"
                accept="video/mp4,video/*"
                className="hidden"
                onChange={onChange}
              />
            </div>
          )}

          {video && (
            <div className="space-y-3">
              <video
                controls
                className="max-h-125 w-full rounded-lg border bg-black object-contain"
              >
                <source src={video} type="video/mp4" />
              </video>

              <Button
                variant="destructive"
                onClick={removeVideo}
                className="w-full"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Videoni o'chirish
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
