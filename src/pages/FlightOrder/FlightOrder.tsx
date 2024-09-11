import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet-async"
import { countries, countryCodePhone } from "src/constant/flightSearch"
import {
  FlightCreateOrder,
  TypeFlightPriceResponse,
  TravellerType,
  TypeCountryListCodeNumber
} from "src/types/flight.type"
import {
  getAirlines,
  getCountry,
  getDateFromAPI,
  getDurationFromAPI,
  getHourFromAPI
} from "src/utils/utils"
import iconFlight from "src/img/Flight/iconFlightRed.webp"
import checkInBaggage from "src/img/Flight/FlightOrder/checkin_baggage_icon.webp"
import icon2 from "src/img/Flight/FlightOrder/imp-info.webp"
import { useNavigate } from "react-router-dom"
import FormProfile from "./Components/FormProfile"
import Button from "src/components/Button"
import { useMutation } from "@tanstack/react-query"
import { flightApi } from "src/apis/flight.api"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import schema, { schemaType } from "src/utils/rules"
import Input from "src/components/Input"
import InputSearchV2 from "./Components/InputSearchV2"
import CodeNumberList from "./Components/CodeNumberList"
import useScrollHeader from "src/hooks/useScrollHeader"
import { path } from "src/constant/path"
import useFormHandler from "src/hooks/useFormHandler"
import PriceTraveler from "src/components/PriceTraveler"
import usePriceTraveller from "src/hooks/usePriceTraveller"
import { useTranslation } from "react-i18next"

export type FormData = Pick<
  schemaType,
  "codeNumber" | "numberPhone" | "email" | "userName2" | "lastName2"
>
export type InputName = "codeNumber"
const schemaFormData = schema.pick(["codeNumber", "numberPhone", "email", "userName2", "lastName2"])
export const FetchDataListNational = () => Promise.resolve(countryCodePhone)

