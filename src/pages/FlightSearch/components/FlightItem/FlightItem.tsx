import {
  FlightPricingParams,
  ResponseFlightItem,
  ResponseFlightList,
  ResponseFlightPrice
} from "src/types/flight.type"
import iconFlightRed from "../../../../img/Flight/iconFlightRed.webp"
import iconFlight2 from "../../../../img/svg/flight.svg"
import luggage from "../../../../img/svg/luggage-baggage-svgrepo-com.svg"
import {
  exchangePrice,
  getCountryAirport,
  getDurationFromAPI,
  getHourFromAPI
} from "src/utils/utils"
import Button from "src/components/Button"
import { useMutation } from "@tanstack/react-query"
import { flightApi } from "src/apis/flight.api"
import { useEffect, useState } from "react"

interface Props {
  item: ResponseFlightItem
  list: ResponseFlightList
}

export default function FlightItem({ item, list }: Props) {
  // const [showPopup, setShowPopup] = useState(false)
  const [showDetail, setShowDetail] = useState(false)

  const handleDetailFlight = () => {
    setShowDetail((prev) => !prev)
  }

  const flightOffersPriceMutation = useMutation({
    mutationFn: (data: FlightPricingParams) => {
      return flightApi.flightOffersPrice(data)
    }
  })

  const handleClickPriceItem = (item: string) => {
    const body: FlightPricingParams = {
      data: {
        type: "flight-offers-pricing",
        flightOffers: [list.data[Number(item) - 1]]
      }
    }
    flightOffersPriceMutation.mutate(body, {
      onSuccess: () => {
        // setShowPopup(true)
      }
    })
  }
  const flightPrice = flightOffersPriceMutation.data?.data as ResponseFlightPrice

  useEffect(() => {
    if (flightPrice) {
      console.log(flightPrice)
    }
  }, [flightPrice])

  return (
    <div className="flex flex-col items-center w-full bg-[#fff] mb-4 shadow-sm">
      {/* /* chi tiết 1 chuyến bay sẽ gồm nhiều hành trình bay - 1 chiều hay 2 chiều */}
      {item.itineraries.map((detail, index) => (
        <div key={index} className="w-full border-b-[2px] border-b-gray-400">
          {/* 1 hành trình bay gồm nhiều đoạn bay - quá cảnh */}
          {detail.segments.map((flight) => (
            <div
              key={flight.id}
              className="grid grid-cols-12 items-center p-4 pt-10 border-b border-b-gray-200"
            >
              <div className="col-span-3 relative">
                <div className="absolute -top-10 left-0 bg-gray-200 rounded-full p-1 text-xs flex items-center justify-center gap-[2px]">
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

              <div className="col-span-2">
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-semibold text-textColor">
                    {getHourFromAPI(flight.departure.at)}
                  </div>
                  <div className="text-sm text-textColor">
                    {getCountryAirport(flight.departure.iataCode)}
                  </div>
                </div>
              </div>

              <div className="col-span-2 relative">
                <div className="text-center text-sm font-medium">
                  {getDurationFromAPI(flight.duration)}
                </div>
                <div className="w-24 h-1 bg-blueColor absolute left-1/2 -translate-x-1/2"></div>
                <div className="text-sm mt-1 text-center">
                  {flight.numberOfStops === 0 && item.itineraries[0].segments.length === 1
                    ? "Bay trực tiếp"
                    : ""}
                </div>
              </div>

              <div className="col-span-2">
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-semibold text-textColor">
                    {getHourFromAPI(flight.arrival.at)}
                  </div>
                  <div className="text-sm text-textColor">
                    {getCountryAirport(flight.arrival.iataCode)}
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <div className="flex items-start justify-center gap-2">
                  <img src={luggage} alt="luggage" className="mt-1 h-3 w-3" />

                  <div>
                    <span className="text-sm">Đã bao gồm hành lý:</span>
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

      <div className="w-full bg-[#f8f8f8] py-2 px-4">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={handleDetailFlight}
            className="text-blueColor text-sm hover:underline hover:text-blueColor/80 duration-200"
          >
            Chi tiết chuyến bay
          </button>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col items-end">
              <span className="text-lg font-semibold">
                {exchangePrice(item.travelerPricings[0].price.total)}đ
              </span>
              <span className="text-gray-500 text-sm">Giá vé dành cho người lớn</span>
            </div>
            <Button
              onClick={() => handleClickPriceItem(item.id)}
              nameButton="Giá chi tiết"
              className="px-3 py-2 bg-[#e5eef4] w-full text-blueColor text-sm rounded-full hover:bg-blueColor duration-200 font-semibold border border-blueColor hover:text-whiteColor"
            />
          </div>
        </div>
      </div>

      {showDetail && (
        <div className="w-full transition-all ease-linear duration-1000">
          <div className="p-4">
            <div className="p-2 border border-gray-300 flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6">
                  <img src={iconFlightRed} alt="icon" className="w-full h-full" />
                </div>
                <span className="block text-textColor text-xs font-semibold">
                  {list.dictionaries.carriers[item.itineraries[0].segments[0].carrierCode]}
                </span>
                <span className="block text-textColor text-xs">
                  {item.itineraries[0].segments[0].carrierCode}{" "}
                  {item.itineraries[0].segments[0].number}
                </span>
              </div>
              <div className="py-1 px-2 text-xs border border-gray-300 rounded-full bg-transparent">
                {list.dictionaries.aircraft[item.itineraries[0].segments[0].aircraft.code]}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
{
  /* <span className="block text-textColor text-xs font-semibold">
{list.dictionaries.carriers[flight.carrierCode]}
</span>
<span className="block text-textColor text-xs font-normal truncate w-[150px]">
{list.dictionaries.aircraft[flight.aircraft.code]}
</span> */
}
