import apollo from 'apollo-server-express';
const { ApolloServer } = apollo;
import apollo_http from 'apollo-server-core';
const { ApolloServerPluginDrainHttpServer } = apollo_http;
import express from 'express';
import http from 'http';

async function newApolloServer(typeDefs, resolvers) {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise(resolve => httpServer.listen({ port: 4001 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`);
}