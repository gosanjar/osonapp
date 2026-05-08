import { useRef, useState } from "react"

export function useImageUpload({ multiple = false } = {}) {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [images, setImages] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const urls = files.map((f) => URL.createObjectURL(f))
    setImages((prev) => (multiple ? [...prev, ...urls] : urls.slice(0, 1)))
    e.target.value = ""
  }

  const remove = (index: number) =>
    setImages((prev) => prev.filter((_, i) => i !== index))

  const clear = () => setImages([])

  const open = () => fileRef.current?.click()

  return { fileRef, images, handleChange, remove, clear, open, multiple }
}
