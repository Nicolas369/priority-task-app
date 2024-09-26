import { ApolloClient, DefaultOptions, InMemoryCache } from '@apollo/client';

const options: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
}

export const apolloClient = new ApolloClient({
    uri: 'http://localhost:7000/graphql',
    cache: new InMemoryCache({
        addTypename: false
    }),
    defaultOptions: options,
});
