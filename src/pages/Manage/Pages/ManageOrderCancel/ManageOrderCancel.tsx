/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react"
import { Helmet } from "react-helmet-async"
import ManageItem from "../../Components/ManageItem"
import { Link } from "react-router-dom"
import { path } from "src/constant/path"
import useFilterManage from "src/hooks/useFilterManage"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Pagination } from "antd"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { AppContext } from "src/context/useContext"
import axios from "axios"
import { toast } from "react-toastify"
import { baseURL } from "src/constant/http"

export default function ManageOrderCancel() {
  const { t } = useTranslation("manage")

  const { uuid } = useContext(AppContext)

  const { data: purchasedResponse } = useQuery({
    queryKey: ["purchasedCancelTickets", uuid],
    queryFn: async () => {
      const res = await axios.get(`${baseURL}/purchase-cancel/${uuid}`)
      if (res.data.success) {
        return res.data.data
      } else {
        toast.error("Không thể lấy danh sách vé đã hủy", { autoClose: 1500 })
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

  return (
    <div>
      <Helmet>
        <title>{t("manage.manageTicket")}</title>
        <meta name="description" content={`${t("manage.manageTicket")} - Booking.`} />
      </Helmet>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between bg-[#fff] rounded-lg p-4 border border-gray-300">
          <h1 className="text-xl text-textColor font-medium">
            {t("manage.titleTicketCancel")} ({data?.length || 0})
          </h1>
          <div className="py-2 px-4 hidden md:flex items-center gap-2 bg-gray-200 w-[350px] rounded-full">
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
              placeholder="Tìm kiếm theo mã sân bay hoặc ngày đi"
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
                  <ManageItem item={item} />
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
