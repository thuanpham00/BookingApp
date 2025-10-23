import { memo } from "react"
import { Outlet } from "react-router-dom"
import Footer from "src/components/Footer"
import Header from "src/components/Header"

function MainLayoutInner() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

const MainLayout = memo(MainLayoutInner) // chặn component re-render khi không cần thiết - nó chỉ re-render khi các props của nó thay đổi

export default MainLayout
