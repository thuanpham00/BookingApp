import { Helmet } from "react-helmet-async"
import bg1 from "../../img/Hotel/bg1.webp"
import coVN from "../../img/lauguage/coVN.webp"
import coMy from "../../img/lauguage/coMy.webp"
import logo from "../../img/favicon/FaviconFlight.webp"
import iconFlight from "../../img/svg/flight-svgrepo-com.svg"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "src/context/useContext"
import { clearLS } from "src/utils/auth"
import Popover from "src/components/Popover"
import { path } from "src/constant/path"
import Skeleton from "src/components/Skeleton"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "src/components/ui/sheet"
import iconHotel from "src/img/Hotel/hotel-svgrepo-com.svg"
import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { getNameFromEmail } from "src/utils/utils"
import { cityCodeList, hotelRatingList, listCityInVietNam } from "src/constant/hotelSearch"
import InputSearch from "src/components/InputSearch"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaHotel, schemaTypeHotel } from "src/utils/rules"
import useFormHandler from "src/hooks/useFormHandler"
import { FlightContext } from "src/context/useContextFlight"
import { TypeCityCodeList } from "src/types/hotel.type"
import CityCodeList from "src/components/CityCodeList"
import Button from "src/components/Button"
import { PopoverTrigger, Popover as PopoverLib, PopoverContent } from "src/components/ui/popover"
import { Button as ButtonShadcn } from "src/components/ui/button"
import { Command, CommandGroup, CommandItem, CommandList } from "src/components/ui/command"
import iconStar from "src/img/Hotel/star.png"

export const fetchDataHotel = () => Promise.resolve(cityCodeList) // khởi tạo 1 promise
export type FormDataHotel = Pick<schemaTypeHotel, "cityCode" | "radius" | "ratings">

export const schemaFormDataHotel = schemaHotel.pick(["cityCode", "radius", "ratings"])

