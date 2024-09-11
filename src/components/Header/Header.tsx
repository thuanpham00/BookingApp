import { Link } from "react-router-dom"
import { path } from "src/constant/path"
import logo from "../../img/favicon/FaviconFlight.webp"
import coVN from "../../img/lauguage/coVN.webp"
import coMy from "../../img/lauguage/coMy.webp"
import { useContext } from "react"
import { AppContext } from "src/context/useContext"
import Popover from "../Popover"
import { getNameFromEmail } from "src/utils/utils"
import { clearLS } from "src/utils/auth"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "src/components/ui/sheet"
import useScrollHeader from "src/hooks/useScrollHeader"
import { useTranslation } from "react-i18next"
import { locales } from "src/i18n/i18n"
import { changeLanguage } from "i18next"

export default function Header() {
  // xử lý ngôn ngữ
  const { i18n, t } = useTranslation("flight") // sử dụng đổi ngôn ngữ
  const currentLanguage = locales[i18n.language as keyof typeof locales]
  // xử lý header
  const { showHeader } = useScrollHeader(100)
  const { isAuthenticated, isProfile, setIsAuthenticated, setIsProfile, listCart } =
    useContext(AppContext)

  const handleLogOut = () => {
    clearLS()
    setIsAuthenticated(false)
    setIsProfile(null)
  }

  return (
    <header
      className={`sticky top-0 left-0 z-40 bg-whiteColor duration-100 transition-all ease-linear  shadow-xl ${showHeader ? "h-auto opacity-100 py-3" : "h-0 opacity-0"}`}
    >
      <div className="container">
        <div className="flex items-center justify-between cursor-pointer">
          <Link to={path.home} className="flex items-center">
            <div className="hidden lg:block w-10 h-10">
              <img src={logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="text-xl text-textColor font-semibold">Booking.</div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to={path.ManageTicket}
              className="hidden md:flex items-center gap-1 text-textColor duration-200 hover:text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                />
              </svg>
              <span className="text-base font-medium hover:underline block">
                {t("flight.ticketPurchase")}
              </span>
            </Link>

            <Popover
              className="sticky top-0 left-0 z-30"
              renderPopover={
                <div className="shadow-lg flex flex-col">
                  <button
                    onClick={() => changeLanguage("vi")}
                    className="text-sm flex items-center gap-2 text-left min-w-[120px] p-3 bg-[#edf2f4] text-textColor hover:bg-gray-300 duration-200 border border-gray-300"
                  >
                    <img src={coVN} alt="Cờ Việt Nam" className="h-6 w-6 object-contain" />
                    Tiếng việt
                  </button>

                  <button
                    onClick={() => changeLanguage("en")}
                    className="text-sm flex items-center gap-2 text-left min-w-[120px] p-3 bg-[#edf2f4] text-textColor hover:bg-gray-300 duration-200 border border-gray-300 border-t-0"
                  >
                    <img src={coMy} alt="Cờ Mỹ" className="h-6 w-6 object-contain" />
                    English
                  </button>
                </div>
              }
            >
              <div className="hidden md:flex gap-1 items-center text-textColor rounded-sm text-sm duration-200 hover:text-textColor/80">
                <img
                  src={currentLanguage === "English" ? coMy : coVN}
                  alt="Cờ Việt Nam"
                  className="h-6 w-6 object-contain"
                />
                <span className="text-sm md:text-base">{currentLanguage}</span>
              </div>
            </Popover>

            <Link to={path.cart} className="relative">
              {isAuthenticated ? (
                <span className="absolute left-4 -top-2 flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px]">
                  {listCart.length}
                </span>
              ) : (
                ""
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </Link>

            <Sheet>
              <SheetTrigger className="block md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="black"
                  className="mt-1 h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </SheetTrigger>
              <SheetContent className="p-0">
                <SheetHeader>
                  <SheetTitle className="mt-10">
                    {isAuthenticated && (
                      <div className="py-[2px] px-3 rounded-sm duration-200 hover:bg-[#ddd]/20 flex items-center gap-1 text-textColor font-normal text-base">
                        Xin chào, {getNameFromEmail(isProfile as string)}
                      </div>
                    )}
                    {!isAuthenticated && (
                      <div className="px-3 w-full flex items-center flex-col-reverse gap-1">
                        <Link
                          to={path.register}
                          className="w-full py-2 px-3 duration-200 hover:text-[#ddd]/80 rounded-sm text-sm text-textColor border border-gray-300 bg-white"
                        >
                          Đăng ký
                        </Link>
                        <Link
                          to={path.login}
                          className="w-full py-2 px-3 bg-blueColor duration-200 hover:bg-blueColor/80 rounded-sm text-sm text-whiteColor hover:text-[#ddd]/80"
                        >
                          Đăng nhập
                        </Link>
                      </div>
                    )}
                  </SheetTitle>
                  <SheetDescription>
                    <div className="border-t border-t-gray-300 py-2">
                      <nav className="px-3">
                        <Link
                          to={path.ManageTicket}
                          className="flex items-center md:gap-2 text-textColor duration-200 hover:text-gray-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-0 w-0 md:h-8 md:w-8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                            />
                          </svg>
                          <span className="text-base text-textColor font-medium hover:underline block">
                            Đơn đặt chỗ
                          </span>
                        </Link>
                      </nav>
                    </div>

                    <div className="border-t border-t-gray-300 py-2">
                      <span className="text-left block text-base text-gray-500 px-3 pb-2">
                        Cài đặt trang
                      </span>
                      <div className="px-3">
                        <Popover
                          className="sticky top-0 left-0 z-30 mb-2"
                          renderPopover={
                            <div className="shadow-lg flex flex-col">
                              <button className="text-sm flex items-center gap-2 text-left min-w-[120px] p-3 bg-[#edf2f4] text-textColor hover:bg-gray-300 duration-200 border border-gray-300">
                                <img
                                  src={coVN}
                                  alt="Cờ Việt Nam"
                                  className="h-6 w-6 object-contain"
                                />
                                Vietnamese
                              </button>

                              <button className="text-sm flex items-center gap-2 text-left min-w-[120px] p-3 bg-[#edf2f4] text-textColor hover:bg-gray-300 duration-200 border border-gray-300 border-t-0">
                                <img src={coMy} alt="Cờ Mỹ" className="h-6 w-6 object-contain" />
                                English
                              </button>
                            </div>
                          }
                        >
                          <div className="flex gap-1 items-center duration-200 hover:text-gray-500 text-textColor rounded-sm text-base font-medium">
                            <img src={coVN} alt="Cờ Việt Nam" className="h-6 w-6 object-contain" />
                            Ngôn ngữ
                          </div>
                        </Popover>
                      </div>
                    </div>

                    <div className="border-t border-t-gray-300 py-2">
                      <span className="text-left block text-base text-gray-500 px-3 pb-2">
                        Tài khoản
                      </span>
                      <div className="px-3">
                        <Link
                          to={path.ManageUser}
                          className="block text-left text-textColor font-medium text-base mb-2 hover:underline"
                        >
                          Thông tin cá nhân
                        </Link>
                        {isAuthenticated && (
                          <button
                            onClick={handleLogOut}
                            className="w-full py-2 px-3 duration-200 hover:text-[#ddd]/80 rounded-sm text-sm text-white bg-blueColor"
                          >
                            Đăng xuất
                          </button>
                        )}
                      </div>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <div className="hidden md:block">
              {isAuthenticated && (
                <Popover
                  className="sticky top-0 left-0 z-30"
                  renderPopover={
                    <div className="shadow-lg flex flex-col">
                      <Link
                        to={path.ManageUser}
                        className="text-sm text-left min-w-[120px] px-4 py-3 bg-[#edf2f4] text-textColor hover:bg-gray-300 duration-200 border border-gray-300"
                      >
                        {t("flight.myAccount")}
                      </Link>

                      <button
                        onClick={handleLogOut}
                        className="text-sm text-left min-w-[120px] px-4 py-3 bg-[#edf2f4] text-textColor hover:bg-gray-300 duration-200 flex items-center gap-2 border border-gray-300 border-t-0"
                      >
                        {t("flight.logOut")}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                          />
                        </svg>
                      </button>
                    </div>
                  }
                >
                  <div className="py-[6px] px-3 border-2 border-textColor rounded-full duration-200 hover:bg-[#ddd]/80 flex items-center gap-1 text-textColor font-semibold text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>

                    {getNameFromEmail(isProfile as string)}
                  </div>
                </Popover>
              )}
              {!isAuthenticated && (
                <div className="flex items-center gap-4">
                  <Link
                    to={path.register}
                    className="duration-200 hover:underline text-sm text-textColor font-medium hover:text-textColor/80"
                  >
                    {t("flight.register")}
                  </Link>
                  <Link
                    to={path.login}
                    className="py-2 px-3 bg-blueColor text-whiteColor duration-200 hover:bg-blueColor/80 text-sm font-medium hover:text-whiteColor/80 rounded-full"
                  >
                    {t("flight.login")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
