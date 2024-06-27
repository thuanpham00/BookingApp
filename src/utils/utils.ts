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

export const getCodeAirport = (code: string) => {
  if (code) {
    const result = code.split(" - ")
    return result[1]
  }
  return null
}
// Wed Jun 05 2024 00:00:00 GMT+0700 (Indochina Time)
export const convertToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear().toString()
  const month = ("0" + (date.getMonth() + 1)).slice(-2)
  const day = ("0" + date.getDate()).slice(-2)
  return `${year}-${month}-${day}`
}
