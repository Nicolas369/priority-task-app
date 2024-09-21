import { ApolloClient, InMemoryCache, gql, useMutation, useQuery } from '@apollo/client';

export const apolloClient = new ApolloClient({
    uri: 'http://localhost:7000/graphql',
    cache: new InMemoryCache(),
});

// [ ] how to disabled cache 
// [x] add


// how continue ? 
// continue integrating the logic of http-redux and then me rge those tow axios and apollo 
// in a custome hooks and a logic for switch them

