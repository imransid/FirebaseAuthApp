import {ApolloClient, InMemoryCache, HttpLink, split} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';

// Define HttpLinks for both endpoints
export const userAuthLink = new HttpLink({
  uri: 'http://54.179.177.128:4000/graphql', // User/Auth endpoint
});

export const tutorialLink = new HttpLink({
  uri: 'http://54.179.177.128:4001/graphql', // Tutorial endpoint
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
