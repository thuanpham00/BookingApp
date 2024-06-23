import { Suspense, lazy } from "react"
import { useRoutes } from "react-router-dom"
import { path } from "src/constant/path"
import MainLayout from "src/layouts/MainLayout"
import RegisterLayout from "src/layouts/RegisterLayout"

// import Login from "src/pages/Login"
// import Register from "src/pages/Register"
// import Home from "src/pages/Home"

const Home = lazy(() => import("src/pages/Home"))
const Login = lazy(() => import("src/pages/Login"))
const Register = lazy(() => import("src/pages/Register"))

export default function useRouterElement() {
  // nhập url theo path có thể điều hướng trang
  // component <Suspenses></Suspenses> - dùng kĩ thuật Lazy load - lướt tới đâu load tới đó
  const routerElement = useRoutes([
    {
      path: path.home,
      element: (
        <MainLayout>
          <Suspense>
            <Home />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.login,
      element: (
        <RegisterLayout>
          <Suspense>
            <Login />
          </Suspense>
        </RegisterLayout>
      )
    },
    {
      path: path.register,
      element: (
        <RegisterLayout>
          <Suspense>
            <Register />
          </Suspense>
        </RegisterLayout>
      )
    }
  ])
  return routerElement
}
