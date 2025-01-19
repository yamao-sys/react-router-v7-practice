import * as SchemaTypes from "../../../../graphql/__generated__/graphql-schema-types"

import { gql } from "@apollo/client"
import { TodosList_TodoFragmentDoc } from "../components/TodosList/__generated__/index"
import * as Apollo from "@apollo/client"
const defaultOptions = {} as const
export type FetchTodoListsQueryVariables = SchemaTypes.Exact<{ [key: string]: never }>

export type FetchTodoListsQuery = {
  __typename?: "Query"
  fetchTodoLists: Array<{
    __typename?: "Todo"
    id: string
    title: string
    createdAt: any
    updatedAt: any
  }>
}

export const FetchTodoListsDocument = gql`
  query fetchTodoLists {
    fetchTodoLists {
      ...TodosList_Todo
    }
  }
  ${TodosList_TodoFragmentDoc}
`

/**
 * __useFetchTodoListsQuery__
 *
 * To run a query within a React component, call `useFetchTodoListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchTodoListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchTodoListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchTodoListsQuery(
  baseOptions?: Apollo.QueryHookOptions<FetchTodoListsQuery, FetchTodoListsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FetchTodoListsQuery, FetchTodoListsQueryVariables>(
    FetchTodoListsDocument,
    options,
  )
}
export function useFetchTodoListsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchTodoListsQuery, FetchTodoListsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FetchTodoListsQuery, FetchTodoListsQueryVariables>(
    FetchTodoListsDocument,
    options,
  )
}
export function useFetchTodoListsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<FetchTodoListsQuery, FetchTodoListsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<FetchTodoListsQuery, FetchTodoListsQueryVariables>(
    FetchTodoListsDocument,
    options,
  )
}
export type FetchTodoListsQueryHookResult = ReturnType<typeof useFetchTodoListsQuery>
export type FetchTodoListsLazyQueryHookResult = ReturnType<typeof useFetchTodoListsLazyQuery>
export type FetchTodoListsSuspenseQueryHookResult = ReturnType<
  typeof useFetchTodoListsSuspenseQuery
>
export type FetchTodoListsQueryResult = Apollo.QueryResult<
  FetchTodoListsQuery,
  FetchTodoListsQueryVariables
>
