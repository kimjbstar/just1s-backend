import "reflect-metadata";
import { RootModule } from "./root.module";
import * as child_process from "child_process";
declare const module: any;

import { NestFactory, Reflector } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as helmet from "helmet";
import * as fs from "fs";
import * as path from "path";
import { ExpressAdapter } from "@nestjs/platform-express";
import * as express from "express";
import * as http from "http";
import * as https from "https";
// import * as cors from "cors";

// import { F9HttpExceptionFilter } from "@src/f9-base/f9-http-exception.filter";
// import { initCurrentApp } from "@src/middlewares/init-current-app.middleware";
// import { PublicAuthGuard } from "@src/middlewares/public-auth.guard";

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync("./cert/privkey.pem"),
    cert: fs.readFileSync("./cert/cert.pem")
  };
  // const server = express();
  // const app = await NestFactory.create(RootModule, new ExpressAdapter(server));
  const app: INestApplication = await NestFactory.create(RootModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const options = new DocumentBuilder()
    .setTitle("just1s")
    .setDescription("단1초(just1s) API 문서 페이지입니다.")
    .setVersion("0.0.1")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("doc", app, document);

  app.use(helmet());
  app.use((req, res, next) => {
    // console.log("origin : ", req.headers.origin);
    // const origin = req.headers.origin ? req.headers.origin : "*";
    // const origin = "https://www.just1s.xyz";
    const origin = "*";
    res.header("Access-Control-Allow-Origin", origin);
    res.header(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
    );
    next();
  });

  await app.listen(3000);
}
bootstrap();
