import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';

// Apollo Client setup
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://3.107.186.222:4000/graphql', // Your GraphQL endpoint
  }),
  cache: new InMemoryCache(),
  connectToDevTools: true, // Optional: Enables Apollo Client DevTools in development
});

export default client;
