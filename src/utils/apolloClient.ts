// import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';

// // Apollo Client setup
// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: 'http://3.26.192.7:4000/graphql', // Your GraphQL endpoint
//   }),
//   cache: new InMemoryCache(),
//   connectToDevTools: true, // Optional: Enables Apollo Client DevTools in development
// });

// export default client;

import {ApolloClient, InMemoryCache, HttpLink, split} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';

// Define HttpLinks for both endpoints
export const userAuthLink = new HttpLink({
  uri: 'http://3.26.192.7:4000/graphql', // User/Auth endpoint
});

export const tutorialLink = new HttpLink({
  uri: 'http://3.26.192.7:4001/graphql', // Tutorial endpoint
});

// Split link based on operation name or other criteria
const link = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.name &&
      definition.name.value.startsWith('Tutorial') // Route tutorial-related operations
    );
  },
  tutorialLink, // Send tutorial-related queries to tutorialLink
  userAuthLink, // Send all other queries to userAuthLink
);

// Apollo Client setup
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default client;
