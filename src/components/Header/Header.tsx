import { Link } from "react-router-dom"
import { path } from "src/constant/path"
import logo from "../../img/favicon/FaviconFlight.png"
import coVN from "../../img/lauguage/coVN.png"
import coMy from "../../img/lauguage/coMy.jpg"
import hotel from "../../img/svg/hotel-svgrepo-com.svg"
import { useContext } from "react"
import { AppContext } from "src/context/useContext"
import Popover from "../Popover"
import { getNameToEmail } from "src/utils/utils"
import { clearLS } from "src/utils/auth"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "src/components/ui/navigation-menu"

export default function Header() {
  const { isAuthenticated, isProfile, setIsAuthenticated, setIsProfile } = useContext(AppContext)

  const handleLogOut = () => {
    clearLS()
    setIsAuthenticated(false)
    setIsProfile(null)
  }

  return (
    <header className="sticky left-0 top-0 z-10">
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
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="w-14 h-14">
                  <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-xl text-textColor font-semibold">Amadeus Booking</h1>
              </div>

              <nav className="ml-8 flex items-center">
                <Link
                  to={path.home}
                  className="flex items-center text-textColor duration-200 hover:text-gray-500 mr-6"
                >
                  <span className="text-base font-semibold hover:underline block">Home</span>
                </Link>

                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>
                        <div className="flex items-center text-textColor duration-200 hover:text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 mr-1"
                          >
                            <path d="m20.505 7.5-15.266.022.672.415-1.1-2.2a.75.75 0 0 0-.638-.414l-2.293-.1C.82 5.228-.003 6.06.003 7.083c.002.243.051.484.146.709l2.072 4.68a2.95 2.95 0 0 0 2.701 1.778h4.043l-.676-1.075-2.484 5.168A1.83 1.83 0 0 0 7.449 21h2.099a1.85 1.85 0 0 0 1.419-.664l5.165-6.363-.582.277h4.956c1.82.09 3.399-1.341 3.49-3.198l.004-.134a3.426 3.426 0 0 0-3.44-3.419l-.074.001zm.02 1.5h.042a1.924 1.924 0 0 1 1.933 1.914l-.002.065a1.866 1.866 0 0 1-1.955 1.772l-4.993-.001a.75.75 0 0 0-.582.277l-5.16 6.355a.35.35 0 0 1-.26.118h-2.1a.336.336 0 0 1-.3-.49l2.493-5.185a.75.75 0 0 0-.676-1.075H4.924a1.45 1.45 0 0 1-1.328-.878l-2.07-4.676a.35.35 0 0 1 .326-.474l2.255.1-.638-.415 1.1 2.2a.75.75 0 0 0 .672.415L20.507 9zm-4.202-1.24-2.992-4.02A1.85 1.85 0 0 0 11.85 3H9.783a1.85 1.85 0 0 0-1.654 2.672l1.439 2.91a.75.75 0 0 0 1.344-.664l-1.44-2.911a.35.35 0 0 1 .312-.507h2.066a.35.35 0 0 1 .279.14l2.99 4.017a.75.75 0 1 0 1.203-.896z"></path>
                          </svg>
                          <span className="text-base font-semibold hover:underline block">
                            Flight
                          </span>
                        </div>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <NavigationMenuLink>
                          <div className="bg-[#f2f2f2] rounded-sm shadow-lg min-w-[150px] border border-gray-300">
                            <Link
                              to={path.flightSearch}
                              className="block py-3 px-3 bg-[#f2f2f2] hover:bg-gray-300 duration-200"
                            >
                              Search Flights
                            </Link>
                            <Link
                              to={path.flightManage}
                              className="block py-3 px-3 bg-[#f2f2f2] hover:bg-gray-300 duration-200"
                            >
                              Manage Bookings
                            </Link>
                            <div className="py-3 px-3 bg-[#f2f2f2] hover:bg-gray-300 duration-200">
                              Seat Selection
                            </div>
                            <div className="py-3 px-3 bg-[#f2f2f2] hover:bg-gray-300 duration-200">
                              Branded Fares
                            </div>
                          </div>
                        </NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>
                        <Link
                          to={path.flightSearch}
                          className="flex items-center text-textColor duration-200 hover:text-gray-500"
                        >
                          <img src={hotel} alt="icon hotel" className="w-4 h-4 mr-1" />
                          <span className="text-base font-semibold hover:underline block">
                            Hotel
                          </span>
                        </Link>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <NavigationMenuLink>thuan</NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <Popover
                className="sticky top-0 left-0 z-30"
                renderPopover={
                  <div className="shadow-lg rounded flex flex-col border border-gray-300">
                    <button className="text-base flex items-center gap-2 text-left min-w-[120px] p-3 bg-[#edf2f4] text-textColor hover:bg-gray-300 duration-200 border border-gray-300">
                      <img src={coVN} alt="Cờ Việt Nam" className="h-6 w-6 object-contain" />
                      Vietnamese
                    </button>

                    <button className="text-base flex items-center gap-2 text-left min-w-[120px] p-3 bg-[#edf2f4] text-textColor hover:bg-gray-300 duration-200">
                      <img src={coMy} alt="Cờ Mỹ" className="h-6 w-6 object-contain" />
                      English
                    </button>
                  </div>
                }
              >
                <div className="flex gap-1 items-center py-2 px-3 border-2 border-gray-300 rounded-3xl duration-200 hover:bg-[#ddd]/80 text-base text-textColor">
                  <img src={coVN} alt="Cờ Việt Nam" className="h-5 w-5 object-contain" />
                  Language
                </div>
              </Popover>

              {isAuthenticated && (
                <Popover
                  className="sticky top-0 left-0 z-30"
                  renderPopover={
                    <div className="shadow-lg rounded flex flex-col border border-gray-300">
                      <button className="text-base text-left w-[140px] px-4 py-3 bg-[#edf2f4] text-textColor hover:bg-gray-300 duration-200 border-b border-gray-300">
                        My profile
                      </button>

                      <button
                        onClick={handleLogOut}
                        className="text-base text-left w-[140px] px-4 py-3 bg-[#edf2f4] text-textColor hover:bg-gray-300 duration-200 flex items-center gap-2"
                      >
                        Logout
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                          />
                        </svg>
                      </button>
                    </div>
                  }
                >
                  <div className="p-2 border-2 border-blueColor rounded-3xl duration-200 hover:bg-[#ddd]/80 flex items-center gap-1 text-base text-textColor font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>

                    {getNameToEmail(isProfile as string)}
                  </div>
                </Popover>
              )}

              {!isAuthenticated && (
                <div className="flex items-center gap-2">
                  <Link
                    to={path.register}
                    className="py-2 px-3 border-2 border-blueColor rounded-3xl duration-200 hover:bg-[#ddd]/80"
                  >
                    Register
                  </Link>
                  <Link
                    to={path.login}
                    className="py-2 px-3 border-2 border-blueColor bg-blueColor text-[#f2f2f2] rounded-3xl duration-200 hover:bg-blueColor/80 hover:border-blueColor/80"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
