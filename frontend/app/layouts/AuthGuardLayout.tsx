import { Outlet, useLoaderData, useNavigate } from "react-router"
import { Route } from "../+types/root"
import { getAuthHeader } from "@/lib/authCookie"
import { graphQLClient } from "@/lib/graphQLClient"
import { CheckSignedInDocument, CheckSignedInQuery } from "@/graphql/__generated__/checkAuth"
import { useEffect } from "react"
import { NAVIGATION_PAGE_LIST } from "../routes"
import { useAuthSetContext } from "@/contexts/AuthContext"
import { UserDocument, UserQuery } from "@/graphql/__generated__/user"

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = await getAuthHeader(request)

  const { data } = await graphQLClient(cookie).query<CheckSignedInQuery>({
    query: CheckSignedInDocument,
  })

  const { data: d } = await graphQLClient(cookie).query<UserQuery>({
    query: UserDocument,
  })

  return { isSignedIn: data.checkSignedIn.isSignedIn, userName: d.user.name }
}

export default function AuthGuardLayout() {
  const navigate = useNavigate()
  const { isSignedIn, userName } = useLoaderData<typeof loader>()

  const { setAuth } = useAuthSetContext()

  useEffect(() => {
    if (isSignedIn) {
      setAuth({ userName })
      return
    }

    // NOTE: ログインが必要だが未ログインの時、ログインページへリダイレクト
    navigate(NAVIGATION_PAGE_LIST.signInPage)
  }, [navigate, isSignedIn, userName])

  return (
    <>
      <Outlet />
    </>
  )
}
