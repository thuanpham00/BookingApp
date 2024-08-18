import duLich1 from "src/img/Hotel/danang.webp"
import duLich2 from "src/img/Hotel/hcm.webp"
import duLich3 from "src/img/Hotel/seoul.webp"
import duLich4 from "src/img/Hotel/sing.webp"
import imgHotel1 from "src/img/Hotel/imgHotelRandom/hotel1.webp"
import imgHotel2 from "src/img/Hotel/imgHotelRandom/hotel2.webp"
import imgHotel3 from "src/img/Hotel/imgHotelRandom/hotel3.webp"
import imgHotel4 from "src/img/Hotel/imgHotelRandom/hotel4.webp"
import imgHotel5 from "src/img/Hotel/imgHotelRandom/hotel5.webp"
import imgHotel6 from "src/img/Hotel/imgHotelRandom/hotel6.webp"
import imgHotel7 from "src/img/Hotel/imgHotelRandom/hotel7.webp"
import imgHotel8 from "src/img/Hotel/imgHotelRandom/hotel8.webp"
import imgHotel9 from "src/img/Hotel/imgHotelRandom/hotel9.webp"
import imgHotel10 from "src/img/Hotel/imgHotelRandom/hotel10.webp"
import imgHotel11 from "src/img/Hotel/imgHotelRandom/hotel11.webp"
import imgHotel12 from "src/img/Hotel/imgHotelRandom/hotel12.webp"
import imgHotel13 from "src/img/Hotel/imgHotelRandom/hotel13.webp"
import imgHotel14 from "src/img/Hotel/imgHotelRandom/hotel14.webp"
import imgHotel15 from "src/img/Hotel/imgHotelRandom/hotel15.webp"
import { TypeCityCodeList } from "src/types/hotel.type"

export const listCityInVietNam = [
  {
    img: duLich1,
    name: "Đà nẵng - Việt Nam",
    quantity: "5,534 chỗ ở",
    code: "DAD"
  },
  {
    img: duLich2,
    name: "Tokyo - Nhật Bản",
    quantity: "15,546 chỗ ở",
    code: "HND"
  },
  {
    img: duLich3,
    name: "Seoul - Hàn Quốc",
    quantity: "2,744 chỗ ở",
    code: "ICN"
  },
  {
    img: duLich4,
    name: "Singapore",
    quantity: "10,744 chỗ ở",
    code: "SIN"
  }
]

