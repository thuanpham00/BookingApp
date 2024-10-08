/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  FlightPricingParams,
  TypeFlightItemResponse,
  TypeFlightListResponse,
  TypeFlightPriceResponse
} from "src/types/flight.type"
import iconFlightRed from "../../../../img/Flight/iconFlightRed.webp"
import iconFlight2 from "../../../../img/svg/flight.svg"
import luggage from "../../../../img/svg/luggage-baggage-svgrepo-com.svg"
import {
  changeTravelerType,
  exchangePrice,
  getCountry,
  getCountryAirport,
  getDateFromAPI,
  getDurationFromAPI,
  getHourFromAPI
} from "src/utils/utils"
import Button from "src/components/Button"
import { useMutation } from "@tanstack/react-query"
import { flightApi } from "src/apis/flight.api"
import { Fragment, memo, useContext, useEffect, useState } from "react"
import { airportCodes } from "src/constant/flightSearch"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger
} from "src/components/ui/alert-dialog"
import icon from "../../../../img/svg/luggages.png"
import icon2 from "../../../../img/svg/mmtconnect_orange.avif"
import Skeleton from "src/components/Skeleton"
import { useNavigate } from "react-router-dom"
import { path } from "src/constant/path"
import { AppContext } from "src/context/useContext"
import { toast } from "react-toastify"
import { setCartToLS } from "src/utils/auth"
import { useTranslation } from "react-i18next"

interface Props {
  item: TypeFlightItemResponse
  list: TypeFlightListResponse
}

