import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { hotelApi } from "src/apis/hotel.api"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "src/components/ui/sheet"
import { path } from "src/constant/path"
import useScrollHeader from "src/hooks/useScrollHeader"
import { TypeHotelListResponse, HotelParamsConfig, TypeCityCodeList } from "src/types/hotel.type"
import HotelItem from "./Components/HotelItem"
import AsideFilterFlight from "../FlightSearch/components/AsideFilterFlight"
import useQueryConfig from "src/hooks/useQueryConfig"
import { getCountry } from "src/utils/utils"
import { cityCodeList, hotelRatingList } from "src/constant/hotelSearch"
import InputSearch from "src/components/InputSearch"
import CityCodeList from "src/components/CityCodeList"
import useFormHandler from "src/hooks/useFormHandler"
import { useContext, useEffect, useRef, useState } from "react"
import { FlightContext } from "src/context/useContextFlight"
import { yupResolver } from "@hookform/resolvers/yup"
import { fetchDataHotel, FormDataHotel, schemaFormDataHotel } from "../Hotel/Hotel"
import { Controller, useForm } from "react-hook-form"
import Button from "src/components/Button"
import { PopoverTrigger, Popover as PopoverLib, PopoverContent } from "src/components/ui/popover"
import { Button as ButtonShadcn } from "src/components/ui/button"
import { Command, CommandGroup, CommandItem, CommandList } from "src/components/ui/command"
import iconStar from "src/img/Hotel/star.png"
import Pagination from "src/components/Pagination"

