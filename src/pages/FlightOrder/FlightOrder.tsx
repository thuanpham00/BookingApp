import { useEffect, useMemo, useState } from "react"
import { Helmet } from "react-helmet-async"
import { countries } from "src/constant/flightSearch"
import { ResponseFlightPrice, TravellerType } from "src/types/flight.type"
import { produce } from "immer"
import {
  changeLanguageTraveller,
  getAirlines,
  getCountry,
  getDate,
  getDurationFromAPI,
  getHourFromAPI
} from "src/utils/utils"
import iconFlight from "src/img/Flight/iconFlightRed.webp"
import checkInBaggage from "src/img/FlightOrder/checkin_baggage_icon.webp"
import avatar1 from "src/img/FlightOrder/avatar1.webp"
import avatar2 from "src/img/FlightOrder/avatar2.webp"
import icon2 from "src/img/FlightOrder/imp-info.webp"
import banner from "src/img/FlightOrder/air-ticket.webp"
import { useNavigate } from "react-router-dom"
import FormProfile from "./Components/FormProfile"

export default function FlightOrder() {
  // xử lý header
  const navigate = useNavigate()
  const [showHeader, setShowHeader] = useState(false)
  const [scrollWindow, setScrollWindow] = useState(0)

  const handleScrollWindow = () => {
    const currentScrollY = window.scrollY
    setScrollWindow(currentScrollY)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrollWindow)

    return () => window.removeEventListener("scroll", handleScrollWindow)
  }, [])

  // nếu scrollWindow có thay đổi thì nó tham chiếu tới chạy lại hàm này
  useEffect(() => {
    if (scrollWindow > 200) {
      setShowHeader(true)
    } else {
      setShowHeader(false)
    }
  }, [scrollWindow])

  // xử lý back page
  const handleBackPage = () => {
    navigate(-1)
  }

  const dataLS = localStorage.getItem("flightPriceData") as string
  const data = JSON.parse(dataLS) as ResponseFlightPrice

  // xử lý form
  const [currentAdult, setCurrentAdult] = useState<number>(0)
  const [currentChild, setCurrentChild] = useState<number>(0)
  // const [currentInfant, setCurrentInfant] = useState<number>(0)

  const quantityOfTraveller = useMemo(() => {
    const count = { adult: 0, child: 0, infant: 0 }
    if (data) {
      data.data.flightOffers[0].travelerPricings.map((item) => {
        if (item.travelerType === "ADULT") {
          count.adult++
        } else if (item.travelerType === "CHILD") {
          count.child++
        } else if (item.travelerType === "HELD_INFANT") {
          count.infant++
        }
      })
    }
    return count
  }, [data])

  // cái này hay
  const [checkState, setCheckState] = useState<boolean[]>(Array(currentAdult).fill(true)) // khởi tạo 1 mảng trạng thái toàn true
  const [countAdult, setCountAdult] = useState(0)
  const [countChild, setCountChild] = useState(0)
  // const [countInfant, setCountInfant] = useState(0)

  const handleCheckTraveller =
    (type: string, index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "adult") {
        setCheckState(
          produce((draft) => {
            draft[index] = event.target.checked // đại diện checked previous
          })
        )
      } else if (type === "child") {
        setCheckState(
          produce((draft) => {
            draft[index] = event.target.checked // đại diện checked previous
          })
        )
        setCountChild((prevCount) => (event.target.checked ? prevCount + 1 : prevCount - 1))
      }
    }

  const handleAddTraveller = (type: string) => () => {
    if (type === "adult") {
      if (currentAdult < quantityOfTraveller.adult) {
        setCurrentAdult((prev) => prev + 1)
        setCountAdult((prev) => prev + 1)
      }
    } else if (type === "child") {
      setCurrentChild((prev) => prev + 1)
    }
  }

  // xử lý form
  const [travellers, setTravellers] = useState<TravellerType[]>([])

  const addTraveller = (newTravellers: TravellerType) => {
    setTravellers((prev) => [...prev, newTravellers])
  }

  useEffect(() => {
    if (travellers) {
      console.log(travellers)
      localStorage.setItem("travellerList", JSON.stringify(travellers))
    }
  }, [travellers])

  // const { handleSubmit } = useForm()

  // const onSubmit = handleSubmit((data) => {
  //   console.log(data)
  // })

  return (
    <div>
      <Helmet>
        <title>Đặt vé chuyến bay</title>
        <meta name="description" content="Đặt vé chuyến bay - Booking." />
      </Helmet>

      <div className="relative z-10">
        <div
          className={`w-full bg-[#003566] ${showHeader ? "fixed top-0 left-1/2 -translate-x-1/2" : "absolute top-0 left-1/2 -translate-x-1/2"} z-50 transition-all ease-linear duration-1000`}
        >
          <div className="container">
            <div className="py-4 px-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button aria-label="iconBack" onClick={handleBackPage}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                    />
                  </svg>
                </button>
                <h1 className="text-2xl text-whiteColor font-semibold">Hoàn tất đặt chỗ của bạn</h1>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="#FlightSummary"
                  className="text-gray-300 font-medium text-sm hover:underline duration-200"
                >
                  Tóm tắt chuyến bay
                </a>
                <div className="h-1 w-1 bg-whiteColor rounded-full"></div>
                <a
                  href="#InfoImportant"
                  className="text-gray-300 font-medium text-sm hover:underline duration-200"
                >
                  Thông tin quan trọng
                </a>
                <div className="h-1 w-1 bg-whiteColor rounded-full"></div>
                <a
                  href="#TravellerDetails"
                  className="text-gray-300 font-medium text-sm hover:underline duration-200"
                >
                  Thông tin chi tiết hành khách
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full absolute md:top-46 lg:top-20 left-1/2 -translate-x-1/2">
          <div className="container">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8">
                <div id="FlightSummary" className="p-4 bg-[#fff] shadow-md rounded-xl">
                  {data.data.flightOffers[0].itineraries.map((item, index) => (
                    <div
                      key={index}
                      className="relative p-4 mb-4 last:mb-0 rounded-sm border border-gray-300 shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <h2 className="text-xl text-textColor font-semibold">
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
                          <h2 className="text-xl text-textColor font-semibold">
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
                          KHÔNG HOÀN TIỀN
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="p-1 text-sm text-textColor font-medium bg-[#ffedd1]">
                          {getDate(item.segments[0].departure.at)}
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
                        <div key={indexDetail} className="my-4">
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
                                data.data.flightOffers[0].travelerPricings[0]
                                  .fareDetailsBySegment[0].cabin
                              }
                            </div>
                          </div>

                          <div className="mt-2 p-4 bg-[#f4f4f4]">
                            <div className="flex items-center gap-4">
                              <span className="text-base font-medium">
                                {getHourFromAPI(detail.departure.at)}
                              </span>
                              <div className="border border-gray-500 bg-white w-3 h-3 rounded-full"></div>
                              <div className="text-base font-medium">
                                {detail.departure.iataCode}
                                {" - "}
                                {getCountry(
                                  countries,
                                  data.dictionaries.locations[detail.departure.iataCode].countryCode
                                )}
                                , Nhà ga khởi hành: {detail.departure.terminal}
                              </div>
                            </div>

                            <div className="ml-[6.5%] flex items-center">
                              <div className="w-[2px] h-8 bg-gray-500"></div>
                              <span className="ml-6 w-[100px] text-sm">
                                {getDurationFromAPI(detail.duration)}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                              <span className="text-base font-medium">
                                {getHourFromAPI(detail.arrival.at)}
                              </span>
                              <div className="border border-gray-500 bg-white w-3 h-3 rounded-full"></div>
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
                                / Người lớn
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div id="InfoImportant" className="mt-4 p-4 bg-[#fff] shadow-md rounded-xl">
                  <h2 className="text-xl text-textColor font-semibold">Thông tin quan trọng</h2>
                  <div className="mt-6">
                    <div className="mt-2 flex items-center gap-2">
                      <img src={icon2} alt="icon" className="w-5 h-5" />
                      <h3 className="text-base text-textColor font-semibold">
                        {data.data.flightOffers[0].itineraries[0].segments[0].departure.iataCode}
                        {"-"}
                        {
                          data.data.flightOffers[0].itineraries[0].segments[
                            data.data.flightOffers[0].itineraries[0].segments.length - 1
                          ].arrival.iataCode
                        }
                        : Yêu cầu Visa quá cảnh
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mt-2 ml-2">
                      <div className="h-1 w-1 rounded-full bg-textColor"></div>
                      <span className="text-sm text-gray-600">
                        Vui lòng kiểm tra các yêu cầu về Quá cảnh/Visa trước khi bạn lên kế hoạch
                        cho chuyến đi của mình.
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="mt-2 flex items-center gap-2">
                      <img src={icon2} alt="icon" className="w-5 h-5" />
                      <h3 className="text-base text-textColor font-semibold">
                        {
                          data.data.flightOffers[0].itineraries[
                            data.data.flightOffers[0].itineraries.length - 1
                          ].segments[0].departure.iataCode
                        }
                        {"-"}
                        {
                          data.data.flightOffers[0].itineraries[
                            data.data.flightOffers[0].itineraries.length - 1
                          ].segments[data.data.flightOffers[0].itineraries[0].segments.length - 1]
                            .arrival.iataCode
                        }
                        : Yêu cầu Visa quá cảnh
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mt-2 ml-2">
                      <div className="h-1 w-1 rounded-full bg-textColor"></div>
                      <span className="text-sm text-gray-600">
                        Vui lòng kiểm tra các yêu cầu về Quá cảnh/Visa trước khi bạn lên kế hoạch
                        cho chuyến đi của mình.
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="mt-2 flex items-center gap-2">
                      <img src={icon2} alt="icon" className="w-5 h-5" />
                      <h3 className="text-base text-textColor font-semibold">
                        Chính sách vắng mặt
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mt-2 ml-2">
                      <div className="h-1 w-1 rounded-full bg-textColor"></div>
                      <span className="text-sm text-gray-600 w-full  max-w-[900px]">
                        Nếu hành khách không bắt đầu hành trình tiếp theo, toàn bộ mã đặt chỗ (PNR)
                        sẽ bị hủy tự động bởi hãng hàng không. Booking. không thể kiểm soát hoặc
                        cung cấp đặt chỗ thay thế trong trường hợp này. Hình phạt hủy chuyến sẽ áp
                        dụng theo quy định của hãng hàng không.
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="mt-2 flex items-center gap-2">
                      <img src={icon2} alt="icon" className="w-5 h-5" />
                      <h3 className="text-base text-textColor font-semibold">Vui lòng ghi chú</h3>
                    </div>
                    <div className="flex items-center gap-2 mt-2 ml-2">
                      <div className="h-1 w-1 rounded-full bg-textColor"></div>
                      <span className="text-sm text-gray-600 w-full  max-w-[900px]">
                        Hành khách đi bằng visa du lịch/thăm thân cần vé khứ hồi đã xác nhận.
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2 ml-2">
                      <div className="h-1 w-1 rounded-full bg-textColor"></div>
                      <span className="text-sm text-gray-600 w-full  max-w-[900px]">
                        Mang theo bằng chứng chỗ ở và đủ tiền chi trả ở nước đến.
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2 ml-2">
                      <div className="h-1 w-1 rounded-full bg-textColor"></div>
                      <span className="text-sm text-gray-600 w-full  max-w-[900px]">
                        Tuân thủ quy định kích thước hành lý của hãng hàng không, nếu không sẽ phải
                        trả thêm phí hoặc bị từ chối lên máy bay.
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="mt-2 flex items-center gap-2">
                      <img src={icon2} alt="icon" className="w-5 h-5" />
                      <h3 className="text-base text-textColor font-semibold">Yêu cầu Visa</h3>
                    </div>
                    <div className="flex items-center gap-2 mt-2 ml-2">
                      <div className="h-1 w-1 rounded-full bg-textColor"></div>
                      <span className="text-sm text-gray-600 w-full  max-w-[900px]">
                        Hộ chiếu còn hạn ít nhất 6 tháng từ ngày khởi hành.
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2 ml-2">
                      <div className="h-1 w-1 rounded-full bg-textColor"></div>
                      <span className="text-sm text-gray-600 w-full  max-w-[900px]">
                        Xuất trình bản sao cứng của visa nước ngoài tại quầy nhập cảnh.
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2 ml-2">
                      <div className="h-1 w-1 rounded-full bg-textColor"></div>
                      <span className="text-sm text-gray-600 w-full  max-w-[900px]">
                        Booking. không chịu trách nhiệm về thông tin visa. Kiểm tra chi tiết trước
                        khi đặt vé.
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="mt-2 flex items-center gap-2">
                      <img src={icon2} alt="icon" className="w-5 h-5" />
                      <h3 className="text-base text-textColor font-semibold">
                        Lưu ý về nguyên tắc
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mt-2 ml-2">
                      <div className="h-1 w-1 rounded-full bg-textColor"></div>
                      <span className="text-sm text-gray-600 w-full  max-w-[900px]">
                        Du khách tự chịu trách nhiệm đảm bảo đủ điều kiện nhập cảnh/quá cảnh. Kiểm
                        tra quy định du lịch trước khi đặt vé và bắt đầu hành trình.
                      </span>
                    </div>
                  </div>
                </div>

                <div id="TravellerDetails" className="my-4">
                  <h2 className="text-xl ml-1 text-textColor font-semibold">
                    Thông tin chi tiết của khách du lịch
                  </h2>
                  <div className="mt-2 px-2 py-4 text-sm text-textColor bg-[#e3fff9] flex items-center gap-2">
                    Giờ đây, nhiều khách du lịch có thể nhận được thông tin đặt phòng và các thông
                    báo khác chỉ bằng cách thêm thông tin liên hệ của họ!
                    <div className="text-sm text-whiteColor bg-green-500 px-3 py-1 rounded-full">
                      NEW
                    </div>
                  </div>
                  <div className="mt-4 p-2 bg-[#ffedd1] text-sm">
                    <strong>Xin hãy cẩn thận:</strong> Thông tin hành khách phải trùng khớp với hộ
                    chiếu hoặc giấy tờ tùy thân có ảnh của quý khách
                  </div>

                  {/* <form> */}
                  <div className="my-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={avatar2} alt="avatar" />
                        <span className="text-base text-textColor font-medium">
                          Người lớn (12 tuổi trở lên)
                        </span>
                        {currentAdult === quantityOfTraveller.adult && (
                          <div className="text-xs text-red-500">
                            Bạn đã chọn 2 vé cho{" "}
                            {changeLanguageTraveller(
                              data.data.flightOffers[0].travelerPricings[0].travelerType
                            )}
                            . Loại bỏ trước khi thêm một cái mới.
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-base text-textColor font-medium">{countAdult}</span>
                        <span className="text-base text-textColor font-medium">
                          /{quantityOfTraveller.adult}
                        </span>
                        <span className="ml-1 text-base text-gray-500">Thêm</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      {currentAdult === 0 ? (
                        <div className="p-4 bg-white shadow-md border-b border-b-gray-300">
                          <span className="text-sm text-gray-500">
                            Bạn chưa thêm bất kỳ người lớn nào vào danh sách
                          </span>
                        </div>
                      ) : (
                        Array(currentAdult)
                          .fill(0)
                          .map((_, index) => (
                            <div
                              key={index}
                              className="mb-4 w-full gap-2 relative bg-white border-gray-300 border shadow-lg rounded-lg px-6 py-3"
                            >
                              <input
                                type="checkbox"
                                className="w-4 h-4"
                                id={String(index)}
                                checked={checkState[index]}
                                onChange={handleCheckTraveller("adult", index)}
                              />
                              <label htmlFor={String(index)} className="absolute left-12">
                                Người lớn {index + 1}
                              </label>
                              <div className="FormProfile">
                                <FormProfile addOnTraveller={addTraveller} index={index} />
                              </div>
                            </div>
                          ))
                      )}
                    </div>

                    <div className="mt-2 p-4 bg-white">
                      <button
                        type="button"
                        onClick={handleAddTraveller("adult")}
                        className="text-sm text-blue-500 uppercase flex items-center gap-2"
                      >
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
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                        Thêm thông tin hành khách (người lớn) mới
                      </button>
                    </div>
                  </div>

                  <div className="my-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={avatar1} alt="avatar" />
                        <span className="text-base text-textColor font-medium">
                          Trẻ em (Từ 2 - 12 tuổi)
                        </span>
                      </div>
                      <div>
                        <span className="text-base text-textColor font-medium">{countChild}</span>
                        <span className="text-base text-textColor font-medium">
                          /{quantityOfTraveller.child}
                        </span>
                        <span className="ml-1 text-base text-gray-500">Thêm</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      {currentChild === 0 ? (
                        <div className="p-4 bg-white shadow-md border border-gray-300">
                          <span className="text-sm text-gray-500">
                            Bạn chưa thêm bất kỳ người lớn nào vào danh sách
                          </span>
                        </div>
                      ) : (
                        Array(currentChild)
                          .fill(0)
                          .map((_, index) => (
                            <div key={index}>
                              <div className="p-4 first:border-b-0 last:border-b last:border border border-gray-300 flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-4 h-4"
                                  id={String(index)}
                                  checked={checkState[index]}
                                  onChange={handleCheckTraveller("child", index)}
                                />
                                <span>Trẻ em {index + 1}</span>
                              </div>
                              <div className="p-4 border-gray-300 border">thuan</div>
                            </div>
                          ))
                      )}
                    </div>

                    <div className="p-4 bg-white shadow-md border border-gray-300 border-t-0">
                      <button
                        onClick={handleAddTraveller("child")}
                        className="text-sm text-blue-500 uppercase flex items-center gap-2"
                      >
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
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                        Thêm hành khách (trẻ em) mới
                      </button>
                    </div>
                  </div>

                  <div className="my-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={avatar1} alt="avatar" />
                        <span className="text-base text-textColor font-medium">
                          Em bé (Dưới 2 tuổi)
                        </span>
                      </div>
                      <div>
                        <span className="text-base text-textColor font-medium">0</span>
                        <span className="text-base text-textColor font-medium">
                          /{quantityOfTraveller.infant}
                        </span>
                        <span className="ml-1 text-base text-gray-500">Thêm</span>
                      </div>
                    </div>
                  </div>

                  {/* <Button
                      type="submit"
                      classNameWrapper="flex justify-end"
                      nameButton="Tiếp tục"
                      className="py-3 bg-blueColor w-[200px] text-whiteColor text-lg rounded-sm hover:bg-blueColor/80 duration-200 "
                    /> */}
                  {/* </form> */}
                </div>
              </div>

              <div className="col-span-4">
                <div className="sticky left-0 top-[68px]">
                  <div className="h-[300px] bg-[#fff] shadow-md px-4 rounded">banner</div>
                  <div className="w-full h-[380px] my-4">
                    <img src={banner} alt="banner" className="w-full h-full" />
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
