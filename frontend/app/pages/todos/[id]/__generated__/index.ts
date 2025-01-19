import * as SchemaTypes from "../../../../../graphql/__generated__/graphql-schema-types"

import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
const defaultOptions = {} as const
export type FetchDoEditTodoQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars["ID"]["input"]
}>

export type FetchDoEditTodoQuery = {
  __typename?: "Query"
  fetchTodo: { __typename?: "Todo"; id: string; title: string; content: string }
}

export type UpdateTodoMutationVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars["ID"]["input"]
  input: SchemaTypes.UpdateTodoInput
}>

export type UpdateTodoMutation = {
  __typename?: "Mutation"
  updateTodo: {
    __typename?: "UpdateTodoResponse"
    id: string
    validationErrors: {
      __typename?: "UpdateTodoValidationError"
      title: Array<string>
      content: Array<string>
    }
  }
}

export type EditTodoForm_TodoFragment = {
  __typename?: "Todo"
  id: string
  title: string
  content: string
}

export type EditTodoForm_ValidationErrorFragment = {
  __typename?: "UpdateTodoValidationError"
  title: Array<string>
  content: Array<string>
}

export const EditTodoForm_TodoFragmentDoc = gql`
  fragment EditTodoForm_Todo on Todo {
    id
    title
    content
  }
`
export const EditTodoForm_ValidationErrorFragmentDoc = gql`
  fragment EditTodoForm_ValidationError on UpdateTodoValidationError {
    title
    content
  }
`
export const FetchDoEditTodoDocument = gql`
  query fetchDoEditTodo($id: ID!) {
    fetchTodo(id: $id) {
      ...EditTodoForm_Todo
    }
  }
  ${EditTodoForm_TodoFragmentDoc}
`

/**
 * __useFetchDoEditTodoQuery__
 *
 * To run a query within a React component, call `useFetchDoEditTodoQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchDoEditTodoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchDoEditTodoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFetchDoEditTodoQuery(
  baseOptions: Apollo.QueryHookOptions<FetchDoEditTodoQuery, FetchDoEditTodoQueryVariables> &
    ({ variables: FetchDoEditTodoQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FetchDoEditTodoQuery, FetchDoEditTodoQueryVariables>(
    FetchDoEditTodoDocument,
    options,
  )
}
export function useFetchDoEditTodoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchDoEditTodoQuery, FetchDoEditTodoQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FetchDoEditTodoQuery, FetchDoEditTodoQueryVariables>(
    FetchDoEditTodoDocument,
    options,
  )
}
export function useFetchDoEditTodoSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<FetchDoEditTodoQuery, FetchDoEditTodoQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<FetchDoEditTodoQuery, FetchDoEditTodoQueryVariables>(
    FetchDoEditTodoDocument,
    options,
  )
}
export type FetchDoEditTodoQueryHookResult = ReturnType<typeof useFetchDoEditTodoQuery>
export type FetchDoEditTodoLazyQueryHookResult = ReturnType<typeof useFetchDoEditTodoLazyQuery>
export type FetchDoEditTodoSuspenseQueryHookResult = ReturnType<
  typeof useFetchDoEditTodoSuspenseQuery
>
export type FetchDoEditTodoQueryResult = Apollo.QueryResult<
  FetchDoEditTodoQuery,
  FetchDoEditTodoQueryVariables
>
export const UpdateTodoDocument = gql`
  mutation updateTodo($id: ID!, $input: UpdateTodoInput!) {
    updateTodo(id: $id, input: $input) {
      id
      validationErrors {
        ...EditTodoForm_ValidationError
      }
    }
  }
  ${EditTodoForm_ValidationErrorFragmentDoc}
`
export type UpdateTodoMutationFn = Apollo.MutationFunction<
  UpdateTodoMutation,
  UpdateTodoMutationVariables
>

/**
 * __useUpdateTodoMutation__
 *
 * To run a mutation, you first call `useUpdateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdateTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTodoMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateTodoMutation, UpdateTodoMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(
    UpdateTodoDocument,
    options,
  )
}
export type UpdateTodoMutationHookResult = ReturnType<typeof useUpdateTodoMutation>
export type UpdateTodoMutationResult = Apollo.MutationResult<UpdateTodoMutation>
export type UpdateTodoMutationOptions = Apollo.BaseMutationOptions<
  UpdateTodoMutation,
  UpdateTodoMutationVariables
>
