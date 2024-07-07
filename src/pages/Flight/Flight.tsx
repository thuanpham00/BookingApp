import { Helmet } from "react-helmet-async"
import banner from "../../img/Flight/banner.jpg"
import iconFlightRed from "../../img/Flight/iconFlightRed.png"
import iconFlight from "../../img/svg/flight-svgrepo-com.svg"
import { Button as ButtonShadcn } from "src/components/ui/button"
import { Command, CommandGroup, CommandItem, CommandList } from "src/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "src/components/ui/popover"
import { useEffect, useMemo, useRef, useState } from "react"
import { airportCodes, travelClassList } from "src/constant/flightSearch"
import { ResponseFlightSearch, airportCodeList, flightSearchParams } from "src/types/flight.type.ts"
import Breadcrumb from "src/components/Breadcrumb/Breadcrumb"
import { Controller, useForm } from "react-hook-form"
import Button from "src/components/Button/Button.tsx"
import {
  convertToYYYYMMDD,
  convertTravelClassToEng,
  getCodeAirport,
  getDurationFromAPI,
  getHourFromAPI,
  getPrice
} from "src/utils/utils.ts"
import schema, { schemaType } from "src/utils/rules.ts"
import { yupResolver } from "@hookform/resolvers/yup"
import InputSearch from "src/components/InputSearch/InputSearch"
import QuantityController from "src/components/QuantityController"
import SelectDate from "src/components/SelectDate"
import { useMutation } from "@tanstack/react-query"
import { flightApi } from "src/apis/flight.api"
import { Link } from "react-router-dom"

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
  console.log(travelClass)
  const [numberAdults, setNumberAdults] = useState<number>(0) // HK người lớn
  const [numberChildren, setNumberChildren] = useState<number>(0) // HK trẻ em
  const [numberInfants, setNumberInfants] = useState<number>(0) // HK em bé

  const [flightType, setFlightType] = useState("oneWay")
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

  const searchFlightOffersMutation = useMutation({
    mutationFn: (data: flightSearchParams) => {
      return flightApi.flightOffersSearch(data as flightSearchParams)
    }
  })

  const searchFlightList = searchFlightOffersMutation?.data?.data as ResponseFlightSearch
  console.log(searchFlightList)

  const [showInfoSearch, setShowInfoSearch] = useState(false)
  const handleSubmitSearch = handleSubmit((data) => {
    console.log(data)
    // truyền các data mà form quản lý vào biến này để submit gọi api

    const flightSearchParams: flightSearchParams = {
      originDestinations: [
        // 1 mảng chứ các đối tượng đại diện cho các chuyến bay gồm id, điểm bắt đầu, điểm đích, ngày đi, ngày về (nếu có)
        {
          // 1 điểm bắt đầu và 1 điểm đích trong quá trình tìm
          id: "1",
          originLocationCode: data.originLocationCode,
          destinationLocationCode: data.destinationLocationCode,
          departureDateTimeRange: {
            date: data.departureDate
          }
        }
      ],
      travelers: [
        // 1 mảng chứa các đối tượng đại diện cho hành khách.
        {
          id: "1",
          travelerType: "ADULT",
          count: data.adults as number
        },
        {
          id: "2",
          travelerType: "CHILD",
          count: data.children as number
        },
        {
          id: "3",
          travelerType: "SEATED_INFANT",
          count: data.infants as number
        }
      ],
      sources: ["GDS"], // nguồn dữ liệu
      searchCriteria: {
        // 1 đối tượng chứa các tiêu chí tìm kiếm.
        maxFlightOffers: 5, // sl tìm kiếm
        flightFilters: {
          cabinRestrictions: [
            {
              cabin: data.travelClass, // khoang cabin
              originDestinationIds: ["1"] // Bỏ originDestinationIds
            }
          ],
          carrierRestrictions: {
            excludedCarrierCodes: ["ER"]
          }
        }
      },
      currencyCode: "VND" // Đơn vị tiền tệ mong muốn
    }
    // chỗ này type submit // thực hiện submit form
    searchFlightOffersMutation.mutate(flightSearchParams, {
      onSuccess: () => {
        setShowInfoSearch(true)
      }
    })
  })

  return (
    <div className="bg-[#e5eef4]">
      <Helmet>
        <title>Tìm kiếm chuyến bay</title>
        <meta name="description" content="Flight booking - Amadeus Booking" />
      </Helmet>

      <div className="container">
        <Breadcrumb name="Chuyến bay" name2="Tìm kiếm chuyến bay" />
      </div>

      <div className="w-full h-[550px] relative">
        <img src={banner} alt="banner" className="w-full h-full filter brightness-50" />
        <div className="w-[70%] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <h1 className="my-4 md:text-2xl lg:text-4xl text-[#f2f2f2] font-semibold">
            Search for flights to find the best options for your travel needs.
          </h1>

          <form
            autoComplete="off"
            onSubmit={handleSubmitSearch}
            noValidate
            className="py-4 px-6 bg-[#f2f2f2]/80 rounded-lg shadow-md"
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
                    <div className={showReturnDate ? "w-[50%]" : "hidden w-[0%]"}>
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
          {/* không load thì isPending */}
          {showInfoSearch && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3">
                <div className="bg-[#fff] shadow-md h-[500px]"></div>
              </div>

              <div className="col-span-9">
                <div className="text-2xl text-textColor font-semibold mb-4">
                  Chuyến bay từ {searchText} đến {searchText2}
                </div>
                {searchFlightList?.data.map((item) => (
                  <div key={item.id}>
                    {/* chi tiết 1 chuyến bay sẽ gồm nhiều hành trình bay */}
                    <Link
                      to=""
                      className="flex items-center px-6 py-3 w-full bg-[#fff] mb-4 shadow-sm"
                    >
                      {item.itineraries.map((detail, index) => (
                        <div key={index} className="w-full">
                          {/* các hành trình bay trong 1 chuyến bay - quá cảnh */}
                          {detail.segments.map((flight) => (
                            <div key={flight.id} className="grid grid-cols-12 items-center mb-2">
                              <div className="col-span-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-9 h-8 flex-shrink-0">
                                    <img
                                      src={iconFlightRed}
                                      alt="iconFlight"
                                      className="w-full h-full"
                                    />
                                  </div>
                                  <div className="flex-grow">
                                    <span className="block text-textColor text-xs font-semibold">
                                      {searchFlightList.dictionaries.carriers[flight.carrierCode]}
                                    </span>
                                    <span className="block text-textColor text-xs font-normal">
                                      {searchFlightList.dictionaries.aircraft[flight.aircraft.code]}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="col-span-2">
                                <div className="flex flex-col items-center">
                                  <div className="text-xl font-semibold text-textColor">
                                    {getHourFromAPI(flight.departure.at)}
                                  </div>
                                  <div className="text-base text-textColor">
                                    {flight.departure.iataCode}
                                  </div>
                                </div>
                              </div>

                              <div className="col-span-2 relative">
                                <div className="text-center text-base font-medium">
                                  {getDurationFromAPI(flight.duration)}
                                </div>
                                <div className="w-24 h-1 bg-blueColor absolute left-1/2 -translate-x-1/2"></div>
                                <div className="text-sm mt-1 text-center">
                                  {flight.numberOfStops === 0 && detail.segments.length === 1
                                    ? "Bay trực tiếp"
                                    : ""}
                                </div>
                              </div>

                              <div className="col-span-2">
                                <div className="flex flex-col items-center">
                                  <div className="text-xl font-semibold text-textColor">
                                    {getHourFromAPI(flight.arrival.at)}
                                  </div>
                                  <div className="text-base text-textColor">
                                    {flight.arrival.iataCode}
                                  </div>
                                </div>
                              </div>

                              <div className="col-span-3">
                                <div className="flex flex-col items-center">
                                  <div className="text-base text-textColor">
                                    {getPrice(item.travelerPricings[0].price.base)}
                                    <span>{item.travelerPricings[0].price.currency}</span>
                                  </div>
                                  <span className="text-sm">
                                    dành cho {item.travelerPricings[0].travelerType}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!showInfoSearch && (
            <div role="status" className="flex items-center justify-center animate-pulse mx-auto">
              <button
                disabled
                type="button"
                className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-[#e5eef4] rounded-lg border border-gray-200 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-5 h-5 me-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Loading...
              </button>
            </div>
          )}
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
