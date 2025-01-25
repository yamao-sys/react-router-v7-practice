import { type RouteConfig, index, layout, route } from "@react-router/dev/routes"

const NAVIGATION_PATH_LIST = {
  top: "/",
  signUpPage: "sign_up",
  signInPage: "sign_in",
  todosPage: "todos",
  todosNewPage: "todos/new",
  todosEditPage: "todos/:id",
}

export const NAVIGATION_PAGE_LIST = {
  top: NAVIGATION_PATH_LIST.top,
  signUpPage: `/${NAVIGATION_PATH_LIST.signUpPage}`,
  signInPage: `/${NAVIGATION_PATH_LIST.signInPage}`,
  todosPage: `/${NAVIGATION_PATH_LIST.todosPage}`,
}

export default [
  index("routes/home.tsx"),
  route(NAVIGATION_PATH_LIST.signUpPage, "pages/sign_up/index.tsx"),
  route(NAVIGATION_PATH_LIST.signInPage, "pages/sign_in/index.tsx"),
  layout("./layouts/AuthGuardLayout.tsx", [
    route(NAVIGATION_PATH_LIST.todosPage, "pages/todos/index.tsx"),
    route(NAVIGATION_PATH_LIST.todosNewPage, "pages/todos/new/index.tsx"),
    route(NAVIGATION_PATH_LIST.todosEditPage, "pages/todos/[id]/index.tsx"),
  ]),
] satisfies RouteConfig
