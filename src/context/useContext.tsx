import { createContext, useState } from "react"
import { getAccessTokenToLS, getProfileToLS } from "src/utils/auth"

interface Props {
  children: React.ReactNode
}

type initialStateType = {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  isProfile: string | null
  setIsProfile: React.Dispatch<React.SetStateAction<string | null>>
}

const initialState: initialStateType = {
  isAuthenticated: Boolean(getAccessTokenToLS()), // nếu có accessToken thì true // còn không có thì false
  setIsAuthenticated: () => null,
  isProfile: getProfileToLS(),
  setIsProfile: () => null
}

export const AppContext = createContext<initialStateType>(initialState)

export default function AppProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialState.isAuthenticated)
  const [isProfile, setIsProfile] = useState(initialState.isProfile)

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, isProfile, setIsProfile }}>
      {children}
    </AppContext.Provider>
  )
}
