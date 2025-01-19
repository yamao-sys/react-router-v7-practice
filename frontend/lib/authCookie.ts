import { createCookie } from "react-router"

export const authCookie = createCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  path: "/",
  maxAge: 60 * 60 * 24 * 7 * 2,
})
