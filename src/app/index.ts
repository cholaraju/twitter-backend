import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";

import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "../clients/db";

import { User } from "./user";

export async function initServer() {
  const app = express();
  app.use(bodyParser.json());
  // prismaClient.user.create({
  //   data: {

  //   },
  // });

  const grapqlServer = new ApolloServer({
    typeDefs: `
     ${User.types}
        type Query {
            ${User.queries}
        }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
    },
  });

  await grapqlServer.start();

  app.use("/graphql", expressMiddleware(grapqlServer));
  return app;
}
