import * as SchemaTypes from "../../../../../graphql/__generated__/graphql-schema-types"

import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
const defaultOptions = {} as const
export type CreateTodoMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.CreateTodoInput
}>

export type CreateTodoMutation = {
  __typename?: "Mutation"
  createTodo: {
    __typename?: "CreateTodoResponse"
    id: string
    validationErrors: {
      __typename?: "CreateTodoValidationError"
      title: Array<string>
      content: Array<string>
    }
  }
}

export type CreateTodo_ValidationErrorFragment = {
  __typename?: "CreateTodoValidationError"
  title: Array<string>
  content: Array<string>
}

export const CreateTodo_ValidationErrorFragmentDoc = gql`
  fragment CreateTodo_ValidationError on CreateTodoValidationError {
    title
    content
  }
`
export const CreateTodoDocument = gql`
  mutation createTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      validationErrors {
        ...CreateTodo_ValidationError
      }
    }
  }
  ${CreateTodo_ValidationErrorFragmentDoc}
`
export type CreateTodoMutationFn = Apollo.MutationFunction<
  CreateTodoMutation,
  CreateTodoMutationVariables
>

/**
 * __useCreateTodoMutation__
 *
 * To run a mutation, you first call `useCreateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTodoMutation, { data, loading, error }] = useCreateTodoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTodoMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateTodoMutation, CreateTodoMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(
    CreateTodoDocument,
    options,
  )
}
export type CreateTodoMutationHookResult = ReturnType<typeof useCreateTodoMutation>
export type CreateTodoMutationResult = Apollo.MutationResult<CreateTodoMutation>
export type CreateTodoMutationOptions = Apollo.BaseMutationOptions<
  CreateTodoMutation,
  CreateTodoMutationVariables
>
