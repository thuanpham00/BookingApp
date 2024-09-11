import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export default function Footer() {
  const { t } = useTranslation("footer")

  return (
    <footer className="w-full absolute bottom-0 bg-[#022d5c] py-8">
      <div className="container">
        <div className="flex items-center justify-between pb-4 border-b text-whiteColor border-b-[#4e6c8d]">
          <h2 className="font-semibold text-xl">Booking</h2>
          <div className="flex items-center gap-8">
            <span className="font-semibold text-xl">{t("footer.connect")}</span>
            <div className="flex gap-2">
              <Link
                to="https://www.facebook.com/domaybatduoctao912"
                target="_blank"
                aria-label="Facebook"
                className="w-7 h-7 bg-whiteColor rounded-full flex items-center justify-center"
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
                aria-label="Instagram"
                className="w-7 h-7 bg-whiteColor rounded-full flex items-center justify-center"
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

        <div className="py-4 grid grid-cols-4 md:grid-cols-12 gap-4 flex-wrap border-b border-b-[#4e6c8d]">
          <div className="col-span-2 md:col-span-3">
            <h3 className="text-sm hover:underline duration-200 cursor-pointer text-whiteColor">
              {t("footer.text-col1-1")}
            </h3>
            <ul className="mt-4">
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col1-2")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col1-3")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col1-4")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col1-5")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col1-6")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col1-7")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3">
            <h3 className="text-sm hover:underline duration-200 cursor-pointer text-whiteColor">
              BOOKING
            </h3>
            <ul className="mt-4">
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col2-1")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col2-2")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col2-3")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col2-4")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col2-5")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col2-6")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3">
            <h3 className="text-sm hover:underline duration-200 cursor-pointer text-whiteColor">
              {t("footer.text-col3-1")}
            </h3>
            <ul className="mt-4">
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col3-2")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col3-3")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col3-4")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col3-5")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col3-6")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col3-7")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col3-8")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col3-9")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3">
            <h3 className="text-sm hover:underline duration-200 cursor-pointer text-whiteColor">
              {t("footer.text-col4-1")}
            </h3>
            <ul className="mt-4">
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col4-2")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col4-3")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col4-4")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col4-5")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col4-6")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col4-7")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="font-normal text-sm hover:underline duration-200 cursor-pointer text-whiteColor/80"
                >
                  {t("footer.text-col4-8")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-whiteColor">Phạm Minh Thuận</span>
          <span className="text-whiteColor">phamminhthuan912@gmail.com</span>
        </div>
      </div>
    </footer>
  )
}
