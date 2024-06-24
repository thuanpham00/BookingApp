import { Helmet } from "react-helmet-async"

export default function Home() {
  return (
    <div className="h-[1000px]">
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home - Amadeus Booking" />
      </Helmet>

      <div className="container">home</div>
    </div>
  )
}
