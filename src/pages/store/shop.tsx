import { useParams } from "react-router-dom"

export default function ShopPage() {
  const { subdomain } = useParams<{ subdomain: string }>()

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{subdomain}</h1>
        <p className="mt-2 text-muted-foreground">Do'kon sahifasi tez orada ishga tushadi</p>
      </div>
    </div>
  )
}
