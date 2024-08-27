import { createSearchParams, Link, useNavigate, useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import useScrollHeader from "src/hooks/useScrollHeader"
import Button from "src/components/Button"
import { useForm } from "react-hook-form"
import SelectDate from "src/components/SelectDate"
import { convertToYYYYMMDD, formatCurrency } from "src/utils/utils"
import { useContext } from "react"
import { FlightContext } from "src/context/useContextFlight"
import { Popover, PopoverContent, PopoverTrigger } from "src/components/ui/popover"
import QuantityController from "src/components/QuantityController"
import { schemaHotel, schemaTypeHotel } from "src/utils/rules"
import { yupResolver } from "@hookform/resolvers/yup"
import { useQueryConfigHotel } from "src/hooks/useQueryConfig"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { path } from "src/constant/path"
import { hotelApi } from "src/apis/hotel.api"
import { HotelSearchParamsConfig, TypeHotelSearchResponse } from "src/types/hotel.type"
import DOMPurify from "dompurify"

type FormData = Pick<schemaTypeHotel, "checkInDate" | "checkOutDate" | "adultsHotel">
const schemaFormData = schemaHotel.pick(["checkInDate", "checkOutDate", "adultsHotel"])

export default function HotelDetail() {
  // const { listCart, setListCart } = useContext(AppContext)

  const {
    adultsHotel,
    setAdultsHotel,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate
  } = useContext(FlightContext) // global state
  const { hotelId } = useParams()

  // xử lý header
  const { showHeader } = useScrollHeader(200)
  const navigate = useNavigate()

  const queryConfigHotel = useQueryConfigHotel()
  const hotelItemJSON = localStorage.getItem("hotelItem")
  const hotelItem = JSON.parse(hotelItemJSON as string)

  // xử lý form
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schemaFormData),
    defaultValues: {
      // adultsHotel: adultsHotel,
      // checkInDate: String(checkInDate),
      // checkOutDate: String(checkOutDate)
    }
    // nó vẫn lưu giá trị input ra màn hình nhưng giá trị trong form thì rỗng
  })

  const handleChangeQuantity = (value: number) => {
    setValue("adultsHotel", value) // đảm bảo giá trị của input được quản lý bởi react-hook-form // // cập nhật giá trị của một trường dữ liệu
    setAdultsHotel(value)
  }

  const createConfig = (data: FormData) => {
    return {
      ...queryConfigHotel,
      hotelIds: hotelId as string,
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
      adults: String(data.adultsHotel)
    }
  }

  const getHotelDetailQuery = useQuery({
    queryKey: ["hotelDetail", queryConfigHotel],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 30000)
      const response = hotelApi
        .getHotelSearch(queryConfigHotel as HotelSearchParamsConfig, controller.signal)
        .then((res) => {
          return res
          // nếu nó trả về được kết quả thì set state lại
        })
        .catch((error) => {
          console.log(error)
        })
      return response
    },
    retry: 0,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000
  })

  const data = getHotelDetailQuery.data?.data as TypeHotelSearchResponse
  // const error = getHotelDetailQuery.error
  // console.log(JSON.parse(error))

  const handleSubmitSearchHotel = handleSubmit((data: FormData) => {
    const config = createConfig(data)
    navigate({
      pathname: `${path.hotel}/${hotelId}`,
      search: createSearchParams(config).toString()
    })
  })

  // xử lý navigate tới flight order
  const handleNavigatePage = () => {
    navigate({
      pathname: path.hotelOrder
    })
    localStorage.setItem("hotelPriceData", JSON.stringify(data))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // const handleAddToCart = () => {
  //   setListCart((prev) => {
  //     const findItem = listCart.find(
  //       (item) =>
  //         item. ===
  //           flightPrice.data.flightOffers[0].itineraries[0].segments[0].departure.at &&
  //         item.data.flightOffers[0].itineraries[0].segments[0].arrival.at ===
  //           flightPrice.data.flightOffers[0].itineraries[0].segments[0].arrival.at
  //     ) // trả về true false
  //     if (findItem) {
  //       toast.error("Chuyến bay này đã có trong giỏ hàng")
  //       return [...prev]
  //     } else {
  //       toast.success("Thêm vào giỏ hàng thành công!!!")
  //       return [...prev, flightPrice]
  //     }
  //   })
  // }

  return (
    <div>
      <Helmet>
        <title>Tìm kiếm khách sạn</title>
        <meta name="description" content="Tìm kiếm khách sạn - Booking." />
      </Helmet>

      <div className="relative">
        <div
          className={`w-full bg-[#778da9] ${showHeader ? "md:fixed md:top-0 md:left-1/2 md:-translate-x-1/2 shadow-xl" : "md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2"} z-50 transition-all ease-linear duration-1000`}
        >
          <div className="container">
            <form
              autoComplete="off"
              onSubmit={handleSubmitSearchHotel}
              noValidate
              className="grid grid-cols-6 lg:grid-cols-12 items-center gap-2 flex-wrap py-2"
            >
              <div className="col-span-6 md:col-span-4 lg:col-span-4">
                <div className="w-full flex items-center gap-2">
                  <div className="w-[50%]">
                    <SelectDate
                      text="Ngày nhận phòng"
                      control={control}
                      setDate={setCheckInDate}
                      date={checkInDate}
                      name="checkInDate"
                      errors={errors.checkInDate?.message as string}
                      convertToYYYYMMDD={convertToYYYYMMDD}
                      className="py-[14px] bg-gray-300 rounded-md flex items-center w-full justify-center"
                      classNameError="py-[14px] border border-red-500 bg-red-100 rounded-md flex items-center w-full justify-center"
                    />
                  </div>

                  <div className="w-[50%]">
                    <SelectDate
                      text="Ngày trả phòng"
                      control={control}
                      setDate={setCheckOutDate}
                      date={checkOutDate}
                      name="checkOutDate"
                      errors={errors.checkOutDate?.message as string}
                      convertToYYYYMMDD={convertToYYYYMMDD}
                      className="py-[14px] bg-gray-300 rounded-md flex items-center w-full justify-center"
                      classNameError="py-[14px] border border-red-500 bg-red-100 rounded-md flex items-center w-full justify-center"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-6 md:col-span-2 lg:col-span-2">
                {/* hành khách */}
                <div
                  className={`rounded-md py-[16px] flex items-center justify-center ${errors.adultsHotel?.message ? "border-red-500 bg-red-100 border" : "bg-gray-300"}`}
                >
                  <Popover>
                    <PopoverTrigger>
                      <div className="w-full flex flex-col items-center">
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
                            className="w-[30px] py-1 outline-none bg-transparent text-base text-center"
                            value={adultsHotel}
                            readOnly
                          />

                          <span className="text-base text-textColor font-semibold">Khách</span>

                          {errors.adultsHotel?.message && (
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
                      </div>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div>
                        <QuantityController
                          nameQuantity="Người lớn (12 tuổi trở lên)"
                          value={adultsHotel}
                          onValueInput={handleChangeQuantity}
                          onIncrease={handleChangeQuantity}
                          onDecrease={handleChangeQuantity}
                          register={register} // đăng ký trường dữ liệu để quản lý
                          name="adultsHotel"
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Button
                classNameWrapper="col-span-6 md:col-span-1 lg:col-span-2 relative"
                nameButton="Tìm kiếm"
                type="submit"
                className="py-[20px] lg:py-[20px] bg-blueColor w-full text-whiteColor text-base rounded-md hover:bg-blueColor/80 duration-200 font-semibold border-blueColor"
              />
            </form>
          </div>
        </div>
        <div className="z-30 w-full absolute top-[210px] md:top-32 lg:top-16 left-1/2 -translate-x-1/2">
          <div className="container">
            <div className="mt-8 mb-12 md:mt-8 md:mb-4 w-full flex items-center flex-col md:flex-row h-[300px]">
              <div className="w-full md:w-[60%] h-full shadow">
                <img
                  src={hotelItem.imageHotel}
                  alt="ảnh"
                  className="w-full h-full object-cover rounded-tl rounded-bl"
                />
              </div>
              <div className="w-full md:w-[40%] p-4 h-full bg-white flex items-center justify-center flex-col rounded-tr rounded-br shadow">
                <h2 className="text-base text-textColor font-semibold">{hotelItem.name}</h2>
                <h3 className="text-base text-textColor font-normal">
                  Quốc gia: {hotelItem.address.countryCode}
                </h3>
                <span className="block text-base text-gray-500">
                  Mã khách sạn: {hotelItem.hotelId}
                </span>
              </div>
            </div>
            <div>
              {data && !getHotelDetailQuery.isPending && (
                <div>
                  <div className="mt-4 px-4 py-6 bg-white rounded shadow">
                    <div className="pb-2 flex items-center justify-between">
                      <h1 className="text-textColor text-xl font-semibold">
                        {data?.data[0].hotel.name}
                      </h1>
                      <span className="text-base text-gray-500 font-normal">
                        ({data?.data[0].available === true ? "Hiện còn phòng" : ""})
                      </span>
                    </div>

                    <div
                      className="pt-2 border-t border-t-gray-300 text-lg text-textColor"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data?.data[0].offers[0].room.description.text)
                      }}
                    ></div>

                    <div className="pt-2 flex items-center justify-between text-gray-500">
                      <span>Hạng phòng:</span>
                      <span className="text-textColor">
                        {data?.data[0].offers[0].room.typeEstimated.category}
                      </span>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-gray-500">
                      <span>Số lượng giường:</span>
                      <span className="text-textColor">
                        {data?.data[0].offers[0].room.typeEstimated.beds}
                      </span>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-gray-500">
                      <span>Loại giường:</span>
                      <span className="text-textColor">
                        {data?.data[0].offers[0].room.typeEstimated.bedType}
                      </span>
                    </div>
                  </div>

                  <div className="my-4 px-4 py-6 bg-white rounded shadow">
                    <div className="text-textColor text-lg font-semibold pb-2">Thông tin phòng</div>

                    <div className="pt-2 border-t border-t-gray-300 text-base text-gray-500">
                      <div className="pt-2 flex items-center justify-between text-gray-500">
                        <span>Mã phòng:</span>
                        <span className="text-textColor font-medium">
                          {data?.data[0].offers[0].id}
                        </span>
                      </div>
                      <div className="pt-2 flex items-center justify-between text-gray-500">
                        <span>Ngày check in:</span>
                        <span className="text-textColor font-medium">
                          {data?.data[0].offers[0].checkInDate}
                        </span>
                      </div>
                      <div className="pt-2 flex items-center justify-between text-gray-500">
                        <span>Ngày check out:</span>
                        <span className="text-textColor font-medium">
                          {data?.data[0].offers[0].checkOutDate}
                        </span>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-gray-500">
                        <span>Số lượng khách:</span>
                        <span className="text-textColor font-medium">
                          x{data?.data[0].offers[0].guests.adults}
                        </span>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-gray-500">
                        <span>Giá phòng (đã bao gồm tất cả thuế và phí):</span>
                        <span className="text-red-500 font-medium text-lg">
                          {formatCurrency(Number(data?.data[0].offers[0].price.total))} (
                          {data?.data[0].offers[0].price.currency})
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-2">
                      <Button
                        // onClick={handleAddToCart}
                        nameButton="Thêm vào giỏ hàng"
                        className="capitalize py-2 px-4 text-blueColor w-full border border-gray-300 text-sm rounded-full bg-transparent hover:bg-gray-100 hover:border-blueColor duration-200"
                      />
                      <Button
                        onClick={handleNavigatePage}
                        nameButton="Đặt phòng ngay!"
                        className="uppercase py-2 px-4 bg-blueColor w-full text-whiteColor text-sm rounded-full bg-tra hover:bg-blueColor/80 duration-200"
                      />
                    </div>
                  </div>
                </div>
              )}

              {!data && getHotelDetailQuery.isError && <div>Lỗi</div>}

              {!data && (
                <div className="flex flex-col items-center">
                  <img
                    src="https://cdn6.agoda.net/images/kite-js/illustrations/athena/baggage/group.svg"
                    width="102px"
                    height="102px"
                    alt="baggage"
                  />
                  <h1 className="mt-4 text-center text-textColor font-semibold text-lg lg:text-2xl">
                    Vui lòng điền thông tin phòng cần tìm !
                  </h1>
                  <Link
                    to={path.hotel}
                    className="w-[300px] bg-blueColor p-4 mt-4 text-center text-whiteColor shadow-md rounded-full hover:opacity-75 duration-200"
                  >
                    Tìm kiếm khách sạn
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