export default function HotelSearch() {
  const { cityCode, setCityCode, radius, setRadius, ratings, setRatings } =
    useContext(FlightContext)
  const queryConfig = useQueryConfig()
  // xử lý header
  const { showHeader } = useScrollHeader(200)

  const { state } = useLocation()
  // console.log(state)

  const getListHotelByCityQuery = useQuery({
    queryKey: ["listHotelByCity", state],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 30000) // hết 10s mà chưa fetch ra api nó tự động hủy // kiểu tự động
      return hotelApi.getHotelList(state as HotelParamsConfig, controller.signal)
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000
  })
  const listHotel = getListHotelByCityQuery.data?.data as TypeHotelListResponse

  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [airportCodeList, setTypeAirportCodeList] = useState<TypeCityCodeList>([])
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
      setTypeAirportCodeList(res)
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

  const { filterList: filterTypeAirportCodeList_1, handleItemClick } = useFormHandler(
    airportCodeList,
    cityCode,
    setValue,
    setCityCode,
    setShowListAirport
  )

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

  // phân trang
  const [currentPage, setCurrentPage] = useState(1)
  const totalItem = 10
  const startIndex = (currentPage - 1) * totalItem
  const endIndex = startIndex + totalItem
  const currentList = listHotel?.data.slice(startIndex, endIndex)

  const handleChangePage = (numberPage: number) => {
    setCurrentPage(numberPage)
  }

  return (
    <div>
      <Helmet>
        <title>Tìm kiếm khách sạn</title>
        <meta name="description" content="Tìm kiếm khách sạn - Booking." />
      </Helmet>

      <div className="relative z-10 h-[650px]">
        <div
          className={`w-full bg-[#778da9] ${showHeader ? "md:fixed md:top-0 md:left-1/2 md:-translate-x-1/2 shadow-xl" : "md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2"} z-50 transition-all ease-linear duration-1000`}
        >
          <div className="container">
            <form
              autoComplete="off"
              onSubmit={handleSubmitSearch}
              noValidate
              className="grid grid-cols-6 lg:grid-cols-12 items-center gap-2 flex-wrap py-2"
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
                  placeholder="Bay từ"
                  classNameList={`z-50 absolute top-16 left-0 w-full md:w-[400px] ${showListAirport ? "h-[300px]" : "h-0"} bg-whiteColor overflow-y-auto overflow-x-auto rounded-sm shadow-sm transition-all duration-200 ease-linear`}
                  classNameBlock="py-2 px-2 rounded-md flex items-center bg-gray-300 text-textColor"
                  classNameError="py-2 px-3 border border-red-500 bg-red-100 rounded-md flex items-center"
                  classNameInput="px-2 outline-none bg-transparent text-xl flex-grow font-semibold w-[120px] truncate"
                  ref={inputRef}
                  value={cityCode}
                  showList={showListAirport}
                  handleChangeValue={(event) => setCityCode(event.target.value)}
                  handleFocus={() => setShowListAirport(true)}
                  register={register}
                  name="cityCOde"
                  error={errors.cityCode?.message}
                  desc="Từ"
                  classNameDesc="pl-2 text-textColor"
                >
                  <CityCodeList
                    listAirport={filterTypeAirportCodeList_1}
                    handleItemClick={handleItemClick}
                    inputName="cityCode"
                  />
                </InputSearch>
              </div>

              <div className="col-span-6 md:col-span-3">
                <input
                  className="w-full px-4 py-[20px] outline-none bg-gray-300 font-normal rounded-md text-base"
                  type="text"
                  autoComplete="on"
                  placeholder="Bán kính dò tìm (vd: 5)"
                  value={radius}
                  {...register("radius")}
                  onChange={(event) => setRadius(event.target.value)}
                />
              </div>

              <div className="col-span-6 md:col-span-3 rounded-md relative bg-transparent">
                <PopoverLib open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <ButtonShadcn
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      aria-label="ratings"
                      className="flex justify-center items-center gap-1 bg-gray-300 py-8 shadow-none text-sm hover:opacity-60 duration-200 w-full border-none"
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
                classNameWrapper="col-span-6 md:col-span-3 relative"
                type="submit"
                nameButton="Tìm kiếm"
                className="py-[20px] lg:py-[20px] bg-blueColor w-full text-whiteColor text-base rounded-md hover:bg-blueColor/80 duration-200 font-semibold border-blueColor"
              />
            </form>
          </div>
        </div>

        <div className="z-30 w-full absolute top-[410px] md:top-32 lg:top-16 left-1/2 -translate-x-1/2">
          <div className="container">
            {/* không load thì isPending */}
            {!getListHotelByCityQuery.isFetching && (
              <div>
                {listHotel?.data.length > 0 && (
                  <div className="mt-8 w-full">
                    <div className="flex items-center gap-2 lg:gap-0 mb-2">
                      <Sheet>
                        <SheetTrigger aria-label="filter">
                          <div className="md:block lg:hidden p-2 bg-blueColor rounded-xl">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="white"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                              />
                            </svg>
                          </div>
                        </SheetTrigger>
                        <SheetContent className="p-0" side="left">
                          <SheetHeader>
                            <SheetTitle className="mt-10">
                              <AsideFilterFlight queryConfig={queryConfig} />
                            </SheetTitle>
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>

                      <h1 className="text-lg lg:text-2xl text-textColor font-semibold ">
                        Tìm khách sạn tại {getCountry(cityCodeList, state.cityCode)}
                        {" - "}
                        {state.cityCode}
                      </h1>
                    </div>

                    {currentList?.map((item, index) => {
                      return (
                        <div key={index}>
                          <HotelItem item={item} />
                        </div>
                      )
                    })}

                    <div className="my-4">
                      <Pagination
                        totalOfPage={totalItem}
                        totalAllPage={listHotel.data.length}
                        currentPage={currentPage}
                        onChangePage={handleChangePage}
                      />
                    </div>
                  </div>
                )}

                {listHotel?.data.length === 0 && (
                  <div className="py-8 my-16 text-center flex flex-col items-center">
                    <span className="text-2xl text-textColor font-semibold">
                      Không tìm thấy khách sạn. Quý khách vui lòng lựa chọn lại!!!
                    </span>
                    <Link
                      to={path.hotel}
                      className="mt-4 shadow flex items-center justify-center w-[120px] px-3 py-4 bg-blueColor text-whiteColor duration-200 hover:bg-blueColor/80"
                    >
                      Thử lại
                    </Link>
                  </div>
                )}
              </div>
            )}

            {getListHotelByCityQuery.isFetching && (
              <div
                role="status"
                className="py-8 flex items-center justify-center animate-pulse mx-auto"
              >
                <button
                  disabled
                  type="button"
                  className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 rounded-lg hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 inline-flex items-center"
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
                  Đang tìm khách sạn...
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
