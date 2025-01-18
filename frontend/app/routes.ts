import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("sign_up", "pages/sign_up/index.tsx"),
] satisfies RouteConfig
