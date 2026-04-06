import useSidebar from "@/entities/sidebar/use-sidebar"
import SidebarItem from "./sidebar-item"
import { Accordion } from "@/shared/ui/accordion"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  BubbleChatQuestionIcon,
  MoreVerticalIcon,
} from "@hugeicons/core-free-icons"
import { useLocation } from "react-router-dom"

const Sidebar = () => {
  const { pathname } = useLocation()
  const { menuList } = useSidebar()

  return (
    <div className="flex max-h-svh min-w-67.5 flex-col bg-gray-900">
      <div className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-gray-900 p-3.5">
        <img className="size-9 rounded" src="/logo.png" alt="logo" />
        <div className="grow text-lg font-medium text-white">Salom</div>
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue={
          menuList.find((item) =>
            item.children?.some((child) => child.path === pathname)
          )?.path
        }
      >
        <div className="flex max-h-[calc(100vh-128px)] flex-col gap-1.5 overflow-y-scroll pl-3.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-transparent">
          {menuList.map((item, index) => (
            <SidebarItem key={index} menu={item} />
          ))}
        </div>
      </Accordion>

      <div className="sticky bottom-0 z-50 flex h-16 w-full items-center justify-between border-t bg-gray-900 p-3.5 pr-2">
        <div className="flex gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-full bg-blue-500">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">Admin</span>
            <span className="text-xs font-light">Growth</span>
          </div>
        </div>
        <div className="flex gap-2">
          <HugeiconsIcon icon={BubbleChatQuestionIcon} size={18} />
          <HugeiconsIcon icon={MoreVerticalIcon} size={18} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
