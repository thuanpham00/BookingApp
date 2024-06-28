import { Helmet } from "react-helmet-async"
import banner from "../../img/Flight/banner.jpg"
import iconFlight from "../../img/svg/flight-svgrepo-com.svg"
import { Button as ButtonShadcn } from "src/components/ui/button"
import { Command, CommandGroup, CommandItem, CommandList } from "src/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "src/components/ui/popover"
import { useEffect, useMemo, useRef, useState } from "react"
import { airportCodes, travelClassList } from "src/constant/flightSearch"
import { airportCodeList } from "src/types/flight.type.ts"
import Breadcrumb from "src/components/Breadcrumb/Breadcrumb"
import { format } from "date-fns"
import { Calendar } from "src/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Controller, useForm } from "react-hook-form"
import Button from "src/components/Button/Button.tsx"
import { convertToYYYYMMDD, convertTravelClassToEng, getCodeAirport } from "src/utils/utils.ts"
import schema, { schemaType } from "src/utils/rules.ts"
import { yupResolver } from "@hookform/resolvers/yup"
import InputSearch from "src/components/InputSearch/InputSearch"
import QuantityController from "src/components/QuantityController"

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
  // const queryConfig = useQueryConfig()
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

  // state lưu trữ của form
  const [searchText, setSearchText] = useState<string>("") // mã airport xuất phát
  const [searchText2, setSearchText2] = useState<string>("") // mã airport đích
  const [date, setDate] = useState<Date | null>(null) // ngày đi
  const [date2, setDate2] = useState<Date | null>(null) // ngày về
  const [travelClass, setTravelClass] = useState<string>("") // hạng vé
  const [numberAdults, setNumberAdults] = useState<number>(1) // HK người lớn
  const [numberChildren, setNumberChildren] = useState<number>(0) // HK trẻ em
  const [numberInfants, setNumberInfants] = useState<number>(0) // HK em bé

  const [flightType, setFlightType] = useState("roundTrip")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const getFlightOffersQuery = useQuery({
  //   queryKey: ["flightOffers", queryConfig],
  //   queryFn: () => {
  //     return flightApi.flightOffersSearch(queryConfig as FlightOfferParamsConfig)
  //   }
  // })

  // console.log(getFlightOffersQuery.data?.data)

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
  }

  const handleSubmitSearch = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div>
      <Helmet>
        <title>Tìm kiếm chuyến bay</title>
        <meta name="description" content="Flight booking - Amadeus Booking" />
      </Helmet>

      <div className="container">
        <Breadcrumb name="Chuyến bay" name2="Tìm kiếm chuyến bay" />

        <div className="py-4 h-[600px]">
          <div className="w-full h-[400px] relative">
            <img src={banner} alt="banner" className="w-full h-full rounded-md" />

            <div className="absolute left-[76px] top-24">
              <h1 className="text-[#f2f2f2] text-6xl font-bold">
                Compare and Book Cheap Flights on Over 500 Airlines
              </h1>
            </div>

            <div className="w-[90%] shadow-md absolute left-1/2 -translate-x-1/2 top-64">
              <h2 className="bg-gray-300 rounded-tl-lg rounded-tr-lg py-6 px-6 border-b border-b-gray-300 text-2xl text-textColor font-semibold ">
                Search for flights to find the best options for your travel needs.
              </h2>

              <form
                autoComplete="off"
                onSubmit={handleSubmitSearch}
                noValidate
                className="py-4 px-6 bg-[#f2f2f2] rounded-bl-lg rounded-br-lg "
              >
                <div className="mt-2 flex items-center gap-3">
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

                  <div className="my-4 w-[2px] h-4 bg-textColor"></div>

                  {/* hạng vé */}
                  <div className="relative">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <ButtonShadcn
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-[200px] justify-between text-sm bg-transparent border border-textColor"
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
                                  name="travelClass"
                                  render={({ field }) => (
                                    <CommandItem
                                      key={item.value}
                                      value={item.value}
                                      onSelect={(currentValue) => {
                                        setTravelClass(currentValue)
                                        setOpen(false)
                                        field.onChange(convertTravelClassToEng(currentValue)) // quản lý và cập nhật trường dữ liệu
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

                <div className="mt-7 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="flex relative gap-2">
                      {/* điểm xuất phát */}
                      <InputSearch
                        placeholder="Bay từ"
                        classNameList="absolute top-16 left-0 h-[300px] bg-[#f2f2f2] overflow-y-auto overflow-x-hidden rounded-sm shadow-sm transition-all duration-1000 ease-linear"
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
                        classNameList="absolute top-16 left-[208px] h-[300px] bg-[#f2f2f2] overflow-y-auto overflow-x-hidden rounded-sm shadow-sm transition-all duration-1000 ease-linear"
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

                      <button className="z-20 absolute left-1/2 -translate-x-1/2 top-3 flex items-center justify-center w-7 h-7 rounded-full text-blueColor border-2 border-blueColor bg-blue-100">
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

                    {/* date ngày đi*/}
                    <div className="relative">
                      <span className="absolute -top-5 left-0 text-red-500 min-h-[1.25rem] block">
                        {errors.departureDate?.message}
                      </span>
                      <div className="p-[10px] border border-textColor rounded-md flex items-center">
                        <Popover>
                          <PopoverTrigger asChild>
                            <ButtonShadcn
                              variant={"outline"}
                              className="bg-transparent text-left shadow-none border-none"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "yyyy-MM-dd") : <span>Chọn ngày đi</span>}
                            </ButtonShadcn>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Controller
                              control={control} //  dùng để điều phối và quản lý trạng thái của các thành phần trong form.
                              name="departureDate"
                              render={({ field }) => (
                                <Calendar
                                  {...field}
                                  mode="single"
                                  selected={date as Date}
                                  onSelect={(date) => {
                                    setDate(date as Date)
                                    field.onChange(convertToYYYYMMDD(date as Date))
                                  }}
                                  initialFocus
                                />
                              )}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {/* date ngày về */}
                    <div className="relative">
                      <span className="absolute -top-5 left-0 text-red-500 min-h-[1.25rem] block">
                        {errors.returnDate?.message}
                      </span>
                      <div className="p-[10px] border border-textColor rounded-md flex items-center">
                        <Popover>
                          <PopoverTrigger asChild>
                            <ButtonShadcn
                              variant={"outline"}
                              className="bg-transparent text-left shadow-none border-none"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date2 ? format(date2, "yyyy-MM-dd") : <span>Chọn ngày về</span>}
                            </ButtonShadcn>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Controller
                              control={control}
                              name="returnDate" // tên trường dữ liệu
                              render={({ field }) => (
                                // truyền tất cả props và phương thức của field vào Calendar
                                <Calendar
                                  mode="single"
                                  selected={date2 as Date}
                                  onSelect={(date2) => {
                                    setDate2(date2 as Date)
                                    field.onChange(convertToYYYYMMDD(date2 as Date)) // cập nhật giá trị của một trường dữ liệu // giá trị chuỗi này vẫn được lưu trữ trong trường dữ liệu của form. // quan trọng vì nó quản lý dữ liệu của trường // bởi controller
                                  }}
                                  initialFocus
                                />
                              )}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {/* hành khách */}
                    <div className="py-3 px-6 border border-textColor rounded-md flex items-center gap-2 ">
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
                              className="w-[20px] p-1 outline-none bg-transparent text-base flex-grow text-center"
                              value={1}
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

                  <Button
                    nameButton="Tìm kiếm"
                    className="px-5 py-[10px] bg-orangeColor w-full text-[#f2f2f2] text-lg rounded-md hover:bg-orangeColor/80 duration-200"
                  />
                </div>
              </form>
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
