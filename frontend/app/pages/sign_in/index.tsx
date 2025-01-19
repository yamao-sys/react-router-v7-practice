import { BoxInputForm } from "@/components/molucules/BoxInputForm"
import { SubmitButton } from "@/components/molucules/SubmitButton"
import { ValidationErrorMessages } from "@/components/molucules/ValidationErrorMessages"
import { gql } from "@apollo/client"
import { useRef } from "react"
import { redirect, useFetcher } from "react-router"
import { SignInDocument, SignInMutation } from "./__generated__"
import { Route } from "./+types"
import { graphQLClient } from "@/lib/graphQLClient"
import { NAVIGATION_PATH_LIST } from "@/app/routes"
import { authCookie } from "@/lib/authCookie"

gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) {
      validationError
      token
    }
  }
`

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const signInInputs = Object.fromEntries(formData)

  const { data } = await graphQLClient().mutate<SignInMutation>({
    mutation: SignInDocument,
    variables: {
      input: {
        email: signInInputs.email.toString(),
        password: signInInputs.password.toString(),
      },
    },
  })

  if (data?.signIn.token) {
    return redirect(`/${NAVIGATION_PATH_LIST.todosPage}`, {
      headers: {
        "Set-Cookie": await authCookie.serialize(data?.signIn.token),
      },
    })
  }

  return {
    validationErrors: data?.signIn.validationError ?? "",
  }
}

export default function SignInPage() {
  const fetcher = useFetcher<{
    validationError: SignInMutation["signIn"]["validationError"]
  }>()
  const formRef = useRef<HTMLFormElement>(null)
  const validationError = fetcher.data?.validationError ?? ""

  return (
    <div className='p-4 md:p-16'>
      <div className='md:w-3/5 mx-auto'>
        <h3 className='mt-16 w-full text-center text-2xl font-bold'>ログインフォーム</h3>

        <ValidationErrorMessages messages={validationError ? [validationError] : []} />

        <fetcher.Form ref={formRef} method='post'>
          <BoxInputForm
            labelId='email'
            labelText='Email'
            name='email'
            validationErrorMessages={[]}
            needsMargin={true}
          />

          <BoxInputForm
            labelId='password'
            labelText='パスワード'
            name='password'
            type='password'
            validationErrorMessages={[]}
            needsMargin={true}
          />

          <SubmitButton labelText='ログインする' color='green' />
        </fetcher.Form>
      </div>
    </div>
  )
}
