import { CirclePlay } from "lucide-react"
import { Button } from "../button"

const GuideButton = () => {
  return (
    <Button size="lg" variant="outline">
      <CirclePlay size={18} strokeWidth={2} />
      Qo'llanma
    </Button>
  )
}

export default GuideButton
