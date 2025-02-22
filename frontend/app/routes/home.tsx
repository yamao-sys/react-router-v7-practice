import type { Route } from "./+types/home"
import { getAuthHeader } from "@/lib/authCookie"
import { graphQLClient } from "@/lib/graphQLClient"
import { CheckSignedInDocument, CheckSignedInQuery } from "@/graphql/__generated__/checkAuth"
import { useLoaderData, useNavigate } from "react-router"
import { useEffect } from "react"
import { NAVIGATION_PAGE_LIST } from "../routes"

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = await getAuthHeader(request)

  const { data } = await graphQLClient(cookie).query<CheckSignedInQuery>({
    query: CheckSignedInDocument,
  })

  return { isSignedIn: data.checkSignedIn.isSignedIn }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Home() {
  const navigate = useNavigate()
  const { isSignedIn } = useLoaderData<typeof loader>()

  useEffect(() => {
    const doNavigatePath = isSignedIn
      ? NAVIGATION_PAGE_LIST.todosPage
      : NAVIGATION_PAGE_LIST.signInPage

    navigate(doNavigatePath)
  }, [navigate, isSignedIn])

  return (
    <>
      <p>Loading ...</p>
    </>
  )
}