function FlightItemInner({ item, list }: Props) {
  const { t } = useTranslation(["flight", "manage"])

  const navigate = useNavigate()
  const { setListCart, listCart } = useContext(AppContext)
  const [showFlightDetail, setShowFlightDetail] = useState(false)
  const [showPriceDetail, setShowPriceDetail] = useState(false)

  const handleDetailFlight = () => {
    setShowFlightDetail((prev) => !prev)
  }

  const flightOffersPriceMutation = useMutation({
    mutationFn: (data: FlightPricingParams) => {
      return flightApi.flightOffersPrice(data)
    }
  })

  const handleClickPriceItem = (index: string) => {
    const body: FlightPricingParams = {
      data: {
        type: "flight-offers-pricing",
        flightOffers: [list.data[Number(index) - 1]]
      }
    }
    flightOffersPriceMutation.reset()
    flightOffersPriceMutation.mutate(body, {
      onSuccess: () => {
        setShowPriceDetail(true)
      }
    })
  }

  const flightPrice = flightOffersPriceMutation.data?.data as TypeFlightPriceResponse

  const handleNavigatePage = () => {
    navigate({
      pathname: path.flightOrder
    })
    localStorage.setItem("flightPriceData", JSON.stringify(flightPrice))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleAddToCart = () => {
    setListCart((prev) => {
      const findItem = listCart.find(
        (item) =>
          item.data.flightOffers[0].itineraries[0].segments[0].departure.at ===
            flightPrice.data.flightOffers[0].itineraries[0].segments[0].departure.at &&
          item.data.flightOffers[0].itineraries[0].segments[0].arrival.at ===
            flightPrice.data.flightOffers[0].itineraries[0].segments[0].arrival.at
      ) // trả về true false
      if (findItem) {
        toast.error("Chuyến bay này đã có trong giỏ hàng")
        return [...prev]
      } else {
        toast.success("Thêm vào giỏ hàng thành công!!!")
        return [...prev, flightPrice]
      }
    })
  }
  // trường hợp thêm 2 lần 1 chuyến bay vào thì từ chối -> so sánh id
  // vậy nếu cả 2 cùng id trong list nhưng khác chuyến bay
  // -> so sánh giờ bay bắt đầu và giờ bay về -> nếu trùng ko add

  // nếu ds list cart có thay đổi thì hàm này chạy re-render lại
  useEffect(() => {
    if (listCart) {
      setCartToLS(listCart)
    }
  }, [listCart])

  return (
    <Fragment>
      <div className="flex flex-col items-center w-full bg-[#fff] mb-4 shadow-sm rounded">
        {/* /* chi tiết 1 chuyến bay sẽ gồm nhiều hành trình bay - 1 chiều hay 2 chiều */}
        {item.itineraries.map((detail, index) => (
          <div key={index} className="w-full border-b-[2px] border-b-gray-400">
            {/* 1 hành trình bay gồm nhiều đoạn bay - quá cảnh */}
            {detail.segments.map((flight) => (
              <div
                key={flight.id}
                className="grid grid-cols-12 items-center p-4 pt-10 border-b border-b-gray-200"
              >
                <div className="hidden md:block col-span-3 relative">
                  <div className="absolute -top-8 left-0 bg-gray-200 rounded-full p-1 text-xs flex items-center justify-center gap-[2px]">
                    <img src={iconFlight2} alt="icon" className="w-5 h-5" />
                    <span>{item.travelerPricings[0].fareDetailsBySegment[0].cabin}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-8 flex-shrink-0">
                      <img src={iconFlightRed} alt="iconFlight" className="w-full h-full" />
                    </div>
                    <div className="flex-grow">
                      <span className="block text-textColor text-xs font-semibold">
                        {list.dictionaries.carriers[flight.carrierCode]}
                      </span>
                      <span className="block text-textColor text-xs font-normal truncate w-[150px]">
                        {flight.carrierCode} {flight.number}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-span-4 md:col-span-2">
                  <div className="flex flex-col items-center">
                    <div className="text-base lg:text-2xl font-semibold text-textColor">
                      {getHourFromAPI(flight.departure.at)}
                    </div>
                    <div className="text-sm text-textColor">
                      {getCountryAirport(flight.departure.iataCode)}
                    </div>
                  </div>
                </div>

                <div className="col-span-4 md:col-span-2 relative">
                  <div className="text-center text-sm font-medium">
                    {getDurationFromAPI(flight.duration) as string}
                  </div>
                  <div className="w-24 h-1 bg-blueColor absolute left-1/2 -translate-x-1/2"></div>
                  <div className="text-sm mt-1 text-center">
                    {flight.numberOfStops === 0 && item.itineraries[0].segments.length === 1
                      ? `${t("flight.flightNonStop")}`
                      : ""}
                  </div>
                </div>

                <div className="col-span-4 md:col-span-2">
                  <div className="flex flex-col items-center">
                    <div className="text-base lg:text-2xl font-semibold text-textColor">
                      {getHourFromAPI(flight.arrival.at)}
                    </div>
                    <div className="text-sm text-textColor">
                      {getCountryAirport(flight.arrival.iataCode)}
                    </div>
                  </div>
                </div>

                <div className="hidden md:block col-span-3">
                  <div className="flex items-start justify-center gap-2">
                    <img src={luggage} alt="luggage" className="mt-1 h-3 w-3" />

                    <div>
                      <span className="text-sm">{t("flight.includeBaggage")}:</span>
                      <div className="flex gap-1 justify-center text-sm">
                        <span> 1 x </span>
                        <div className="flex items-center gap-[2px]">
                          <span>
                            {item.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags
                              .weight || "23"}
                          </span>
                          <span>
                            {item.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags
                              .weightUnit || "KG"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="w-full bg-[#f8f8f8] py-2 px-4 rounded-bl rounded-br">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handleDetailFlight}
              className="text-blueColor text-sm hover:underline hover:text-blueColor/80 duration-200"
            >
              {showFlightDetail ? `${t("flight.hidden")}` : `${t("flight.detail")}`}
            </button>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col items-end">
                <span className="text-base lg:text-lg font-semibold">
                  {exchangePrice(item.travelerPricings[0].price.total)}đ
                </span>
                <span className="text-gray-500 text-sm">{t("flight.ticketPriceAdult")}</span>
              </div>

              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    onClick={() => handleClickPriceItem(item.id)}
                    nameButton={t("flight.priceDetail")}
                    className="px-3 py-2 bg-[#e5eef4] w-full text-blueColor text-sm rounded-full hover:bg-blueColor duration-200 font-semibold border border-blueColor hover:text-whiteColor"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent className="block max-w-[400px] md:max-w-[700px] lg:max-w-[1000px] h-[700px] md:h-[550px] overflow-y-auto">
                  <AlertDialogTitle className="flex items-center justify-between gap-2 shadow-md px-6 py-2">
                    <div className="flex items-center gap-2 text-sm md:text-base">
                      {t("flight.priceDesc1")}
                      <img src={icon2} alt="icon2" className="hidden md:block w-32 h-7" />
                    </div>
                    <AlertDialogCancel className="border-none shadow-none p-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="gray"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </AlertDialogCancel>
                  </AlertDialogTitle>
                  <AlertDialogDescription className="px-6 py-3">
                    <div className="flex items-center gap-2 bg-orange-200 p-1">
                      <img src={icon} alt="icon" className="w-5 h-5" />
                      <span className="text-textColor">{t("flight.priceDesc2")}</span>
                    </div>
                  </AlertDialogDescription>

                  {showPriceDetail && (
                    <Fragment>
                      <div className="px-6 py-2 flex items-start flex-wrap gap-2">
                        <div className="md:mt-[2px] text-base font-medium">
                          {flightPrice?.data.flightOffers[0].itineraries.length === 1
                            ? "One way"
                            : "Round Trip"}
                        </div>
                        <div>
                          {flightPrice?.data.flightOffers[0].itineraries.map(
                            (detailPrice, index) => (
                              <div key={index} className="flex items-center flex-wrap gap-2">
                                <div className="text-base font-semibold">
                                  {getCountry(
                                    airportCodes,
                                    detailPrice.segments[0].departure.iataCode
                                  )}
                                </div>
                                <div className="mt-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                                    />
                                  </svg>
                                </div>
                                <div className="text-base font-semibold">
                                  {getCountry(
                                    airportCodes,
                                    detailPrice.segments[detailPrice.segments.length - 1].arrival
                                      .iataCode
                                  )}
                                </div>
                                <div className="w-1 h-1 bg-textColor rounded-full"></div>
                                <div>{getDateFromAPI(detailPrice.segments[0].departure.at)}</div>
                                <div className="w-1 h-1 bg-textColor rounded-full"></div>
                                <div className="text-base font-medium">
                                  {t("flight.depart")}{" "}
                                  {getHourFromAPI(detailPrice.segments[0].departure.at)}
                                </div>
                                <div className="w-2 h-[1px] bg-textColor"></div>
                                <div className="text-base font-medium">
                                  {t("flight.arrive")}{" "}
                                  {getHourFromAPI(
                                    detailPrice.segments[detailPrice.segments.length - 1].arrival.at
                                  )}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      <div className="px-6 grid grid-cols-3 gap-4 items-center overflow-y-auto">
                        {flightPrice?.data.flightOffers[0].travelerPricings.map(
                          (traveler, index) => (
                            <div
                              key={index}
                              className="col-span-3 lg:col-span-1 border-2 border-gray-300"
                            >
                              <div className="flex items-center p-4 gap-2 border-b border-b-gray-300">
                                <div>
                                  <div className="flex lg:items-center lg:flex-row flex-col items-start lg:gap-1">
                                    <span className="text-base font-medium">
                                      {exchangePrice(traveler.price.total)}đ
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      dành cho {changeTravelerType(traveler.travelerType)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span className="text-xs">{traveler.fareOption}</span>
                                    <div className="w-1 h-1 bg-textColor rounded-full"></div>
                                    <span className="block text-xs">
                                      {traveler.fareDetailsBySegment[0].cabin}
                                    </span>
                                    <div className="w-1 h-1 bg-textColor rounded-full"></div>
                                    <span className="block text-xs">
                                      {traveler.fareDetailsBySegment[0].class}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="py-2 px-4">
                                <span className="text-sm font-semibold">Baggage</span>
                                <div className="mt-1 flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="white"
                                      className="w-3 h-2"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m4.5 12.75 6 6 9-13.5"
                                      />
                                    </svg>
                                  </div>
                                  <div className="text-textColor text-sm ml-1">
                                    Checked Baggage quantity:{" "}
                                    <span className="text-sm font-medium">
                                      {
                                        traveler.fareDetailsBySegment[0].includedCheckedBags
                                          .quantity
                                      }
                                    </span>
                                  </div>
                                </div>
                                <div className="mt-1 flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="white"
                                      className="w-3 h-2"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m4.5 12.75 6 6 9-13.5"
                                      />
                                    </svg>
                                  </div>
                                  <div className="text-sm ml-1">Required Emaill Address</div>
                                </div>
                                <div className="mt-1 flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="white"
                                      className="w-3 h-2"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m4.5 12.75 6 6 9-13.5"
                                      />
                                    </svg>
                                  </div>
                                  <div className="text-sm ml-1">Required Number Mobile Phone</div>
                                </div>
                              </div>

                              <div className="py-2 px-4">
                                <span className="text-sm font-semibold">Flexibility</span>
                                <div className="mt-1 flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-orange-300 flex items-center justify-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="white"
                                      className="w-3 h-3"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 12h14"
                                      />
                                    </svg>
                                  </div>
                                  <div className="text-sm">No refund on cancellation</div>
                                </div>
                              </div>

                              <div className="py-2 px-4">
                                <span className="text-sm font-semibold">Seat, Food and more</span>
                                <div className="mt-1 flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="white"
                                      className="w-3 h-3"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </div>
                                  <div className="text-sm">Seat Information no available</div>
                                </div>
                                <div className="mt-1 flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="white"
                                      className="w-3 h-3"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </div>
                                  <div className="text-sm">Food Information no available</div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      <AlertDialogFooter className="mt-4 py-2 px-6 border-t border-t-gray-300">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            onClick={handleAddToCart}
                            nameButton={t("flight.addCart")}
                            className="capitalize py-2 px-4 text-blueColor w-full border border-gray-300 text-sm rounded-full bg-transparent hover:bg-gray-100 hover:border-blueColor duration-200"
                          />
                          <Button
                            onClick={handleNavigatePage}
                            nameButton={t("flight.booking")}
                            className="uppercase py-2 px-4 bg-blueColor w-full text-whiteColor text-sm rounded-full bg-tra hover:bg-blueColor/80 duration-200"
                          />
                        </div>
                      </AlertDialogFooter>
                    </Fragment>
                  )}

                  {!showPriceDetail && (
                    <div className="h-[100px]">
                      <Skeleton
                        className="flex flex-col items-center justify-center  absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2"
                        classNameLoader="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      />
                    </div>
                  )}
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        <div
          className={`${showFlightDetail ? "h-auto opacity-100" : "h-0 opacity-0"} w-full transition-opacity ease-linear duration-200`}
        >
          {/* các hành trình bay render ra luôn */}
          {item.itineraries.map((detail, index) => (
            <div className="w-full p-4 flex flex-col md:flex-row" key={index}>
              {detail.segments.map((seg, indexSeg) => (
                <div key={indexSeg} className="flex-1">
                  <div className="flex items-center gap-2 border border-gray-300 px-4 py-2">
                    <div className="w-6 h-6">
                      <img src={iconFlightRed} alt="icon" className="w-full h-full" />
                    </div>
                    <span className="block text-textColor text-xs font-semibold truncate">
                      {list.dictionaries.carriers[seg.carrierCode]}
                    </span>
                    <span className="block text-textColor text-xs truncate">
                      {seg.carrierCode} {seg.number}
                    </span>
                    <div className="py-1 px-2 text-xs border border-gray-300 rounded-full bg-transparent truncate">
                      {list.dictionaries.aircraft[seg.aircraft.code]}
                    </div>
                  </div>
                  <div className="border border-gray-300 border-t-0 p-4 flex items-center justify-between">
                    <div>
                      <div className="text-base lg:text-xl font-semibold text-textColor">
                        {getHourFromAPI(seg.departure.at)}
                      </div>
                      <div className="text-xs lg:text-sm text-textColor font-medium">
                        {getDateFromAPI(seg.departure.at)}
                      </div>
                      <div className="text-xs lg:text-sm text-textColor font-normal">
                        Nhà ga khởi hành {seg.departure.terminal}
                      </div>
                      <div className="text-xs lg:text-sm text-textColor font-normal">
                        {getCountryAirport(seg.departure.iataCode)}
                      </div>
                    </div>
                    <div className="relative">
                      <div className="text-center text-xs lg:text-sm font-medium">
                        {getDurationFromAPI(seg.duration)}
                      </div>
                      <div className="md:w-10 lg:w-24 h-1 bg-blueColor absolute left-1/2 -translate-x-1/2"></div>
                    </div>
                    <div>
                      <div className="text-base lg:text-xl font-semibold text-textColor">
                        {getHourFromAPI(seg.arrival.at)}
                      </div>
                      <div className="text-xs lg:text-sm text-textColor font-medium">
                        {getDateFromAPI(seg.arrival.at)}
                      </div>
                      <div className="text-xs lg:text-sm text-textColor font-normal">
                        Nhà ga khởi hành {seg.arrival.terminal}
                      </div>
                      <div className="text-xs lg:text-sm text-textColor font-normal">
                        {getCountryAirport(seg.arrival.iataCode)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className="px-5 pb-2 flex items-center flex-wrap gap-2">
            <span className="flex gap-1">
              <span className="text-sm">{t("flight.baggage")}:</span>
              <span className="text-sm font-semibold">{item.travelerPricings[0].travelerType}</span>
            </span>
            <span className="flex gap-1">
              <span className="text-sm">{t("flight.quantity")}:</span>
              <span className="text-sm font-semibold">
                {item.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity ||
                  `${item.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weight}kg`}
              </span>
            </span>
            <span className="flex gap-1">
              <span className="text-sm">{t("flight.cabin")}:</span>
              <span className="text-sm font-semibold">
                {item.travelerPricings[0].fareDetailsBySegment[0].cabin}
              </span>
            </span>
            <span className="flex gap-1">
              <span className="text-sm">Class:</span>
              <span className="text-sm font-semibold">
                {item.travelerPricings[0].fareDetailsBySegment[0].class}
              </span>
            </span>
          </div>
          <div className="px-5 pb-2 flex items-center gap-2">
            <span className="text-sm">{t("flight.lastDateTicket")}:</span>
            <span className="text-sm font-semibold">{item.lastTicketingDate}</span>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const FlightItem = memo(FlightItemInner)
export default FlightItem
// khi scroll window thì state thay đổi dẫn đến nguyên component cha FlightItem re-render kéo theo component con re-render liên tục -> giải pháp là dùng memo (tránh re-render khi không cần thiết)
