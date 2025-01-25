import { gql } from "@apollo/client"
import { useRef } from "react"
import { redirect, useFetcher, useLoaderData } from "react-router"
import { Route } from "./+types"
import { getAuthHeader } from "@/lib/authCookie"
import { graphQLClient } from "@/lib/graphQLClient"
import {
  EditTodoForm_ValidationErrorFragment,
  FetchDoEditTodoDocument,
  FetchDoEditTodoQuery,
  UpdateTodoDocument,
  UpdateTodoMutation,
} from "./__generated__"
import { TodosFormLayout } from "../components/TodosFormLayout"
import { BoxInputForm } from "@/components/molucules/BoxInputForm"
import { SubmitButton } from "@/components/molucules/SubmitButton"
import { NAVIGATION_PAGE_LIST } from "@/app/routes"

gql`
  query fetchDoEditTodo($id: ID!) {
    fetchTodo(id: $id) {
      ...EditTodoForm_Todo
    }
  }
`

gql`
  mutation updateTodo($id: ID!, $input: UpdateTodoInput!) {
    updateTodo(id: $id, input: $input) {
      id
      validationErrors {
        ...EditTodoForm_ValidationError
      }
    }
  }
`

gql`
  fragment EditTodoForm_Todo on Todo {
    id
    title
    content
  }
`

gql`
  fragment EditTodoForm_ValidationError on UpdateTodoValidationError {
    title
    content
  }
`

export async function loader({ params, request }: Route.LoaderArgs) {
  const cookie = await getAuthHeader(request)

  const { data } = await graphQLClient(cookie).query<FetchDoEditTodoQuery>({
    query: FetchDoEditTodoDocument,
    variables: {
      id: params.id,
    },
  })

  return { todo: data.fetchTodo }
}

export async function action({ params, request }: Route.ActionArgs) {
  const formData = await request.formData()
  const input = Object.fromEntries(formData)

  const cookie = await getAuthHeader(request)
  const { data } = await graphQLClient(cookie).mutate<UpdateTodoMutation>({
    mutation: UpdateTodoDocument,
    variables: {
      id: params.id,
      input,
    },
  })

  if (!!data?.updateTodo.id) {
    return redirect(NAVIGATION_PAGE_LIST.todosPage)
  }

  return {
    validationErrors: data?.updateTodo.validationErrors ?? { title: [], content: [] },
  }
}

export default function TodosEditPage() {
  const { todo } = useLoaderData<typeof loader>()

  const fetcher = useFetcher<{
    validationErrors: EditTodoForm_ValidationErrorFragment
  }>()
  const formRef = useRef<HTMLFormElement>(null)
  const validationErrors = fetcher.data?.validationErrors ?? { title: [], content: [] }

  return (
    <TodosFormLayout header='TODO編集'>
      <fetcher.Form ref={formRef} method='post'>
        <BoxInputForm
          labelId='title'
          labelText='タイトル'
          name='title'
          defaultValue={todo.title}
          validationErrorMessages={validationErrors.title}
          needsMargin={true}
        />

        <BoxInputForm
          labelId='content'
          labelText='内容'
          name='content'
          defaultValue={todo.content}
          validationErrorMessages={validationErrors.content}
          needsMargin={true}
        />

        <SubmitButton labelText='保存する' color='green' />
      </fetcher.Form>
    </TodosFormLayout>
  )
}
