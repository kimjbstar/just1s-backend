declare const module: any;
import "reflect-metadata";

import { createApp } from "./create-app";
import * as express from "express";

async function bootstrap() {
  const expressApp = express();
  const app = await createApp(expressApp);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
