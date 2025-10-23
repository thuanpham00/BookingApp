/* eslint-disable @typescript-eslint/no-explicit-any */
import { Helmet } from "react-helmet-async"
import ManageItem from "../../Components/ManageItem/ManageItem"
import { useContext, useState } from "react"
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { flightApi } from "src/apis/flight.api"
import { toast } from "react-toastify"
import { AppContext } from "src/context/useContext"
import { Link } from "react-router-dom"
import { path } from "src/constant/path"
import useFilterManage from "src/hooks/useFilterManage"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Pagination } from "antd"
import axios from "axios"
import CancelFlightAlert from "src/components/CancelFlightAlert"
import { localhostURL } from "src/constant/http"

export default function ManageOrderSuccess() {
  const { t } = useTranslation("manage")

  const { uuid } = useContext(AppContext)
  const queryClient = useQueryClient()

  const { data: purchasedResponse } = useQuery({
    queryKey: ["purchasedTickets", uuid],
    queryFn: async () => {
      const res = await axios.get(`${localhostURL}/purchase/${uuid}`)
      if (res.data.success) {
        return res.data.data
      } else {
        toast.error("Không thể lấy danh sách vé đã mua", { autoClose: 1500 })
        return []
      }
    },
    enabled: !!uuid,
    staleTime: 2 * 60 * 1000, // 2 phút
    placeholderData: keepPreviousData
  })

  const data = purchasedResponse?.map((item: any) => item.data) || []
  const [searchText, setSearchText] = useState("")
  const filterList = useFilterManage(data, searchText)

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedList = filterList?.slice(startIndex, endIndex)

  const deleteFlightTicketMutation = useMutation({
    mutationFn: (id: string) => {
      return flightApi.flightDelete(id)
    }
  })

  const handleDeleteItemCart = (id: string, item: any) => {
    console.log(id, item)
    deleteFlightTicketMutation.mutate(id, {
      onSuccess: async () => {
        try {
          // 🟢 Gọi API lưu vé vào danh sách cancel
          const res = await axios.post(`${localhostURL}/purchase-cancel`, {
            uuid,
            data: item
          })

          if (res.data.success) {
            toast.success("Hủy vé thành công", {
              autoClose: 1500
            })
            queryClient.invalidateQueries({ queryKey: ["purchasedTickets", uuid] })
            queryClient.invalidateQueries({ queryKey: ["purchasedCancelTickets", uuid] })
          } else {
            toast.warning(res.data.message || "Không thể lưu vé hủy", { autoClose: 1500 })
          }
        } catch (error: any) {
          console.error("❌ Lỗi khi thêm vé hủy:", error)
          toast.error(error.response?.data?.message || "Lỗi khi lưu vé hủy vào danh sách", {
            autoClose: 1500
          })
        }
      }
    })
  }

  return (
    <div>
      <Helmet>
        <title>{t("manage.manageTicket")}</title>
        <meta name="description" content={`${t("manage.manageTicket")} - Booking.`} />
      </Helmet>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between bg-[#fff] rounded-lg p-4 border border-gray-300">
          <h1 className="text-xl text-textColor font-medium">
            {t("manage.titleTicketSuccess")} ({data?.length || 0})
          </h1>
          <div className="hidden py-2 px-4 md:flex items-center gap-2 bg-gray-200 w-[350px] rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="h-4 w-4 flex-shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <input
              type="text"
              placeholder={t("manage.inputSearchFilter")}
              className="bg-transparent flex-grow outline-none text-sm"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          {data?.length > 0 ? (
            <>
              {paginatedList.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ManageItem item={item}>
                    <CancelFlightAlert item={item} onConfirmCancel={handleDeleteItemCart} />
                  </ManageItem>
                </motion.div>
              ))}

              {filterList.length > pageSize && (
                <div className="flex justify-center my-4">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filterList.length}
                    showSizeChanger
                    pageSizeOptions={[5, 10, 20]}
                    onChange={(page, size) => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth" // 🔥 mượt mà hơn nhiều
                      })
                      setCurrentPage(page)
                      setPageSize(size)
                    }}
                    showTotal={(total, range) => `${range[0]}–${range[1]} / ${total}`}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="">
              <div className="flex flex-col items-center">
                <img
                  src="https://cdn6.agoda.net/images/kite-js/illustrations/athena/baggage/group.svg"
                  width="102px"
                  height="102px"
                  alt="baggage"
                />
                <h1 className="mt-8 text-center text-textColor font-semibold text-lg lg:text-2xl">
                  {t("manage.noTicket")}
                </h1>
                <h2 className="text-base mt-4 text-textColor">{t("manage.descNoTicket")}</h2>
                <Link
                  to={path.flight}
                  className="w-[200px] bg-blueColor p-4 mt-4 text-center text-whiteColor shadow-md rounded-full hover:opacity-75 duration-200"
                >
                  {t("manage.searchFlight")}
                </Link>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
