import { gql } from "@apollo/client"
import { TodosList } from "./components/TodosList"
import { Route } from "./+types"
import { graphQLClient } from "@/lib/graphQLClient"
import { FetchTodoListsDocument, FetchTodoListsQuery } from "./__generated__"
import { useLoaderData } from "react-router"
import { authCookie } from "@/lib/authCookie"

gql`
  query fetchTodoLists {
    fetchTodoLists {
      ...TodosList_Todo
    }
  }
`

export async function loader({ request }: Route.LoaderArgs) {
  const token = await authCookie.parse(request.headers.get("Cookie"))
  const cookie = await authCookie.serialize("")
  const updatedCookie = cookie.replace(/token=[^;]*/, `token=${token}`)

  const { data } = await graphQLClient(updatedCookie).query<FetchTodoListsQuery>({
    query: FetchTodoListsDocument,
  })

  return { todos: data.fetchTodoLists }
}

export default function TodosPage() {
  const { todos } = useLoaderData<typeof loader>()

  return (
    <div className='mt-16'>
      <TodosList todos={todos} />
    </div>
  )
}
