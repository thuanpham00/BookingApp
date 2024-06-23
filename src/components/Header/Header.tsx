import { Link } from "react-router-dom"
import { path } from "src/constant/path"
import logo from "../../img/favicon/FaviconFlight.png"

export default function Header() {
  return (
    <div className="sticky left-0 top-0 z-10">
      <div className=" bg-blueColor py-2 text-[#f2f2f2]">
        <div className="container">
          <div className="flex items-center justify-center gap-1">
            <strong>Get Great Deals!</strong>
            <span>Choose from 500+ airlines for now airfares!</span>
            <strong className="underline cursor-pointer">Explore!</strong>
          </div>
        </div>
      </div>

      <div className="bg-[#f2f2f2] py-2 shadow-md">
        <div className="container">
          <div className="flex  items-center justify-between cursor-pointer">
            <div className="flex items-center">
              <div className="w-14 h-14">
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-xl text-textColor font-semibold">Amadeus Booking</h1>
            </div>
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <Link
                  to={path.register}
                  className="py-2 px-3 border-2 border-blueColor rounded-xl duration-200 hover:bg-[#ddd]/80"
                >
                  Register
                </Link>
                <Link
                  to={path.login}
                  className="py-2 px-3 border-2 border-blueColor bg-blueColor text-[#f2f2f2] rounded-xl duration-200 hover:bg-blueColor/80 hover:border-blueColor/80"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
