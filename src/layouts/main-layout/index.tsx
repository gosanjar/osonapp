import { Suspense } from "react"
import Sidebar from "../sidebar"
import { Outlet, useLocation } from "react-router-dom"
import { Loading03Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import useSidebar from "@/entities/sidebar/use-sidebar"
import Flex from "@/shared/ui/flex"

const MainLayout = () => {
  const { pathname } = useLocation()
  const { menuList } = useSidebar()

  return (
    <div className="flex min-h-svh min-w-svw bg-gray-900">
      <Sidebar />
      <Flex
        direction="col"
        align="start"
        className="w-full rounded-xl bg-white p-5 text-black"
      >
        <div>
          {
            menuList
              .flatMap((item) => item?.children ?? item)
              .find((item) => item.path === pathname)?.label
          }
        </div>
        <hr className="w-full bg-gray-200" />
        <Suspense
          fallback={
            <HugeiconsIcon icon={Loading03Icon} className="animate-spin" />
          }
        >
          <Outlet />
        </Suspense>
      </Flex>
    </div>
  )
}

export default MainLayout
