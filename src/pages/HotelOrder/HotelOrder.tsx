import DOMPurify from "dompurify"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import useScrollHeader from "src/hooks/useScrollHeader"
import {
  TypeHotelCreateOrder,
  TypeHotelSearchResponse,
  TypeTravelerHotel
} from "src/types/hotel.type"
import imgHotel from "src/img/Hotel/imgHotelRandom/hotel11.webp"
import { formatCurrency } from "src/utils/utils"
import { useEffect, useState } from "react"
import FormProfileHotel from "./Components/FormProfileHotel"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { hotelApi } from "src/apis/hotel.api"
import { toast } from "react-toastify"
import Button from "src/components/Button"
import Input from "src/components/Input"
import schema, { schemaType } from "src/utils/rules"
import { useMutation } from "@tanstack/react-query"
import useFormHandler from "src/hooks/useFormHandler"
import { path } from "src/constant/path"

type FormData = Pick<schemaType, "email" | "userName2">
const schemaFormData = schema.pick(["email", "userName2"])

export default function HotelOrder() {
  const navigate = useNavigate()
  // xử lý header
  const { showHeader } = useScrollHeader(200)

  // xử lý back page
  const handleBackPage = () => {
    navigate(-1)
  }

  const dataLS = localStorage.getItem("hotelPriceData") as string
  const data = JSON.parse(dataLS) as TypeHotelSearchResponse

  const [travellers, setTravellers] = useState<TypeTravelerHotel[]>([])

  const addTraveller = (newTravellers: TypeTravelerHotel) => {
    setTravellers((prev) => [...prev, newTravellers])
  }

  console.log(travellers)

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schemaFormData)
  })

  const { handleChangeValueForm } = useFormHandler()

  const hotelCreateOrderMutation = useMutation({
    mutationFn: (body: TypeHotelCreateOrder) => {
      return hotelApi.hotelCreateOrder(body)
    }
  })

  const onSubmit = handleSubmit((dataForm) => {
    if (travellers.length === 0) {
      toast.error("Vui lòng điền đầy đủ thông tin")
    } else {
      const loadingToastId = toast.loading("Vui lòng chờ trong giây lát!!!")
      const createOrder: TypeHotelCreateOrder = {
        data: {
          type: "hotel-order",
          guests: travellers.map((item, index) => ({ ...item, tid: index + 1 })),
          travelAgent: {
            contact: {
              email: dataForm.email
            }
          },
          roomAssociations: [
            {
              guestReferences: [
                {
                  guestReference: String(data.data[0].offers[0].guests.adults)
                }
              ],
              hotelOfferId: data.data[0].offers[0].id
            }
          ],
          payment: {
            method: "CREDIT_CARD",
            paymentCard: {
              paymentCardInfo: {
                vendorCode: "VI",
                cardNumber: "4151289722471370",
                expiryDate: "2026-08",
                holderName: dataForm.userName2
              }
            }
          }
        }
      }
      hotelCreateOrderMutation.mutate(createOrder, {
        onSuccess: () => {
          toast.dismiss(loadingToastId)
          toast.success("Tạo đơn thành công!")
          navigate(path.hotelPayment)
        }
      })
    }
  })

  useEffect(() => {
    if (hotelCreateOrderMutation.data?.data) {
      localStorage.setItem("detailPaymentData", JSON.stringify(hotelCreateOrderMutation.data.data))
    }
  }, [hotelCreateOrderMutation.data?.data])

  return (
    <div>
      <Helmet>
        <title>Đặt vé khách sạn</title>
        <meta name="description" content="Đặt vé khách sạn - Booking." />
      </Helmet>

      <div className="relative z-10">
        <div
          className={`w-full bg-blueColor ${showHeader ? "fixed top-0 left-1/2 -translate-x-1/2 shadow-xl" : "absolute top-0 left-1/2 -translate-x-1/2"} z-50 transition-all ease-linear duration-1000`}
        >
          <div className="container">
            <div className="py-4 px-1 grid grid-cols-12 items-center">
              <div className="col-span-12 md:col-span-5">
                <div className="flex items-center gap-2">
                  <button
                    aria-label="iconBack"
                    onClick={handleBackPage}
                    className="text-white hover:text-gray-300 duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                      />
                    </svg>
                  </button>
                  <h1 className="text-xl text-whiteColor font-semibold">
                    Hoàn tất đặt phòng của bạn
                  </h1>
                </div>
              </div>
              <div className="hidden col-span-7 items-center md:flex flex-col">
                <div className="w-[80%] flex items-center justify-between">
                  <div>
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                      1
                    </div>
                  </div>

                  <div className="w-60 h-1 bg-gray-400"></div>

                  <div>
                    <div className="w-5 h-5 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs">
                      2
                    </div>
                  </div>

                  <div className="w-60 h-1 bg-gray-400"></div>

                  <div>
                    <div className="w-5 h-5 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-full flex items-center justify-between">
                  <div className="text-white text-sm">Thông tin hành khách</div>
                  <div className="text-white text-sm">Chi tiết thanh toán</div>
                  <div className="text-white text-sm">Đã xác nhận đặt phòng!</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full absolute top-20 left-1/2 -translate-x-1/2">
          <div className="container">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 order-2 md:col-span-8 md:order-1">
                <div className="mt-8 mb-12 md:mt-2 md:mb-4 w-full flex items-center flex-col md:flex-row h-[300px] ">
                  <div className="w-full md:w-[60%] h-full">
                    <img
                      src={imgHotel}
                      alt="ảnh"
                      className="w-full h-full object-cover rounded-tl-lg rounded-bl-lg shadow-md"
                    />
                  </div>
                  <div className="w-full md:w-[40%] p-4 h-full bg-white flex items-center justify-center flex-col rounded-tr-lg rounded-br-lg shadow-md">
                    <h2 className="text-base text-textColor font-semibold">
                      {data.data[0].hotel.name}
                    </h2>
                    <h3 className="text-base text-textColor font-normal">Quốc gia:</h3>
                    <span className="block text-base text-gray-500">
                      Mã khách sạn: {data.data[0].hotel.hotelId}
                    </span>
                  </div>
                </div>

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
                  </div>
                </div>

                <div className="my-4">
                  <h2 className="text-lg text-textColor font-semibold my-2 ml-1">
                    Thông tin khách
                  </h2>

                  <div className="mt-2">
                    {Array(data.data[0].offers[0].guests.adults)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="w-full gap-2 relative shadow-md bg-white border-b border-b-gray-300 px-6 py-6 rounded-lg mb-4"
                        >
                          <FormProfileHotel
                            addOnTraveller={addTraveller}
                            index={index}
                            typeTraveler="Người lớn"
                          />
                        </div>
                      ))}
                  </div>

                  <div>
                    <h2 className="text-lg text-textColor font-semibold my-2">Thông tin liên hệ</h2>
                    <form onSubmit={onSubmit} className="bg-white shadow-md rounded-lg">
                      <div className="py-4 border-b border-b-gray-300">
                        <span className="px-6 text-base font-medium block">
                          Thông tin liên hệ (nhận vé/phiếu thanh toán)
                        </span>
                      </div>
                      <div className="p-6 grid grid-cols-6 items-center gap-2 flex-wrap pb-0">
                        <div className="col-span-6 md:col-span-3">
                          <span className="mb-[2px] text-sm block">
                            Tên Đệm & Tên (vd: Minh Thuan) <span className="text-red-500">*</span>
                          </span>
                          <Input
                            className="flex flex-col items-start"
                            classNameInput="w-full p-2 outline-none bg-transparent border font-normal focus:border-blueColor bg-white rounded border border-gray-400 text-base"
                            type="text"
                            autoComplete="on"
                            placeholder="Tên"
                            name="userName2"
                            register={register}
                            messageError={errors.userName2?.message}
                            onChange={handleChangeValueForm("userName2")}
                          />
                        </div>

                        <div className="col-span-6 md:col-span-3">
                          <span className="mb-[2px] text-sm block">Email</span>
                          <Input
                            className="flex flex-col items-start"
                            classNameInput="w-full p-2 outline-none bg-transparent border font-normal focus:border-blueColor bg-white rounded border border-gray-400 text-base"
                            type="text"
                            autoComplete="on"
                            placeholder="Email"
                            name="email"
                            register={register}
                            messageError={errors.email?.message}
                          />
                        </div>
                      </div>

                      <div className="p-4 pt-0">
                        <Button
                          type="submit"
                          disable={hotelCreateOrderMutation.isPending}
                          classNameWrapper="flex justify-end relative"
                          nameButton="Tiếp tục"
                          className="py-3 bg-blueColor px-12 text-whiteColor text-base rounded-sm hover:bg-blueColor/80 duration-200 "
                          classNameLoading="absolute top-2 right-[14%]"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-span-12 order-1 md:col-span-4 md:order-2">
                <div className="mt-2 bg-[#fff] p-4 shadow-md rounded-lg">
                  <span className="text-base mb-4 block font-medium">Phân tích giá</span>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Người lớn</span>
                      <div className="flex gap-1 text-sm font-medium">
                        <span>
                          {formatCurrency(Number(data.data[0].offers[0].price.total))}
                          {" đ"}
                        </span>
                        <span>x</span>
                        <span>{data.data[0].offers[0].guests.adults}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-gray-500">
                      <span className="text-sm font-normal">Giá gốc</span>
                      <span className="font-normal text-sm mb-1 block">
                        {formatCurrency(Number(data.data[0].offers[0].price.base))}{" "}
                        {data.data[0].offers[0].price.currency}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-gray-500">
                      <span className="text-sm font-normal">Thuế và phí</span>
                      <span className="font-normal text-sm mb-1 block">
                        {formatCurrency(
                          Number(data.data[0].offers[0].price.total) -
                            Number(data.data[0].offers[0].price.base)
                        )}{" "}
                        {data.data[0].offers[0].price.currency}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 border-t border-t-gray-300 py-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Giảm giá</span>
                    <span className="text-sm font-medium">0đ</span>
                  </div>
                  <div className="mt-2 border-t border-t-gray-300 py-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Phí xử lý</span>
                    <span className="text-sm font-medium text-[#32a923] uppercase">miễn phí</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base block font-medium">Tổng cộng</span>
                    <span className="text-xl font-medium text-red-600">
                      {formatCurrency(Number(data.data[0].offers[0].price.total))}{" "}
                      {data.data[0].offers[0].price.currency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
