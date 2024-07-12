import { Helmet } from "react-helmet-async"
import bg1 from "../../img/Flight/bg1.webp"
import coVN from "../../img/lauguage/coVN.webp"
import coMy from "../../img/lauguage/coMy.webp"
import banner1 from "../../img/Flight/banner1.webp"
import banner2 from "../../img/Flight/banner2.webp"
import banner3 from "../../img/Flight/banner3.webp"
import logo from "../../img/favicon/FaviconFlight.webp"
import hotel from "../../img/svg/hotel-1-svgrepo-com.svg"
import iconFlight from "../../img/svg/flight-svgrepo-com.svg"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import schema, { schemaType } from "src/utils/rules"
import { airportCodes, travelClassList } from "src/constant/flightSearch"
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { convertToYYYYMMDD, getCodeAirport, getNameToEmail } from "src/utils/utils"
import { airportCodeList } from "src/types/flight.type"
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

export type InputAirport = "originLocationCode" | "destinationLocationCode"

export type InputController = "adults" | "children" | "infants"

const schemaFormData = schema.pick([
  "originLocationCode",
  "destinationLocationCode",
  "departureDate",
  "returnDate",
  "travelClass"
])

const fetchDataAirport = () => Promise.resolve(airportCodes) // khởi tạo 1 promise

