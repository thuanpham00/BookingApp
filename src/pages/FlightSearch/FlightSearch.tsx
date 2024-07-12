import { Helmet } from "react-helmet-async"
import iconFlight from "../../img/svg/flight-svgrepo-com.svg"
import bg from "../../img/Flight/backGround.jpg"
import { Button as ButtonShadcn } from "src/components/ui/button"
import { Command, CommandGroup, CommandItem, CommandList } from "src/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "src/components/ui/popover"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { airportCodes, travelClassList } from "src/constant/flightSearch"
import { ResponseFlightList, airportCodeList, FlightSearchParams } from "src/types/flight.type.ts"
import { Controller, useForm } from "react-hook-form"
import Button from "src/components/Button/Button.tsx"
import { convertToYYYYMMDD, getCodeAirport } from "src/utils/utils.ts"
import { schemaType } from "src/utils/rules.ts"
import InputSearch from "src/components/InputSearch/InputSearch"
import QuantityController from "src/components/QuantityController"
import SelectDate from "src/components/SelectDate"
import { useMutation } from "@tanstack/react-query"
import { flightApi } from "src/apis/flight.api"
import FlightItem from "./components/FlightItem"
import { InputAirport, InputController } from "../Flight/Flight"
import useQueryConfig from "src/hooks/useQueryConfig"
import { useLocation } from "react-router-dom"

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

const fetchDataAirport = () => Promise.resolve(airportCodes) // khởi tạo 1 promise

