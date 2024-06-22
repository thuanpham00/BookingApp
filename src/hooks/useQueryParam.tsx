import { useSearchParams } from "react-router-dom"

export default function useQueryParam() {
  const [queryParam] = useSearchParams() // lấy tham số truy vấn trên URL xuống
  const resultQueryParam = Object.fromEntries([...queryParam]) // chuyển thành cặp key value
  return resultQueryParam
}
