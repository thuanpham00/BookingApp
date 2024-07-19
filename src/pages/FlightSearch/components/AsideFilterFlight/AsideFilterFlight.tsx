import { useState } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"
import Button from "src/components/Button"
import { path } from "src/constant/path"
import { QueryParamsConfig } from "src/hooks/useQueryConfig"
import logoAirLine_1 from "src/img/Flight/logoAirline/logo-1.webp"
import logoAirLine_2 from "src/img/Flight/logoAirline/logo-2.webp"
import logoAirLine_3 from "src/img/Flight/logoAirline/logo-3.webp"
import logoAirLine_4 from "src/img/Flight/logoAirline/logo-4.webp"
import logoAirLine_5 from "src/img/Flight/logoAirline/logo-5.webp"
import logoAirLine_6 from "src/img/Flight/logoAirline/logo-6.webp"

interface Props {
  queryConfig: QueryParamsConfig
}

export default function AsideFilterFlight({ queryConfig }: Props) {
  // nhận vào props -> cập nhật ...queryConfig -> fetch lại api -> render list mới
  const navigate = useNavigate()

  // xử lý nonStop
  const [nonStop, setNonStop] = useState(false)
  const handleNonStop = () => {
    setNonStop((prev) => !prev)
    navigate({
      pathname: path.flightSearch,
      search: createSearchParams({ ...queryConfig, nonStop: String(nonStop) }).toString()
    })
  }

  // xu ly giá tối đa
  const [maxPrice, setMaxPrice] = useState(30000000)
  const [showPrice, setShowPrice] = useState(false)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = Number(event.target.value)
    setMaxPrice(price)
  }

  const showPriceRange = () => {
    setShowPrice(true)
  }

  const hidePriceRange = () => {
    setShowPrice(false)
  }

  const handleChangePrice = () => {
    navigate({
      pathname: path.flightSearch,
      search: createSearchParams({ ...queryConfig, maxPrice: String(maxPrice) }).toString()
    })
  }
  return (
    <div className="bg-[#fff] shadow-md px-4 rounded">
      <div className="pt-6 pb-4">
        <div className="text-lg text-textColor font-semibold">Bộ lọc phổ biến</div>
        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="nonStop"
            className="w-4 h-4"
            checked={queryConfig.nonStop === "true" ? true : false}
            onChange={handleNonStop}
          />
          <label htmlFor="nonStop" className="text-base text-textColor font-medium">
            Bay trực tiếp
          </label>
        </div>
      </div>

      <div className="py-4">
        <div className="text-lg text-textColor font-semibold">Chọn hãng hàng không</div>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="nonStop"
            className="w-4 h-4"
            checked={queryConfig.nonStop === "true" ? true : false}
            onChange={handleNonStop}
          />
          <img src={logoAirLine_1} alt="logo-1" className="w-6 h-6 object-contain" />
          <label htmlFor="nonStop" className="text-base text-textColor font-normal">
            Vietnam Airlines
          </label>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="nonStop"
            className="w-4 h-4"
            checked={queryConfig.nonStop === "true" ? true : false}
            onChange={handleNonStop}
          />
          <img src={logoAirLine_2} alt="logo-1" className="w-5 h-5 object-contain" />
          <label htmlFor="nonStop" className="ml-1 text-base text-textColor font-normal">
            VietJet Air
          </label>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="nonStop"
            className="w-4 h-4"
            checked={queryConfig.nonStop === "true" ? true : false}
            onChange={handleNonStop}
          />
          <img src={logoAirLine_3} alt="logo-1" className="w-5 h-5 object-contain" />
          <label htmlFor="nonStop" className="ml-1 text-base text-textColor font-normal">
            All Nippon Airways
          </label>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="nonStop"
            className="w-4 h-4"
            checked={queryConfig.nonStop === "true" ? true : false}
            onChange={handleNonStop}
          />
          <img src={logoAirLine_4} alt="logo-1" className="w-5 h-5 object-contain" />
          <label htmlFor="nonStop" className="ml-1 text-base text-textColor font-normal">
            Cathay Pacific
          </label>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="nonStop"
            className="w-4 h-4"
            checked={queryConfig.nonStop === "true" ? true : false}
            onChange={handleNonStop}
          />
          <img src={logoAirLine_5} alt="logo-1" className="w-5 h-5 object-contain" />
          <label htmlFor="nonStop" className="ml-1 text-base text-textColor font-normal">
            China southern airlines
          </label>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="nonStop"
            className="w-4 h-4"
            checked={queryConfig.nonStop === "true" ? true : false}
            onChange={handleNonStop}
          />
          <img src={logoAirLine_6} alt="logo-1" className="w-5 h-5 object-contain" />
          <label htmlFor="nonStop" className="ml-1 text-base text-textColor font-normal">
            Singapore Airlines
          </label>
        </div>
      </div>

      <div className="py-4">
        <div className="text-lg text-textColor font-semibold">Giá chuyến bay</div>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-full relative">
            <input
              className="w-full"
              id="priceRange"
              type="range"
              min="500000"
              max="100000000"
              step="1000000"
              value={maxPrice}
              onChange={handleChange}
              onMouseEnter={showPriceRange}
              onMouseLeave={hidePriceRange}
            />
            <div
              className="absolute -top-7"
              style={{
                left: `${((maxPrice - 500000) / (100000000 - 500000)) * 100}%`
              }}
            >
              {showPrice && (
                <div className="bg-white border border-gray-300 px-1 py-1 rounded shadow-lg text-sm">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND"
                  }).format(maxPrice)}
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <span className="text-base">500.000đ</span>
              <span className="text-base">100.000.000đ</span>
            </div>
          </div>
        </div>

        <Button nameButton="Áp dụng" onClick={handleChangePrice} />
      </div>
    </div>
  )
}
