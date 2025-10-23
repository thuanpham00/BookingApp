/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { getAccessTokenToLS, getProfileToLS, getUuidUserToLS } from "src/utils/auth"

interface Props {
  children: React.ReactNode
}

type initialStateType = {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  isProfile: string | null
  setIsProfile: React.Dispatch<React.SetStateAction<string | null>>
  uuid: string | null
  setUuid: React.Dispatch<React.SetStateAction<string | null>>
  cartCount: number
  setCartCount: (n: number) => void
  refetchCartCount: (uuid?: string) => Promise<void>
}

const initialState: initialStateType = {
  isAuthenticated: Boolean(getAccessTokenToLS()), // nếu có accessToken thì true // còn không có thì false
  setIsAuthenticated: () => null,
  isProfile: getProfileToLS(),
  setIsProfile: () => null,
  uuid: getUuidUserToLS(),
  setUuid: () => null,

  cartCount: 0,
  setCartCount: () => {},
  refetchCartCount: async () => {}
}

// Context API
// ĐẦU tiên khởi tạo Context với các giá trị khởi tạo (ban đầu)
// Truyền các giá trị khởi tạo này vào state management (state global)
// Truyền state vào Provider (để quản lý trạng thái app) -> truyền xuống component con
// và tên state phải trùng với tên các giá trị khởi tạo (vì đã createContext)
export const AppContext = createContext<initialStateType>(initialState)

export default function AppProvider({ children }: Props) {
  // state management
  const [isAuthenticated, setIsAuthenticated] = useState(initialState.isAuthenticated)
  const [isProfile, setIsProfile] = useState(initialState.isProfile)
  const [uuid, setUuid] = useState(initialState.uuid)
  const [cartCount, setCartCount] = useState(0)

  const refetchCartCount = async (userUuid?: string) => {
    const id = userUuid || uuid
    if (!id) {
      setCartCount(0)
      return
    }

    try {
      const res = await axios.get(`https://api-bookingapp.onrender.com/cart/${id}`)
      if (res.data.success) {
        setCartCount(res.data.data.length)
      } else {
        setCartCount(0)
      }
    } catch (err) {
      console.error("❌ Lỗi khi lấy giỏ hàng:", err)
      setCartCount(0)
    }
  }

  useEffect(() => {
    if (uuid) refetchCartCount(uuid)
  }, [uuid])

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isProfile,
        setIsProfile,
        uuid,
        setUuid,
        cartCount,
        setCartCount,

        refetchCartCount
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
