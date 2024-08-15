import { createContext, useState } from "react"
import { ResponseFlightManage, ResponseFlightPrice } from "src/types/flight.type"
import {
  getAccessTokenToLS,
  getCancelListToLS,
  getCartToLS,
  getProfileToLS,
  getPurchaseListToLS
} from "src/utils/auth"

interface Props {
  children: React.ReactNode
}

type initialStateType = {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  isProfile: string | null
  setIsProfile: React.Dispatch<React.SetStateAction<string | null>>
  listCart: ResponseFlightPrice[]
  setListCart: React.Dispatch<React.SetStateAction<ResponseFlightPrice[]>>
  listPurchased: ResponseFlightManage[]
  setListPurchased: React.Dispatch<React.SetStateAction<ResponseFlightManage[]>>
  listCancel: ResponseFlightManage[]
  setListCancel: React.Dispatch<React.SetStateAction<ResponseFlightManage[]>>
}

const initialState: initialStateType = {
  isAuthenticated: Boolean(getAccessTokenToLS()), // nếu có accessToken thì true // còn không có thì false
  setIsAuthenticated: () => null,
  isProfile: getProfileToLS(),
  setIsProfile: () => null,
  listCart: getCartToLS(),
  setListCart: () => null,
  listPurchased: getPurchaseListToLS(),
  setListPurchased: () => null,
  listCancel: getCancelListToLS(),
  setListCancel: () => null
}

// Context API
// ĐẦU tiên khởi tạo Context với các giá trị khởi tạo (ban đầu)
// Truyền các giá trị khởi tạo này vào state management (state global)
// Truyền state vào Provider (để quản lý trạng thái app) -> truyền xuống component con
// và tên state phải trùng với các giá trị khởi tạo
export const AppContext = createContext<initialStateType>(initialState)

export default function AppProvider({ children }: Props) {
  // state management
  const [isAuthenticated, setIsAuthenticated] = useState(initialState.isAuthenticated)
  const [isProfile, setIsProfile] = useState(initialState.isProfile)
  const [listCart, setListCart] = useState(initialState.listCart)
  const [listPurchased, setListPurchased] = useState(initialState.listPurchased)
  const [listCancel, setListCancel] = useState(initialState.listCancel)

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isProfile,
        setIsProfile,
        listCart,
        setListCart,
        listPurchased,
        setListPurchased,
        listCancel,
        setListCancel
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
