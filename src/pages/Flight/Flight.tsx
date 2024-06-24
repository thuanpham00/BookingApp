import { Helmet } from "react-helmet-async"
import banner from "../../img/Flight/banner.jpg"
import { FlightOfferParamsConfig } from "src/types/flight.type"
import { useQuery } from "@tanstack/react-query"
import useQueryConfig from "src/hooks/useQueryConfig"
import { flightApi } from "src/apis/flight.api"

import { Button } from "src/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "src/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "src/components/ui/popover"
import { useState } from "react"

const frameworks = [
  {
    value: "ECONOMY",
    label: "ECONOMY"
  },
  {
    value: "PREMIUM_ECONOMY",
    label: "PREMIUM_ECONOMY"
  },
  {
    value: "BUSINESS",
    label: "BUSINESS"
  },
  {
    value: "FIRST",
    label: "FIRST"
  }
]

export default function Flight() {
  const queryConfig = useQueryConfig()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const getFlightOffersQuery = useQuery({
    queryKey: ["flightOffers", queryConfig],
    queryFn: () => {
      return flightApi.flightOffersSearch(queryConfig as FlightOfferParamsConfig)
    }
  })

  console.log(getFlightOffersQuery.data?.data)
  return (
    <div>
      <Helmet>
        <title>Search Flight</title>
        <meta name="description" content="Home - Amadeus Booking" />
      </Helmet>

      <div className="container">
        <div className="py-4 h-[600px]">
          <div className="w-full h-[400px] relative">
            <img src={banner} alt="banner" className="w-full h-full rounded-md" />

            <div className="absolute left-[70px] top-28">
              <h1 className="text-[#f2f2f2] text-6xl font-bold">
                Compare and Book Cheap Flights on Over 500 Airlines
              </h1>
            </div>

            <div className="w-[90%] shadow-md absolute left-1/2 -translate-x-1/2 -bottom-1">
              <h2 className="bg-gray-300 rounded-tl-lg rounded-tr-lg py-6 px-6 border-b border-b-gray-300 text-2xl text-textColor font-semibold ">
                Search for flights to find the best options for your travel needs.
              </h2>
              <form noValidate className="py-4 px-6 bg-[#f2f2f2] rounded-bl-lg rounded-br-lg ">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <input type="radio" name="flight" id="oneway" checked className="w-5 h-5" />
                      <label htmlFor="oneway" className="text-base text-textColor font-semibold">
                        One Way
                      </label>
                    </div>
                    <div className="flex items-center gap-1">
                      <input type="radio" name="flight" id="roundtrip" className="w-5 h-5" />
                      <label htmlFor="roundtrip" className="text-base text-textColor font-semibold">
                        Round Trip
                      </label>
                    </div>
                  </div>
                  <div className="my-4 w-[2px] h-4 bg-textColor"></div>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                      >
                        {value
                          ? frameworks.find((framework) => framework.value === value)?.label
                          : "Select Travel class..."}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandList>
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {frameworks.map((framework) => (
                              <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                  setValue(currentValue === value ? "" : currentValue)
                                  setOpen(false)
                                }}
                              >
                                {framework.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
