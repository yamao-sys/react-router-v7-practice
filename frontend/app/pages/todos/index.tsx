import { gql } from "@apollo/client"
import { TodosList } from "./components/TodosList"
import { Route } from "./+types"
import { graphQLClient } from "@/lib/graphQLClient"
import { FetchTodoListsDocument, FetchTodoListsQuery } from "./__generated__"
import { useFetcher, useLoaderData } from "react-router"
import { getAuthHeader } from "@/lib/authCookie"
import { TodosLayout } from "./layout"
import {
  DeleteTodoDocument,
  DeleteTodoMutation,
  TodosList_TodoFragment,
} from "./components/TodosList/__generated__"
import { useEffect, useState } from "react"

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

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const id = formData.get("id")

  const cookie = await getAuthHeader(request)
  const { data } = await graphQLClient(cookie).mutate<DeleteTodoMutation>({
    mutation: DeleteTodoDocument,
    variables: {
      id,
    },
  })

  console.log(`data?.deleteTodo: ${data?.deleteTodo}`)

  return { todoId: data?.deleteTodo, success: !!data?.deleteTodo }
}

export default function TodosPage() {
  const { todos } = useLoaderData<typeof loader>()
  const [displayableTodos, setDisplayableTodos] = useState<Array<TodosList_TodoFragment>>(todos)

  const fetcher = useFetcher<{ todoId: string; success: boolean }>()

  useEffect(() => {
    if (!fetcher.data?.success) return

    const todoId = fetcher.data?.todoId
    const todo = displayableTodos.find((t) => Number(t.id) === Number(todoId))
    window.alert(`${todo?.title}の削除に成功しました!`)

    setDisplayableTodos((prev) => prev.filter((t) => Number(t.id) !== Number(todoId)))
  }, [fetcher.data])

  return (
    <TodosLayout>
      <div className='mt-16'>
        <TodosList todos={displayableTodos} fetcher={fetcher} />
      </div>
    </TodosLayout>
  )
}
