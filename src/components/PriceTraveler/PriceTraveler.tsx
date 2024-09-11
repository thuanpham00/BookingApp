import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import usePriceTraveller from "src/hooks/usePriceTraveller"
import { TypeFlightOrderResponse, TypeFlightPriceResponse } from "src/types/flight.type"
import { formatCurrency } from "src/utils/utils"

interface Props {
  data: TypeFlightOrderResponse | TypeFlightPriceResponse
}

export default function PriceTraveler({ data }: Props) {
  const { t } = useTranslation("flight")
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
      <span className="text-base mb-4 block font-medium">{t("flight.price.priceTitle")}</span>

      {data?.data.flightOffers[0].travelerPricings.find(
        (item) => item.travelerType === "ADULT"
      ) && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">{t("flight.price.adult")}</span>
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
            <span className="text-sm font-normal">{t("flight.price.priceOriginal")}</span>
            <span className="font-normal text-sm mb-1 block">
              {priceAdult?.base}
              {" đ"}
            </span>
          </div>
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-sm font-normal">{t("flight.price.fee")}</span>
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
            <span className="text-sm font-medium">{t("flight.price.children")}</span>
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
            <span className="text-sm font-normal">{t("flight.price.priceOriginal")}</span>
            <span className="font-normal text-sm mb-1 block">
              {priceChild?.base}
              {" đ"}
            </span>
          </div>
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-sm font-normal">{t("flight.price.priceOriginal")}</span>
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
            <span className="text-sm font-medium">{t("flight.price.infant")}</span>
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
            <span className="text-sm font-normal">{t("flight.price.priceOriginal")}</span>
            <span className="font-normal text-sm mb-1 block">
              {priceInfant?.base}
              {" đ"}
            </span>
          </div>
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-sm font-normal">{t("flight.price.fee")}</span>
            <span className="font-normal text-sm mb-1 block">
              {priceInfant?.fee}
              {" đ"}
            </span>
          </div>
        </div>
      )}

      <div className="mt-2 border-t border-t-gray-300 py-2 flex items-center justify-between">
        <span className="text-sm font-medium">{t("flight.price.discount")}</span>
        <span className="text-sm font-medium">0đ</span>
      </div>
      <div className="mt-2 border-t border-t-gray-300 py-2 flex items-center justify-between">
        <span className="text-sm font-medium">{t("flight.price.processingFee")}</span>
        <span className="text-sm font-medium text-[#32a923] capitalize">
          {t("flight.price.free")}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-base block font-medium">{t("flight.price.total")}</span>
        <span className="text-xl font-medium text-red-600">
          {formatCurrency(priceTotal)}
          {" đ"}
        </span>
      </div>
    </div>
  )
}
