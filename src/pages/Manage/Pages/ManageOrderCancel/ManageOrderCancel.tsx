import { useMemo, useState } from "react"
import { Helmet } from "react-helmet-async"
import { ResponseFlightManage } from "src/types/flight.type"
import ManageItem from "../../Components/ManageItem"
import { Link } from "react-router-dom"
import { path } from "src/constant/path"

export default function ManageOrderCancel() {
  const dataLS = localStorage.getItem("listCancel") as string
  const data = JSON.parse(dataLS) as ResponseFlightManage[]

  const [searchText, setSearchText] = useState("")

  const filterList = useMemo(
    () =>
      data &&
      data.filter(
        (item) =>
          item.data.flightOffers[0].itineraries[0].segments[0].departure.iataCode
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          item.data.flightOffers[0].itineraries[0].segments[
            item.data.flightOffers[0].itineraries[0].segments.length - 1
          ].arrival.iataCode
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          item.data.flightOffers[0].itineraries[0].segments[0].departure.at
            .toLowerCase()
            .includes(searchText.toLowerCase())
      ),
    [data, searchText]
  )

  return (
    <div>
      <Helmet>
        <title>Quản lý vé</title>
        <meta name="description" content="Quản lý chuyến bay - Booking." />
      </Helmet>

      <>
        <div className="flex items-center justify-between bg-[#fff] rounded-lg p-4 border border-gray-300">
          <h1 className="text-xl text-textColor font-medium">Đơn đã hủy ({data?.length || 0})</h1>
          <div className="py-2 px-4 hidden md:flex items-center gap-2 bg-gray-200 w-[300px] rounded-full">
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
                <ManageItem item={item} />
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
