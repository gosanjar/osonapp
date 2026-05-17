import useSidebar from "@/entities/sidebar/use-sidebar"
import SidebarItem from "./sidebar-item"
import { Accordion } from "@/shared/ui/accordion"
import { HelpCircle, MoreVertical } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import Flex from "@/shared/ui/flex"
import { useState } from "react"
import { useAuthStore } from "@/shared/store/auth.store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { useAuth } from "@/shared/providers/auth-provider"

const Sidebar = ({ onNavigate }: { onNavigate?: () => void }) => {
  const { pathname } = useLocation()
  const { menuList } = useSidebar()
  const user = useAuthStore((s) => s.user)
  const { logout } = useAuth()

  const activeItem =
    menuList.find((item) =>
      item.children?.some((child) => pathname.startsWith(child.path))
    )?.path ?? ""

  const [openItem, setOpenItem] = useState(activeItem)

  const value = openItem || activeItem

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
        <NavLink to="/" onClick={onNavigate}>
          <img className="size-9 rounded" src="/logo.png" alt="logo" />
        </NavLink>
        <div className="grow text-lg font-medium">
          {user?.subdomain.toUpperCase()}
        </div>
      </Flex>

      <Accordion
        type="single"
        collapsible
        value={value}
        onValueChange={setOpenItem}
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
            <span className="font-bold">{user?.first_name}</span>
            <span className="text-xs font-light">{user?.last_name}</span>
          </Flex>
        </Flex>
        <Flex gap={2}>
          <HelpCircle size={18} strokeWidth={2} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="cursor-pointer rounded p-0.5 hover:bg-white/10">
                <MoreVertical size={18} strokeWidth={2} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="end">
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={() => logout()}
              >
                Chiqish
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Sidebar