export default function Flight() {
  // xử lý header
  const { isAuthenticated, isProfile, setIsAuthenticated, setIsProfile } = useContext(AppContext)

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
  const [airportCodeList, setAirportCodeList] = useState<airportCodeList>([])
  const [showListAirport, setShowListAirport] = useState<boolean>(false)
  const [showListAirport2, setShowListAirport2] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputRef2 = useRef<HTMLInputElement>(null)

  // quản lý state lưu trữ của form
  const [searchText, setSearchText] = useState<string>("") // mã airport xuất phát
  const [searchText2, setSearchText2] = useState<string>("") // mã airport đích
  const [date, setDate] = useState<Date | null>(null) // ngày đi
  const [date2, setDate2] = useState<Date | null>(null) // ngày về
  const [travelClass, setTravelClass] = useState<string>("") // hạng vé
  const [numberAdults, setNumberAdults] = useState<number>(0) // HK người lớn
  const [numberChildren, setNumberChildren] = useState<number>(0) // HK trẻ em
  const [numberInfants, setNumberInfants] = useState<number>(0) // HK em bé

  const [flightType, setFlightType] = useState("oneWay")
  const [showPassenger, setShowPassenger] = useState(0)

  const handleFlightTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFlightType(event.target.id)
  }

  useEffect(() => {
    fetchDataAirport().then((res) => {
      setAirportCodeList(res)
    })
  }, [])

  const handleFocusAirportList = (listShow: string) => () => {
    if (listShow === "1") {
      setShowListAirport(true)
    } else if (listShow === "2") {
      setShowListAirport2(true)
    }
  }

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

  //`useCallback()`: khi cta không muốn function của cta được khởi tạo lại mỗi lần component chúng ta re-render - nếu có thay đổi nó mới chạy lại - re-render
  //`useMemo()`: tương tự, khi chúng ta muốn một biến không bị làm mới lại mỗi lần component re-render. - nếu có thay đổi nó mới chạy lại - re-render
  const handleChangeValue = useCallback(
    (input: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (input === "input_1") {
        setSearchText(event.target.value)
      } else if (input === "input_2") {
        setSearchText2(event.target.value)
      }
    },
    []
  )

  const filterAirportCodeList_1 = useMemo(
    () =>
      airportCodeList.filter((item) =>
        item.country.toLowerCase().includes(searchText.toLowerCase())
      ),
    [searchText, airportCodeList]
  )

  const filterAirportCodeList_2 = useMemo(
    () =>
      airportCodeList.filter((item) =>
        item.country.toLowerCase().includes(searchText2.toLowerCase())
      ),
    [searchText2, airportCodeList]
  ) // lọc các item dựa vào searchText (input)
  // includes: hàm check bao gồm

  const handleItemClick = (inputName: InputAirport, value: string) => {
    setValue(inputName, getCodeAirport(value) as string) // đảm bảo giá trị của input được quản lý bởi react-hook-form // // cập nhật giá trị của một trường dữ liệu
    if (inputName === "originLocationCode") {
      setSearchText(value) // nếu dùng mỗi thằng này thì nó ko dc quản lý bởi useForm // luôn ""
      setShowListAirport(false)
    } else if (inputName === "destinationLocationCode") {
      setSearchText2(value)
      setShowListAirport2(false)
    }
  }

  const handleChangeQuantity = (nameQuantity: InputController) => (value: number) => {
    setValue(nameQuantity, value) // đảm bảo giá trị của input được quản lý bởi react-hook-form // // cập nhật giá trị của một trường dữ liệu
    if (nameQuantity === "adults") {
      setNumberAdults(value)
    } else if (nameQuantity === "children") {
      setNumberChildren(value)
    } else if (nameQuantity === "infants") {
      setNumberInfants(value)
    }
    setShowPassenger(numberAdults + numberChildren + numberInfants)
  }

  useMemo(() => {
    setShowPassenger(numberAdults + numberChildren + numberInfants)
  }, [numberAdults, numberChildren, numberInfants])

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
      departureDate: data.departureDate as string,
      adults: data.adults as unknown as string,
      children: data.children as unknown as string,
      infants: data.infants as unknown as string,
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
    // nếu có data của `date ngày về` thì truyền vào navigate (do nó không bắt buộc)
    const config = createConfig(data)
    const state = {
      ...config,
      flightType,
      returnDate: data.returnDate || null
    }
    navigate(
      {
        pathname: path.flightSearch,
        search: createSearchParams(config).toString()
      },
      {
        state
      }
    )
  })

  return (
    <div>
      <Helmet>
        <title>Chuyến bay</title>
        <meta name="description" content="Chuyến bay - Booking." />
      </Helmet>

      <div className="w-full h-[600px]">
        <div
          className=" w-full h-full relative"
          style={{
            backgroundImage: `url(${bg1})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        >
          <div className="container">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <div className="hidden md:block w-10 h-10">
                  <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div className="text-xl text-whiteColor font-semibold">Booking.</div>
              </div>
              <div className="flex items-center gap-2">
                <Popover
                  className="sticky top-0 left-0 z-30"
                  renderPopover={
                    <div className="shadow-lg rounded flex flex-col border border-gray-300">
                      <button className="text-sm flex items-center gap-2 text-left min-w-[120px] p-3 bg-[#edf2f4] text-textColor hover:bg-gray-300 duration-200 border border-gray-300">
                        <img src={coVN} alt="Cờ Việt Nam" className="h-6 w-6 object-contain" />
                        Vietnamese
                      </button>

                      <button className="text-sm flex items-center gap-2 text-left min-w-[120px] p-3 bg-[#edf2f4] text-textColor hover:bg-gray-300 duration-200">
                        <img src={coMy} alt="Cờ Mỹ" className="h-6 w-6 object-contain" />
                        English
                      </button>
                    </div>
                  }
                >
                  <div className="flex gap-1 items-center p-2 border-2 border-gray-300 duration-200 hover:bg-[#ddd]/80 text-whiteColor rounded-sm text-sm">
                    <img src={coVN} alt="Cờ Việt Nam" className="h-5 w-5 object-contain" />
                    Ngôn ngữ
                  </div>
                </Popover>

                {isAuthenticated && (
                  <Popover
                    className="sticky top-0 left-0 z-30"
                    renderPopover={
                      <div className="shadow-lg rounded flex flex-col border border-gray-300">
                        <button className="text-sm text-left min-w-[120px] px-4 py-3 bg-[#edf2f4] text-textColor hover:bg-gray-300 duration-200 border-b border-gray-300">
                          Tài khoản của tôi
                        </button>

                        <button
                          onClick={handleLogOut}
                          className="text-sm text-left min-w-[120px] px-4 py-3 bg-[#edf2f4] text-textColor hover:bg-gray-300 duration-200 flex items-center gap-2"
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
                    <div className="py-[6px] px-3 border-2 border-blueColor rounded-sm duration-200 hover:bg-[#ddd]/80 flex items-center gap-1 text-whiteColor font-medium text-sm">
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

                      {getNameToEmail(isProfile as string)}
                    </div>
                  </Popover>
                )}

                {!isAuthenticated && (
                  <div className="flex items-center gap-2">
                    <Link
                      to={path.register}
                      className="py-2 px-3 border-2 border-blueColor duration-200 hover:bg-[#ddd]/80 rounded-sm text-sm text-whiteColor"
                    >
                      Register
                    </Link>
                    <Link
                      to={path.login}
                      className="py-2 px-3 border-2 border-blueColor bg-blueColor duration-200 hover:bg-blueColor/80 hover:border-blueColor/80 rounded-sm text-sm text-whiteColor"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-[55%] absolute left-1/2 md:top-24 -translate-x-1/2 z-20">
            <div className="py-4 px-8 bg-whiteColor rounded-lg shadow-lg">
              <nav className="flex items-center gap-4">
                <Link to={path.flight} className="flex flex-col items-center">
                  <div className="w-8 h-8">
                    <img src={iconFlight} alt="icon" className="w-full h-full" />
                  </div>
                  <span className="mt-1 text-sm font-semibold text-blueColor">Chuyến bay</span>
                </Link>
                <Link to={path.flight} className="flex flex-col items-center">
                  <div className="w-8 h-8">
                    <img src={hotel} alt="icon" className="w-full h-full" />
                  </div>
                  <span className="mt-1 text-sm font-normal text-textColor">Khách sạn</span>
                </Link>
              </nav>
            </div>
          </div>

          <div className="w-[75%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <form
              autoComplete="off"
              onSubmit={handleSubmitSearch}
              noValidate
              className="p-8 pt-16 bg-whiteColor rounded-lg shadow-md"
            >
              {/* loại chuyến bay */}
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="flight"
                    id="oneWay"
                    checked={flightType === "oneWay"}
                    onChange={handleFlightTypeChange}
                    className="w-5 h-5"
                  />
                  <label htmlFor="oneWay" className="text-base text-textColor font-semibold">
                    Một chiều
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="flight"
                    id="roundTrip"
                    checked={flightType === "roundTrip"}
                    onChange={handleFlightTypeChange}
                    className="w-5 h-5"
                  />
                  <label htmlFor="roundTrip" className="text-base text-textColor font-semibold">
                    Khứ hồi
                  </label>
                </div>
              </div>

              <div className="mt-4 flex relative gap-2">
                {/* điểm xuất phát */}
                <InputSearch
                  placeholder="Bay từ"
                  classNameList="z-20 absolute top-16 left-0 h-[300px] bg-whiteColor overflow-y-auto overflow-x-hidden rounded-sm shadow-sm transition-all duration-1000 ease-linear"
                  ref={inputRef}
                  filterList={filterAirportCodeList_1}
                  value={searchText}
                  showList={showListAirport}
                  handleItemClick={handleItemClick}
                  inputName="originLocationCode"
                  handleChangeValue={handleChangeValue("input_1")}
                  handleFocus={handleFocusAirportList("1")}
                  register={register}
                  name="originLocationCode"
                  error={errors.originLocationCode?.message}
                  desc="Từ"
                >
                  <img src={iconFlight} alt="icon flight" className="w-10 h-10 flex-shrink-0" />
                </InputSearch>
                {/* điểm đến */}
                <InputSearch
                  placeholder="Bay đến"
                  classNameList="z-20 absolute top-16 left-0 h-[300px] bg-whiteColor overflow-y-auto overflow-x-hidden rounded-sm shadow-sm transition-all duration-1000 ease-linear"
                  ref={inputRef2}
                  filterList={filterAirportCodeList_2}
                  value={searchText2}
                  showList={showListAirport2}
                  handleItemClick={handleItemClick}
                  inputName="destinationLocationCode"
                  handleChangeValue={handleChangeValue("input_2")}
                  handleFocus={handleFocusAirportList("2")}
                  register={register}
                  name="destinationLocationCode"
                  error={errors.destinationLocationCode?.message}
                  desc="Đến"
                >
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
                </InputSearch>

                {/* đổi 2 giá trị với nhau */}
                <button
                  aria-label="buttonChangeValue"
                  type="button"
                  onClick={exchangeTwoValues}
                  className="z-20 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-full text-blueColor border-2 border-blueColor bg-blue-100"
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

              <div className="mt-4 flex justify-between items-center gap-2 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    {/* Khứ hồi hoặc 1 chiều */}
                    <div
                      className={
                        flightType === "roundTrip"
                          ? "w-[70%] flex justify-start gap-2"
                          : "w-[70%] flex justify-start"
                      }
                    >
                      {/* date ngày đi*/}
                      <div className={flightType === "roundTrip" ? "w-[50%]" : "w-[100%]"}>
                        <SelectDate
                          text="Ngày khởi hành"
                          control={control}
                          setDate={setDate}
                          date={date}
                          name="departureDate"
                          errors={errors.departureDate?.message as string}
                          convertToYYYYMMDD={convertToYYYYMMDD}
                        />
                      </div>

                      {/* date ngày về */}
                      <div className={flightType === "roundTrip" ? "w-[50%]" : "hidden w-[0%]"}>
                        <SelectDate
                          text="Ngày về"
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
                    <div className="w-[30%] py-3 border-2 border-gray-300 rounded-md flex items-center justify-center">
                      <PopoverShadcn>
                        <PopoverTrigger>
                          <div className="flex items-center cursor-pointer">
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

                            <span className="text-base text-textColor font-semibold">Khách</span>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent>
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

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    {/* hạng vé */}
                    <div className="w-[50%] px-8 py-[10px] border-2 border-gray-300 rounded-md relative">
                      <PopoverShadcn open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <ButtonShadcn
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            aria-label="TravelClass"
                            className="w-full flex justify-center bg-transparent border-none shadow-none text-base text-center"
                          >
                            {travelClass
                              ? travelClassList.find((item) => item.value === travelClass)?.value
                              : "Chọn hạng vé"}
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
                      <span className="absolute -top-5 left-0 mb-2 text-red-500 min-h-[1.25rem] block">
                        {errors.travelClass?.message}
                      </span>
                    </div>

                    <Button
                      // disable={flightOffersSearchMutation.isPending}
                      classNameWrapper="w-[50%] relative"
                      type="submit"
                      nameButton="Tìm kiếm"
                      className="px-8 py-4 bg-blueColor w-full text-whiteColor text-base rounded-md hover:bg-blueColor/80 duration-200 font-semibold border-blueColor"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="my-4 px-8 flex items-center justify-between gap-4">
          <div className="flex-1 h-[120px] bg-[#f2f2f2] rounded-md shadow p-4">
            <div className="flex items-center gap-4">
              <img src={banner3} alt="" className="flex-shrink-0 w-14 h-14" />
              <div className="flex-grow">
                <span className="text-lg text-textColor font-semibold">Điểm đến tốt nhất?</span>
                <span className="block text-sm text-blueColor">
                  Khám phá những điểm đến tuyệt vời nhất với chúng tôi. Chúng tôi cung cấp những gợi
                  ý lý tưởng cho chuyến du lịch của bạn.
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1 h-[120px] bg-[#f2f2f2] rounded-md shadow p-4">
            <div className="flex items-center gap-4">
              <img src={banner1} alt="" className="flex-shrink-0 w-14 h-14" />
              <div className="flex-grow">
                <span className="text-lg text-textColor font-semibold">
                  Hướng dẫn viên du lịch?
                </span>
                <span className="block text-sm text-blueColor">
                  Trải nghiệm chuyến đi hoàn hảo với sự hỗ trợ của các hướng dẫn viên chuyên nghiệp.
                  Hiểu rõ hơn về văn hóa và lịch sử mỗi điểm đến.
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1 h-[120px] bg-[#f2f2f2] rounded-md shadow p-4">
            <div className="flex items-center gap-4">
              <img src={banner2} alt="" className="flex-shrink-0 w-14 h-14" />
              <div className="flex-grow">
                <span className="text-lg text-textColor font-semibold">Đa dạng ngôn ngữ</span>
                <span className="block text-sm text-blueColor">
                  Chúng tôi hỗ trợ cả 2 ngôn ngữ là Tiếng anh và tiếng Việt
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
