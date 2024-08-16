import { Helmet } from "react-helmet-async"
import bg1 from "../../img/bgLogin/bg-6.webp"
import coVN from "../../img/lauguage/coVN.webp"
import coMy from "../../img/lauguage/coMy.webp"
import banner1 from "../../img/Flight/banner1.webp"
import banner2 from "../../img/Flight/banner2.webp"
import banner3 from "../../img/Flight/banner3.webp"
import logo from "../../img/favicon/FaviconFlight.webp"
import paymentImg from "../../img/Home/payment/pm1.jpg"
import iconFlight from "../../img/svg/flight-svgrepo-com.svg"
import ticketBanner from "src/img/Flight/air-ticket-offer.webp"
import ticketBanner2 from "src/img/Flight/air-ticket-offer_2.webp"
import bannerFlight from "src/img/Flight/vja330-1685604407424.webp"
import bannerFlight2 from "src/img/Flight/thumb-website-Vi-VNPAY-1280x720.webp"
import { Link } from "react-router-dom"
import { AppContext } from "src/context/useContext"
import { clearLS } from "src/utils/auth"
import Popover from "src/components/Popover"
import { path } from "src/constant/path"
import Skeleton from "src/components/Skeleton"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "src/components/ui/sheet"
import iconHotel from "src/img/Hotel/hotel-svgrepo-com.svg"
import { Fragment, useContext, useEffect, useState } from "react"
import { bannerAirLineList } from "src/constant/flightSearch"
import { getNameFromEmail } from "src/utils/utils"

