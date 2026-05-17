import { ROUTES } from "@/shared/config/routes"
import Flex from "@shared/flex"
import { ArrowLeft } from "lucide-react"
import { NavLink } from "react-router-dom"

const NotFound = () => {
  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      className="h-screen w-screen bg-secondary"
    >
      <img src="/not-found.webp" alt="Not Found" />
      <NavLink
        to={ROUTES.ROOT}
        className="flex items-center gap-2.5 rounded-md bg-secondary-foreground p-2 text-2xl font-medium text-secondary"
      >
        <ArrowLeft size={32} strokeWidth={2} />
        Go Home
      </NavLink>
    </Flex>
  )
}

export default NotFound
