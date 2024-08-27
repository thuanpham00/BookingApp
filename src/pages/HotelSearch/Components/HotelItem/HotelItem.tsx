import { memo } from "react"
import { useNavigate } from "react-router-dom"
import Button from "src/components/Button"
import { imageHotelList } from "src/constant/hotelSearch"
import { path } from "src/constant/path"
import { TypeHotelItemResponse } from "src/types/hotel.type"

interface Props {
  item: TypeHotelItemResponse
}

function HotelItemInner({ item }: Props) {
  const navigate = useNavigate()
  const imageHotel = imageHotelList[Math.floor(Math.random() * 15)]

  const handleNavigateDetail = (id: string) => {
    navigate(`${path.hotel}/${id}`)
    localStorage.setItem("hotelItem", JSON.stringify({ ...item, imageHotel })) // nào payment thành công sẽ delete cái này
  }

  return (
    <div className="w-full flex items-center mb-4 h-[200px]">
      <div className="w-[60%] h-full">
        <img
          src={imageHotel}
          alt="ảnh"
          className="w-full h-full object-cover rounded-tl rounded-bl"
        />
      </div>
      <div className="w-[40%] p-4 h-full bg-white flex items-center justify-center flex-col rounded-tr rounded-br">
        <h2 className="text-base text-textColor font-semibold">{item.name}</h2>
        <h3 className="text-base text-textColor font-normal">
          Quốc gia: {item.address.countryCode}
        </h3>
        <span className="block text-base text-gray-500">Mã khách sạn: {item.hotelId}</span>
        <Button
          onClick={() => handleNavigateDetail(item.hotelId)}
          nameButton="Giá chi tiết"
          className="mt-2 px-3 py-2 bg-[#e5eef4] w-full text-blueColor text-sm rounded-full hover:bg-blueColor duration-200 font-semibold border border-blueColor hover:text-whiteColor"
        />
      </div>
    </div>
  )
}

const HotelItem = memo(HotelItemInner)
export default HotelItem
// khi scroll window thì state thay đổi dẫn đến nguyên component cha HotelSearch re-render kéo theo component con re-render liên tục -> giải pháp là dùng memo (tránh re-render khi không cần thiết)
