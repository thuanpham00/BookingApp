import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import FLIGHT_EN from "src/locales/en/flight.json"
import FLIGHT_VI from "src/locales/vi/flight.json"
import FOOTER_EN from "src/locales/en/footer.json"
import FOOTER_VI from "src/locales/vi/footer.json"
import CART_EN from "src/locales/en/cart.json"
import CART_VI from "src/locales/vi/cart.json"
import AUTH_EN from "src/locales/en/loginRegister.json"
import AUTH_VI from "src/locales/vi/loginRegister.json"
import MANAGE_EN from "src/locales/en/manage.json"
import MANAGE_VI from "src/locales/vi/manage.json"

export const locales = {
  en: "English",
  vi: "Tiếng việt"
}

export const resources = {
  // namespace
  en: {
    flight: FLIGHT_EN,
    footer: FOOTER_EN,
    cart: CART_EN,
    auth: AUTH_EN,
    manage: MANAGE_EN
  },
  vi: {
    flight: FLIGHT_VI,
    footer: FOOTER_VI,
    cart: CART_VI,
    auth: AUTH_VI,
    manage: MANAGE_VI
  }
}

export const defaultNS = "flight" // giúp ko có truyền namespace thì lấy mặc định home

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: "en", // ngôn ngữ mặc định
  ns: ["flight", "footer", "cart", "auth", "manage"],
  defaultNS,
  fallbackLng: "vi", // khi gặp lỗi nó mặc định ngôn ngữ
  interpolation: {
    escapeValue: false // chống xss
  }
})
