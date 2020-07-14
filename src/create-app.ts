import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Express } from "express";
import { RootModule } from "./root.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as helmet from "helmet";

export async function createApp(
  expressApp: Express
): Promise<INestApplication> {
  // const httpsOptions = {
  //   key: process.env.JUST1S_PRIVATE_KEY,
  //   cert: process.env.JUST1S_CERT
  // };
  const adapter = new ExpressAdapter(expressApp);
  const app: INestApplication = await NestFactory.create(RootModule, adapter);

  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const options = new DocumentBuilder()
    .setTitle("just1s")
    .setDescription("단1초(just1s) API 문서 페이지입니다..")
    .setVersion("0.0.1")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("doc", app, document);

  app.use(helmet());
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: [
      "Origin",
      "Accept",
      "X-Requested-With",
      "Content-Type",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
      "Authorization"
    ],
    optionsSuccessStatus: 204
  });

  return app;
}
