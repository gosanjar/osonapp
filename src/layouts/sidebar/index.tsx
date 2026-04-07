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

const Sidebar = ({ onNavigate }: { onNavigate?: () => void }) => {
  const { pathname } = useLocation()
  const { menuList } = useSidebar()

  return (
    <Flex
      direction="column"
      gap={0}
      className="h-screen max-w-67.5 min-w-67.5 bg-gray-900 text-white"
    >
      <Flex
        gap={4}
        align="center"
        className="sticky top-0 z-50 h-16 w-full border-b border-gray-800 p-3.5"
      >
        <NavLink to={ROUTES.ROOT} onClick={onNavigate}>
          <img className="size-9 rounded" src="/logo.png" alt="logo" />
        </NavLink>
        <div className="grow text-lg font-medium">Salom</div>
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
          direction="column"
          gap={1.5}
          className="h-[calc(100vh-128px)] w-full overflow-y-auto py-3.5 pr-1 pl-3.5"
        >
          {menuList.map((item, index) => (
            <SidebarItem key={index} menu={item} onNavigate={onNavigate} />
          ))}
        </Flex>
      </Accordion>

      <Flex
        justify="between"
        align="center"
        className="sticky bottom-0 z-50 h-16 w-full border-t border-gray-800 bg-gray-900 p-3.5 pr-2"
      >
        <Flex>
          <Flex
            justify="center"
            align="center"
            className="size-9 rounded-full bg-blue-500"
          >
            A
          </Flex>
          <Flex direction="column" gap={0}>
            <span className="font-bold">Admin</span>
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
