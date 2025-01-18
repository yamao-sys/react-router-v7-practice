import { useEffect, useRef } from "react"
import { BoxInputForm } from "@/components/molucules/BoxInputForm"
import { SubmitButton } from "@/components/molucules/SubmitButton"
import { gql } from "@apollo/client"
import { useFetcher } from "react-router"
import { SignUp_ValidationErrorFragment, SignUpDocument, SignUpMutation } from "./__generated__"
import { Route } from "./+types"
import { graphQLClient } from "@/lib/graphQLClient"

gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      user {
        ...SignUp_User
      }
      validationErrors {
        ...SignUp_ValidationError
      }
    }
  }
`

gql`
  fragment SignUp_User on User {
    id
    name
    email
  }
`

gql`
  fragment SignUp_ValidationError on SignUpValidationError {
    name
    email
    password
  }
`

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const signUpInputs = Object.fromEntries(formData)

  const { data } = await graphQLClient.mutate<SignUpMutation>({
    mutation: SignUpDocument,
    variables: {
      input: {
        name: signUpInputs.name.toString(),
        email: signUpInputs.email.toString(),
        password: signUpInputs.password.toString(),
      },
    },
  })

  return {
    validationErrors: data?.signUp.validationErrors ?? { name: [], email: [], password: [] },
    success: !!data?.signUp.user.id,
  }
}

export default function SignUpPage() {
  const fetcher = useFetcher<{
    validationErrors: SignUp_ValidationErrorFragment
    success: boolean
  }>()
  const formRef = useRef<HTMLFormElement>(null)
  const validationErrors = fetcher.data?.validationErrors ?? { name: [], email: [], password: [] }
  const success = fetcher.data?.success ?? false

  useEffect(() => {
    if (fetcher.state !== "idle") return

    if (success) {
      window.alert("ユーザ登録に成功しました！")
      formRef.current?.reset()
      // TODO: ログインフォームへリダイレクト
    }
  }, [fetcher.state])

  return (
    <div className='p-4 md:p-16'>
      <div className='md:w-3/5 mx-auto'>
        <h3 className='mt-16 w-full text-center text-2xl font-bold'>会員登録フォーム</h3>

        <fetcher.Form ref={formRef} method='post'>
          <BoxInputForm
            labelId='name'
            labelText='ユーザ名'
            name='name'
            validationErrorMessages={validationErrors.name}
            needsMargin={true}
          />

          <BoxInputForm
            labelId='email'
            labelText='Email'
            name='email'
            validationErrorMessages={validationErrors.email}
            needsMargin={true}
          />

          <BoxInputForm
            labelId='password'
            labelText='パスワード'
            name='password'
            type='password'
            validationErrorMessages={validationErrors.password}
            needsMargin={true}
          />

          <SubmitButton labelText='登録する' color='green' />
        </fetcher.Form>
      </div>
    </div>
  )
}
