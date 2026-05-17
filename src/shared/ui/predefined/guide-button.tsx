import { Youtube } from "lucide-react"
import { Button } from "../button"

const GuideButton = () => {
  return (
    <Button size="lg" variant="outline">
      <Youtube size={18} strokeWidth={2} />
      Qo'llanma
    </Button>
  )
}

export default GuideButton
