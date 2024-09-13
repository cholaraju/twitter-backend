import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";

import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "../clients/db/index";

export async function initServer() {
  const app = express();
  app.use(bodyParser.json());
  prismaClient.user.create({
    data: {
    
    
    },
  });

  const grapqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            sayHello: String
            sayHelloToMe(name:String!): String
        }
    `,
    resolvers: {
      Query: {
        sayHello: () => `Fuck you Tharun`,
        sayHelloToMe: (parent: any, { name }: { name: String }) =>
          `Hey ${name}`,
      },
    },
  });

  await grapqlServer.start();

  app.use("/graphql", expressMiddleware(grapqlServer));
  return app;
}
