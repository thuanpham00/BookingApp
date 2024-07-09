import { Helmet } from "react-helmet-async"
import bg1 from "../../img/bgLogin/bg-1.webp"
import bg2 from "../../img/Home/banner2.webp"
import bg3 from "../../img/bgLogin/bg-5.webp"
import bg4 from "../../img/bgLogin/bg-6.webp"
import tour1 from "../../img/Home/tour1.webp"
import tour2 from "../../img/Home/tour2.webp"
import tour3 from "../../img/Home/tour3.webp"
import tour4 from "../../img/Home/tour4.webp"
import tour5 from "../../img/Home/tour5.webp"
import tour6 from "../../img/Home/tour6.webp"
import hotel1 from "../../img/Home/hotel1.webp"
import hotel2 from "../../img/Home/hotel2.webp"
import hotel3 from "../../img/Home/hotel3.webp"
import hotel4 from "../../img/Home/hotel4.webp"
import hotel5 from "../../img/Home/hotel5.webp"
import hotel6 from "../../img/Home/hotel6.webp"
import iconSVG from "../../img/svg/travel-luggage-svgrepo-com.svg"
import ChangeAutoBg from "src/components/ChangeAutoBg"
import SlideList from "./components/SlideList"

const backgroundList = [bg1, bg2, bg3, bg4]

export type ItemHotelType = {
  imageHotel: string
  nameHotel: string
  addressHotel: string
  review: number
  rating: number
  fromPrice: string
  type: string
}

export type ListHotelType = ItemHotelType[]

const listHotel: ListHotelType = [
  {
    imageHotel: hotel1,
    nameHotel: "Hyatt Regency Maui Resort & Spa",
    addressHotel: "200 Nohea Kai Dr, Lahaina, HI",
    review: 130,
    rating: 4.4,
    fromPrice: "350$",
    type: "Mỗi đêm"
  },
  {
    imageHotel: hotel2,
    nameHotel: "Four Seasons Resort Maui at Wailea",
    addressHotel: "3900 Wailea Alanui Drive, Kihei, HI",
    review: 51,
    rating: 4.6,
    fromPrice: "888$",
    type: "Mỗi đêm"
  },
  {
    imageHotel: hotel3,
    nameHotel: "Ibis Styles London Heathrow",
    addressHotel: "272 Bath Road, Harlington, England",
    review: 68,
    rating: 4.5,
    fromPrice: "640$",
    type: "Mỗi đêm"
  },
  {
    imageHotel: hotel6,
    nameHotel: "Best Western Grant Park Hotel",
    addressHotel: "124 E Huron St, Chicago",
    review: 61,
    rating: 4.3,
    fromPrice: "220$",
    type: "Mỗi đêm"
  },
  {
    imageHotel: hotel4,
    nameHotel: "Hotel Europe Saint Severin Paris",
    addressHotel: "38-40 Rue Saint Séverin, Paris, Paris",
    review: 100,
    rating: 4.8,
    fromPrice: "410$",
    type: "Mỗi đêm"
  },
  {
    imageHotel: hotel5,
    nameHotel: "The Millennium Hilton New York",
    addressHotel: "124 E Huron St, New york",
    review: 61,
    rating: 4.3,
    fromPrice: "300$",
    type: "Mỗi đêm"
  }
]

