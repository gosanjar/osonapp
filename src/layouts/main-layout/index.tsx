import { Suspense } from "react"
import Sidebar from "../sidebar"
import { Outlet, useLocation } from "react-router-dom"
import { Loading03Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import useSidebar from "@/entities/sidebar/use-sidebar"

const MainLayout = () => {
  const { pathname } = useLocation()
  const { menuList } = useSidebar()

  return (
    <div className="flex min-h-svh min-w-svw">
      <Sidebar />
      <div className="w-full p-5">
        <div>
          {
            menuList
              .flatMap((item) => item?.children ?? item)
              .find((item) => item.path === pathname)?.label
          }
        </div>
        <Suspense
          fallback={
            <HugeiconsIcon icon={Loading03Icon} className="animate-spin" />
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}

export default MainLayout
