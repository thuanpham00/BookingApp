import { Helmet } from "react-helmet-async"
import banner from "../../img/Flight/banner.jpg"
import iconFlight from "../../img/svg/flight-svgrepo-com.svg"
import { Button as ButtonShadcn } from "src/components/ui/button"

import { Command, CommandGroup, CommandItem, CommandList } from "src/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "src/components/ui/popover"
import { useEffect, useMemo, useRef, useState } from "react"
import { airportCodes, travelClass } from "src/constant/flightSearch"
import AirportCodeList from "./components/AirportCodeList/AirportCodeList.tsx"
import { airportCodeList } from "src/types/flight.type.ts"
import Breadcrumb from "src/components/Breadcrumb/Breadcrumb.tsx"
import { format } from "date-fns"
import { Calendar } from "src/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import Button from "src/components/Button/Button.tsx"

const fetchDataAirport = () => Promise.resolve(airportCodes) // khởi tạo 1 promise

export default function Flight() {
  // const queryConfig = useQueryConfig()
  const { handleSubmit, control } = useForm()

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const [airportCodeList, setAirportCodeList] = useState<airportCodeList>([])

  const [showListAirport, setShowListAirport] = useState<boolean>(false)
  const [showListAirport2, setShowListAirport2] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputRef2 = useRef<HTMLInputElement>(null)

  const [searchText, setSearchText] = useState<string>("")
  const [searchText2, setSearchText2] = useState<string>("")
  const [date, setDate] = useState<Date>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const getFlightOffersQuery = useQuery({
  //   queryKey: ["flightOffers", queryConfig],
  //   queryFn: () => {
  //     return flightApi.flightOffersSearch(queryConfig as FlightOfferParamsConfig)
  //   }
  // })

  // console.log(getFlightOffersQuery.data?.data)

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

  const handleSubmitSearch = handleSubmit((data) => {
    console.log("hii")
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
                onSubmit={handleSubmitSearch}
                noValidate
                className="py-4 px-6 bg-[#f2f2f2] rounded-bl-lg rounded-br-lg "
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <input type="radio" name="flight" id="oneway" className="w-5 h-5" />
                      <label htmlFor="oneway" className="text-base text-textColor font-semibold">
                        Một chiều
                      </label>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="flight"
                        id="roundtrip"
                        checked
                        className="w-5 h-5"
                      />
                      <label htmlFor="roundtrip" className="text-base text-textColor font-semibold">
                        Khứ hồi
                      </label>
                    </div>
                  </div>

                  <div className="my-4 w-[2px] h-4 bg-textColor"></div>

                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between text-sm"
                      >
                        {value
                          ? travelClass.find((item) => item.value === value)?.value
                          : "Chọn hạng vé"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandList>
                          <CommandGroup>
                            {travelClass.map((item) => (
                              <CommandItem
                                key={item.value}
                                value={item.value}
                                onSelect={(currentValue) => {
                                  setValue(currentValue === value ? "" : currentValue)
                                  setOpen(false)
                                }}
                              >
                                {item.value}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="mt-2 flex items-center gap-3 relative">
                  {/* điểm xuất phát */}
                  <div className="py-[5px] px-4 border border-textColor rounded-md flex items-center gap-1">
                    <img src={iconFlight} alt="icon flight" className="w-6 h-6 flex-shrink-0" />
                    <input
                      type="text"
                      className="w-[160px] p-2 outline-none bg-transparent text-base flex-grow"
                      placeholder="Bay từ"
                      onClick={handleFocusAirportList("1")}
                      value={searchText}
                      onChange={handleChangeValue("input_1")}
                    />
                  </div>
                  <div
                    className="absolute top-16 left-0 h-[300px] bg-[#f2f2f2] overflow-y-auto overflow-x-hidden rounded-sm shadow-sm transition-all duration-1000 ease-linear"
                    ref={inputRef}
                  >
                    {showListAirport && (
                      <AirportCodeList
                        setSearchText={setSearchText}
                        listAirport={filterAirportCodeList_1}
                      />
                    )}
                  </div>

                  <button className="z-20 absolute left-[214px] flex items-center justify-center w-8 h-8 rounded-full text-blueColor border-2 border-blueColor bg-blue-100">
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

                  {/* điểm đến */}
                  <div className="py-[5px] px-4 border border-textColor rounded-md flex items-center gap-1">
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
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                    <input
                      type="text"
                      className="w-[160px] p-2 outline-none bg-transparent text-base flex-grow"
                      placeholder="Bay đến"
                      onClick={handleFocusAirportList("2")} // dùng currying lúc này phần tử vẫn còn return
                      // bình thường thì useForm quản lý
                      // nhưng để list render lại thì cần dùng onChange và value
                      value={searchText2}
                      onChange={handleChangeValue("input_2")}
                    />
                  </div>
                  <div
                    className="absolute top-16 left-[238px] h-[300px] bg-[#f2f2f2] overflow-y-auto overflow-x-hidden rounded-sm shadow-sm transition-all duration-1000 ease-linear"
                    ref={inputRef2}
                  >
                    {showListAirport2 && (
                      <AirportCodeList
                        setSearchText={setSearchText2}
                        listAirport={filterAirportCodeList_2}
                      />
                    )}
                  </div>

                  <div className="flex gap-2">
                    {/* date ngày đi*/}
                    <div className="h-[52px] py-[4px] px-1 border border-textColor rounded-md flex items-center gap-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <ButtonShadcn
                            variant={"outline"}
                            className="bg-transparent text-left shadow-none border-none"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Chọn ngày đi</span>}
                          </ButtonShadcn>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* date ngày về */}
                  </div>

                  <Button
                    nameButton="Tìm kiếm"
                    className="px-5 py-3 bg-orangeColor w-full text-[#f2f2f2] text-lg rounded-md hover:bg-orangeColor/80 duration-200"
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
