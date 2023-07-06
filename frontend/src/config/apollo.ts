import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { fetch } from 'cross-fetch';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
  fetch: fetch,
});

const authLink = setContext((_, { headers }) => {

  // Read storage
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      // console.log(`GraphQL Error: ${message}`);
    });
  }
  if (networkError) {
    // console.log(`Network Error: ${networkError}`);
  }
});

const link = ApolloLink.from([errorLink, authLink, httpLink]);

const client = new ApolloClient({
  cache:new InMemoryCache(),
  link,
});


export default client;