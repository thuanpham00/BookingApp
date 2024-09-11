import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import useScrollHeader from "src/hooks/useScrollHeader"
import { TypeFlightOrderResponse } from "src/types/flight.type"
import icon2 from "src/img/Flight/FlightOrder/imp-info.webp"
import vnpay from "../../img/Flight/vnpay.jpg"
import Button from "src/components/Button"
import axios from "axios"
import PriceTraveler from "src/components/PriceTraveler"
import { useTranslation } from "react-i18next"

export default function FlightPayment() {
  const { t } = useTranslation("flight")

  const { showHeader } = useScrollHeader(200)
  const navigate = useNavigate()
  const handleBackPage = () => {
    navigate(-1)
  }

  const dataLS = localStorage.getItem("detailPaymentData") as string
  const data = JSON.parse(dataLS) as TypeFlightOrderResponse

  const handleSubmitPayment = async () => {
    try {
      const response = await axios.post("http://localhost:3000/create_payment_url", {
        amount: data.data.flightOffers[0].price.total, // số tiền
        orderDescription: "Thanh toán đơn hàng", // mô tả đơn hàng
        orderType: "billpayment", // loại đơn hàng
        language: "vn" // ngôn ngữ
      })

      window.location.href = response.data.url
    } catch (error) {
      console.error("Error creating payment URL:", error)
    }
  }

  return (
    <div>
      <Helmet>
        <title>{t("flight.bookingFlight")}</title>
        <meta name="description" content={`${t("flight.bookingFlight")} - Booking.`} />
      </Helmet>

      <div className="relative z-10">
        <div
          className={`w-full bg-blueColor ${showHeader ? "fixed top-0 left-1/2 -translate-x-1/2" : "absolute top-0 left-1/2 -translate-x-1/2"} z-50 transition-all ease-linear duration-1000`}
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

                  <div className="w-52 h-1 bg-blue-500"></div>

                  <div>
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                      2
                    </div>
                  </div>

                  <div className="w-52 h-1 bg-gray-400"></div>

                  <div>
                    <div className="w-5 h-5 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs">
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
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-full flex items-center justify-between">
                  <div className="text-white text-sm">{t("flight.spanFlight1")}</div>
                  <div className="text-white text-sm">{t("flight.spanFlight2")}</div>
                  <div className="text-white text-sm">{t("flight.spanFlight3")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full absolute top-20 md:top-24 lg:top-20 left-1/2 -translate-x-1/2">
          <div className="container">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 order-2 md:col-span-8 md:order-1">
                <div className="p-4 bg-[#fff] shadow-md rounded-md">
                  <span className="text-sm text-textColor font-medium">{t("flight.contact")}</span>
                  <div className="mt-2 flex items-start gap-2">
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
                    <div>
                      <span className="text-base font-medium">
                        {data?.data.contacts[0].addresseeName.firstName}
                      </span>
                      <span className="block text-sm font-normal text-gray-500">
                        {data?.data.contacts[0].emailAddress}
                      </span>
                      <span className="block text-sm font-normal text-gray-500">
                        +{data?.data.contacts[0].phones[0].countryCallingCode}{" "}
                        {data?.data.contacts[0].phones[0].number}
                      </span>
                    </div>
                  </div>

                  <span className="mt-2 block text-sm text-textColor font-medium">
                    {t("flight.spanFlight1")}
                  </span>
                  <div className="mt-2">
                    {data?.data.travelers.map((traveller, index) => (
                      <div key={index} className="mb-1 flex items-start gap-2">
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

                        <div>
                          <span className="text-sm font-normal">
                            {traveller.name.lastName} {traveller.name.firstName}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="py-4 px-2">
                  <div className="flex items-center gap-2">
                    <svg
                      width="1em"
                      height="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="blue"
                      className="w-6 h-6"
                    >
                      <path d="M2.491 16.534C1.073 13.051.671 8.823 1.266 3.855a2 2 0 0 1 1.508-1.704l8.5-2.093a2 2 0 0 1 .954 0l8.551 2.094a2 2 0 0 1 1.509 1.696c.617 4.966.227 9.196-1.188 12.685-1.501 3.7-4.464 6.158-8.8 7.333a2 2 0 0 1-1.052-.001c-4.303-1.18-7.252-3.637-8.757-7.331zm7.452-6.992v-.878c0-.935.758-1.694 1.694-1.694h.583c.936 0 1.694.759 1.694 1.694v.878H9.943zm5.971.338V8.664A3.694 3.694 0 0 0 12.22 4.97h-.583a3.694 3.694 0 0 0-3.694 3.694v1.07A2 2 0 0 0 6.8 11.542v4.357a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4.357c0-.692-.352-1.302-.886-1.662zM8.8 11.542h6v4.357h-6v-4.357zm3 2.428a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                    </svg>
                    <span className="text-sm text-blue-500 font-medium">
                      {t("flight.paymentSafe")}
                    </span>
                  </div>

                  <span className="mt-1 block text-sm text-textColor font-medium">
                    {t("flight.paymentDesc")}
                  </span>
                </div>

                <div className="flex justify-between p-4 bg-blue-200">
                  <div className="flex items-center gap-2">
                    <input type="radio" checked={true} readOnly />
                    <div>
                      <span className="text-sm text-blueColor">{t("flight.paymentTitle")}</span>
                      <span className="block text-xs text-blueColor">
                        {t("flight.paymentDesc2")}
                      </span>
                    </div>
                  </div>
                  <img src={vnpay} alt="vnpay" className="w-28 h-16" />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm w-[250px] md:w-[300px] lg:w-[500px]">
                    {t("flight.paymentDesc3")}{" "}
                    <span className="text-blueColor font-medium">{t("flight.paymentDesc4")}</span>{" "}
                    {t("flight.paymentDesc5")}{" "}
                    <span className="text-blueColor font-medium">{t("flight.paymentDesc6")}</span>{" "}
                    {t("flight.paymentDesc7")}
                  </div>
                  <Button
                    onClick={handleSubmitPayment}
                    nameButton={t("flight.paymentButton")}
                    className="px-4 py-4 rounded-md bg-blueColor w-full text-whiteColor text-base hover:bg-blueColor/80 duration-200 flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="ml-1 w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                  </Button>
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