export const cityCodeList: TypeCityCodeList = [
  { code: "SGN", name: "Hồ Chí Minh", country: "Việt Nam" },
  { code: "HAN", name: "Hà Nội", country: "Việt Nam" },
  { code: "DAD", name: "Đà Nẵng", country: "Việt Nam" },
  { code: "CXR", name: "Nha Trang", country: "Việt Nam" },

  { code: "PNH", name: "Phnom Penh", country: "Campuchia" },
  { code: "REP", name: "Siem Reap", country: "Campuchia" },

  { code: "NRT", name: "Tokyo", country: "Nhật Bản" },
  { code: "HND", name: "Tokyo", country: "Nhật Bản" },
  { code: "KIX", name: "Osaka", country: "Nhật Bản" },
  { code: "CTS", name: "Sapporo", country: "Nhật Bản" },
  { code: "NGO", name: "Nagoya", country: "Nhật Bản" },
  { code: "FUK", name: "Fukuoka", country: "Nhật Bản" },
  { code: "OKA", name: "Okinawa", country: "Nhật Bản" },

  { code: "PEK", name: "Bắc Kinh", country: "Trung Quốc" },
  { code: "PVG", name: "Thượng Hải", country: "Trung Quốc" },
  { code: "CAN", name: "Quảng Châu", country: "Trung Quốc" },
  { code: "TAO", name: "Thanh Đảo", country: "Trung Quốc" },
  { code: "XIY", name: "Tây An", country: "Trung Quốc" },
  { code: "WUH", name: "Vũ Hán", country: "Trung Quốc" },
  { code: "SZX", name: "Thâm Quyến", country: "Trung Quốc" },
  { code: "CTU", name: "Thành Đô", country: "Trung Quốc" },
  { code: "KWE", name: "Quý Dương", country: "Trung Quốc" },
  { code: "SHA", name: "Thượng Hải", country: "Trung Quốc" },
  { code: "CSX", name: "Trường Sa", country: "Trung Quốc" },
  { code: "URC", name: "Ô Lỗ Mộc Tề", country: "Trung Quốc" },
  { code: "FOC", name: "Phúc Châu", country: "Trung Quốc" },
  { code: "NKG", name: "Nam Kinh", country: "Trung Quốc" },
  { code: "CGO", name: "Trịnh Châu", country: "Trung Quốc" },

  { code: "ICN", name: "Seoul", country: "Hàn Quốc" },
  { code: "PUS", name: "Busan", country: "Hàn Quốc" },
  { code: "GMP", name: "Seoul", country: "Hàn Quốc" },
  { code: "CJU", name: "Jeju", country: "Hàn Quốc" },
  { code: "TAE", name: "Daegu", country: "Hàn Quốc" },

  { code: "BKK", name: "Bangkok", country: "Thái Lan" },
  { code: "HKT", name: "Phuket", country: "Thái Lan" },
  { code: "CNX", name: "Chiang Mai", country: "Thái Lan" },

  { code: "SIN", name: "Singapore", country: "Singapore" },

  { code: "KUL", name: "Kuala Lumpur", country: "Malaysia" },
  { code: "LGK", name: "Langkawi", country: "Malaysia" },

  { code: "CGK", name: "Jakarta", country: "Indonesia" },
  { code: "DPS", name: "Bali", country: "Indonesia" },

  { code: "MNL", name: "Manila", country: "Philippines" },
  { code: "CEB", name: "Cebu", country: "Philippines" },
  { code: "DVO", name: "Davao", country: "Philippines" },
  { code: "KLO", name: "Kalibo", country: "Philippines" },
  { code: "PPS", name: "Puerto Princesa", country: "Philippines" },

  { code: "DEL", name: "New Delhi", country: "Ấn Độ" },
  { code: "BOM", name: "Mumbai", country: "Ấn Độ" },
  { code: "BLR", name: "Bangalore", country: "Ấn Độ" },
  { code: "HYD", name: "Hyderabad", country: "Ấn Độ" },
  { code: "CCU", name: "Kolkata", country: "Ấn Độ" },
  { code: "MAA", name: "Chennai", country: "Ấn Độ" },

  { code: "HKG", name: "Hong Kong", country: "Hồng Kông" },

  { code: "TPE", name: "Đài Bắc", country: "Đài Loan" },
  { code: "TSA", name: "Đài Bắc", country: "Đài Loan" },

  { code: "DXB", name: "Dubai", country: "Các Tiểu Vương Quốc Ả Rập" },
  { code: "AUH", name: "Abu Dhabi", country: "Các Tiểu Vương Quốc Ả Rập" },

  { code: "LHR", name: "London", country: "Anh" },
  { code: "LGW", name: "London", country: "Anh" },

  { code: "CDG", name: "Paris", country: "Pháp" },
  { code: "ORY", name: "Paris", country: "Pháp" },

  { code: "FRA", name: "Frankfurt", country: "Đức" },
  { code: "MUC", name: "Munich", country: "Đức" },

  { code: "AMS", name: "Amsterdam", country: "Hà Lan" },

  { code: "MAD", name: "Madrid", country: "Tây Ban Nha" },
  { code: "BCN", name: "Barcelona", country: "Tây Ban Nha" },

  { code: "JFK", name: "New York", country: "Hoa Kỳ" },
  { code: "LAX", name: "Los Angeles", country: "Hoa Kỳ" },
  { code: "ORD", name: "Chicago", country: "Hoa Kỳ" },
  { code: "SFO", name: "San Francisco", country: "Hoa Kỳ" },
  { code: "MIA", name: "Miami", country: "Hoa Kỳ" },
  { code: "ATL", name: "Atlanta", country: "Hoa Kỳ" },

  { code: "YYZ", name: "Toronto", country: "Canada" },
  { code: "YVR", name: "Vancouver", country: "Canada" },

  { code: "MEX", name: "Mexico City", country: "Mexico" },

  { code: "SYD", name: "Sydney", country: "Úc" },
  { code: "MEL", name: "Melbourne", country: "Úc" },
  { code: "BNE", name: "Brisbane", country: "Úc" },

  { code: "DOH", name: "Doha", country: "Qatar" },
  { code: "TLV", name: "Tel Aviv", country: "Israel" },

  { code: "IST", name: "Istanbul", country: "Thổ Nhĩ Kỳ" },
  { code: "SAW", name: "Istanbul", country: "Thổ Nhĩ Kỳ" },

  { code: "JNB", name: "Johannesburg", country: "Nam Phi" },
  { code: "CPT", name: "Cape Town", country: "Nam Phi" },
  { code: "ADD", name: "Addis Ababa", country: "Ethiopia" },
  { code: "NBO", name: "Nairobi", country: "Kenya" },
  { code: "DAR", name: "Dar es Salaam", country: "Tanzania" },
  { code: "LOS", name: "Lagos", country: "Nigeria" },
  { code: "ACC", name: "Accra", country: "Ghana" },
  { code: "CMN", name: "Casablanca", country: "Morocco" }
]

export const imageHotelList = [
  imgHotel1,
  imgHotel2,
  imgHotel3,
  imgHotel4,
  imgHotel5,
  imgHotel6,
  imgHotel7,
  imgHotel8,
  imgHotel9,
  imgHotel10,
  imgHotel11,
  imgHotel12,
  imgHotel13,
  imgHotel14,
  imgHotel15
]
