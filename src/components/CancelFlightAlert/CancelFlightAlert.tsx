/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { toast } from "react-toastify"
import { TypeFlightManageResponse } from "src/types/flight.type"

type Props = {
  item: TypeFlightManageResponse
  onConfirmCancel: (id: string, item: any) => void
}

export const canCancelFlight = (departureTime: string): boolean => {
  if (!departureTime) return false

  const now = new Date()
  const departure = new Date(departureTime)

  // Khoảng cách thời gian (tính theo giờ)
  const diffHours = (departure.getTime() - now.getTime()) / (1000 * 60 * 60)

  return diffHours >= 24
}

const CancelFlightAlert = ({ item, onConfirmCancel }: Props) => {
  const showCancelAlert = () => {
    const departureTime =
      item?.data?.flightOffers?.[0]?.itineraries?.[0]?.segments?.[0]?.departure?.at

    if (!departureTime) {
      toast.error("Không xác định được thời gian khởi hành", { autoClose: 1500 })
      return
    }

    if (!canCancelFlight(departureTime)) {
      Modal.warning({
        title: "Không thể hủy vé",
        icon: <ExclamationCircleOutlined />,
        content: (
          <p>
            ⚠ Vé này <b>không thể hủy</b> vì còn dưới 24 tiếng trước giờ khởi hành.
          </p>
        ),
        okText: "Đã hiểu",
        centered: true
      })
      return
    }

    Modal.confirm({
      title: "Xác nhận hủy vé máy bay",
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <p>Bạn chỉ có thể hủy vé máy bay trước 12 tiếng so với giờ khởi hành.</p>
          <p>Bạn có chắc chắn muốn hủy vé này không?</p>
        </div>
      ),
      okText: "Xác nhận hủy",
      cancelText: "Không",
      okButtonProps: { danger: true },
      centered: true,
      onOk() {
        onConfirmCancel(item.data.id, item)
      }
    })
  }

  return (
    <button
      onClick={showCancelAlert}
      className="bg-red-600 text-white py-2 px-4 rounded text-sm hover:bg-red-500 duration-200"
    >
      Hủy vé
    </button>
  )
}

export default CancelFlightAlert
