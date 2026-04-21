import { useNavigate } from "react-router-dom"
import { Button } from "../button"

const CancelButton = () => {
  const navigate = useNavigate()
  return (
    <Button size="lg" variant="outline" onClick={() => navigate(-1)}>
      Bekor qilish
    </Button>
  )
}

export default CancelButton
