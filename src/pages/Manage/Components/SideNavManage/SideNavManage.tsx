import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"
import { path } from "src/constant/path"
import tickerOfferFlight from "src/img/Flight/air-ticket-offer_4.webp"

export default function SideNavManage() {
  const { t } = useTranslation("manage")

  return (
    <div>
      <div className="w-full rounded-lg bg-white px-2 py-4 shadow-md">
        <NavLink
          to={path.ManageTicket}
          className={({ isActive }) =>
            `${isActive ? "text-blue-500 bg-[#edf0f9]" : "text-textColor"} flex items-center gap-3 p-2 mb-2 rounded-lg`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
            />
          </svg>
          <span className="text-base font-medium">{t("manage.manageSuccess")}</span>
        </NavLink>

        <NavLink
          to={path.CancelTicket}
          className={({ isActive }) =>
            `${isActive ? "text-blue-500 bg-[#edf0f9]" : "text-textColor"} flex items-center gap-3 p-2 mb-2 rounded-lg`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>

          <span className="text-base font-medium">{t("manage.manageCancel")}</span>
        </NavLink>

        <NavLink
          to={path.ManageUser}
          className={({ isActive }) =>
            `${isActive ? "text-blue-500 bg-[#edf0f9]" : "text-textColor"} flex items-center gap-3 p-2 mb-2 rounded-lg`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>

          <span className="text-base font-medium">{t("manage.manageUser")}</span>
        </NavLink>
      </div>

      <div className="hidden md:block mt-4">
        <img
          src={tickerOfferFlight}
          alt="tickerOfferFlight"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}
