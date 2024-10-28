const { ApolloServer } = require('apollo-server-express');
const typeDefs = require("./type-defs");
const { resolvers } = require("./resolvers");

const router = new ApolloServer({ typeDefs, resolvers });


const startGraphqlRouter = async (app) => {
    await router.start();
    router.applyMiddleware({ app });
}

module.exports = startGraphqlRouter;