import { Server } from "http";
import { APIGatewayProxyHandler } from "aws-lambda";
import * as express from "express";
import { createApp } from "./create-app";
import * as awsServerlessExpress from "aws-serverless-express";

let cachedServer: Server;

async function bootstrap(): Promise<Server> {
  const expressApp = express();
  const app = await createApp(expressApp);
  await app.init();
  return awsServerlessExpress.createServer(expressApp);
}

export const handler: APIGatewayProxyHandler = async (event, context) => {
  if (!cachedServer) {
    const server = await bootstrap();
    cachedServer = server;
    return awsServerlessExpress.proxy(server, event, context, "PROMISE")
      .promise;
  } else {
    return awsServerlessExpress.proxy(cachedServer, event, context, "PROMISE")
      .promise;
  }
};
