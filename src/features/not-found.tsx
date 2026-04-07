import { ROUTES } from "@/shared/config/routes"
import Flex from "@/shared/ui/flex"
import Icon from "@/shared/ui/icon"
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons"
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
        <Icon icon={ArrowLeft02Icon} size={32} />
        Go Home
      </NavLink>
    </Flex>
  )
}
export default NotFound
