import { Suspense, lazy, useContext } from "react"
import { Navigate, Outlet, useLocation, useRoutes, useSearchParams } from "react-router-dom"
import { path } from "src/constant/path"
import { AppContext } from "src/context/useContext"
import MainLayout from "src/layouts/MainLayout"
import MainLayout2 from "src/layouts/MainLayout2"
import ManageLayout from "src/pages/Manage/Layout/ManageLayout"
const Login = lazy(() => import("src/pages/Login"))
const Register = lazy(() => import("src/pages/Register"))
const Flight = lazy(() => import("src/pages/Flight"))
const FlightSearch = lazy(() => import("src/pages/FlightSearch"))
const FlightOrder = lazy(() => import("src/pages/FlightOrder"))
const FlightPayment = lazy(() => import("src/pages/FlightPayment"))
const PaymentComplete = lazy(() => import("src/pages/Payment"))
const Cart = lazy(() => import("src/pages/Cart"))
const NotFound = lazy(() => import("src/pages/NotFound"))
const ManageOrderCancel = lazy(() => import("src/pages/Manage/Pages/ManageOrderCancel"))
const ManageOrderSuccess = lazy(() => import("src/pages/Manage/Pages/ManageOrderSuccess"))
const ManageUser = lazy(() => import("src/pages/Manage/Pages/ManageUser"))
const Hotel = lazy(() => import("src/pages/Hotel"))
const HotelSearch = lazy(() => import("src/pages/HotelSearch"))
const HotelDetail = lazy(() => import("src/pages/HotelDetail"))

/**
 * Khi url thay đổi thì các component nào dùng các hook như
 * useRoutes, useParams, useSearchParams,...
 * sẽ bị re-render
 * ví dụ component `App` dưới đây bị re-render khi mà url thay đổi
 * vì dùng `useRouterElement` (đây là custom hook của `useRoutes`)
 */

function ProtectedRouter() {
  const { pathname } = useLocation()
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={`${path.login}?callbackURL=${encodeURIComponent(pathname)}`} />
  )
}

function RejectedRouter() {
  const [searchParamsURL] = useSearchParams()
  const currentRoute = searchParamsURL.get("callbackURL") || path.home // lấy giá trị của tham số `callbackURL` -- trường hợp ko có tham số callbackURL thì back về route home
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={currentRoute} />
}

export default function useRouterElement() {
  // nhập url theo path có thể điều hướng trang
  // component <Suspenses></Suspenses> - dùng kĩ thuật Lazy load - lướt tới đâu load tới đó
  const routerElement = useRoutes([
    {
      path: "",
      element: <MainLayout />, // sử dụng chung // fix re-render
      children: [
        // trang chuyến bay sẽ là trang mặc định nên gắn 2 route cùng 1 layout
        {
          path: path.home,
          element: (
            <Suspense>
              <Flight />
            </Suspense>
          )
        },
        {
          path: path.flight,
          element: (
            <Suspense>
              <Flight />
            </Suspense>
          )
        },
        {
          path: path.hotel,
          element: (
            <Suspense>
              <Hotel />
            </Suspense>
          )
        }
      ]
    },
    {
      path: "",
      element: <MainLayout2 />, // sử dụng chung // fix re-render
      children: [
        {
          path: path.flightSearch, // trạm tìm chuyến bay
          element: (
            <Suspense>
              <FlightSearch />
            </Suspense>
          )
        },
        {
          path: path.hotelSearch, // trạm tìm khách sạn
          element: (
            <Suspense>
              <HotelSearch />
            </Suspense>
          )
        },
        {
          path: path.hotelDetail, // 404 page
          element: (
            <Suspense>
              <HotelDetail />
            </Suspense>
          )
        },
        {
          path: path.notFound, // 404 page
          element: (
            <Suspense>
              <NotFound />
            </Suspense>
          )
        }
      ]
    },
    {
      path: "",
      element: <ProtectedRouter />,
      children: [
        {
          path: "",
          // sử dụng <Outlet/> bên trong component <MainLayout2/> để truyền component con vào
          element: <MainLayout2 />, // sử dụng chung // fix re-render
          children: [
            {
              path: path.flightOrder, // tới trạm tạo đơn
              element: (
                <Suspense>
                  <FlightOrder />
                </Suspense>
              )
            },
            {
              path: path.flightPayment, // tới trạm thanh toán
              element: (
                <Suspense>
                  <FlightPayment />
                </Suspense>
              )
            },
            {
              path: path.billPayment, // thanh toán thành công
              element: (
                <Suspense>
                  <PaymentComplete />
                </Suspense>
              )
            },
            {
              path: path.cart, // giỏ hàng
              element: (
                <Suspense>
                  <Cart />
                </Suspense>
              )
            },
            {
              path: "",
              element: <ManageLayout />,
              children: [
                {
                  path: path.ManageTicket, // quản lý chuyến bay đã đặt
                  element: (
                    <Suspense>
                      <ManageOrderSuccess />
                    </Suspense>
                  )
                },
                {
                  path: path.CancelTicket, // quản lý chuyến bay đã hủy
                  element: (
                    <Suspense>
                      <ManageOrderCancel />
                    </Suspense>
                  )
                },
                {
                  path: path.ManageUser, // quản lý chuyến bay đã hủy
                  element: (
                    <Suspense>
                      <ManageUser />
                    </Suspense>
                  )
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: "",
      element: <RejectedRouter />,
      children: [
        {
          path: "",
          // sử dụng <Outlet/> bên trong component <RegisterLayout/> để truyền component con vào
          element: <MainLayout2 />, // sử dụng chung // fix re-render
          children: [
            {
              path: path.login,
              element: (
                <Suspense>
                  <Login />
                </Suspense>
              )
            },
            {
              path: path.register,
              element: (
                <Suspense>
                  <Register />
                </Suspense>
              )
            }
          ]
        }
      ]
    }
  ])
  return routerElement
}
