import { Suspense, lazy } from "react"
import { useRoutes } from "react-router-dom"
import { path } from "src/constant/path"
import MainLayout from "src/layouts/MainLayout"
import MainLayoutWrapper from "src/layouts/MainLayoutWrapper"
// import Home from "src/pages/Home"

const Home = lazy(() => import("src/pages/Home"))

export default function useRouterElement() {
  // nhập url theo path có thể điều hướng trang
  // component <Suspenses></Suspenses> - dùng kĩ thuật Lazy load - lướt tới đâu load tới đó
  const routerElement = useRoutes([
    {
      path: path.home,
      element: (
        <MainLayout>
          <MainLayoutWrapper>
            <Suspense>
              <Home />
            </Suspense>
          </MainLayoutWrapper>
        </MainLayout>
      )
    }
  ])
  return routerElement
}
