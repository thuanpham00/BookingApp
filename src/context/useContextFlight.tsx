import { createContext, useState } from "react"

type TypeInitialState = {
  searchText: string
  setSearchText: React.Dispatch<React.SetStateAction<string>>
  searchText2: string
  setSearchText2: React.Dispatch<React.SetStateAction<string>>
  date: Date | null
  setDate: React.Dispatch<React.SetStateAction<Date | null>>
  date2: Date | null
  setDate2: React.Dispatch<React.SetStateAction<Date | null>>
  travelClass: string
  setTravelClass: React.Dispatch<React.SetStateAction<string>>
  numberAdults: number
  setNumberAdults: React.Dispatch<React.SetStateAction<number>>
  numberChildren: number
  setNumberChildren: React.Dispatch<React.SetStateAction<number>>
  numberInfants: number
  setNumberInfants: React.Dispatch<React.SetStateAction<number>>
  flightType: string
  setFlightType: React.Dispatch<React.SetStateAction<string>>
  showPassenger: number
  setShowPassenger: React.Dispatch<React.SetStateAction<number>>
}

const initialState: TypeInitialState = {
  // quản lý state lưu trữ của form
}

export const FlightContext = createContext<TypeInitialState>(initialState)

export default function FlightProvider({ children }: { children: React.ReactNode }) {
  const [searchText, setSearchText] = useState<string>("") // mã airport xuất phát
  const [searchText2, setSearchText2] = useState<string>("") // mã airport đích
  const [date, setDate] = useState<Date | null>(null) // ngày đi
  const [date2, setDate2] = useState<Date | null>(null) // ngày về
  const [travelClass, setTravelClass] = useState<string>("") // hạng vé
  const [numberAdults, setNumberAdults] = useState<number>(0) // HK người lớn
  const [numberChildren, setNumberChildren] = useState<number>(0) // HK trẻ em
  const [numberInfants, setNumberInfants] = useState<number>(0) // HK em bé

  const [flightType, setFlightType] = useState("oneWay")
  const [showPassenger, setShowPassenger] = useState(0)

  return (
    <FlightContext.Provider
      value={{
        searchText,
        setSearchText,
        searchText2,
        setSearchText2,
        date,
        setDate,
        date2,
        setDate2,
        travelClass,
        setTravelClass,
        numberAdults,
        setNumberAdults,
        numberChildren,
        setNumberChildren,
        numberInfants,
        setNumberInfants,
        flightType,
        setFlightType,
        showPassenger,
        setShowPassenger
      }}
    >
      {children}
    </FlightContext.Provider>
  )
}
