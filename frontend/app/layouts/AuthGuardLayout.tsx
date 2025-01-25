import { Outlet, useLoaderData, useNavigate } from "react-router"
import { Route } from "../+types/root"
import { getAuthHeader } from "@/lib/authCookie"
import { graphQLClient } from "@/lib/graphQLClient"
import { CheckSignedInDocument, CheckSignedInQuery } from "@/graphql/__generated__/checkAuth"
import { useEffect } from "react"
import { NAVIGATION_PAGE_LIST } from "../routes"

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = await getAuthHeader(request)

  const { data } = await graphQLClient(cookie).query<CheckSignedInQuery>({
    query: CheckSignedInDocument,
  })

  return { isSignedIn: data.checkSignedIn.isSignedIn }
}

export default function AuthGuardLayout() {
  const navigate = useNavigate()
  const { isSignedIn } = useLoaderData<typeof loader>()

  useEffect(() => {
    if (isSignedIn) return

    // NOTE: ログインが必要だが未ログインの時、ログインページへリダイレクト
    navigate(NAVIGATION_PAGE_LIST.signInPage)
  }, [navigate, isSignedIn])

  return (
    <>
      <Outlet />
    </>
  )
}
