/* eslint-disable @typescript-eslint/no-explicit-any */
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { flightApi } from "src/apis/flight.api"
import { path } from "src/constant/path"
import { AppContext } from "src/context/useContext"
import useQueryParam from "src/hooks/useQueryParam"
import useScrollHeader from "src/hooks/useScrollHeader"
import { TypeFlightOrderResponse } from "src/types/flight.type"
import { formatCurrency } from "src/utils/utils"
import { motion } from "framer-motion"
import { ConfigProvider, Steps } from "antd"
import axios from "axios"
import { baseURL } from "src/constant/http"

export default function PaymentSuccess() {
  const { t } = useTranslation("flight")
  const { uuid, refetchCartCount } = useContext(AppContext)
  const { showHeader } = useScrollHeader(200)
  const paramsUrl = useQueryParam()

  const dataLS = localStorage.getItem("detailPaymentData") as string
  const data = JSON.parse(dataLS) as TypeFlightOrderResponse
  const uuid_ticket = data.uuid_ticket
  const idFlight = data?.data.id

  localStorage.removeItem("flightPriceData")

  useQuery({
    queryKey: ["flightOrderManage", idFlight],
    enabled: Boolean(idFlight && uuid && uuid_ticket),
    queryFn: async () => {
      const res = await flightApi.flightManagement(idFlight)

      // Thử xóa khỏi giỏ hàng, nếu lỗi (vd: không có trong giỏ) thì bỏ qua
      try {
        await axios.delete(`${baseURL}/cart`, {
          data: { uuid, uuid_ticket }
        })
      } catch (err: any) {
        console.warn("Delete cart failed:", err)
      } finally {
        refetchCartCount()
      }

      // Vẫn tiến hành lưu purchase; bỏ qua nếu server báo đã tồn tại
      try {
        await axios.post(`${baseURL}/purchase`, {
          data: { ...res.data, uuid_ticket },
          uuid
        })
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response?.status === 409) {
          console.info("Purchase already exists, skipping.")
        } else {
          console.warn("Create purchase failed:", err)
          // Không throw để không làm hỏng UI thành công thanh toán
        }
      }

      return res
    },
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000
  })

  return (
    <div>
      <Helmet>
        <title>{t("flight.bookingFlight")}</title>
        <meta name="description" content={`${t("flight.bookingFlight")} - Booking.`} />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
      >
        <div
          className={`w-full bg-blueColor ${showHeader ? "fixed top-0 left-1/2 -translate-x-1/2" : "absolute top-0 left-1/2 -translate-x-1/2"} z-50 transition-all ease-linear duration-1000`}
        >
          <div className="container">
            <div className="py-4 px-1 grid grid-cols-12 items-center">
              <div className="col-span-12 md:col-span-5">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl text-whiteColor font-semibold">
                    {t("flight.doneBuyFlight2")}
                  </h1>
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="white"
                      className="h-4 w-4"
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
              <div className="hidden col-span-7 items-center md:flex flex-col">
                <ConfigProvider
                  theme={{
                    components: {
                      Steps: {
                        colorPrimary: "#3b82f6", // Màu xanh chính cho icon + line
                        colorPrimaryBorder: "#3b82f6", // Viền xanh
                        colorText: "#fff", // Màu chữ trắng
                        colorTextLabel: "#fff",
                        colorTextDescription: "#fff",
                        colorSplit: "#3b82f6", // Màu line giữa các step
                        colorTextDisabled: "#000" // step chưa active cũng trắng
                      }
                    }
                  }}
                >
                  <Steps
                    size="small"
                    current={3}
                    items={[
                      {
                        title: t("flight.spanFlight1")
                      },
                      {
                        title: t("flight.spanFlight2")
                      },
                      {
                        title: t("flight.spanFlight3")
                      }
                    ]}
                  />
                </ConfigProvider>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full absolute top-20 md:top-32 lg:top-20 left-1/2 -translate-x-1/2">
          <div className="container">
            <div className="flex items-center justify-center">
              <div className="mt-4 w-[400px] flex flex-col items-center justify-center pt-8 pb-8 px-8 shadow-lg border border-gray-300 bg-white rounded-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#2fc867"
                    className="h-16 w-16"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <h2 className="my-2 text-base text-textColor font-medium">
                  {t("flight.paymentSuccess")}
                </h2>
                <div className="text-center font-semibold text-xl text-blueColor">
                  -
                  {formatCurrency(
                    Number(paramsUrl.vnp_Amount.slice(0, paramsUrl.vnp_Amount.length - 2))
                  )}
                  đ
                </div>
                <span className="text-gray-500">{paramsUrl.vnp_PayDate}</span>

                <div className="my-8 bg-gray-300 w-full h-[1px]"></div>

                <div className="w-full">
                  <div className="text-base flex items-center justify-between mb-1">
                    <span className="text-gray-500">{t("flight.codeBill")}:</span>
                    <span className="text-textColor">{paramsUrl.vnp_TxnRef}</span>
                  </div>
                  <div className="text-base flex items-center justify-between mb-1">
                    <span className="text-gray-500">{t("flight.typeBill")}:</span>
                    <span className="text-textColor">{paramsUrl.vnp_CardType}</span>
                  </div>
                  <div className="text-base flex items-center justify-between mb-1">
                    <span className="text-gray-500">{t("flight.nameBank")}:</span>
                    <span className="text-textColor">{paramsUrl.vnp_BankCode}</span>
                  </div>
                  <div className="text-base flex items-center justify-between mb-1">
                    <span className="text-gray-500">{t("flight.describe")}:</span>
                    <span className="text-textColor">{paramsUrl.vnp_OrderInfo}</span>
                  </div>
                  <div className="text-base flex items-center justify-between mb-1">
                    <span className="text-textColor font-medium">
                      {t("flight.totalPrice")} (đ):
                    </span>
                    <span className="text-blueColor font-semibold">
                      {formatCurrency(
                        Number(paramsUrl.vnp_Amount.slice(0, paramsUrl.vnp_Amount.length - 2))
                      )}
                      đ
                    </span>
                  </div>
                </div>

                <Link
                  to={path.flight}
                  className="mt-4 w-full bg-blueColor p-2 text-center text-white rounded-full hover:opacity-75 duration-200 flex items-center justify-center gap-2"
                >
                  {t("flight.back")}
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
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
