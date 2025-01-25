import { gql } from "@apollo/client"
import { TodosList_TodoFragment } from "./__generated__"
import { FC } from "react"
import { BaseButton } from "@/components/atoms/BaseButton"
import { FetcherWithComponents, useNavigate } from "react-router"
import { NAVIGATION_PAGE_LIST } from "@/app/routes"

gql`
  fragment TodosList_Todo on Todo {
    id
    title
    createdAt
    updatedAt
  }
`

gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`

type Props = {
  todos: Array<TodosList_TodoFragment>
  fetcher: FetcherWithComponents<{ success: boolean }>
}

export const TodosList: FC<Props> = ({ todos, fetcher }: Props) => {
  const navigate = useNavigate()

  const handleDeleteTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id)

    if (!window.confirm(`${todo?.title}を本当に削除しますか?`)) {
      return
    }

    // サーバーに削除リクエストを送信
    await fetcher.submit({ id }, { method: "post" })
  }

  const handleRouteToEditPage = (id: string) => navigate(`${NAVIGATION_PAGE_LIST.todosPage}/${id}`)

  return (
    <>
      {!todos.length ? (
        <div className='text-center'>まだ登録済みTodoが0件です。</div>
      ) : (
        todos.map((todo) => {
          return (
            <div key={todo.title} className='[&:not(:first-child)]:mt-8 border-2 border-gray-900'>
              <div className='p-2 flex justify-between'>
                <div className='sm:w-1/2 lg:w-3/5 text-lg md:text-3xl break-words'>
                  {todo.title}
                </div>
                <div className='sm:w-1/2 lg:w-2/5 flex justify-around'>
                  <BaseButton
                    labelText='編集する'
                    color='green'
                    additionalStyle='text-xs lg:text-sm'
                    onClick={() => handleRouteToEditPage(todo.id)}
                  />
                  <BaseButton
                    labelText='削除する'
                    color='red'
                    additionalStyle='ml-4 text-xs lg:text-sm'
                    onClick={() => handleDeleteTodo(todo.id)}
                  />
                </div>
              </div>
            </div>
          )
        })
      )}
    </>
  )
}
