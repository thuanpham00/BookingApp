import {
  formatCurrency,
  getCountryAirport,
  getDateFromAPI,
  getDurationFromAPI,
  getHourFromAPI
} from "src/utils/utils"
import iconFlightRed from "src/img/Flight/iconFlightRed.webp"
import backgroundTicker from "src/img/Flight/Icon-vé-máy-bay.png"
import { TypeFlightManageResponse } from "src/types/flight.type"
import { useState } from "react"
import ticket from "src/img/Flight/ticket-flight.png"
import { useTranslation } from "react-i18next"

interface Props {
  item: TypeFlightManageResponse
  children?: React.ReactNode
}

export default function ManageItem({ item, children }: Props) {
  const { t } = useTranslation("manage")
  const [showFlightDetail, setShowFlightDetail] = useState(false)

  const handleDetailFlight = () => {
    setShowFlightDetail((prev) => !prev)
  }

  return (
    <div className="relative">
      <div
        style={{
          backgroundImage: `url(${backgroundTicker})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100px",
          width: "150px"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"
      ></div>
      <div className={`p-4 pb-2 border border-gray-300 bg-white rounded-lg mb-2`}>
        <div>
          <div className="flex items-center justify-between">
            <span className="p-2 bg-[#edf0f9] text-xs rounded-md">
              {item.data.flightOffers[0].type === "flight-offer" ? `${t("manage.flight")}` : "Khác"}
            </span>
            <div className="flex items-center gap-2">
              <div className="text-base text-textColor font-semibold">
                x{item.data.travelers.length}
              </div>
              <img src={ticket} alt="ticket" className="w-10 h-10" />
            </div>
          </div>
          <div className="flex md:flex-row flex-col items-start md:items-center justify-between">
            <div className="mt-2">
              {item.data.flightOffers[0].itineraries.map((item2, index2) => (
                <div key={index2} className="pt-2">
                  <div className="flex items-center gap-2">
                    <div className="text-base font-medium">
                      {getCountryAirport(item2.segments[0].departure.iataCode)}
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-3 h-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </div>
                    <div className="text-base font-medium">
                      {getCountryAirport(
                        item2.segments[item2.segments.length - 1].arrival.iataCode
                      )}
                    </div>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <img src={iconFlightRed} alt="icon" className="w-6 h-6" />
                    <span>{getDateFromAPI(item2.segments[0].departure.at)}</span>
                    <div className="text-base font-medium text-textColor">
                      {getHourFromAPI(item2.segments[0].departure.at)}
                    </div>
                    <div className="w-4 h-[1px] bg-textColor"></div>
                    <div className="text-base font-medium text-textColor">
                      {getHourFromAPI(item2.segments[item2.segments.length - 1].arrival.at)}
                    </div>
                  </div>
                  <div className="mt-1 flex items-center gap-1 pb-2">
                    <span className="block text-gray-500 text-xs font-medium">
                      {item.data.flightOffers[0].travelerPricings[0].fareDetailsBySegment[0].cabin}
                    </span>
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-500 text-sm">
                      {item2.segments.length === 1 && (
                        <div>{getDurationFromAPI(item2.segments[0].duration)}</div>
                      )}

                      {item2.segments.length !== 1 && (
                        <div>
                          {(() => {
                            const durationHour1 = getDurationFromAPI(
                              item2.segments[0].duration
                            ).split(" giờ ")[0]
                            const durationHour2 = getDurationFromAPI(
                              item2.segments[item2.segments.length - 1].duration
                            ).split(" giờ ")[0]

                            const durationMinute1 = getDurationFromAPI(item2.segments[0].duration)
                              .split(" giờ ")[1]
                              .split(" phút")[0]

                            const durationMinute2 = getDurationFromAPI(
                              item2.segments[item2.segments.length - 1].duration
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
                    <div>
                      {item2.segments[0].numberOfStops === 0 && item2.segments.length === 1 ? (
                        <div className="flex items-center gap-2 text-center text-gray-500 text-sm">
                          <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                          <span>{t("manage.nonStop")}</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-left md:text-right text-sm">
              <span>{t("manage.info")}:</span>
              <span className="ml-1">{item.data.contacts[0].addresseeName.firstName}</span>
              <div>
                <span className="block text-sm font-normal text-gray-500">
                  {item.data.contacts[0].emailAddress}
                </span>
                <span className="block text-sm font-normal text-gray-500">
                  +{item.data.contacts[0].phones[0].countryCallingCode}{" "}
                  {item.data.contacts[0].phones[0].number}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-t-gray-300">
          <div>
            <div className="text-base lg:text-lg font-semibold">
              {formatCurrency(Number(item.data.flightOffers[0].price.total))}đ
            </div>
            <span className="text-sm text-gray-500">{t("manage.fee")}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={handleDetailFlight}
              className="text-blueColor text-sm hover:underline hover:text-blueColor/80 duration-200"
            >
              {showFlightDetail ? `${t("manage.hidden")}` : `${t("manage.detail")}`}
            </button>
            {children}
          </div>
        </div>

        <div
          className={`${showFlightDetail ? "h-auto block" : "h-0 hidden"} ease-linear w-full transition-all duration-200 mt-2`}
        >
          {/* các hành trình bay render ra luôn */}
          {item.data.flightOffers[0].itineraries.map((detail, index) => (
            <div className="w-full flex flex-col md:flex-row" key={index}>
              {detail.segments.map((seg, indexSeg) => (
                <div key={indexSeg} className="flex-1">
                  <div className="border border-gray-300 p-4 flex items-center justify-between">
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
          <div className="pt-2 flex items-center flex-wrap gap-2">
            <span className="flex gap-1">
              <span className="text-sm">{t("manage.baggage")}:</span>
              <span className="text-sm font-semibold">
                {item.data.flightOffers[0].travelerPricings[0].travelerType}
              </span>
            </span>
            <span className="flex gap-1">
              <span className="text-sm">{t("manage.quantity")}:</span>
              <span className="text-sm font-semibold">
                {item.data.flightOffers[0].travelerPricings[0].fareDetailsBySegment[0]
                  .includedCheckedBags.quantity ||
                  `${item.data.flightOffers[0].travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity}kg`}
              </span>
            </span>
            <span className="flex gap-1">
              <span className="text-sm">{t("manage.cabin")}:</span>
              <span className="text-sm font-semibold">
                {item.data.flightOffers[0].travelerPricings[0].fareDetailsBySegment[0].cabin}
              </span>
            </span>
            <span className="flex gap-1">
              <span className="text-sm">Class:</span>
              <span className="text-sm font-semibold">
                {item.data.flightOffers[0].travelerPricings[0].fareDetailsBySegment[0].class}
              </span>
            </span>
          </div>

          <div className="mt-2">
            <span className="text-sm font-medium mb-2 block">
              {t("manage.quantityTraveler")}: {item.data.travelers.length}
            </span>
            <span className="block text-sm font-medium">{t("manage.infoTraveler")}:</span>
            <div className="text-sm">
              {item.data.travelers.map((traveler, index) => (
                <div key={index} className="flex items-center gap-2 my-2">
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

                  <span>
                    {traveler.name.lastName} {traveler.name.firstName}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-black/80"></div>
                  <span>{traveler.gender}</span>
                  <div className="w-1 h-1 rounded-full bg-black/80"></div>
                  <span>{traveler.dateOfBirth}</span>
                  <div className="w-1 h-1 rounded-full bg-black/80"></div>
                  <span>{traveler.documents[0].nationality || "VN"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
