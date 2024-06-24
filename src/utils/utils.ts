import axios, { AxiosError } from "axios"

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError<T>(error)
}

export const getNameToEmail = (email: string) => {
  if (email) {
    const result = email.split("@")
    return result[0]
  }
  return null
}
