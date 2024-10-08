import { Helmet } from "react-helmet-async"
import bg1 from "../../img/Flight/bg1.webp"
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
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import schema, { schemaType } from "src/utils/rules"
import { airportCodes, bannerAirLineList, travelClassList } from "src/constant/flightSearch"
import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { convertToYYYYMMDD, getNameFromEmail } from "src/utils/utils"
import InputSearch from "src/components/InputSearch"
import SelectDate from "src/components/SelectDate"
import { Popover as PopoverShadcn, PopoverContent, PopoverTrigger } from "src/components/ui/popover"
import QuantityController from "src/components/QuantityController"
import { Button as ButtonShadcn } from "src/components/ui/button"
import { Command, CommandGroup, CommandItem, CommandList } from "src/components/ui/command"
import Button from "src/components/Button"
import { createSearchParams, Link, useNavigate } from "react-router-dom"
import { AppContext } from "src/context/useContext"
import { clearLS } from "src/utils/auth"
import Popover from "src/components/Popover"
import { path } from "src/constant/path"
import useQueryConfig from "src/hooks/useQueryConfig"
import Skeleton from "src/components/Skeleton"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "src/components/ui/sheet"
import useFormHandler from "src/hooks/useFormHandler"
import { FlightContext } from "src/context/useContextFlight"
import { TypeAirportCodeList as TypeAirportCodeListType } from "src/types/flight.type"
import AirportCodeList from "src/components/AirportCodeList/AirportCodeList"
import { useTranslation } from "react-i18next"
import { locales } from "src/i18n/i18n"
import { changeLanguage } from "i18next"

export type FormData = Pick<
  schemaType,
  | "originLocationCode"
  | "destinationLocationCode"
  | "departureDate"
  | "returnDate"
  | "travelClass"
  | "adults"
  | "children"
  | "infants"
>

export const schemaFormData = schema.pick([
  "originLocationCode",
  "destinationLocationCode",
  "departureDate",
  "returnDate",
  "travelClass",
  "adults"
])

export type InputController = "adults" | "children" | "infants"
const fetchDataAirport = () => Promise.resolve(airportCodes) // khởi tạo 1 promise

// Dùng thêm state cục bộ để quản lý dữ liệu input kết hợp với useForm sử dụng setValue để quản lý dữ liệu trước khi submit đi
// nếu không dùng state cục bộ thì không thể truyền props xuống các component con
// vì thường các trường dữ liệu của input chỉ quản lý trong component đó (validate...) submit đi

// onClick vào ô input thì nó re-render vì
// nó thực hiện onClick={handleFocus} và handleFocus nhân vào 1 hàm xử lý set state lại dẫn đến component re-render

