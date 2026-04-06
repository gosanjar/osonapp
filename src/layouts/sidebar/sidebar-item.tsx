import { NavLink } from "react-router-dom"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion"
import type { ISidebarMenuTree } from "@/entities/sidebar/types"

const SidebarItem = ({ menu }: { menu: ISidebarMenuTree }) => {
  if (!menu?.children) {
    return (
      <div className="flex flex-col gap-1.5">
        {menu?.section && (
          <div
            className="px-2.5 text-lg text-gray-400"
            style={{ marginTop: menu?.section ? 25 : 0 }}
          >
            {menu.section}
          </div>
        )}
        <NavLink
          to={menu.path}
          className={({ isActive }) =>
            `flex cursor-pointer items-center rounded-md px-2.5 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700 text-white" : ""}`
          }
          style={{ marginLeft: (menu?.depth ?? 0) * 28 }}
        >
          <div className="flex items-center gap-2.5">
            {menu?.icon}
            <div className="text-sm">{menu.label}</div>
          </div>
        </NavLink>
      </div>
    )
  }

  return (
    <AccordionItem value={menu.path} className="border-none">
      <div className="flex flex-col gap-1.5">
        {menu?.section && (
          <div
            className="px-2.5 text-lg text-gray-400"
            style={{ marginTop: menu?.section ? 25 : 0 }}
          >
            {menu.section}
          </div>
        )}
        <AccordionTrigger
          className="flex cursor-pointer items-center rounded-md px-2.5 py-2 font-normal hover:no-underline"
          style={{ marginLeft: (menu?.depth ?? 0) * 28 }}
        >
          <div className="flex items-center gap-2.5 text-lg">
            {menu?.icon}
            <div className="text-sm">{menu.label}</div>
          </div>
        </AccordionTrigger>
      </div>
      <AccordionContent className="[&_a]:no-underline">
        <div className="flex flex-col gap-1.5">
          {menu.children?.map((subMenu, index) => (
            <SidebarItem
              key={index}
              menu={{ ...subMenu, depth: (menu?.depth ?? 0) + 1 }}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export default SidebarItem
