import { Suspense, lazy, useContext } from "react"
import { Navigate, Outlet, useRoutes } from "react-router-dom"
import { path } from "src/constant/path"
import { AppContext } from "src/context/useContext"
import MainLayout from "src/layouts/MainLayout"
import RegisterLayout from "src/layouts/RegisterLayout"
import Flight from "src/pages/Flight"

// import Login from "src/pages/Login"
// import Register from "src/pages/Register"
// import Home from "src/pages/Home"

function ProtectedRouter() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRouter() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

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
      path: "",
      element: <ProtectedRouter />,
      children: [
        {
          path: path.flightSearch,
          element: (
            <MainLayout>
              <Suspense>
                <Flight />
              </Suspense>
            </MainLayout>
          )
        }
      ]
    },
    {
      path: "",
      element: <RejectedRouter />,
      children: [
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
      ]
    }
  ])
  return routerElement
}
