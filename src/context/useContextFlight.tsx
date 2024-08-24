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

  cityCode: string
  setCityCode: React.Dispatch<React.SetStateAction<string>>
  radius: string
  setRadius: React.Dispatch<React.SetStateAction<string>>
  ratings: string
  setRatings: React.Dispatch<React.SetStateAction<string>>
  adultsHotel: number
  setAdultsHotel: React.Dispatch<React.SetStateAction<number>>
  checkInDate: Date | null
  setCheckInDate: React.Dispatch<React.SetStateAction<Date | null>>
  checkOutDate: Date | null
  setCheckOutDate: React.Dispatch<React.SetStateAction<Date | null>>
}

const initialState: TypeInitialState = {
  // quản lý state lưu trữ của form Flight
  searchText: "",
  setSearchText: () => null,
  searchText2: "",
  setSearchText2: () => null,
  date: null,
  setDate: () => null,
  date2: null,
  setDate2: () => null,
  travelClass: "",
  setTravelClass: () => null,
  numberAdults: 0,
  setNumberAdults: () => null,
  numberChildren: 0,
  setNumberChildren: () => null,
  numberInfants: 0,
  setNumberInfants: () => null,
  flightType: "oneWay",
  setFlightType: () => null,
  showPassenger: 0,
  setShowPassenger: () => null,

  // quản lý state lưu trữ của form Hotel
  cityCode: "",
  setCityCode: () => null,
  radius: "",
  setRadius: () => null,
  ratings: "3",
  setRatings: () => null,
  adultsHotel: 0,
  setAdultsHotel: () => null,
  checkInDate: null,
  setCheckInDate: () => null,
  checkOutDate: null,
  setCheckOutDate: () => null
}

export const FlightContext = createContext<TypeInitialState>(initialState)

export default function FlightProvider({ children }: { children: React.ReactNode }) {
  // flight
  const [searchText, setSearchText] = useState(initialState.searchText) // mã airport xuất phát
  const [searchText2, setSearchText2] = useState(initialState.searchText2) // mã airport đích
  const [date, setDate] = useState(initialState.date) // ngày đi
  const [date2, setDate2] = useState(initialState.date2) // ngày về
  const [travelClass, setTravelClass] = useState(initialState.travelClass) // hạng vé
  const [numberAdults, setNumberAdults] = useState(initialState.numberAdults) // HK người lớn
  const [numberChildren, setNumberChildren] = useState(initialState.numberChildren) // HK trẻ em
  const [numberInfants, setNumberInfants] = useState(initialState.numberInfants) // HK em bé

  const [flightType, setFlightType] = useState(initialState.flightType)
  const [showPassenger, setShowPassenger] = useState(initialState.showPassenger)

  // hotel
  const [cityCode, setCityCode] = useState(initialState.cityCode)
  const [radius, setRadius] = useState(initialState.radius)
  const [ratings, setRatings] = useState(initialState.ratings)
  const [adultsHotel, setAdultsHotel] = useState(initialState.adultsHotel)
  const [checkInDate, setCheckInDate] = useState(initialState.checkInDate)
  const [checkOutDate, setCheckOutDate] = useState(initialState.checkOutDate)

  return (
    <FlightContext.Provider
      value={{
        // flight
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
        setShowPassenger,

        // hotel
        cityCode,
        setCityCode,
        radius,
        setRadius,
        ratings,
        setRatings,
        adultsHotel,
        setAdultsHotel,
        checkInDate,
        setCheckInDate,
        checkOutDate,
        setCheckOutDate
      }}
    >
      {children}
    </FlightContext.Provider>
  )
}
