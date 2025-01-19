import { gql } from "@apollo/client"
import { Route } from "./+types"
import { getAuthHeader } from "@/lib/authCookie"
import { graphQLClient } from "@/lib/graphQLClient"
import {
  CreateTodo_ValidationErrorFragment,
  CreateTodoDocument,
  CreateTodoMutation,
} from "./__generated__"
import { redirect, useFetcher } from "react-router"
import { useRef } from "react"
import { BoxInputForm } from "@/components/molucules/BoxInputForm"
import { SubmitButton } from "@/components/molucules/SubmitButton"
import { NAVIGATION_PATH_LIST } from "@/app/routes"
import { TodosFormLayout } from "../components/TodosFormLayout"

gql`
  mutation createTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      validationErrors {
        ...CreateTodo_ValidationError
      }
    }
  }
`

gql`
  fragment CreateTodo_ValidationError on CreateTodoValidationError {
    title
    content
  }
`

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const input = Object.fromEntries(formData)

  const cookie = await getAuthHeader(request)
  const { data } = await graphQLClient(cookie).mutate<CreateTodoMutation>({
    mutation: CreateTodoDocument,
    variables: {
      input,
    },
  })

  if (!!data?.createTodo.id) {
    return redirect(`/${NAVIGATION_PATH_LIST.todosPage}`)
  }

  return {
    validationErrors: data?.createTodo.validationErrors ?? { title: [], content: [] },
  }
}

export default function TodosNewPage() {
  const fetcher = useFetcher<{
    validationErrors: CreateTodo_ValidationErrorFragment
  }>()
  const formRef = useRef<HTMLFormElement>(null)
  const validationErrors = fetcher.data?.validationErrors ?? { title: [], content: [] }

  return (
    <TodosFormLayout header='TODO作成'>
      <fetcher.Form ref={formRef} method='post'>
        <BoxInputForm
          labelId='title'
          labelText='タイトル'
          name='title'
          validationErrorMessages={validationErrors.title}
          needsMargin={true}
        />

        <BoxInputForm
          labelId='content'
          labelText='内容'
          name='content'
          validationErrorMessages={validationErrors.content}
          needsMargin={true}
        />

        <SubmitButton labelText='登録する' color='green' />
      </fetcher.Form>
    </TodosFormLayout>
  )
}
