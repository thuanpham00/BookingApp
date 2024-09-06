/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react"

import { formatCurrency } from "src/utils/utils"

export default function usePriceTraveller(data: any, type?: string) {
  const priceTraveller = useMemo(() => {
    const priceDetail = { total: "0", base: "0", fee: "0" }
    if (data) {
      {
        const res = data.data.flightOffers[0].travelerPricings.find(
          (item: any) => item.travelerType === type
        )
        if (res) {
          priceDetail.total = formatCurrency(Number(res.price.total))
          priceDetail.base = formatCurrency(Number(res.price.base))
          priceDetail.fee = formatCurrency(Number(res.price.total) - Number(res.price.base))
        }
      }
    }
    return priceDetail
  }, [data, type])

  const quantityOfTraveller = useMemo(() => {
    const count = { adult: 0, child: 0, infant: 0 }
    if (data) {
      data.data.flightOffers[0].travelerPricings.map((item: any) => {
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

  return { priceTraveller, quantityOfTraveller }
}
