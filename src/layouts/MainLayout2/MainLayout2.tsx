import { memo } from "react"
import { Outlet } from "react-router-dom"
import Header2 from "src/components/Header2"

function MainLayoutInner() {
  return (
    <div>
      <Header2 />
      <Outlet />
    </div>
  )
}

const MainLayout2 = memo(MainLayoutInner) // chặn component re-render khi không cần thiết

export default MainLayout2
