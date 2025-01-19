import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { setContext } from "@apollo/client/link/context"

const getLink = (cookie?: string) => {
  const httpLink = new HttpLink({
    uri: `${import.meta.env.VITE_API_ENDPOINT_URI}/query`,
    credentials: "include",
  })
  const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        cookie,
      },
    }
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
  return authLink.concat(redirectLink).concat(httpLink)
}

export const graphQLClient = (cookie?: string) =>
  new ApolloClient({
    ssrMode: true,
    link: getLink(cookie),
    cache: new InMemoryCache(),
  })
