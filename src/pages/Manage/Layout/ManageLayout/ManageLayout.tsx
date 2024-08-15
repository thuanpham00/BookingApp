import { Outlet } from "react-router-dom"
import SideNavManage from "../../Components/SideNavManage"
import { memo } from "react"

function ManageLayoutWrapper() {
  return (
    <div className="container">
      <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-1 md:col-span-3">
          <SideNavManage />
        </div>
        <div className="col-span-1 md:col-span-9">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

const ManageLayout = memo(ManageLayoutWrapper)

export default ManageLayout
