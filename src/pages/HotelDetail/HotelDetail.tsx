import { createSearchParams, useNavigate, useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import useScrollHeader from "src/hooks/useScrollHeader"
import backGround from "src/img/bgLogin/bg-6.webp"
import Button from "src/components/Button"
import { useForm } from "react-hook-form"
import SelectDate from "src/components/SelectDate"
import { convertToYYYYMMDD } from "src/utils/utils"
import { useContext, useEffect, useState } from "react"
import { FlightContext } from "src/context/useContextFlight"
import { Popover, PopoverContent, PopoverTrigger } from "src/components/ui/popover"
import QuantityController from "src/components/QuantityController"
import { schemaHotel, schemaTypeHotel } from "src/utils/rules"
import { yupResolver } from "@hookform/resolvers/yup"
import { useQueryConfigHotel } from "src/hooks/useQueryConfig"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { path } from "src/constant/path"
import { hotelApi } from "src/apis/hotel.api"
import { HotelSearchParamsConfig } from "src/types/hotel.type"
import { printScreen } from "print-screen"

type FormData = Pick<schemaTypeHotel, "checkInDate" | "checkOutDate" | "adultsHotel">
const schemaFormData = schemaHotel.pick(["checkInDate", "checkOutDate", "adultsHotel"])
// MCTYOMCM dùng khách sạn sẽ ko lỗi
// tokyo trang 1
export default function HotelDetail() {
  const {
    adultsHotel,
    setAdultsHotel,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate
  } = useContext(FlightContext)
  const { hotelId } = useParams()

  console.log(adultsHotel, checkInDate, checkOutDate)
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

  const [flag, setFlag] = useState(false)

  const getHotelDetailQuery = useQuery({
    queryKey: ["hotelDetail", hotelId],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 30000)
      const response = hotelApi
        .getHotelSearch(queryConfigHotel as HotelSearchParamsConfig, controller.signal)
        .then((res) => {
          console.log(res)
          setFlag(false)
          return res
          // nếu nó trả về được kết quả thì set state lại
        })
      return response
    },
    retry: 1,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    enabled: flag
  })

  const handleSubmitSearchHotel = handleSubmit((data: FormData) => {
    const config = createConfig(data)
    navigate({
      pathname: `${path.hotel}/${hotelId}`,
      search: createSearchParams(config).toString()
    })
    setFlag(true)
  })

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
              onSubmit={handleSubmitSearchHotel}
              noValidate
              className="grid grid-cols-6 lg:grid-cols-12 items-center gap-2 flex-wrap py-2"
            >
              <div className="col-span-6 md:col-span-2 lg:col-span-4">
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
                  className={`rounded-md py-[16px] flex items-center justify-center ${adultsHotel === 0 ? "border-red-500 bg-red-100 border" : "bg-gray-300"}`}
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

                          {adultsHotel === 0 && (
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
                classNameWrapper="col-span-6 md:col-span-2 relative"
                nameButton="Tìm kiếm"
                type="submit"
                className="py-[20px] lg:py-[20px] bg-blueColor w-full text-whiteColor text-base rounded-md hover:bg-blueColor/80 duration-200 font-semibold border-blueColor"
              />
            </form>
          </div>
        </div>

        <div className="z-30 w-full absolute top-[410px] md:top-32 lg:top-16 left-1/2 -translate-x-1/2">
          <div className="container">
            <div className="mt-8 w-full flex items-center mb-4 h-[200px]">
              <div className="w-[30%] h-full">
                <img
                  src={hotelItem.imageHotel}
                  alt="ảnh"
                  className="w-full h-full object-cover rounded-tl rounded-bl"
                />
              </div>
              <div className="w-[70%] p-4 h-full bg-white flex items-center justify-center flex-col rounded-tr rounded-br">
                <h2 className="text-base text-textColor font-semibold">{hotelItem.name}</h2>
                <h3 className="text-base text-textColor font-normal">
                  Quốc gia: {hotelItem.address.countryCode}
                </h3>
                <span className="block text-base text-gray-500">
                  Mã khách sạn: {hotelItem.hotelId}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
