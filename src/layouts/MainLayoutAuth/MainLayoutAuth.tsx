import { memo } from "react"
import { Outlet } from "react-router-dom"

function MainLayoutAuthInner() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

const MainLayoutAuth = memo(MainLayoutAuthInner) // chặn component re-render khi không cần thiết

export default MainLayoutAuth
