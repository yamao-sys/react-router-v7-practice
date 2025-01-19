import { gql } from "@apollo/client"
import { TodosList } from "./components/TodosList"
import { Route } from "./+types"
import { graphQLClient } from "@/lib/graphQLClient"
import { FetchTodoListsDocument, FetchTodoListsQuery } from "./__generated__"
import { useLoaderData } from "react-router"
import { getAuthHeader } from "@/lib/authCookie"
import { TodosLayout } from "./layout"

gql`
  query fetchTodoLists {
    fetchTodoLists {
      ...TodosList_Todo
    }
  }
`

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = await getAuthHeader(request)

  const { data } = await graphQLClient(cookie).query<FetchTodoListsQuery>({
    query: FetchTodoListsDocument,
  })

  return { todos: data.fetchTodoLists }
}

export default function TodosPage() {
  const { todos } = useLoaderData<typeof loader>()

  return (
    <TodosLayout>
      <div className='mt-16'>
        <TodosList todos={todos} />
      </div>
    </TodosLayout>
  )
}
