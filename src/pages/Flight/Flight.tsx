import { Helmet } from "react-helmet-async"
import banner from "../../img/Flight/banner.jpg"
import iconFlightRed from "../../img/Flight/iconFlightRed.png"
import iconFlight from "../../img/svg/flight-svgrepo-com.svg"
import { Button as ButtonShadcn } from "src/components/ui/button"
import { Command, CommandGroup, CommandItem, CommandList } from "src/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "src/components/ui/popover"
import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import { airportCodes, travelClassList } from "src/constant/flightSearch"
import {
  FlightOfferParamsConfig,
  ResponseFlightSearch,
  airportCodeList
} from "src/types/flight.type.ts"
import Breadcrumb from "src/components/Breadcrumb/Breadcrumb"
import { Controller, useForm } from "react-hook-form"
import Button from "src/components/Button/Button.tsx"
import {
  convertToYYYYMMDD,
  convertTravelClassToEng,
  getCodeAirport,
  getDurationFromAPI,
  getHourFromAPI
} from "src/utils/utils.ts"
import schema, { schemaType } from "src/utils/rules.ts"
import { yupResolver } from "@hookform/resolvers/yup"
import InputSearch from "src/components/InputSearch/InputSearch"
import QuantityController from "src/components/QuantityController"
import SelectDate from "src/components/SelectDate"
import { useQuery } from "@tanstack/react-query"
import { flightApi } from "src/apis/flight.api"
import useQueryConfig from "src/hooks/useQueryConfig"
import { Link } from "react-router-dom"

