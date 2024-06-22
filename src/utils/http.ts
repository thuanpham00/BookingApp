import axios, { AxiosInstance } from "axios"
import { authType } from "src/types/auth.type"
import { isAxiosError } from "./utils"
import { toast } from "react-toastify"

// cấu hình cơ bản của baseURL
const authEndpoint = "https://test.api.amadeus.com/v1/security/oauth2/token"
const APIkey = "LrkpfAKnVraTBXv6mMgkdUymcgyRYSRA"
const APIsecret = "KYm4yBAxE0wNG7OO"

class http {
  instance: AxiosInstance
  private accessToken: string | null
  constructor() {
    this.accessToken = null // khởi tạo
    this.instance = axios.create({
      baseURL: "https://test.api.amadeus.com/v2/",
      timeout: 10000, // thời gian chờ
      headers: {
        "Content-Type": "application/json" // yêu cầu server trả về kết quả json
      }
    })
    this.instance.interceptors.request.use(
      async (config) => {
        if (!this.accessToken) {
          await this.getAccessToken()
        } // nếu không có token thì gọi ra
        if (config.headers && this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}` // Bearer not bear
        } // nếu có token thì request lên server để xác thực người dùng
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        console.log(response)
        return response
      },
      async (error) => {
        if (isAxiosError(error) && error.response?.status === 401) {
          console.log(error)
          const data = error.message
          toast.error(data)
          await this.getAccessToken() // trong hàm này có set Token rồi - chỉ cần chạy
          if (this.accessToken && error.config) {
            error.config.headers = error.config.headers || {}
            error.config.headers.Authorization = `Bearer ${this.accessToken}`
            return axios.request(error.config) // thực hiện lại request
          }
        }
      }
    )
  }

  // hàm nảy xử lý bất đồng bộ
  async getAccessToken() {
    try {
      const response = await axios.post<authType>(
        authEndpoint,
        `grant_type=client_credentials&client_id=${APIkey}&client_secret=${APIsecret}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
      // lấy accessToken từ kết quả trả về
      this.accessToken = response.data.access_token
    } catch (error) {
      console.log(error)
    }
  }
}

const Http = new http().instance
export default Http