export default function Home() {
  return (
    <div className="h-[2500px]">
      <Helmet>
        <title>Trang chủ</title>
        <meta name="description" content="Trang chủ - Amadeus Booking" />
      </Helmet>

      <div className="w-full h-[550px] relative">
        <ChangeAutoBg
          className="transition-all ease-linear duration-1000 w-full h-full filter brightness-75"
          indexEnd={3}
          listImg={backgroundList}
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="w-[1000px] text-center text-whiteColor md:text-2xl lg:text-4xl font-semibold">
            Starts Your Trip with Amadeus Booking.
          </h1>
          <h2 className="text-center text-whiteColor mx-auto mt-4 md:w-[800px] lg:w-full md:text-lg lg:text-xl">
            Take a little break from the work stress of everyday. Discover plan trip and explore
            beautiful destinations.
          </h2>
        </div>
      </div>
      <div className="container">
        <div className="mt-4 flex items-center gap-8">
          <div className="bg-[#fff] rounded-3xl flex-1 min-h-[200px] p-4 border border-gray-300 cursor-pointer">
            <div className="flex flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-10 w-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="my-2 text-textColor font-semibold text-lg">Đặt phòng dễ dàng</h3>
              <p className="text-textColor font-normal text-base">
                Trải nghiệm đặt phòng nhanh chóng và tiện lợi với hệ thống của chúng tôi. Chỉ cần
                vài bước đơn giản để tìm và đặt ngay phòng khách sạn phù hợp.
              </p>
            </div>
          </div>
          <div className="bg-[#fff] rounded-3xl flex-1 min-h-[200px] p-4 border border-gray-300 cursor-pointer">
            <div className="flex flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-10 w-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
                />
              </svg>

              <h3 className="my-2 text-textColor font-semibold text-lg">Điểm đến tốt nhất</h3>
              <p className="text-textColor font-normal text-base">
                Khám phá những điểm đến tuyệt vời nhất với chúng tôi. Chúng tôi cung cấp những gợi ý
                lý tưởng cho chuyến du lịch của bạn.
              </p>
            </div>
          </div>
          <div className="bg-[#fff] rounded-3xl flex-1 min-h-[200px] p-4 border border-gray-300 cursor-pointer">
            <div className="flex flex-col justify-between">
              <img src={iconSVG} alt="icon" className="w-10 h-10" />
              <h3 className="my-2 text-textColor font-semibold text-lg">Hướng dẫn viên du lịch</h3>
              <p className="text-textColor font-normal text-base">
                Trải nghiệm chuyến đi hoàn hảo với sự hỗ trợ của các hướng dẫn viên chuyên nghiệp.
                Hiểu rõ hơn về văn hóa và lịch sử mỗi điểm đến.
              </p>
            </div>
          </div>
          <div className="bg-[#fff] rounded-3xl flex-1 min-h-[200px] p-4 border border-gray-300 cursor-pointer">
            <div className="flex flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>

              <h3 className="my-2 text-textColor font-semibold text-lg">Hỗ trợ khách hàng 24/7</h3>
              <p className="text-textColor font-normal text-base">
                Chúng tôi luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi. Đội ngũ chăm sóc khách hàng
                chuyên nghiệp hoạt động 24/7 để giải đáp mọi thắc mắc.
              </p>
            </div>
          </div>
        </div>

        <div className="my-16">
          <h2 className="text-center text-textColor mt-4 text-2xl font-semibold">
            Khám phá các tour du lịch nổi tiếng
          </h2>
          <div className="mt-4 grid lg:grid-cols-12 md:grid-cols-6 gap-6">
            <div className="lg:col-span-4 md:col-span-3 shadow-sm cursor-pointer hover:shadow-2xl duration-200">
              <div className="w-full relative">
                <div className="w-full h-[350px]">
                  <img
                    src={tour1}
                    alt="tour"
                    className="w-full h-full rounded-tl-md rounded-tr-md"
                  />
                </div>
                <div className="px-4 py-1 text-whiteColor bg-blueColor block absolute -top-2 left-5 rounded-sm text-sm">
                  JP
                </div>
                <div className="p-4 bg-[#fff] rounded-bl-md rounded-br-md">
                  <span className="text-lg text-textColor font-semibold">Hoa Ky to Japan</span>
                  <span className="text-base block my-1 text-gray-500">Bay khứ hồi</span>
                  <div className="flex items-center gap-1">
                    <span className="text-base block text-gray-500">Từ</span>
                    <span className="text-lg text-blueColor font-semibold">$700 - $1,500 USD</span>
                  </div>
                  <div className="flex items-center gap-[2px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#2b2d42"
                      className="mt-1 w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span className="text-gray-500">13h - 14h bay</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-3 shadow-sm cursor-pointer hover:shadow-2xl duration-200">
              <div className="w-full relative">
                <div className="w-full h-[350px]">
                  <img
                    src={tour2}
                    alt="tour"
                    className="w-full h-full rounded-tl-md rounded-tr-md"
                  />
                </div>
                <div className="px-4 py-1 text-whiteColor bg-blueColor block absolute -top-2 left-5 rounded-sm text-sm">
                  ES
                </div>
                <div className="p-4 bg-[#fff] rounded-bl-md rounded-br-md">
                  <span className="text-lg text-textColor font-semibold">Dubai to Spain</span>
                  <span className="text-base block my-1 text-gray-500">Bay khứ hồi</span>
                  <div className="flex items-center gap-1">
                    <span className="text-base block text-gray-500">Từ</span>
                    <span className="text-lg text-blueColor font-semibold">$400 - $800 USD</span>
                  </div>
                  <div className="flex items-center gap-[2px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#2b2d42"
                      className="mt-1 w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span className="text-gray-500">7h - 8h bay</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-3 shadow-sm cursor-pointer hover:shadow-2xl duration-200">
              <div className="w-full relative">
                <div className="w-full h-[350px]">
                  <img
                    src={tour3}
                    alt="tour"
                    className="w-full h-full rounded-tl-md rounded-tr-md"
                  />
                </div>
                <div className="px-4 py-1 text-whiteColor bg-blueColor block absolute -top-2 left-5 rounded-sm text-sm">
                  AUS
                </div>
                <div className="p-4 bg-[#fff] rounded-bl-md rounded-br-md">
                  <span className="text-lg text-textColor font-semibold">Bangkok to Australia</span>
                  <span className="text-base block my-1 text-gray-500">Bay khứ hồi</span>
                  <div className="flex items-center gap-1">
                    <span className="text-base block text-gray-500">Từ</span>
                    <span className="text-lg text-blueColor font-semibold">$300 - $700 USD</span>
                  </div>
                  <div className="flex items-center gap-[2px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#2b2d42"
                      className="mt-1 w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span className="text-gray-500">9h - 10h bay</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-3 shadow-sm cursor-pointer hover:shadow-2xl duration-200">
              <div className="w-full relative">
                <div className="w-full h-[350px]">
                  <img
                    src={tour4}
                    alt="tour"
                    className="w-full h-full rounded-tl-md rounded-tr-md"
                  />
                </div>
                <div className="px-4 py-1 text-whiteColor bg-blueColor block absolute -top-2 left-5 rounded-sm text-sm">
                  SG
                </div>
                <div className="p-4 bg-[#fff] rounded-bl-md rounded-br-md">
                  <span className="text-lg text-textColor font-semibold">VietNam to Singapore</span>
                  <span className="text-base block my-1 text-gray-500">Bay 1 chiều</span>
                  <div className="flex items-center gap-1">
                    <span className="text-base block text-gray-500">Từ</span>
                    <span className="text-lg text-blueColor font-semibold"> $100 - $200 USD</span>
                  </div>
                  <div className="flex items-center gap-[2px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#2b2d42"
                      className="mt-1 w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span className="text-gray-500">2h - 3h bay</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-3 shadow-sm cursor-pointer hover:shadow-2xl duration-200">
              <div className="w-full relative">
                <div className="w-full h-[350px]">
                  <img
                    src={tour5}
                    alt="tour"
                    className="w-full h-full rounded-tl-md rounded-tr-md"
                  />
                </div>
                <div className="px-4 py-1 text-whiteColor bg-blueColor block absolute -top-2 left-5 rounded-sm text-sm">
                  VN
                </div>
                <div className="p-4 bg-[#fff] rounded-bl-md rounded-br-md">
                  <span className="text-lg text-textColor font-semibold">Lao to VietNam</span>
                  <span className="text-base block my-1 text-gray-500">Bay khứ hồi</span>
                  <div className="flex items-center gap-1">
                    <span className="text-base block text-gray-500">Từ</span>
                    <span className="text-lg text-blueColor font-semibold">$150 - $250 USD</span>
                  </div>
                  <div className="flex items-center gap-[2px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#2b2d42"
                      className="mt-1 w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span className="text-gray-500">1h - 2h bay</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-3 shadow-sm cursor-pointer hover:shadow-2xl duration-200">
              <div className="w-full relative">
                <div className="w-full h-[350px]">
                  <img
                    src={tour6}
                    alt="tour"
                    className="w-full h-full rounded-tl-md rounded-tr-md"
                  />
                </div>
                <div className="px-4 py-1 text-whiteColor bg-blueColor block absolute -top-2 left-5 rounded-sm text-sm">
                  KR
                </div>
                <div className="p-4 bg-[#fff] rounded-bl-md rounded-br-md">
                  <span className="text-lg text-textColor font-semibold">VietNam to Korea</span>
                  <span className="text-base block my-1 text-gray-500">Bay khứ hồi</span>
                  <div className="flex items-center gap-1">
                    <span className="text-base block text-gray-500">Từ</span>
                    <span className="text-lg text-blueColor font-semibold">$200 - $400 USD</span>
                  </div>
                  <div className="flex items-center gap-[2px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#2b2d42"
                      className="mt-1 w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span className="text-gray-500">4h - 5h bay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-16">
          <h2 className="text-center text-textColor mt-4 text-2xl font-semibold">
            Các điểm đến khách sạn nổi tiếng
          </h2>
          <div className="mt-4">
            <SlideList timeScroll={3000} productList={listHotel} />
          </div>
        </div>
      </div>
    </div>
  )
}
