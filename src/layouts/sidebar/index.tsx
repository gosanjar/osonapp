import useSidebar from "@/entities/sidebar/use-sidebar"
import SidebarItem from "./sidebar-item"
import { Accordion } from "@/shared/ui/accordion"
import { HelpCircle, MoreVertical } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import Flex from "@shared/flex"
import { useState } from "react"
import { useAuthStore } from "@/shared/store/auth.store"
import Dropdown from "@shared/dropdown"
import { useAuth } from "@/shared/providers/auth-provider"
import { Button } from "@/shared/ui/button"

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
        className="sticky top-0 z-50 h-16 border-b border-gray-800 p-3.5"
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
          className="h-[calc(100vh-128px)] overflow-y-auto py-3.5 pr-1 pl-3.5"
        >
          {menuList.map((item, index) => (
            <SidebarItem key={index} menu={item} onNavigate={onNavigate} />
          ))}
        </Flex>
      </Accordion>

      <Flex
        justify="between"
        align="center"
        className="sticky bottom-0 z-50 h-16 border-t border-gray-800 bg-gray-900 p-3.5 pr-2"
      >
        <Flex full={false} gap={2} align="center">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-500">
            A
          </div>
          <Flex direction="column" gap={0} full={false}>
            <span className="font-bold">{user?.first_name}</span>
            <span className="text-xs font-light">{user?.last_name}</span>
          </Flex>
        </Flex>
        <Flex full={false} gap={2} align="center">
          <HelpCircle size={18} strokeWidth={2} />
          <Dropdown
            trigger={
              <Button type="button" variant="ghost" size="icon" className="cursor-pointer rounded p-0.5 hover:bg-white/10">
                <MoreVertical size={18} strokeWidth={2} />
              </Button>
            }
            side="right"
            align="end"
            items={[
              {
                label: "Chiqish",
                onClick: () => logout(),
                className:
                  "cursor-pointer text-destructive focus:text-destructive",
              },
            ]}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Sidebar
