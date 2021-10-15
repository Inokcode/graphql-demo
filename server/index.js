const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema/type-defs');
const { resolvers } = require('./schema/resolvers');

// const server = new ApolloServer({ typeDefs, resolvers });
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // return { name: 'Pedro' };
    return { req };
  },
});

server.listen().then(({ url }) => {
  console.log(`YOUR API IS RUNNIG AT: ${url} :)`);
});
