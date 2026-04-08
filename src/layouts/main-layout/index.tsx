import { Suspense, useState } from "react"
import Sidebar from "../sidebar"
import { NavLink, Outlet, useLocation } from "react-router-dom"
import { Loading03Icon, Menu02Icon } from "@hugeicons/core-free-icons"
import useSidebar from "@/entities/sidebar/use-sidebar"
import Flex from "@/shared/ui/flex"
import Icon from "@/shared/ui/icon"
import ThemeToggle from "@/shared/ui/theme-toggle"
import LangToggle from "@/shared/ui/lang-toggle"
import { Button } from "@/shared/ui/button"

const MainLayout = () => {
  const { pathname } = useLocation()
  const { menuList } = useSidebar()
  const [open, setOpen] = useState(false)
  const currentLabel = menuList
    .flatMap((item) => item?.children ?? item)
    .find((item) => item.path === pathname)?.label

  return (
    <div className="flex h-screen w-screen">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        } transition-opacity duration-300`}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute top-0 left-0 h-full w-64 transform bg-background shadow-xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <Sidebar onNavigate={() => setOpen(false)} />
        </div>
      </div>

      <Flex
        gap={0}
        align="start"
        direction="column"
        className="w-full overflow-x-auto bg-secondary text-secondary-foreground"
      >
        <Flex
          justify="between"
          align="center"
          className="h-16 w-full border-b p-4"
        >
          <Flex align="center">
            <Button className="lg:hidden" onClick={() => setOpen(true)}>
              <Icon icon={Menu02Icon} />
            </Button>
            <div className="items-center gap-2.5 text-lg font-medium">
              {currentLabel}
            </div>
          </Flex>
          <Flex>
            <LangToggle />
            <ThemeToggle />
          </Flex>
        </Flex>

        <Flex
          gap={4}
          direction="column"
          className="h-full w-full overflow-x-auto overflow-y-auto p-4"
        >
          <Suspense
            fallback={<Icon icon={Loading03Icon} className="animate-spin" />}
          >
            {/*<div className="flex items-center gap-2.5 text-lg font-medium lg:hidden">
              {currentLabel}
            </div>*/}
            <Outlet />
            <Flex justify="between" className="mt-auto w-full text-sm">
              <div>
                <span className="text-gray-400">2026© </span>
                <NavLink
                  to="https://osonapp.uz"
                  className="hover:text-blue-500"
                >
                  Osonapp
                </NavLink>
              </div>
              <NavLink
                to="https://osonapp.uz/support"
                className="hover:text-blue-500"
              >
                Support
              </NavLink>
            </Flex>
          </Suspense>
        </Flex>
      </Flex>
    </div>
  )
}

export default MainLayout
