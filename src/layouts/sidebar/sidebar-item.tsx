import { NavLink } from "react-router-dom"
import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/shared/ui/accordion"
import type { ISidebarMenuTree } from "@/entities/sidebar/types"
import Flex from "@/shared/ui/flex"

const ITEM_CLASS =
  "flex w-full cursor-pointer items-center rounded-md px-2.5 py-2 text-sm"

const ItemContent = ({ menu }: { menu: ISidebarMenuTree }) => (
  <Flex align="center" className="text-white">
    {menu?.icon}
    <div>{menu.label}</div>
  </Flex>
)

const SidebarItem = ({
  menu,
  onNavigate,
}: {
  menu: ISidebarMenuTree
  onNavigate?: () => void
}) => {
  const depth = menu?.depth ?? 0
  const marginLeft = depth * 28

  return (
    <Flex direction="column" gap={1.5} className="w-full">
      {menu?.section && (
        <Flex className="mt-6 w-full px-2.5 text-lg text-gray-400">
          {menu.section}
        </Flex>
      )}

      {menu?.children ? (
        <AccordionItem
          value={menu.path}
          className="w-full border-none [&_h3]:w-full"
        >
          <AccordionTrigger
            className={`${ITEM_CLASS} font-normal hover:no-underline`}
            style={{ marginLeft }}
          >
            <ItemContent menu={menu} />
          </AccordionTrigger>
          <AccordionContent className="[&_a]:no-underline">
            <Flex direction="column" gap={1.5}>
              {menu.children.map((subMenu, index) => (
                <SidebarItem
                  key={index}
                  onNavigate={onNavigate}
                  menu={{ ...subMenu, depth: depth + 1 }}
                />
              ))}
            </Flex>
          </AccordionContent>
        </AccordionItem>
      ) : (
        <NavLink
          to={menu.path}
          onClick={onNavigate}
          style={{ marginLeft }}
          className={({ isActive }) =>
            `${ITEM_CLASS} hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          <ItemContent menu={menu} />
        </NavLink>
      )}
    </Flex>
  )
}

export default SidebarItem
