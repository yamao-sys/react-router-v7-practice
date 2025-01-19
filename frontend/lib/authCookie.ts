import { createCookie } from "react-router"

export const authCookie = createCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  path: "/",
  maxAge: 60 * 60 * 24 * 7 * 2,
})

export const getAuthHeader = async (request: Request) => {
  const token = await authCookie.parse(request.headers.get("Cookie"))
  const cookie = await authCookie.serialize("")
  return cookie.replace(/token=[^;]*/, `token=${token}`)
}
