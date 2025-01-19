import { type RouteConfig, index, route } from "@react-router/dev/routes"

export const NAVIGATION_PATH_LIST = {
  top: "/",
  signUpPage: "sign_up",
  signInPage: "sign_in",
  todosPage: "todos",
}

export default [
  index("routes/home.tsx"),
  route(NAVIGATION_PATH_LIST.signUpPage, "pages/sign_up/index.tsx"),
  route(NAVIGATION_PATH_LIST.signInPage, "pages/sign_in/index.tsx"),
  route(NAVIGATION_PATH_LIST.todosPage, "pages/todos/index.tsx"),
] satisfies RouteConfig
