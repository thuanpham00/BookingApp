import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-[#022d5c] text-[#f2f2f2]">
      <div className="container py-8 px-3">
        <div className="flex items-center justify-between pb-4 border-b border-b-[#4e6c8d]">
          <h2 className="font-semibold text-2xl">Easy Access</h2>
          <div className="flex items-center gap-8">
            <span className="font-semibold text-2xl">Connect with Us</span>
            <div className="flex gap-2">
              <Link
                to="https://www.facebook.com/domaybatduoctao912"
                target="_blank"
                className="w-7 h-7 bg-[#f2f2f2] rounded-full flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#000"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                to="https://www.instagram.com/minthuan_/"
                target="_blank"
                className="w-7 h-7 bg-[#f2f2f2] rounded-full flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#000"
                    fillRule="evenodd"
                    d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="py-4 flex items-start justify-between flex-wrap border-b border-b-[#4e6c8d]">
          <div className="flex-1">
            <h4 className="font-semibold text-base hover:underline duration-200 cursor-pointer">
              Quick Links
            </h4>
            <ul className="mt-4">
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Popular Airlines
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Popular Flight Routes
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Top U.S. Destinations
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Top International Destinations
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Site Directories
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Stay Connected
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  International Sites
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-base hover:underline duration-200 cursor-pointer">
              BOOK
            </h4>
            <ul className="mt-4">
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Cheap Flights
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Cheap Hotels
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Car Rentals
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Vacation Packages
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Group Travel
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Save & Earn $
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-base hover:underline duration-200 cursor-pointer">
              TRAVELER TOOLS
            </h4>
            <ul className="mt-4">
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Gift Cards
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Check My Booking
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Customer Support
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Online Check-in
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Airline Baggage Fees
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Check Flight Status
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Travel Blog
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Local Guides
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-base hover:underline duration-200 cursor-pointer">
              ABOUT AMADEUS
            </h4>
            <ul className="mt-4">
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Press Room
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Careers
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Affiliate Program
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Client Testimonial
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Advertise with Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-medium text-sm hover:underline duration-200 cursor-pointer"
                >
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span>Phạm Minh Thuận</span>
          <span>phamminhthuan912@gmail.com</span>
        </div>
      </div>
    </footer>
  )
}
