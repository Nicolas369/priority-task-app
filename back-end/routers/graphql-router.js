const { ApolloServer } = require('apollo-server-express');
const typeDefs = require("../handle-queries/graphql-queries/type-defs");
const { resolvers } = require("../handle-queries/graphql-queries/resolvers");

const router = new ApolloServer({ typeDefs, resolvers });

const startGraphqlRouter = async (app) => {
    await router.start();
    router.applyMiddleware({ app });
}

module.exports = startGraphqlRouter;