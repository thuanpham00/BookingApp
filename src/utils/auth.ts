export const setAccessTokenToLS = (accessToken: string) => {
  return localStorage.setItem("accessToken", accessToken)
}

export const getAccessTokenToLS = () => {
  return localStorage.getItem("accessToken") || ""
}

export const setProfileToLS = (profile: string) => {
  return localStorage.setItem("profile", profile)
}

export const getProfileToLS = () => {
  return localStorage.getItem("profile") || ""
}

export const setUuidUserToLS = (uuid: string) => {
  return localStorage.setItem("uuid", uuid)
}

export const getUuidUserToLS = () => {
  return localStorage.getItem("uuid") || ""
}

export const clearLS = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("profile")
  localStorage.removeItem("uuid")
}
