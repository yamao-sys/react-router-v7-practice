import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import { onError } from "@apollo/client/link/error"

const getLink = () => {
  const httpLink = new HttpLink({
    uri: `${import.meta.env.VITE_API_ENDPOINT_URI}/query`,
    credentials: "include",
  })
  const redirectLink = onError(({ graphQLErrors, networkError }) => {
    // NOTE: エラー監視など
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      )
    if (networkError) {
      console.error(`[Network error]: ${networkError}`)
    }
  })
  return redirectLink.concat(httpLink)
}

export const graphQLClient = new ApolloClient({
  ssrMode: true,
  link: getLink(),
  cache: new InMemoryCache(),
})