export default function FlightOrder() {
  const { t } = useTranslation("flight")

  const navigate = useNavigate()
  // xử lý header
  const { showHeader } = useScrollHeader(200)
  // xử lý form
  // const [checkState, setCheckState] = useState<boolean[]>(Array(currentAdult).fill(true)) // khởi tạo 1 mảng trạng thái toàn true
  const inputRef = useRef<HTMLInputElement>(null)
  const [codeNumberList, setCodeNumberList] = useState<TypeCountryListCodeNumber>([])
  const [codeNumber, setCodeNumber] = useState("")
  const [showListCodeNumber, setShowListCodeNumber] = useState<boolean>(false)

  const dataLS = localStorage.getItem("flightPriceData") as string
  const data = JSON.parse(dataLS) as TypeFlightPriceResponse

  useEffect(() => {
    FetchDataListNational().then((res) => {
      setCodeNumberList(res)
    })
  }, [])

  // xử lý back page
  const handleBackPage = () => {
    navigate(-1)
  }

  const { quantityOfTraveller } = usePriceTraveller(data, undefined)

  // cái này hay
  // const handleCheckTraveller =
  //   (type: string, index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //     if (type === "adult") {
  //       setCheckState(
  //         produce((draft) => {
  //           draft[index] = event.target.checked // đại diện checked previous
  //         })
  //       )
  //     } else if (type === "child") {
  //       setCheckState(
  //         produce((draft) => {
  //           draft[index] = event.target.checked // đại diện checked previous
  //         })
  //       )
  //     } else if (type === "infant") {
  //       setCheckState(
  //         produce((draft) => {
  //           draft[index] = event.target.checked // đại diện checked previous
  //         })
  //       )
  //     }
  //   }

  // const handleAddTraveller = (type: string) => () => {
  //   if (type === "adult") {
  //     if (currentAdult < quantityOfTraveller.adult) {
  //       setCurrentAdult((prev) => prev + 1)
  //     }
  //   } else if (type === "child") {
  //     if (currentChild < quantityOfTraveller.child) {
  //       setCurrentChild((prev) => prev + 1)
  //     }
  //   } else if (type === "infant") {
  //     if (currentInfant < quantityOfTraveller.infant) {
  //       setCurrentInfant((prev) => prev + 1)
  //     }
  //   }
  // }

  // xử lý form
  const [travellers, setTravellers] = useState<TravellerType[]>([])

  const addTraveller = (newTravellers: TravellerType) => {
    setTravellers((prev) => [...prev, newTravellers])
  }

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schemaFormData)
  })

  const { filterList, handleItemClick, handleChangeValueForm } = useFormHandler(
    codeNumberList,
    codeNumber,
    setValue,
    setCodeNumber,
    setShowListCodeNumber
  )

  const flightCreateOrderMutation = useMutation({
    mutationFn: (body: FlightCreateOrder) => {
      return flightApi.flightCreateOrder(body)
    }
  })

  const onSubmit = handleSubmit((dataForm) => {
    if (travellers.length === 0) {
      toast.error("Vui lòng điền đầy đủ thông tin")
    } else {
      const loadingToastId = toast.loading("Vui lòng chờ trong giây lát!!!")
      const createOrder: FlightCreateOrder = {
        data: {
          type: "flight-order",
          flightOffers: [data.data.flightOffers[0]],
          travelers: travellers.map((item, index) => ({ ...item, id: index + 1 })),
          remarks: {
            // ghi chú
            general: [
              {
                subType: "GENERAL_MISCELLANEOUS",
                text: "ONLINE BOOKING FROM INCREIBLE VIAJES"
              }
            ]
          },
          ticketingAgreement: {
            // tùy chọn của thỏa thuận vé và thời gian trì hoãn
            option: "DELAY_TO_CANCEL",
            delay: "6D"
          },
          // Thông tin liên hệ:
          contacts: [
            {
              addresseeName: {
                firstName: dataForm.userName2,
                lastName: dataForm.lastName2
              },
              companyName: "INCREIBLE VIAJES",
              purpose: "STANDARD",
              phones: [
                {
                  deviceType: "MOBILE",
                  countryCallingCode: dataForm.codeNumber,
                  number: dataForm.numberPhone
                }
              ],
              emailAddress: dataForm.email,
              address: {
                lines: ["Calle Prado, 16"],
                postalCode: "28014",
                cityName: "HCM",
                countryCode: "VN"
              }
            }
          ]
        }
      }
      flightCreateOrderMutation.mutate(createOrder, {
        onSuccess: () => {
          toast.dismiss(loadingToastId)
          toast.success("Tạo đơn thành công!")
          navigate(path.flightPayment)
        }
      })
    }
  })

  useEffect(() => {
    if (flightCreateOrderMutation.data?.data) {
      localStorage.setItem("detailPaymentData", JSON.stringify(flightCreateOrderMutation.data.data))
    }
  }, [flightCreateOrderMutation.data?.data])

  return (
    <div>
      <Helmet>
        <title>{t("flight.bookingFlight")}</title>
        <meta name="description" content={`${t("flight.bookingFlight")} - Booking.`} />
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
                    {t("flight.doneBuyFlight")}
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
                  <div className="text-white text-sm">{t("flight.spanFlight1")}</div>
                  <div className="text-white text-sm">{t("flight.spanFlight2")}</div>
                  <div className="text-white text-sm">{t("flight.spanFlight3")}!</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full absolute top-20 left-1/2 -translate-x-1/2">
          <div className="container">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 order-2 md:col-span-8 md:order-1">
                {data?.data.flightOffers[0].itineraries.map((item, index) => (
                  <div
                    key={index}
                    className="relative p-6 mb-4 bg-white last:mb-0 shadow-md rounded-lg border border-gray-300"
                  >
                    <div className="flex items-center justify-between flex-wrap">
                      <div className="flex items-center gap-1">
                        <h2 className="text-base md:text-xl text-textColor font-semibold">
                          {item.segments[0].departure.iataCode},{" "}
                          {getCountry(
                            countries,
                            data.dictionaries.locations[item.segments[0].departure.iataCode]
                              .countryCode
                          )}
                        </h2>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                            />
                          </svg>
                        </div>
                        <h2 className="text-base md:text-xl text-textColor font-semibold">
                          {item.segments[item.segments.length - 1].arrival.iataCode},{" "}
                          {getCountry(
                            countries,
                            data.dictionaries.locations[
                              item.segments[item.segments.length - 1].arrival.iataCode
                            ].countryCode
                          )}
                        </h2>
                      </div>
                      <div className="text-white p-1 bg-red-600 text-xs font-normal">
                        {t("flight.noRefund")}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="p-1 text-sm text-textColor font-medium bg-[#ffedd1]">
                        {getDateFromAPI(item.segments[0].departure.at)}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-gray-500 text-sm">
                          {item.segments.length === 1 ? <div>Non Stop</div> : <div>1 Stop</div>}
                        </div>
                        <div className="w-1 h-1 bg-textColor rounded-full"></div>
                        <span className="text-gray-500 text-sm">
                          {item.segments.length === 1 && (
                            <div>{getDurationFromAPI(item.segments[0].duration)}</div>
                          )}

                          {item.segments.length !== 1 && (
                            <div>
                              {(() => {
                                const durationHour1 = getDurationFromAPI(
                                  item.segments[0].duration
                                ).split(" giờ ")[0]
                                const durationHour2 = getDurationFromAPI(
                                  item.segments[item.segments.length - 1].duration
                                ).split(" giờ ")[0]

                                const durationMinute1 = getDurationFromAPI(
                                  item.segments[0].duration
                                )
                                  .split(" giờ ")[1]
                                  .split(" phút")[0]

                                const durationMinute2 = getDurationFromAPI(
                                  item.segments[item.segments.length - 1].duration
                                )
                                  .split(" giờ ")[1]
                                  .split(" phút")[0]

                                let hours = Number(durationHour1) + Number(durationHour2)
                                let minute = Number(durationMinute1) + Number(durationMinute2)
                                if (minute >= 60) {
                                  minute = minute % 60
                                  hours = hours + 1
                                }
                                return (
                                  <div>
                                    {hours} giờ {minute} phút
                                  </div>
                                )
                              })()}
                            </div>
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="bg-green-600 w-1 h-16 absolute left-0 top-4"></div>

                    {item.segments.map((detail, indexDetail) => (
                      <div key={indexDetail} className="mt-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src={iconFlight} alt="iconFlight" className="w-8 h-8" />
                            <h3 className="text-sm font-normal">
                              {getAirlines(detail.carrierCode)}
                            </h3>
                            <span className="text-sm text-gray-500">{detail.carrierCode}</span>
                            <span className="text-sm text-gray-500">{detail.number}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {
                              data.data.flightOffers[0].travelerPricings[0].fareDetailsBySegment[0]
                                .cabin
                            }
                          </div>
                        </div>

                        <div className="relative mt-2 p-2 md:p-4 bg-[#f4f4f4]">
                          <div className="flex items-center pb-4 md:pb-2 gap-4">
                            <div className="h-[100px] md:h-[80px] flex flex-col justify-between">
                              <span className="block text-base font-medium">
                                {getHourFromAPI(detail.departure.at)}
                              </span>

                              <span className="block text-base font-medium">
                                {getHourFromAPI(detail.arrival.at)}
                              </span>
                            </div>

                            <div className="relative h-[80px] md:h-[60px] flex flex-col justify-between">
                              <div className="border border-gray-500 bg-white w-3 h-3 rounded-full"></div>
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-8 bg-gray-500"></div>
                              <div className="border border-gray-500 bg-white w-3 h-3 rounded-full"></div>
                            </div>

                            <div className="h-[100px] md:h-[80px] flex flex-col justify-between">
                              <div className="text-base font-medium">
                                {detail.departure.iataCode}
                                {" - "}
                                {getCountry(
                                  countries,
                                  data.dictionaries.locations[detail.departure.iataCode].countryCode
                                )}
                                , Nhà ga khởi hành: {detail.departure.terminal}
                              </div>
                              <span className="text-sm">{getDurationFromAPI(detail.duration)}</span>
                              <div className="text-base font-medium">
                                {detail.arrival.iataCode}
                                {" - "}
                                {getCountry(
                                  countries,
                                  data.dictionaries.locations[detail.arrival.iataCode].countryCode
                                )}
                                , Nhà ga khởi hành: {detail.arrival.terminal}
                              </div>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-t-gray-300 flex items-center">
                            <img src={checkInBaggage} alt="checkIn" className="w-10 h-8" />
                            <span className="text-sm text-textColor font-semibold">
                              Check-In Hành lý:
                            </span>
                            <span className="ml-2 text-sm text-textColor">
                              {
                                data.data.flightOffers[0].travelerPricings[0]
                                  .fareDetailsBySegment[0].includedCheckedBags.weight
                              }
                              {
                                data.data.flightOffers[0].travelerPricings[0]
                                  .fareDetailsBySegment[0].includedCheckedBags.weightUnit
                              }{" "}
                              / {t("flight.adult")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                <div className="my-4">
                  <h2 className="text-lg text-textColor font-semibold my-2 ml-1">
                    {t("flight.spanFlight1")}
                  </h2>

                  {data?.data.flightOffers[0].travelerPricings.find(
                    (item) => item.travelerType === "ADULT"
                  ) && (
                    <div>
                      <div className="mt-2 bg-white p-4 shadow-md rounded-lg my-2">
                        <strong>{t("flight.spanFlight4")}:</strong>
                        {t("flight.spanFlight5")}
                      </div>

                      <div className="mt-2">
                        {Array(quantityOfTraveller.adult)
                          .fill(0)
                          .map((_, index) => (
                            <div
                              key={index}
                              className="w-full gap-2 relative shadow-md bg-white border-b border-b-gray-300 px-6 py-6 rounded-lg mb-4"
                            >
                              <FormProfile
                                addOnTraveller={addTraveller}
                                index={index}
                                typeTraveler="Người lớn"
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {data?.data.flightOffers[0].travelerPricings.find(
                    (item) => item.travelerType === "CHILD"
                  ) && (
                    <div>
                      <div className="mt-2">
                        {Array(quantityOfTraveller.child)
                          .fill(0)
                          .map((_, index) => (
                            <div
                              key={index}
                              className="w-full gap-2 relative shadow-md bg-white border-b border-b-gray-300 px-6 py-6 rounded-lg mb-4"
                            >
                              <FormProfile
                                addOnTraveller={addTraveller}
                                index={index + quantityOfTraveller.adult}
                                typeTraveler="Trẻ em"
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {data?.data.flightOffers[0].travelerPricings.find(
                    (item) => item.travelerType === "HELD_INFANT"
                  ) && (
                    <div>
                      <div className="mt-2">
                        {Array(quantityOfTraveller.infant)
                          .fill(0)
                          .map((_, index) => (
                            <div
                              key={index}
                              className="w-full gap-2 relative shadow-md bg-white border-b border-b-gray-300 px-6 py-6 rounded-lg mb-4"
                            >
                              <FormProfile
                                addOnTraveller={addTraveller}
                                index={
                                  index + quantityOfTraveller.child + quantityOfTraveller.adult
                                }
                                typeTraveler="Em bé"
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h2 className="text-lg text-textColor font-semibold my-2">Thông tin liên hệ</h2>
                    <form onSubmit={onSubmit} className="bg-white shadow-md rounded-lg">
                      <div className="py-4 border-b border-b-gray-300">
                        <span className="px-6 text-base font-medium block">
                          {t("flight.spanFlight6")}
                        </span>
                        <span className="px-6 text-sm block text-gray-500">
                          {t("flight.spanFlight7")}
                        </span>
                      </div>
                      <div className="p-6 grid grid-cols-6 items-center gap-4 flex-wrap pb-0">
                        <div className="col-span-6 md:col-span-3">
                          <span className="mb-[2px] text-sm block">
                            {t("flight.name")} (vd: Minh Thuan){" "}
                            <span className="text-red-500">*</span>
                          </span>
                          <Input
                            className="flex flex-col items-start"
                            classNameInput="w-full p-2 outline-none bg-transparent border font-normal focus:border-blueColor bg-white rounded border border-gray-400 text-base"
                            type="text"
                            autoComplete="on"
                            placeholder={t("flight.name")}
                            name="userName2"
                            register={register}
                            messageError={errors.userName2?.message}
                            onChange={handleChangeValueForm("userName2")}
                          />
                        </div>
                        <div className="col-span-6 md:col-span-3">
                          <span className="mb-[2px] text-sm block">
                            {t("flight.surname")} (vd: Pham) <span className="text-red-500">*</span>
                          </span>
                          <Input
                            className="flex flex-col items-start"
                            classNameInput="w-full p-2 outline-none bg-transparent border font-normal focus:border-blueColor bg-white rounded border border-gray-400 text-base"
                            type="text"
                            autoComplete="on"
                            placeholder={t("flight.surname")}
                            name="lastName2"
                            register={register}
                            messageError={errors.lastName2?.message}
                            onChange={handleChangeValueForm("lastName2")}
                          />
                        </div>
                        <div className="col-span-6 md:col-span-3 flex">
                          <div className="w-[40%]">
                            <span className="mb-[2px] text-sm block">
                              {t("flight.countryCode")}
                            </span>
                            <InputSearchV2
                              autoComplete="on"
                              placeholder="+84"
                              classNameList="z-20 absolute top-10 left-0 h-[200px] bg-whiteColor overflow-y-auto overflow-x-hidden rounded-sm shadow-sm transition-all duration-1000 ease-linear"
                              classNameBlock="relative flex items-center"
                              classNameInput="w-full p-2 outline-none bg-white text-base flex-grow truncate font-normal focus:border-blueColor text-textColor rounded-tl rounded-bl border border-gray-400"
                              ref={inputRef}
                              value={codeNumber}
                              showList={showListCodeNumber}
                              handleChangeValue={(event) => setCodeNumber(event.target.value)}
                              handleFocus={() => setShowListCodeNumber(true)}
                              register={register}
                              name="codeNumber"
                              error={errors.codeNumber?.message}
                            >
                              <CodeNumberList
                                listAirport={filterList}
                                handleItemClick={handleItemClick}
                                inputName="codeNumber"
                              />
                            </InputSearchV2>
                          </div>
                          <div className="w-[60%]">
                            <span className="mb-[2px] text-sm block">
                              {t("flight.numberPhone")}
                            </span>
                            <Input
                              className="flex flex-col items-start"
                              classNameInput="w-full p-2 outline-none bg-transparent border font-normal focus:border-blueColor bg-white rounded-tr rounded-br border text-base border-gray-400"
                              type="text"
                              autoComplete="on"
                              placeholder={t("flight.numberPhone")}
                              name="numberPhone"
                              register={register}
                              messageError={errors.numberPhone?.message}
                              onChange={handleChangeValueForm("numberPhone")}
                            />
                          </div>
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
                          disable={flightCreateOrderMutation.isPending}
                          classNameWrapper="flex justify-end relative"
                          nameButton={t("flight.continue")}
                          className="py-3 bg-blueColor px-12 text-whiteColor text-base rounded-sm hover:bg-blueColor/80 duration-200 "
                          classNameLoading="absolute top-2 right-[14%]"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-span-12 order-1 md:col-span-4 md:order-2">
                <PriceTraveler data={data} />

                <div className="mt-4 bg-[#fff] p-4 shadow-md rounded-lg">
                  <div className="overflow-y-auto h-[200px]">
                    <h2 className="text-base text-textColor font-semibold">
                      {t("flight.price.bookingCondition")}
                    </h2>
                    <div>
                      <div className="mt-3 flex items-center gap-2">
                        <img src={icon2} alt="icon" className="w-5 h-5" />
                        <h3 className="text-sm text-textColor font-semibold">
                          {data?.data.flightOffers[0].itineraries[0].segments[0].departure.iataCode}
                          {"-"}
                          {
                            data?.data.flightOffers[0].itineraries[0].segments[
                              data?.data.flightOffers[0].itineraries[0].segments.length - 1
                            ].arrival.iataCode
                          }
                          : {t("flight.price.bookingCondition2")}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 mt-2 ml-2">
                        <div className="h-1 w-1 rounded-full bg-textColor"></div>
                        <span className="text-sm text-gray-600 max-w-[350px]">
                          {t("flight.price.bookingCondition3")}
                        </span>
                      </div>
                    </div>

                    {data?.data.flightOffers[0].itineraries.length > 1 && (
                      <div className="mt-3">
                        <div className="mt-2 flex items-center gap-2">
                          <img src={icon2} alt="icon" className="w-5 h-5" />
                          <h3 className="text-sm text-textColor font-semibold">
                            {
                              data.data.flightOffers[0].itineraries[
                                data.data.flightOffers[0].itineraries.length - 1
                              ].segments[0].departure.iataCode
                            }
                            {"-"}
                            {
                              data.data.flightOffers[0].itineraries[
                                data.data.flightOffers[0].itineraries.length - 1
                              ].segments[
                                data.data.flightOffers[0].itineraries[0].segments.length - 1
                              ].arrival.iataCode
                            }
                            : {t("flight.price.bookingCondition2")}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 mt-2 ml-2">
                          <div className="h-1 w-1 rounded-full bg-textColor"></div>
                          <span className="text-sm text-gray-600 max-w-[350px]">
                            {t("flight.price.bookingCondition3")}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="mt-3">
                      <div className="flex items-center gap-2">
                        <img src={icon2} alt="icon" className="w-5 h-5" />
                        <h3 className="text-base text-textColor font-semibold">
                          {t("flight.price.bookingCondition4")}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <div className="h-1 w-1 rounded-full bg-textColor"></div>
                        <span className="text-sm text-gray-600 w-full  max-w-[900px]">
                          {t("flight.price.bookingCondition5")}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="mt-2 flex items-center gap-2">
                        <img src={icon2} alt="icon" className="w-5 h-5" />
                        <h3 className="text-base text-textColor font-semibold">
                          {t("flight.price.bookingCondition6")}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <div className="h-1 w-1 rounded-full bg-textColor"></div>
                        <span className="text-sm text-gray-600 w-full  max-w-[900px]">
                          {t("flight.price.bookingCondition7")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 ml-2">
                        <div className="h-1 w-1 rounded-full bg-textColor"></div>
                        <span className="text-sm text-gray-600 w-full  max-w-[900px]">
                          {t("flight.price.bookingCondition8")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 ml-2">
                        <div className="h-1 w-1 rounded-full bg-textColor"></div>
                        <span className="text-sm text-gray-600 w-full  max-w-[900px]">
                          {t("flight.price.bookingCondition9")}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="mt-2 flex items-center gap-2">
                        <img src={icon2} alt="icon" className="w-5 h-5" />
                        <h3 className="text-base text-textColor font-semibold">
                          {t("flight.price.bookingCondition10")}a
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <div className="h-1 w-1 rounded-full bg-textColor"></div>
                        <span className="text-sm text-gray-600 w-full  max-w-[900px]">
                          {t("flight.price.bookingCondition11")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 ml-2">
                        <div className="h-1 w-1 rounded-full bg-textColor"></div>
                        <span className="text-sm text-gray-600 w-full  max-w-[900px]">
                          {t("flight.price.bookingCondition12")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 ml-2">
                        <div className="h-1 w-1 rounded-full bg-textColor"></div>
                        <span className="text-sm text-gray-600 w-full  max-w-[900px]">
                          {t("flight.price.bookingCondition13")}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="mt-2 flex items-center gap-2">
                        <img src={icon2} alt="icon" className="w-5 h-5" />
                        <h3 className="text-base text-textColor font-semibold">
                          {t("flight.price.bookingCondition14")}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <div className="h-1 w-1 rounded-full bg-textColor"></div>
                        <span className="text-sm text-gray-600 w-full  max-w-[900px]">
                          {t("flight.price.bookingCondition15")}
                        </span>
                      </div>
                    </div>
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
