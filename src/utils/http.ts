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
  private tokenAPI: string | null
  constructor() {
    this.tokenAPI = null // khởi tạo
    this.instance = axios.create({
      baseURL: "https://test.api.amadeus.com/v2/",
      timeout: 10000, // thời gian chờ
      headers: {
        "Content-Type": "application/json" // yêu cầu server trả về kết quả json
      }
    })
    this.instance.interceptors.request.use(
      async (config) => {
        if (!this.tokenAPI) {
          await this.getAccessToken()
        } // nếu không có token thì gọi ra
        if (config.headers && this.tokenAPI) {
          config.headers.Authorization = `Bearer ${this.tokenAPI}` // Bearer not bearer // đại diện cho các tiêu đề http gửi đi // tên tiêu đề 'Authorization'
        } // nếu có token thì request lên server để xác thực người dùng
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        // console.log(response)
        return response
      },
      async (error) => {
        if (isAxiosError(error) && error.response?.status === 401) {
          toast.error(error.message)
          await this.getAccessToken() // trong hàm này có set Token rồi - chỉ cần chạy
          if (error.config && this.tokenAPI) {
            error.config.headers.Authorization = `Bearer ${this.tokenAPI}`
            return axios.request(error.config) // thực hiện lại request
          }
          location.reload()
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
      this.tokenAPI = response.data.access_token
      // console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}

const Http = new http().instance
export default Http
