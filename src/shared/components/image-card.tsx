import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { ImageIcon, X } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { useImageUpload } from "@/shared/hooks/use-image-upload"
import { Input } from "@/shared/ui/input"

interface ImageCardProps {
  title?: string
}

export default function ImageCard({ title = "Rasm" }: ImageCardProps) {
  const { fileRef, images, handleChange, clear, open } = useImageUpload()
  const preview = images[0] ?? null

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3">
        <div
          className="relative aspect-square w-full max-w-48 cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted transition-colors hover:border-muted-foreground/50"
          onClick={open}
        >
          {preview ? (
            <>
              <img src={preview} className="h-full w-full object-cover" />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 size-6"
                onClick={(e) => {
                  e.stopPropagation()
                  clear()
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
        <Input
          ref={fileRef}
          type="file"
          accept=".png,.jpg,.jpeg"
          className="hidden"
          onChange={handleChange}
        />
        <p className="text-center text-xs text-muted-foreground">
          Faqat *.png, *.jpg va *.jpeg formatdagi, 2 MB gacha bo'lgan rasm qabul
          qilinadi.
        </p>
      </CardContent>
    </Card>
  )
}
