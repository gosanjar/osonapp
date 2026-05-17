import Card from "@shared/card"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"
import { FormControl } from "@shared/form-control"
import type { ProductFormData } from "../create"

export default function MainCard() {
  return (
    <Card title="Asosiy ma'lumotlar" gap={4}>
      <FormControl<ProductFormData>
        name="title.uz"
        label="O'zbek tilida nomi"
        required
      >
        <Input placeholder="Masalan: Samsung Galaxy S23 smartfoni" />
      </FormControl>

      <FormControl<ProductFormData> name="title.ru" label="Rus tilida nomi">
        <Input placeholder="Например: Смартфон Samsung Galaxy S23" />
      </FormControl>

      <FormControl<ProductFormData>
        name="description.uz"
        label="Tavsif (O'zbek)"
      >
        <Textarea placeholder="Mahsulot tavsifi..." rows={4} />
      </FormControl>

      <FormControl<ProductFormData>
        name="description.ru"
        label="Tavsif (Rus)"
      >
        <Textarea placeholder="Описание продукта..." rows={4} />
      </FormControl>
    </Card>
  )
}
