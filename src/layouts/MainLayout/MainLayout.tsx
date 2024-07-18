import { memo } from "react"
import { Outlet } from "react-router-dom"
import Footer from "src/components/Footer"
import Header from "src/components/Header"

function MainLayoutInner() {
  return (
    <div className="relative">
      <Header />
      <Outlet />
      <Footer />
      {/* fix lỗi CLS lệch layout (footer load trước nội dung load sau -> lệch) */}
    </div>
  )
}

const MainLayout = memo(MainLayoutInner) // chặn component re-render khi không cần thiết - nó chỉ re-render khi các props của nó thay đổi

export default MainLayout
