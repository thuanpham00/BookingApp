import { useMemo } from "react"
import usePriceTraveller from "src/hooks/usePriceTraveller"
import { TypeFlightOrderResponse, TypeFlightPriceResponse } from "src/types/flight.type"
import { formatCurrency } from "src/utils/utils"

interface Props {
  data: TypeFlightOrderResponse | TypeFlightPriceResponse
}

export default function PriceTraveler({ data }: Props) {
  const { priceTraveller: priceAdult } = usePriceTraveller(data, "ADULT")
  const { priceTraveller: priceChild } = usePriceTraveller(data, "CHILD")
  const { priceTraveller: priceInfant } = usePriceTraveller(data, "HELD_INFANT")
  const priceTotal = useMemo(() => {
    return data?.data.flightOffers[0].travelerPricings.reduce(
      (result, current) => result + Number(current.price.total),
      0
    )
  }, [data])

  const { quantityOfTraveller } = usePriceTraveller(data)

  return (
    <div className="bg-[#fff] p-4 shadow-md rounded-lg">
      <span className="text-base mb-4 block font-medium">Phân tích giá</span>

      {data?.data.flightOffers[0].travelerPricings.find(
        (item) => item.travelerType === "ADULT"
      ) && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">Người lớn</span>
            <div className="flex gap-1 text-sm font-medium">
              <span>
                {priceAdult?.total}
                {" đ"}
              </span>
              <span>x</span>
              <span>{quantityOfTraveller.adult}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-sm font-normal">Giá gốc</span>
            <span className="font-normal text-sm mb-1 block">
              {priceAdult?.base}
              {" đ"}
            </span>
          </div>
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-sm font-normal">Thuế và phí</span>
            <span className="font-normal text-sm mb-1 block">
              {priceAdult?.fee}
              {" đ"}
            </span>
          </div>
        </div>
      )}

      {data?.data.flightOffers[0].travelerPricings.find(
        (item) => item.travelerType === "CHILD"
      ) && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">Trẻ em</span>
            <div className="flex gap-1 text-sm font-medium">
              <span>
                {priceChild?.total}
                {" đ"}
              </span>
              <span>x</span>
              <span>{quantityOfTraveller.child}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-sm font-normal">Giá gốc</span>
            <span className="font-normal text-sm mb-1 block">
              {priceChild?.base}
              {" đ"}
            </span>
          </div>
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-sm font-normal">Thuế và phí</span>
            <span className="font-normal text-sm mb-1 block">
              {priceChild?.fee}
              {" đ"}
            </span>
          </div>
        </div>
      )}

      {data?.data.flightOffers[0].travelerPricings.find(
        (item) => item.travelerType === "HELD_INFANT"
      ) && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">Em bé</span>
            <div className="flex gap-1 text-sm font-medium">
              <span>
                {priceInfant?.total}
                {" đ"}
              </span>
              <span>x</span>
              <span>{quantityOfTraveller.infant}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-sm font-normal">Giá gốc</span>
            <span className="font-normal text-sm mb-1 block">
              {priceInfant?.base}
              {" đ"}
            </span>
          </div>
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-sm font-normal">Thuế và phí</span>
            <span className="font-normal text-sm mb-1 block">
              {priceInfant?.fee}
              {" đ"}
            </span>
          </div>
        </div>
      )}

      <div className="mt-2 border-t border-t-gray-300 py-2 flex items-center justify-between">
        <span className="text-sm font-medium">Giảm giá</span>
        <span className="text-sm font-medium">0đ</span>
      </div>
      <div className="mt-2 border-t border-t-gray-300 py-2 flex items-center justify-between">
        <span className="text-sm font-medium">Phí xử lý</span>
        <span className="text-sm font-medium text-[#32a923] capitalize">miễn phí</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-base block font-medium">Tổng cộng</span>
        <span className="text-xl font-medium text-red-600">
          {formatCurrency(priceTotal)}
          {" đ"}
        </span>
      </div>
    </div>
  )
}