export default function FlightSearch() {
  const queryConfig = useQueryConfig()

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      adults: Number(queryConfig.adults),
      children: Number(queryConfig.children),
      infants: Number(queryConfig.infants),
      originLocationCode: queryConfig.originLocationCode,
      destinationLocationCode: queryConfig.destinationLocationCode,
      travelClass: queryConfig.travelClass,
      departureDate: queryConfig.departureDate,
      returnDate: queryConfig.returnDate
    }
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
  const [date, setDate] = useState<Date | string | null>(null) // ngày đi
  const [date2, setDate2] = useState<Date | string | null>(null) // ngày về
  const [travelClass, setTravelClass] = useState<string>("") // hạng vé
  const [numberAdults, setNumberAdults] = useState<number>(0) // HK người lớn
  const [numberChildren, setNumberChildren] = useState<number>(0) // HK trẻ em
  const [numberInfants, setNumberInfants] = useState<number>(0) // HK em bé

  const [flightType, setFlightType] = useState("oneWay")
  const [showPassenger, setShowPassenger] = useState(0)
  const [showInfoSearch, setShowInfoSearch] = useState(false)

  const location = useLocation()
  const { state } = location

  console.log(state)
  useEffect(() => {
    setSearchText(state.originLocationCode)
    setSearchText2(state.destinationLocationCode)
    setDate(state.departureDate)
    setDate2(state.returnDate)
    setTravelClass(state.travelClass)
    setNumberAdults(state.adults as number)
    setNumberChildren(state.children as number)
    setNumberInfants(state.infants as number)
    setFlightType(state.flightType)
    setShowPassenger(state.adults + state.children + state.infants)
  }, [state])

  console.log(numberAdults, numberChildren, numberInfants)

  const handleFlightTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFlightType(event.target.id)
  }

  // chỉ cần flightType thay đổi giá trị nó chạy lại hàm này
  useMemo(() => {
    if (flightType === "roundTrip") {
      setShowInfoSearch(false)
    } else {
      setShowInfoSearch(false)
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
    setShowPassenger(numberChildren + numberInfants)
  }, [numberChildren, numberInfants])

  const exchangeTwoValues = () => {
    setSearchText(searchText2)
    setSearchText2(searchText)
    setValue("originLocationCode", searchText2)
    setValue("destinationLocationCode", searchText) // cập nhật trường dữ liệu trước khi submit form
    // chỗ này type button // thực hiện click
  }

  const flightOffersSearchMutation = useMutation({
    mutationFn: (data: FlightSearchParams) => {
      return flightApi.flightOffersSearch(data as FlightSearchParams)
    }
  })

  const flightList = flightOffersSearchMutation?.data?.data as ResponseFlightList

  const handleSubmitSearch = handleSubmit((data) => {
    // truyền các data mà form quản lý vào biến này để submit gọi api

    const body: FlightSearchParams = {
      originDestinations:
        flightType === "roundTrip"
          ? [
              // 1 mảng chứ các đối tượng đại diện cho các chuyến bay gồm id, điểm bắt đầu, điểm đích, ngày đi, ngày về (nếu có)
              {
                // 1 điểm bắt đầu và 1 điểm đích trong quá trình tìm
                id: "1",
                originLocationCode: data.originLocationCode,
                destinationLocationCode: data.destinationLocationCode,
                departureDateTimeRange: {
                  date: data.departureDate
                }
              },
              {
                // 1 điểm bắt đầu và 1 điểm đích trong quá trình tìm
                id: "2",
                originLocationCode: data.destinationLocationCode,
                destinationLocationCode: data.originLocationCode,
                departureDateTimeRange: {
                  date: data.returnDate as string
                }
              }
            ]
          : [
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
              originDestinationIds: flightType === "roundTrip" ? ["1", "2"] : ["1"]
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
    flightOffersSearchMutation.mutate(body, {
      onSuccess: () => {
        setShowInfoSearch(true)
      }
    })
  })

  useEffect(() => {
    handleSubmitSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Helmet>
        <title>Tìm kiếm chuyến bay</title>
        <meta name="description" content="Flight booking - Amadeus Booking" />
      </Helmet>

      <div className="relative">
        <div
          className="w-full h-[450px]"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        >
          <div className="container">
            <form autoComplete="off" onSubmit={handleSubmitSearch} noValidate className="pl-2 py-4">
              {/* loại chuyến bay */}
              <div className="flex items-center gap-4">
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

              <div className="mt-2 w-full flex items-center gap-2 flex-wrap">
                <div className="w-[40%] flex relative gap-2">
                  {/* điểm xuất phát */}
                  <InputSearch
                    placeholder="Bay từ"
                    classNameList="z-20 absolute top-16 left-0 h-[300px] bg-whiteColor overflow-y-auto overflow-x-hidden rounded-sm shadow-sm transition-all duration-1000 ease-linear"
                    classNameBlock="py-4 px-2 rounded-md flex items-center bg-[#fffcf2]/50 text-textColor"
                    classNameInput="px-2 outline-none bg-transparent text-2xl flex-grow font-semibold w-[200px] truncate"
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
                    classNameDesc="pl-2 text-textColor"
                  >
                    <img src={iconFlight} alt="icon flight" className="w-10 h-10 flex-shrink-0" />
                  </InputSearch>
                  {/* điểm đến */}
                  <InputSearch
                    placeholder="Bay đến"
                    classNameList="z-20 absolute top-16 left-0 h-[300px] bg-whiteColor overflow-y-auto overflow-x-hidden rounded-sm shadow-sm transition-all duration-1000 ease-linear"
                    classNameBlock="py-4 px-2 rounded-md flex items-center bg-[#fffcf2]/50 text-textColor"
                    classNameInput="px-2 outline-none bg-transparent text-2xl flex-grow font-semibold w-[200px] truncate"
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
                    classNameDesc="pl-2 text-textColor"
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

                <div className="w-[20%] flex justify-between items-center gap-2">
                  {/* Khứ hồi hoặc 1 chiều */}
                  <div className="w-full flex justify-start gap-2">
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
                        className="py-6 bg-[#fffcf2]/50 rounded-md flex items-center w-full"
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
                        className="py-6 bg-[#fffcf2]/50 rounded-md flex items-center w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-[25%] flex gap-2">
                  {/* hành khách */}
                  <div className="w-[50%] px-4 py-[25px] bg-[#fffcf2]/50 rounded-md flex items-center justify-center">
                    <Popover>
                      <PopoverTrigger>
                        <div className="w-full flex items-center cursor-pointer">
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
                            className="w-[35px] py-1 outline-none bg-transparent text-base text-center"
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

                  {/* hạng vé */}
                  <div className="w-[50%] px-2 py-[22px] bg-[#fffcf2]/50 rounded-md relative">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <ButtonShadcn
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          aria-label="TravelClass"
                          className="flex justify-center bg-transparent border-none shadow-none text-sm text-center truncate w-full"
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
                    </Popover>
                    <span className="absolute -top-5 left-0 mb-2 text-red-500 min-h-[1.25rem] block">
                      {errors.travelClass?.message}
                    </span>
                  </div>
                </div>

                <div className="w-[10%]">
                  <Button
                    disable={flightOffersSearchMutation.isPending}
                    classNameWrapper="w-full relative"
                    type="submit"
                    nameButton="Tìm kiếm"
                    className="px-8 py-4 bg-blueColor w-full text-whiteColor text-base rounded-md hover:bg-blueColor/80 duration-200 font-semibold border-blueColor"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full absolute top-28 left-1/2 -translate-x-1/2">
          <div className="container">
            <div className="py-8">
              {/* không load thì isPending */}
              {!flightOffersSearchMutation.isPending && showInfoSearch && (
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-3">
                    <div className="bg-[#fff] shadow-md h-[500px]"></div>
                  </div>

                  <div className="col-span-9">
                    <div className="text-2xl text-whiteColor font-semibold mb-4">
                      Chuyến bay từ {searchText} đến {searchText2}
                    </div>

                    {flightList?.data.map((item) => (
                      <div key={item.id}>
                        <FlightItem item={item} list={flightList} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {flightOffersSearchMutation.isPending && !showInfoSearch && (
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
                  Đang tìm chuyến bay...
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Dùng thêm state cục bộ để quản lý dữ liệu input kết hợp với useForm sử dụng setValue để quản lý dữ liệu trước khi submit đi
// nếu không dùng state cục bộ thì không thể truyền props xuống các component con
// vì thường các trường dữ liệu của input chỉ quản lý trong component đó (validate...) submit đi

// onClick vào ô input thì nó re-render vì
// nó thực hiện onClick={handleFocus} và handleFocus nhân vào 1 hàm xử lý set state lại dẫn đến component re-render

// component chỉ re-render khi props hoặc state thay đổi
