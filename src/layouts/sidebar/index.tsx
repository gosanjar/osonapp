import useSidebar from "@/entities/sidebar/use-sidebar"
import SidebarItem from "./sidebar-item"
import { Accordion } from "@/shared/ui/accordion"
import {
  BubbleChatQuestionIcon,
  MoreVerticalIcon,
} from "@hugeicons/core-free-icons"
import { NavLink, useLocation } from "react-router-dom"
import Icon from "@/shared/ui/icon"
import { ROUTES } from "@/shared/config/routes"
import Flex from "@/shared/ui/flex"

const Sidebar = () => {
  const { pathname } = useLocation()
  const { menuList } = useSidebar()

  return (
    <Flex direction="col" gap={0} className="max-h-svh min-w-67.5">
      <Flex gap={4} className="sticky top-0 z-50 h-16 w-full border-b p-3.5">
        <NavLink to={ROUTES.ROOT}>
          <img className="size-9 rounded" src="/logo.png" alt="logo" />
        </NavLink>
        <div className="grow text-lg font-medium text-white">Salom</div>
      </Flex>

      <Accordion
        type="single"
        collapsible
        defaultValue={
          menuList.find((item) =>
            item.children?.some((child) => child.path === pathname)
          )?.path
        }
      >
        <Flex
          direction="col"
          gap={1.5}
          className="max-h-[calc(100vh-128px)] w-full overflow-y-scroll py-3.5 pl-3.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-transparent"
        >
          {menuList.map((item, index) => (
            <SidebarItem key={index} menu={item} />
          ))}
        </Flex>
      </Accordion>

      <Flex
        justify="between"
        className="sticky bottom-0 z-50 h-16 w-full border-t p-3.5 pr-2"
      >
        <Flex>
          <Flex justify="center" className="size-9 rounded-full bg-blue-500">
            A
          </Flex>
          <Flex direction="col" gap={0}>
            <span className="text-sm font-bold">Admin</span>
            <span className="text-xs font-light">Growth</span>
          </Flex>
        </Flex>
        <Flex gap={2}>
          <Icon icon={BubbleChatQuestionIcon} />
          <Icon icon={MoreVerticalIcon} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Sidebar