export default function Hotel() {
  const { isAuthenticated, setIsAuthenticated, isProfile, setIsProfile, listCart } =
    useContext(AppContext)

  // xử lý loading
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [])

  // xử lý header
  const handleLogOut = () => {
    clearLS()
    setIsAuthenticated(false)
    setIsProfile(null)
  }
  return (
    // khắc phục lệch layout
    <div className="h-[3180px] md:h-[2600px] bg-[#fff]">
      {loading ? (
        <Skeleton className="flex flex-col justify-center items-center absolute left-1/2 top-[10%] -translate-x-1/2 -translate-y-1/2" />
      ) : (
        <Fragment>
          <Helmet>
            <title>Chuyến bay</title>
            <meta name="description" content="Chuyến bay - Booking." />
          </Helmet>

          <div className="w-full h-[600px]">
            <div
              className=" w-full h-full"
              style={{
                backgroundImage: `url(${bg1})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
              }}
            >
              <div className="bg-transparent py-3">
                <div className="container">
                  <div className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="hidden lg:block w-10 h-10">
                        <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                      </div>
                      <div className="text-xl text-whiteColor font-semibold">Booking.</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Popover
                        className="sticky top-0 left-0 z-30"
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

                            <button className="text-sm flex items-center gap-2 text-left min-w-[120px] p-3 bg-[#edf2f4] text-textColor hover:bg-gray-300 duration-200">
                              <img src={coMy} alt="Cờ Mỹ" className="h-6 w-6 object-contain" />
                              English
                            </button>
                          </div>
                        }
                      >
                        <div className="hidden md:flex gap-1 items-center px-2 text-whiteColor rounded-sm text-sm duration-200 hover:text-gray-300">
                          <img src={coVN} alt="Cờ Việt Nam" className="h-5 w-5 object-contain" />
                          Ngôn ngữ
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
                          stroke="white"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          />
                        </svg>
                      </Link>

                      <div className="block md:hidden">
                        <Sheet>
                          <SheetTrigger>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="white"
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
                                  <div className="py-[2px] px-3 rounded-sm duration-200 hover:bg-[#ddd]/20 flex items-center gap-1 text-textColor font-medium text-base">
                                    Xin chào, {getNameFromEmail(isProfile as string)}
                                  </div>
                                )}
                                {!isAuthenticated && (
                                  <div className="px-3 w-full flex items-center gap-1">
                                    <Link
                                      to={path.register}
                                      className="w-[50%] py-2 px-3 duration-200 hover:text-[#ddd]/80 rounded-sm text-sm text-textColor border border-gray-300"
                                    >
                                      Đăng ký
                                    </Link>
                                    <Link
                                      to={path.login}
                                      className="w-[50%] py-2 px-3 border-2 border-blueColor bg-blueColor duration-200 hover:bg-blueColor/80 hover:border-blueColor/80 rounded-sm text-sm text-whiteColor hover:text-[#ddd]/80 "
                                    >
                                      Đăng nhập
                                    </Link>
                                  </div>
                                )}
                              </SheetTitle>
                              <div className="w-full h-[1px] bg-gray-300"></div>
                            </SheetHeader>
                          </SheetContent>
                        </Sheet>
                      </div>

                      {isAuthenticated && (
                        <Popover
                          className="sticky top-0 left-0 z-30"
                          renderPopover={
                            <div className="shadow-lg flex flex-col">
                              <Link
                                to={path.ManageUser}
                                className="text-sm text-left min-w-[120px] px-4 py-3 bg-[#edf2f4] text-textColor hover:bg-gray-300 duration-200 border border-gray-300"
                              >
                                Tài khoản của tôi
                              </Link>

                              <button
                                onClick={handleLogOut}
                                className="text-sm text-left min-w-[120px] px-4 py-3 bg-[#edf2f4] text-textColor hover:bg-gray-300 duration-200 flex items-center gap-2 border border-gray-300 border-t-0"
                              >
                                Đăng xuất
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
                          <div className="hidden py-[6px] px-3 border-2 rounded-sm duration-200 hover:bg-[#ddd]/20 md:flex items-center gap-1 text-whiteColor font-medium text-sm">
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
                        <div className="hidden md:flex items-center gap-4">
                          <Link
                            to={path.register}
                            className="duration-200 hover:underline rounded-sm text-sm text-whiteColor font-medium hover:text-whiteColor/80"
                          >
                            Đăng ký
                          </Link>
                          <Link
                            to={path.login}
                            className="py-2 px-3 bg-blueColor text-whiteColor duration-200 hover:bg-blueColor/80 rounded-sm text-sm font-medium hover:text-whiteColor/80"
                          >
                            Đăng nhập
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  <h1 className="hidden md:block text-whiteColor md:text-2xl lg:text-4xl font-semibold text-center my-2 lg:my-8">
                    Từ Đông Nam Á Đến Thế Giới, Trong Tầm Tay Bạn.
                  </h1>

                  <div className="mt-8 md:mt-0 relative z-20 mx-auto w-full md:w-[55%]">
                    <div className="py-4 px-8 bg-whiteColor rounded-lg shadow-lg">
                      <nav className="flex items-center gap-4">
                        <Link to={path.flight} className="flex flex-col items-center">
                          <div className="w-8 h-8">
                            <img src={iconFlight} alt="icon" className="w-full h-full" />
                          </div>
                          <span className="mt-1 text-sm font-normal text-textColor">
                            Chuyến bay
                          </span>
                        </Link>
                        <Link to={path.hotel} className="flex flex-col items-center">
                          <img src={iconHotel} alt="iconHotel" className="h-8 w-8" />
                          <span className="mt-1 text-sm font-semibold text-blueColor ">
                            Khánh sạn
                          </span>
                        </Link>
                        <Link to={path.ManageTicket} className="flex flex-col items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-8 w-8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                            />
                          </svg>

                          <span className="mt-1 text-sm font-normal text-textColor">
                            Đơn đặt chỗ
                          </span>
                        </Link>
                      </nav>
                    </div>
                  </div>

                  <div className="mt-4 md:-mt-8 mx-auto w-full md:w-[90%]">
                    <form
                      autoComplete="off"
                      // onSubmit={handleSubmitSearch}
                      noValidate
                      className="p-4 md:p-8 md:pt-12 bg-whiteColor rounded-lg shadow-md"
                    ></form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="mt-8 px-8 hidden md:grid grid-cols-3 items-center justify-between gap-4">
              <div className="col-span-1 border border-gray-200 rounded-md shadow-lg p-4">
                <div className="flex items-center gap-4">
                  <img src={banner3} alt="" className="flex-shrink-0 w-14 h-14" />
                  <div className="flex-grow">
                    <h2 className="text-base lg:text-lg text-textColor font-semibold">
                      Điểm đến tốt nhất?
                    </h2>
                    <span className="block md:text-xs lg:text-sm text-blueColor">
                      Khám phá những điểm đến tuyệt vời nhất với chúng tôi.
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-1 border border-gray-200 rounded-md shadow-lg p-4">
                <div className="flex items-center gap-4">
                  <img src={banner2} alt="" className="flex-shrink-0 w-14 h-14" />
                  <div className="flex-grow">
                    <h2 className="text-base lg:text-lg text-textColor font-semibold">
                      Đa dạng ngôn ngữ trên trang web
                    </h2>
                    <span className="block md:text-xs lg:text-sm text-blueColor">
                      Thay đổi ngôn ngữ
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-1 border border-gray-200 rounded-md shadow-lg p-4">
                <div className="flex items-center gap-4">
                  <img src={banner1} alt="" className="flex-shrink-0 w-14 h-14" />
                  <div className="flex-grow">
                    <h2 className="text-base lg:text-lg text-textColor font-semibold">Booking.</h2>
                    <span className="block md:text-xs lg:text-sm text-blueColor">
                      Hoàn tất việc đăng ký trên web của bạn khi Booking. với các bước dễ dàng
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 items-center flex-wrap gap-4">
              <div className="col-span-2 md:col-span-1 h-[450px]">
                <img src={ticketBanner} alt="banner" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-2 md:col-span-1 h-[450px]">
                <img src={ticketBanner2} alt="banner" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="mt-8 pb-8 relative">
              <div className="w-full h-[400px]">
                <img
                  src={bannerFlight}
                  alt="bannerFlight"
                  className="w-full h-full object-cover brightness-50 rounded-sm"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 bg-white p-4 rounded-sm shadow-sm">
                <h3 className="text-lg lg:text-2xl text-center font-semibold text-textColor">
                  Đối tác hàng không
                </h3>
                <div className="mt-0 md:mt-4 grid grid-cols-8 items-center gap-2 flex-wrap">
                  {bannerAirLineList.map((item, index) => (
                    <div key={index}>
                      <div className="col-span-1">
                        <img
                          src={item}
                          alt={item}
                          className="w-10 h-10 md:w-10 md:h-8 lg:w-16 lg:h-18 object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-0 mt:py-8 relative">
              <div className="w-full h-[400px]">
                <img
                  src={bannerFlight2}
                  alt="bannerFlight"
                  className="w-full h-full object-cover brightness-50 rounded-sm"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 bg-white p-4 rounded-sm shadow-sm">
                <div className="flex flex-col items-center gap-2">
                  <h3 className="text-lg lg:text-2xl font-semibold text-textColor">
                    Đối tác thanh toán
                  </h3>
                  <div className="md:w-20 md:h-20 lg:w-32 lg:h-32">
                    <img src={paymentImg} alt="payment" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  )
}
