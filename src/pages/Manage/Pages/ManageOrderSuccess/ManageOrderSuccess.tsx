import { Helmet } from "react-helmet-async"
import { TypeFlightManageResponse } from "src/types/flight.type"
import ManageItem from "../../Components/ManageItem/ManageItem"
import { useContext, useEffect, useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "src/components/ui/alert-dialog"
import { useMutation } from "@tanstack/react-query"
import { flightApi } from "src/apis/flight.api"
import { toast } from "react-toastify"
import { setCancelListToLS, setPurchaseListToLS } from "src/utils/auth"
import { AppContext } from "src/context/useContext"
import { Link } from "react-router-dom"
import { path } from "src/constant/path"
import useFilterManage from "src/hooks/useFilterManage"

export default function ManageOrderSuccess() {
  const { listPurchased, setListPurchased, listCancel, setListCancel } = useContext(AppContext)
  const dataLS = localStorage.getItem("listPurchased") as string
  const data = JSON.parse(dataLS) as TypeFlightManageResponse[]
  const [searchText, setSearchText] = useState("")
  const filterList = useFilterManage(data, searchText)

  const deleteFlightTicketMutation = useMutation({
    mutationFn: (id: string) => {
      return flightApi.flightDelete(id)
    }
  })

  const [flag, setFlag] = useState(false)
  const handleDeleteItemCart = (id: string) => {
    deleteFlightTicketMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Hủy đơn hàng thành công")
        const itemDeleted = data.find((item) => item.data.id === id)
        if (itemDeleted) {
          setListCancel((prev) => [...prev, itemDeleted])

          setListPurchased((prevPurchased) => prevPurchased.filter((item) => item.data.id !== id))

          setFlag(true)
        }
      }
    })
  }

  useEffect(() => {
    setPurchaseListToLS(listPurchased)
  }, [listPurchased])

  useEffect(() => {
    if (flag) {
      // nếu có delete thì nó mới chạy hàm này
      setCancelListToLS(listCancel)
      setFlag(false)
    }
  }, [flag, listCancel])

  return (
    <div>
      <Helmet>
        <title>Quản lý vé</title>
        <meta name="description" content="Quản lý chuyến bay - Booking." />
      </Helmet>

      <>
        <div className="flex items-center justify-between bg-[#fff] rounded-lg p-4 border border-gray-300">
          <h1 className="text-xl text-textColor font-medium">
            Đơn đã mua của Quý khách ({data?.length || 0})
          </h1>
          <div className="hidden py-2 px-4 md:flex items-center gap-2 bg-gray-200 w-[300px] rounded-full">
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
              className="bg-transparent flex-grow outline-none"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          {data?.length > 0 ? (
            filterList.map((item, index) => (
              <div key={index}>
                <ManageItem item={item}>
                  <AlertDialog>
                    <AlertDialogTrigger
                      aria-label="buttonDelete"
                      className="bg-red-600 text-white py-2 px-4 rounded text-sm hover:underline hover:bg-red-500 duration-200"
                    >
                      Hủy vé
                    </AlertDialogTrigger>
                    <AlertDialogContent className="p-4 w-[400px] max-h-[150px]">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-base text-center font-medium">
                          Quý khách có muốn hủy vé hoặc đơn hàng này không?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="w-full">
                        <AlertDialogCancel className="w-[50%] border-blueColor border">
                          Không, quay lại
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="w-[50%] bg-blueColor"
                          onClick={() => handleDeleteItemCart(item.data.id)}
                        >
                          Có, loại bỏ nó
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </ManageItem>
              </div>
            ))
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
                  Quý khách không có đơn hàng nào sắp tới
                </h1>
                <h2 className="text-base mt-4 text-textColor">
                  Hãy mua vé chuyến bay cho chuyến đi tiếp theo
                </h2>
                <Link
                  to={path.flight}
                  className="w-[200px] bg-blueColor p-4 mt-4 text-center text-whiteColor shadow-md rounded-full hover:opacity-75 duration-200"
                >
                  Tìm kiếm chuyến bay
                </Link>
              </div>
            </div>
          )}
        </div>
      </>
    </div>
  )
}
