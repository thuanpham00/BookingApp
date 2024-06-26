import { Helmet } from "react-helmet-async"

export default function Home() {
  return (
    <div className="h-[1000px]">
      <Helmet>
        <title>Trang chủ</title>
        <meta name="description" content="Trang chủ - Amadeus Booking" />
      </Helmet>

      <div className="container">home</div>
    </div>
  )
}