// component chỉ re-render khi props hoặc state thay đổi
export default function Flight() {
  // xử lý ngôn ngữ
  const { i18n, t } = useTranslation("flight") // sử dụng đổi ngôn ngữ
  const currentLanguage = locales[i18n.language as keyof typeof locales]

  const { isAuthenticated, setIsAuthenticated, isProfile, setIsProfile, listCart } =
    useContext(AppContext)

  const {
    searchText,
    setSearchText,
    searchText2,
    setSearchText2,
    date,
    setDate,
    date2,
    setDate2,
    travelClass,
    setTravelClass,
    numberAdults,
    setNumberAdults,
    numberChildren,
    setNumberChildren,
    numberInfants,
    setNumberInfants,
    flightType,
    setFlightType,
    showPassenger,
    setShowPassenger
  } = useContext(FlightContext)

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

  // xử lý form
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schemaFormData)
  })

  const [open, setOpen] = useState(false)
  const [airportCodeList, setTypeAirportCodeList] = useState<TypeAirportCodeListType>([])
  const [showListAirport, setShowListAirport] = useState<boolean>(false)
  const [showListAirport2, setShowListAirport2] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputRef2 = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchDataAirport().then((res) => {
      setTypeAirportCodeList(res)
    })
  }, [])

  useEffect(() => {
    const clickOutHideListAirport = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        // nơi được click nằm ngoài vùng phần tử
        setShowListAirport(false)
      }
      if (inputRef2.current && !inputRef2.current.contains(event.target as Node)) {
        setShowListAirport2(false)
      }
    }

    document.addEventListener("mousedown", clickOutHideListAirport)

    return () => document.removeEventListener("mousedown", clickOutHideListAirport)
  }, [])

  // nâng cao
  // flow: truyền các `tham số` yêu cầu (state, ...) vào hook -> hook nhận tham số -> xử lý logic -> lấy ra (destructuring) -> truyền vào props -> kết quả
  const { filterList: filterTypeAirportCodeList_1, handleItemClick } = useFormHandler(
    airportCodeList,
    searchText,
    setValue,
    setSearchText,
    setShowListAirport
  )

  const { filterList: filterTypeAirportCodeList_2, handleItemClick: handleItemClick2 } =
    useFormHandler(airportCodeList, searchText2, setValue, setSearchText2, setShowListAirport2)

  const handleChangeQuantity = (nameQuantity: InputController) => (value: number) => {
    setValue(nameQuantity, value) // đảm bảo giá trị của input được quản lý bởi react-hook-form // // cập nhật giá trị của một trường dữ liệu
    if (nameQuantity === "adults") {
      setNumberAdults(value)
    } else if (nameQuantity === "children") {
      setNumberChildren(value)
    } else if (nameQuantity === "infants") {
      setNumberInfants(value)
    }
  }

  useEffect(() => {
    setShowPassenger(numberAdults + numberChildren + numberInfants)
  }, [numberAdults, numberChildren, numberInfants, setShowPassenger])

  const exchangeTwoValues = () => {
    setSearchText(searchText2)
    setSearchText2(searchText)
    setValue("originLocationCode", searchText2)
    setValue("destinationLocationCode", searchText) // cập nhật trường dữ liệu trước khi submit form
    // chỗ này type button // thực hiện click
  }

  const createConfig = (data: FormData) => {
    const baseConfig = {
      ...queryConfig,
      originLocationCode: data.originLocationCode,
      destinationLocationCode: data.destinationLocationCode,
      departureDate: data.departureDate,
      adults: String(data.adults),
      children: String(data.children),
      infants: String(data.infants),
      travelClass: data.travelClass
    }
    if (data.returnDate) {
      return {
        ...baseConfig,
        returnDate: data.returnDate
      }
    }
    return baseConfig
  }

  const handleSubmitSearch = handleSubmit((data) => {
    // truyền các data mà form quản lý vào biến này để submit gọi api

    const config = createConfig(data)
    navigate({
      pathname: path.flightSearch,
      search: createSearchParams(config).toString() // tạo tham số truy vấn "?"
    })
  })

  return (
    // khắc phục lệch layout
    <div className="h-[2850px] md:h-[2600px] lg:h-[2550px] bg-[#fff]">
      {loading ? (
        <Skeleton className="flex flex-col justify-center items-center absolute left-1/2 top-[10%] -translate-x-1/2 -translate-y-1/2" />
      ) : (
        <Fragment>
          <Helmet>
            <title>{t("flight.flight")}</title>
            <meta name="description" content={`${t("flight.flight")} - Booking.`} />
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
                      <div className="text-xl text-textColor font-semibold">Booking.</div>
                    </div>
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
                              <img
                                src={coVN}
                                alt="Cờ Việt Nam"
                                className="h-6 w-6 object-contain"
                              />
                              Tiếng việt
                            </button>

                            <button
                              onClick={() => changeLanguage("en")}
                              className="text-sm flex items-center gap-2 text-left min-w-[120px] p-3 bg-[#edf2f4] text-textColor hover:bg-gray-300 duration-200"
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
                          stroke="black"
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
                                    <span className="text-base font-medium hover:underline block">
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
                                          <img
                                            src={coMy}
                                            alt="Cờ Mỹ"
                                            className="h-6 w-6 object-contain"
                                          />
                                          English
                                        </button>
                                      </div>
                                    }
                                  >
                                    <div className="flex gap-1 items-center duration-200 hover:text-gray-500 text-textColor rounded-sm text-base font-medium">
                                      <img
                                        src={coVN}
                                        alt="Cờ Việt Nam"
                                        className="h-6 w-6 object-contain"
                                      />
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
                            <div className="py-[6px] px-3 border-2 border-[#000] rounded-full duration-200 hover:bg-[#ddd]/20 flex items-center gap-1 text-[#000]/80 font-medium text-sm">
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

                  <h1 className="hidden md:block text-whiteColor md:text-xl lg:text-3xl font-semibold text-center my-2 lg:mt-16">
                    {t("flight.logan")}
                  </h1>

                  <div className="mt-20 md:mt-12 mx-auto w-full md:w-[90%]">
                    <form
                      autoComplete="off"
                      onSubmit={handleSubmitSearch}
                      noValidate
                      className="p-4 md:p-8 bg-whiteColor rounded-lg shadow-md"
                    >
                      {/* loại chuyến bay */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <input
                            type="radio"
                            name="flight"
                            id="oneWay"
                            checked={flightType === "oneWay"}
                            onChange={(event) => setFlightType(event.target.id)}
                            className="w-5 h-5"
                          />
                          <label
                            htmlFor="oneWay"
                            className="text-base text-textColor font-semibold"
                          >
                            {t("flight.oneWay")}
                          </label>
                        </div>
                        <div className="flex items-center gap-1">
                          <input
                            type="radio"
                            name="flight"
                            id="roundTrip"
                            checked={flightType === "roundTrip"}
                            onChange={(event) => setFlightType(event.target.id)}
                            className="w-5 h-5"
                          />
                          <label
                            htmlFor="roundTrip"
                            className="text-base text-textColor font-semibold"
                          >
                            {t("flight.roundTrip")}
                          </label>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-4 relative gap-2 flex-wrap">
                        {/* điểm xuất phát */}
                        <InputSearch
                          iconChild={
                            <img
                              src={iconFlight}
                              alt="icon flight"
                              className="w-10 h-10 flex-shrink-0"
                            />
                          }
                          placeholder={t("flight.searchTextTitle")}
                          classNameList={`z-20 absolute top-20 left-0 w-full ${showListAirport ? "h-[300px]" : "h-0"} bg-whiteColor overflow-y-auto overflow-x-hidden rounded-sm shadow-sm transition-all duration-200 ease-linear`}
                          ref={inputRef}
                          value={searchText}
                          showList={showListAirport}
                          handleChangeValue={(event) => setSearchText(event.target.value)} // state context (state global)
                          handleFocus={() => setShowListAirport(true)}
                          register={register}
                          name="originLocationCode"
                          error={errors.originLocationCode?.message}
                          desc={t("flight.searchTextDesc")}
                        >
                          <AirportCodeList
                            listAirport={filterTypeAirportCodeList_1}
                            handleItemClick={handleItemClick}
                            inputName="originLocationCode"
                          />
                        </InputSearch>
                        {/* điểm đến */}

                        <InputSearch
                          iconChild={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-10 w-10 flex-shrink-0"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 10.5a4 3 4 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                              />
                            </svg>
                          }
                          placeholder={t("flight.searchTextTitle2")}
                          classNameList={`z-20 absolute top-20 left-0 w-full ${showListAirport2 ? "h-[300px]" : "h-0"} bg-whiteColor overflow-y-auto overflow-x-hidden rounded-sm shadow-sm transition-all duration-200 ease-linear`}
                          ref={inputRef2}
                          value={searchText2}
                          showList={showListAirport2}
                          handleChangeValue={(event) => setSearchText2(event.target.value)}
                          handleFocus={() => setShowListAirport2(true)}
                          register={register}
                          name="destinationLocationCode"
                          error={errors.destinationLocationCode?.message}
                          desc={t("flight.searchTextDesc2")}
                        >
                          <AirportCodeList
                            listAirport={filterTypeAirportCodeList_2}
                            handleItemClick={handleItemClick2}
                            inputName="destinationLocationCode"
                          />
                        </InputSearch>

                        {/* đổi 2 giá trị với nhau */}
                        <button
                          aria-label="buttonChangeValue"
                          type="button"
                          onClick={exchangeTwoValues}
                          className="z-10 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-full text-blueColor border-2 border-blueColor bg-blue-100"
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
                              d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-2 md:mt-4 grid grid-cols-4 items-center gap-2 md:gap-x-2 md:gap-y-4">
                        <div className="col-span-4 lg:col-span-2">
                          <div className="flex items-center justify-between flex-wrap md:flex-nowrap gap-2">
                            {/* Khứ hồi hoặc 1 chiều */}
                            <div
                              className={
                                flightType === "roundTrip"
                                  ? "w-full md:w-[70%] flex justify-start gap-1 md:gap-2"
                                  : "w-full md:w-[70%] flex justify-start"
                              }
                            >
                              {/* date ngày đi*/}
                              <div className={flightType === "roundTrip" ? "w-[50%]" : "w-[100%]"}>
                                <SelectDate
                                  text={t("flight.dateTitle")}
                                  control={control}
                                  setDate={setDate}
                                  date={date}
                                  name="departureDate"
                                  errors={errors.departureDate?.message as string}
                                  convertToYYYYMMDD={convertToYYYYMMDD}
                                />
                              </div>

                              {/* date ngày về */}
                              <div
                                className={flightType === "roundTrip" ? "w-[50%]" : "hidden w-[0%]"}
                              >
                                <SelectDate
                                  text={t("flight.dateTitle2")}
                                  control={control}
                                  setDate={setDate2}
                                  date={date2}
                                  name="returnDate"
                                  errors={errors.returnDate?.message as string}
                                  convertToYYYYMMDD={convertToYYYYMMDD}
                                />
                              </div>
                            </div>

                            {/* hành khách */}
                            <div
                              className={`w-full md:w-[30%] py-3 border-2 rounded-md flex items-center justify-center ${errors.adults?.message ? "border-red-500 bg-red-100" : "border-gray-300"}`}
                            >
                              <PopoverShadcn>
                                <PopoverTrigger>
                                  <div className="flex items-center cursor-pointer">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="h-4 w-4"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                      />
                                    </svg>

                                    <input
                                      aria-label="Traveler"
                                      type="text"
                                      className="w-[25px] py-1 outline-none bg-transparent text-base text-center"
                                      value={showPassenger}
                                      readOnly
                                    />

                                    <span className="text-base text-textColor font-semibold">
                                      {t("flight.traveler")}
                                    </span>

                                    {errors.adults?.message && (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="red"
                                        className="ml-1 h-5 w-5 flex-shrink-0"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <div className="p-1 text-textColor text-sm mb-2 bg-[#fedda7]">
                                    <strong className="text-red-500">Lưu ý: </strong>Số lượng vé em
                                    bé sơ sinh không được vượt quá số lượng vé người lớn.
                                  </div>
                                  <div>
                                    <QuantityController
                                      nameQuantity="Người lớn (12 tuổi trở lên)"
                                      value={numberAdults}
                                      onValueInput={handleChangeQuantity("adults")}
                                      onIncrease={handleChangeQuantity("adults")}
                                      onDecrease={handleChangeQuantity("adults")}
                                      register={register} // đăng ký trường dữ liệu để quản lý
                                      name="adults"
                                    />
                                  </div>
                                  <div className="mt-2">
                                    <QuantityController
                                      nameQuantity="Trẻ em (Từ 2 - 12 tuổi)"
                                      value={numberChildren}
                                      onValueInput={handleChangeQuantity("children")}
                                      onIncrease={handleChangeQuantity("children")}
                                      onDecrease={handleChangeQuantity("children")}
                                      register={register} // đăng ký trường dữ liệu để quản lý
                                      name="children"
                                    />
                                  </div>
                                  <div className="mt-2">
                                    <QuantityController
                                      nameQuantity="Em bé (Dưới 2 tuổi)"
                                      value={numberInfants}
                                      onValueInput={handleChangeQuantity("infants")}
                                      onIncrease={handleChangeQuantity("infants")}
                                      onDecrease={handleChangeQuantity("infants")}
                                      register={register} // đăng ký trường dữ liệu để quản lý
                                      name="infants"
                                    />
                                  </div>
                                </PopoverContent>
                              </PopoverShadcn>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-4 lg:col-span-2">
                          <div className="flex items-center justify-between gap-2">
                            {/* hạng vé */}
                            <div
                              className={`w-[50%] px-8 py-[10px] border-2 rounded-md relative> ${errors.travelClass?.message ? "border-red-500 bg-red-100" : "border-gray-300"}`}
                            >
                              <PopoverShadcn open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                  <ButtonShadcn
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    aria-label="TravelClass"
                                    className="w-full flex justify-center bg-transparent border-none shadow-none text-base text-center hover:bg-transparent"
                                  >
                                    {travelClass
                                      ? travelClassList.find((item) => item.value === travelClass)
                                          ?.value
                                      : `${t("flight.travelClass")}`}
                                    {errors.travelClass?.message && (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="red"
                                        className="ml-1 h-5 w-5 flex-shrink-0"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                        />
                                      </svg>
                                    )}
                                  </ButtonShadcn>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                  <Command>
                                    <CommandList>
                                      <CommandGroup>
                                        {travelClassList.map((item, index) => (
                                          <Controller
                                            key={index}
                                            control={control}
                                            name="travelClass" // tên trường dữ liệu
                                            render={({ field }) => (
                                              <CommandItem
                                                key={item.value}
                                                value={item.value}
                                                onSelect={(currentValue) => {
                                                  field.onChange(currentValue) // quản lý và cập nhật trường dữ liệu
                                                  setOpen(false)
                                                  setTravelClass(currentValue)
                                                }}
                                              >
                                                {item.value}
                                              </CommandItem>
                                            )}
                                          />
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </PopoverShadcn>
                            </div>

                            <Button
                              // disable={flightOffersSearchMutation.isPending}
                              classNameWrapper="w-[50%] relative"
                              type="submit"
                              nameButton={t("flight.search")}
                              className="px-8 py-4 bg-blueColor w-full text-whiteColor text-base rounded-md hover:bg-blueColor/80 duration-200 font-semibold"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
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
                      {t("flight.title1")}
                    </h2>
                    <span className="block md:text-xs lg:text-sm text-blueColor">
                      {t("flight.desc1")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-1 border border-gray-200 rounded-md shadow-lg p-4">
                <div className="flex items-center gap-4">
                  <img src={banner2} alt="" className="flex-shrink-0 w-14 h-14" />
                  <div className="flex-grow">
                    <h2 className="text-base lg:text-lg text-textColor font-semibold">
                      {t("flight.title2")}
                    </h2>
                    <span className="block md:text-xs lg:text-sm text-blueColor">
                      {t("flight.desc2")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-1 border border-gray-200 rounded-md shadow-lg p-4">
                <div className="flex items-center gap-4">
                  <img src={banner1} alt="" className="flex-shrink-0 w-14 h-14" />
                  <div className="flex-grow">
                    <h2 className="text-base lg:text-lg text-textColor font-semibold">
                      {t("flight.title3")}
                    </h2>
                    <span className="block md:text-xs lg:text-sm text-blueColor">
                      {t("flight.desc3")}
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

            <div className="mt-20 md:mt-8 relative w-full h-[200px] md:h-[400px]">
              <img
                src={bannerFlight}
                alt="bannerFlight"
                className="w-0 h-0 md:w-full md:h-full object-cover brightness-50 rounded-sm"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 bg-white p-4 rounded-sm max-w-[400px] w-full">
                <h3 className="text-lg lg:text-2xl text-center font-semibold text-textColor">
                  {t("flight.partner")}
                </h3>
                <div className="mt-0 md:mt-4 grid grid-cols-8 items-center gap-2 flex-wrap">
                  {bannerAirLineList.map((item, index) => (
                    <div key={index}>
                      <div className="col-span-4 md:col-span-1">
                        <img
                          src={item}
                          alt={item}
                          className="w-14 h-14 md:w-10 md:h-8 lg:w-16 lg:h-18 object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-20 md:mt-8 relative w-full h-[200px] md:h-[400px]">
              <img
                src={bannerFlight2}
                alt="bannerFlight"
                className="w-0 h-0 md:w-full md:h-full object-cover brightness-50 rounded-sm"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 bg-white p-4 w-[200px] md:w-[400px] rounded-sm">
                <div className="flex flex-col items-center gap-2">
                  <h3 className="text-lg lg:text-2xl font-semibold text-textColor">
                    {t("flight.payment")}
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
