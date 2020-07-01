import "reflect-metadata";

import { createApp } from "./create-app";
import * as express from "express";

async function bootstrap() {
  const expressApp = express();
  const app = await createApp(expressApp);
  await app.listen(3000);
}
bootstrap();