type FormData = Pick<
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
  const queryConfig = useQueryConfig()
  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schemaFormData)
  })

  const getFlightOffersQuery = useQuery({
    queryKey: ["flightOffers", queryConfig],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort() // // hủy request khi chờ quá lâu // 5 giây sau cho nó hủy // làm tự động
      }, 5000)
      return flightApi.flightOffersSearch(queryConfig as FlightOfferParamsConfig, controller.signal)
    },
    retry: 0 // số lần fetch khi yêu cầu thất bại
  })

  const listFlight_1 = getFlightOffersQuery?.data?.data as ResponseFlightSearch
  console.log(listFlight_1)

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

  const [flightType, setFlightType] = useState("roundTrip")
  const [showPassenger, setShowPassenger] = useState(0)
  const [showReturnDate, setShowReturnDate] = useState(false)

  const handleFlightTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFlightType(event.target.id)
  }

  // chỉ cần flightType thay đổi giá trị nó chạy lại hàm này
  useMemo(() => {
    if (flightType === "roundTrip") {
      setShowReturnDate(true)
    } else {
      setShowReturnDate(false)
    }
  }, [flightType])

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

  const handleChangeValue = (input: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (input === "input_1") {
      setSearchText(event.target.value)
    } else if (input === "input_2") {
      setSearchText2(event.target.value)
    }
  }

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

  // chỉ cần showPassenger (hành khách) thay đổi giá trị nó chạy lại hàm này
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

  const handleSubmitSearch = handleSubmit((data) => {
    console.log(data)
    // chỗ này type submit // thực hiện submit form
  })

  return (
    <div>
      <Helmet>
        <title>Tìm kiếm chuyến bay</title>
        <meta name="description" content="Flight booking - Amadeus Booking" />
      </Helmet>

      <div className="container">
        <Breadcrumb name="Chuyến bay" name2="Tìm kiếm chuyến bay" />
      </div>

      <div className="w-full h-[600px] relative">
        <img src={banner} alt="banner" className="w-full h-full" />
        <div className="w-[70%] shadow-md absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <h2 className="bg-gray-300/50 rounded-tl-lg rounded-tr-lg py-6 px-6 border-b border-b-gray-300 text-2xl text-textColor font-semibold ">
            Search for flights to find the best options for your travel needs.
          </h2>

          <form
            autoComplete="off"
            onSubmit={handleSubmitSearch}
            noValidate
            className="py-4 px-6 bg-[#f2f2f2]/80 rounded-bl-lg rounded-br-lg "
          >
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
                classNameList="z-20 absolute top-16 left-0 h-[300px] bg-[#f2f2f2] overflow-y-auto overflow-x-hidden rounded-sm shadow-sm transition-all duration-1000 ease-linear"
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
              >
                <img src={iconFlight} alt="icon flight" className="w-6 h-6 flex-shrink-0" />
              </InputSearch>
              {/* điểm đến */}
              <InputSearch
                placeholder="Bay đến"
                classNameList="z-20 absolute top-16 left-0 h-[300px] bg-[#f2f2f2] overflow-y-auto overflow-x-hidden rounded-sm shadow-sm transition-all duration-1000 ease-linear"
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
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 flex-shrink-0"
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
                type="button"
                onClick={exchangeTwoValues}
                className="z-20 absolute left-1/2 -translate-x-1/2 top-3 flex items-center justify-center w-7 h-7 rounded-full text-blueColor border-2 border-blueColor bg-blue-100"
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

            <div className="mt-4 flex justify-between items-center gap-2">
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  {/* Khứ hồi hoặc 1 chiều */}
                  <div
                    className={
                      showReturnDate
                        ? "w-[70%] flex justify-start gap-2"
                        : "w-[70%] flex justify-start"
                    }
                  >
                    {/* date ngày đi*/}
                    <div className={showReturnDate ? "w-[50%]" : "w-[100%]"}>
                      <SelectDate
                        control={control}
                        setDate={setDate}
                        date={date}
                        name="departureDate"
                        errors={errors.departureDate?.message as string}
                        convertToYYYYMMDD={convertToYYYYMMDD}
                      />
                    </div>

                    {/* date ngày về */}
                    <div className={showReturnDate ? "w-[50%]" : "opacity-0 w-[0%]"}>
                      <SelectDate
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
                  <div className="w-[30%] px-4 py-3 border border-gray-400 rounded-md flex items-center">
                    <Popover>
                      <PopoverTrigger>
                        <div className="flex items-center cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-5 w-5 flex-shrink-0"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                            />
                          </svg>

                          <input
                            type="text"
                            className="w-[35px] p-1 outline-none bg-transparent text-base flex-grow text-center"
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
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  {/* hạng vé */}
                  <div className="w-[50%] px-8 py-[10px] border border-gray-400 rounded-md relative">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <ButtonShadcn
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between bg-transparent border-none shadow-none text-base"
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
                                        field.onChange(convertTravelClassToEng(currentValue)) // quản lý và cập nhật trường dữ liệu
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
                    </Popover>
                    <span className="absolute -top-5 left-0 mb-2 text-red-500 min-h-[1.25rem] block">
                      {errors.travelClass?.message}
                    </span>
                  </div>

                  <Button
                    classNameWrapper="w-[50%] relative"
                    type="submit"
                    nameButton="Tìm kiếm"
                    className="px-8 py-[14px] bg-orangeColor w-full text-[#f2f2f2] text-lg rounded-md hover:bg-orangeColor/80 duration-200 font-semibold"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="container">
        <div className="py-8">
          <h2 className="text-2xl text-center text-textColor font-semibold">
            Khám Phá Các Chuyến Bay Quốc Tế
          </h2>
          <div className="mt-4">
            <div className="">
              {/* không load thì isPending */}
              {!getFlightOffersQuery.isPending && (
                <Fragment>
                  <div className="bg-blueColor p-2 text-[#f2f2f2] font-semibold rounded-tl-md rounded-tr-md">
                    Rẻ nhất
                  </div>
                  {listFlight_1?.data.map((item) => (
                    <div key={item.id}>
                      {/* chi tiết 1 chuyến bay sẽ gồm nhiều hành trình bay */}
                      <Link
                        to=""
                        className="flex items-center px-6 py-3 border border-textColor rounded-bl-md rounded-br-md w-full"
                      >
                        {item.itineraries.map((detail, index) => (
                          <div key={index} className="w-full">
                            {detail.segments.map((flight) => (
                              <div key={flight.id} className="grid grid-cols-12 items-center">
                                <div className="col-span-2">
                                  <div className="flex items-center gap-4">
                                    <div className="w-12 h-10">
                                      <img
                                        src={iconFlightRed}
                                        alt="iconFlight"
                                        className="w-full h-full"
                                      />
                                    </div>
                                    <span className="text-textColor text-sm font-semibold">
                                      {listFlight_1.dictionaries.carriers["CZ"]}
                                    </span>
                                  </div>
                                </div>

                                <div className="col-span-3">
                                  <div className="flex flex-col items-center">
                                    <div className="text-2xl font-semibold text-textColor">
                                      {getHourFromAPI(flight.departure.at)}
                                    </div>
                                    <div className="mt-1 text-lg text-textColor font-semibold">
                                      {flight.departure.iataCode}
                                    </div>
                                  </div>
                                </div>

                                <div className="col-span-2 relative">
                                  <div className="text-center text-base font-medium">
                                    {getDurationFromAPI(flight.duration)}
                                    <div className="absolute left-16">
                                      <div className="w-28 h-1 bg-textColor"></div>
                                      <div className="absolute top-[-3px] left-28 triangle-2"></div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-span-3">
                                  <div className="flex flex-col items-center">
                                    <div className="text-2xl font-semibold text-textColor">
                                      {getHourFromAPI(flight.arrival.at)}
                                    </div>
                                    <div className="mt-1 text-lg text-textColor font-semibold">
                                      {flight.arrival.iataCode}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </Link>
                    </div>
                  ))}
                </Fragment>
              )}

              {/* đang load thì isPending*/}
              {getFlightOffersQuery.isPending && (
                <div className="flex items-center justify-center">
                  <div
                    role="status"
                    className="max-w-4xl w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32 mb-2.5" />
                        <div className="w-52 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-24" />
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-40 mb-2.5" />
                        <div className="w-72 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-24" />
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-28 mb-2.5" />
                        <div className="w-80 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-36" />
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-36 mb-2.5" />
                        <div className="w-72 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-32" />
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-40 mb-2.5" />
                        <div className="w-44 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-32" />
                    </div>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Dùng thêm state cục bộ để quản lý dữ liệu input kết hợp với useForm sử dụng setValue để quản lý dữ liệu trước khi submit đi
// nếu không dùng state cục bộ thì không thể truyền props xuống các component con
// vì thường các trường dữ liệu của input chỉ quản lý trong component đó (validate...) submit đi

{
  /* render ra tất cả hành trình bay (chuyến bay - quá cảnh) của 1 chuyến bay */
}
