import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { Link, useLocation } from "react-router-dom"
import { hotelApi } from "src/apis/hotel.api"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "src/components/ui/sheet"
import { path } from "src/constant/path"
import useScrollHeader from "src/hooks/useScrollHeader"
import { HotelParamsConfig } from "src/types/hotel.type"
import backGround from "src/img/bgLogin/bg-5.webp"

export default function HotelSearch() {
  // xử lý header
  const { showHeader } = useScrollHeader(200)

  const { state } = useLocation()
  console.log(state)

  const getListHotelByCityQuery = useQuery({
    queryKey: ["listHotelByCity", state],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 30000) // hết 10s mà chưa fetch ra api nó tự động hủy // kiểu tự động
      return hotelApi.getHotelList(state as HotelParamsConfig, controller.signal)
    }
  })
  const listHotel = getListHotelByCityQuery.data?.data

  useEffect(() => {
    if (listHotel) {
      console.log(listHotel)
    }
  }, [listHotel])
  console.log(getListHotelByCityQuery.data?.data)

  return (
    <div>
      <Helmet>
        <title>Tìm kiếm khách sạn</title>
        <meta name="description" content="Tìm kiếm khách sạn - Booking." />
      </Helmet>

      <div
        className="relative z-10 h-[650px]"
        style={{
          backgroundImage: `url(${backGround})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
        <div
          className={`w-full bg-[#778da9] ${showHeader ? "md:fixed md:top-0 md:left-1/2 md:-translate-x-1/2 shadow-xl" : "md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2"} z-50 transition-all ease-linear duration-1000`}
        >
          <div className="container">
            <form
              autoComplete="off"
              // onSubmit={handleSubmitSearch}
              noValidate
              className="grid grid-cols-6 lg:grid-cols-12 items-center gap-2 flex-wrap py-2"
            >
              {/* loại chuyến bay */}
              {/* <div className="col-span-6 md:col-span-1 lg:col-span-1 px-2 py-[14px] bg-gray-300 rounded-md relative">
                <Popover open={open2} onOpenChange={setOpen2}>
                  <PopoverTrigger asChild>
                    <ButtonShadcn
                      variant="outline"
                      role="combobox"
                      aria-expanded={open2}
                      aria-label="FlightType"
                      className="flex justify-center bg-transparent border-none shadow-none text-base text-center truncate w-full hover:bg-transparent"
                    >
                      {flightType
                        ? typeFlightList.find((item) => item.value === flightType)?.text
                        : "Loại bay"}
                    </ButtonShadcn>
                  </PopoverTrigger>
                  <PopoverContent className="w-[100px] p-0">
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          {typeFlightList.map((item, index) => (
                            <Controller
                              key={index}
                              control={control}
                              name="flightType" // tên trường dữ liệu
                              render={({ field }) => (
                                <CommandItem
                                  key={item.value}
                                  value={item.value}
                                  onSelect={(currentValue) => {
                                    field.onChange(currentValue) // quản lý và cập nhật trường dữ liệu
                                    setOpen2(false)
                                    setFlightType(currentValue)
                                  }}
                                >
                                  {item.text}
                                </CommandItem>
                              )}
                            />
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div> */}

              {/* <div className="col-span-6 md:col-span-3 lg:col-span-4">
                <div className="grid grid-cols-4 relative items-center gap-2">
                  <InputSearch
                    placeholder="Bay từ"
                    classNameList={`z-50 absolute top-16 left-0 w-full md:w-[400px] ${showListAirport ? "h-[300px]" : "h-0"} bg-whiteColor overflow-y-auto overflow-x-auto rounded-sm shadow-sm transition-all duration-200 ease-linear`}
                    classNameBlock="py-2 px-2 rounded-md flex items-center bg-gray-300 text-textColor"
                    classNameError="py-2 px-3 border border-red-500 bg-red-100 rounded-md flex items-center"
                    classNameInput="px-2 outline-none bg-transparent text-xl flex-grow font-semibold w-[120px] truncate"
                    ref={inputRef}
                    filterList={filterAirportCodeList_1}
                    value={searchText}
                    showList={showListAirport}
                    handleItemClick={handleItemClickV2}
                    inputName="originLocationCode"
                    handleChangeValue={(event) => setSearchText(event.target.value)}
                    handleFocus={() => setShowListAirport(true)}
                    register={register}
                    name="originLocationCode"
                    error={errors.originLocationCode?.message}
                    desc="Từ"
                    classNameDesc="pl-2 text-textColor"
                  >
                    <img src={iconFlight} alt="icon flight" className="w-10 h-10 flex-shrink-0" />
                  </InputSearch>

                  <InputSearch
                    placeholder="Bay đến"
                    classNameList={`z-50 absolute top-16 left-0 w-full md:w-[400px] ${showListAirport2 ? "h-[300px]" : "h-0"} bg-whiteColor overflow-y-auto overflow-x-auto rounded-sm shadow-sm transition-all duration-200 ease-linear`}
                    classNameBlock="py-2 px-2 rounded-md flex items-center bg-gray-300 text-textColor"
                    classNameError="py-2 px-3 border border-red-500 bg-red-100 rounded-md flex items-center"
                    classNameInput="px-2 outline-none bg-transparent text-xl flex-grow font-semibold w-[120px] truncate"
                    ref={inputRef2}
                    filterList={filterAirportCodeList_2}
                    value={searchText2}
                    showList={showListAirport2}
                    handleItemClick={handleItemClickV2_2}
                    inputName="destinationLocationCode"
                    handleChangeValue={(event) => setSearchText2(event.target.value)}
                    handleFocus={() => setShowListAirport2(true)}
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
              </div> */}
            </form>
          </div>
        </div>

        <div className="z-30 w-full absolute top-[410px] md:top-32 lg:top-16 left-1/2 -translate-x-1/2">
          <div className="container">
            {/* không load thì isPending */}
            {!getListHotelByCityQuery.isFetching && (
              <div>
                {listHotel?.length > 0 && (
                  <div className="py-8 grid grid-cols-12 gap-4">
                    <div className="hidden lg:block lg:col-span-3">thuan</div>

                    <div className="col-span-12 lg:col-span-9">
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
                                {/* <AsideFilterFlight queryConfig={queryConfig} /> */}
                              </SheetTitle>
                            </SheetHeader>
                          </SheetContent>
                        </Sheet>

                        <h1 className="text-lg lg:text-2xl text-textColor font-semibold ">
                          Chuyến bay từ
                          {/* {"  "}
                          {getCountry(airportCodes, searchText)}
                          {" - "}
                          {searchText} đến
                          {"  "}
                          {getCountry(airportCodes, searchText2)}
                          {" - "}
                          {searchText2} */}
                        </h1>
                      </div>

                      {/* {listHotel.map((item) => (
                        <div key={item.id}>
                          <FlightItem item={item} list={flightList} />
                        </div>
                      ))} */}

                      <div className="my-4">
                        {/* <Pagination
                          totalOfPage={totalItem}
                          totalAllPage={flightList.data.length}
                          currentPage={currentPage}
                          onChangePage={handleChangePage}
                        /> */}
                      </div>
                    </div>
                  </div>
                )}

                {listHotel?.length === 0 && (
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