export default function Hotel() {
  const { isAuthenticated, setIsAuthenticated, isProfile, setIsProfile, listCart } =
    useContext(AppContext)

  const { cityCode, setCityCode, radius, setRadius, ratings, setRatings } =
    useContext(FlightContext)

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

  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [airportCodeList, setAirportCodeList] = useState<TypeCityCodeList>([])
  const [showListAirport, setShowListAirport] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors }
  } = useForm<FormDataHotel>({
    resolver: yupResolver(schemaFormDataHotel)
  })

  useEffect(() => {
    fetchDataHotel().then((res) => {
      setAirportCodeList(res)
    })
  }, [])

  useEffect(() => {
    const clickOutHideListAirport = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        // nơi được click nằm ngoài vùng phần tử
        setShowListAirport(false)
      }
    }

    document.addEventListener("mousedown", clickOutHideListAirport)

    return () => document.removeEventListener("mousedown", clickOutHideListAirport)
  }, [])

  const { filterList: filterAirportCodeList_1, handleItemClick } = useFormHandler(
    airportCodeList,
    cityCode,
    setValue,
    setCityCode,
    setShowListAirport
  )

  const handleNavigateSearchCity = (code: string) => {
    navigate(path.hotelSearch, {
      state: {
        cityCode: code, //  Mã IATA của thành phố nơi bạn muốn tìm khách sạn.
        radius: 10, // Bán kính tìm kiếm xung quanh
        radiusUnit: "KM", // Đơn vị đo của bán kính
        hotelSource: "ALL"
      }
    })
  }

  const handleSubmitSearch = handleSubmit((data) => {
    navigate(path.hotelSearch, {
      state: {
        cityCode: data.cityCode, //  Mã IATA của thành phố nơi bạn muốn tìm khách sạn.
        radius: Number(data.radius), // Bán kính tìm kiếm xung quanh
        radiusUnit: "KM", // Đơn vị đo của bán kính
        ratings: data.ratings,
        hotelSource: "ALL"
      }
    })
  })

  return (
    // khắc phục lệch layout
    <div className="h-[3080px] md:h-[1500px] bg-[#fff]">
      {loading ? (
        <Skeleton className="flex flex-col justify-center items-center absolute left-1/2 top-[10%] -translate-x-1/2 -translate-y-1/2" />
      ) : (
        <Fragment>
          <Helmet>
            <title>Khách sạn</title>
            <meta name="description" content="Khách sạn - Booking." />
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
                        <div className="hidden md:flex gap-1 items-center text-whiteColor rounded-sm text-sm duration-200 hover:text-gray-300">
                          <img src={coVN} alt="Cờ Việt Nam" className="h-6 w-6 object-contain" />
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
                            <div className="py-[6px] px-3 border-2 rounded-sm duration-200 hover:bg-[#ddd]/20 flex items-center gap-1 text-whiteColor font-medium text-sm">
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
                  </div>

                  <h1 className="hidden md:block text-textColor md:text-xl lg:text-3xl font-semibold text-center my-2 lg:my-8">
                    Tìm tổ ấm với Booking. home
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
                      onSubmit={handleSubmitSearch}
                      noValidate
                      className="p-4 md:p-8 md:pt-12 md:pb-6 grid grid-cols-6 flex-wrap gap-2 bg-whiteColor rounded-lg shadow-md"
                    >
                      <div className="col-span-6 md:col-span-3">
                        <InputSearch
                          iconChild={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-8 h-8 flex-shrink-0"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                              />
                            </svg>
                          }
                          placeholder="Điểm du lịch hoặc tên khách sạn"
                          classNameWrapper="relative"
                          classNameList={`z-20 absolute top-20 left-0 w-full ${showListAirport ? "h-[300px]" : "h-0"} bg-whiteColor overflow-y-auto overflow-x-hidden rounded-sm shadow-sm transition-all duration-200 ease-linear`}
                          classNameInput="px-2 outline-none bg-transparent md:text-xl lg:text-2xl font-medium flex-grow"
                          ref={inputRef}
                          value={cityCode}
                          showList={showListAirport}
                          handleChangeValue={(event) => setCityCode(event.target.value)}
                          handleFocus={() => setShowListAirport(true)}
                          register={register} // đăng ký trường dữ liệu
                          name="cityCode"
                          error={errors.cityCode?.message}
                        >
                          <CityCodeList
                            listAirport={filterAirportCodeList_1}
                            handleItemClick={handleItemClick}
                            inputName="cityCode"
                          />
                        </InputSearch>
                      </div>

                      <div className="col-span-6 md:col-span-1">
                        <input
                          className="w-full px-4 py-5 outline-none bg-transparent font-normal rounded-md text-base border-2 border-gray-300"
                          type="text"
                          autoComplete="on"
                          placeholder="Bán kính dò tìm (vd: 5)"
                          value={radius}
                          {...register("radius")}
                          onChange={(event) => setRadius(event.target.value)}
                        />
                      </div>

                      <div className="col-span-6 md:col-span-1 rounded-md relative bg-transparent">
                        <PopoverLib open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <ButtonShadcn
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              aria-label="ratings"
                              className="flex justify-center items-center gap-1 bg-transparent py-8 shadow-none text-sm hover:bg-transparent w-full border-2 border-gray-300"
                            >
                              {ratings
                                ? hotelRatingList.find((item) => item.value === ratings)?.value
                                : "Xếp hạng"}
                              <img src={iconStar} alt="iconStar" className="w-4 h-4" />
                            </ButtonShadcn>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandList>
                                <CommandGroup>
                                  {hotelRatingList.map((item, index) => (
                                    <Controller
                                      key={index}
                                      control={control}
                                      name="ratings" // tên trường dữ liệu
                                      render={({ field }) => (
                                        <CommandItem
                                          key={item.value}
                                          value={item.value}
                                          onSelect={(currentValue) => {
                                            field.onChange(currentValue) // quản lý và cập nhật trường dữ liệu
                                            setOpen(false)
                                            setRatings(currentValue)
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
                        </PopoverLib>
                      </div>

                      <Button
                        classNameWrapper="col-span-6 md:col-span-1 relative"
                        type="submit"
                        nameButton="Tìm kiếm"
                        className="py-[20px] lg:py-[20px] bg-blueColor w-full text-whiteColor text-base rounded-md hover:bg-blueColor/80 duration-200 font-semibold border-blueColor"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="mt-4">
              <h2 className="text-center text-textColor text-2xl font-semibold">
                Các điểm đến du lịch thu hút
              </h2>

              <div className="my-4">
                <div className="grid grid-cols-4 gap-4">
                  {listCityInVietNam.map((item, index) => (
                    <button
                      onClick={() => handleNavigateSearchCity(item.code)}
                      key={index}
                      className="col-span-4 md:col-span-2 lg:col-span-1 hover:scale-95 duration-200 "
                    >
                      <img
                        src={item.img}
                        alt="danang"
                        className="w-full h-[250px] object-cover rounded-lg"
                      />
                      <span className="mt-2 text-textColor text-base text-center block font-medium">
                        {item.name}
                      </span>
                      <span className="text-textColor text-sm text-center block font-normal">
                        {item.quantity}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  )
}

// nó sẽ xuất hiện 2 component hotel và hotelSearch giải pháp lưu vào ram useContext
// để khi navigate có thể render ra được
