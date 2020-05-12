import "reflect-metadata";
import { RootModule } from "./root.module";
import * as child_process from "child_process";
declare const module: any;

import { NestFactory, Reflector } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// import { F9HttpExceptionFilter } from "@src/f9-base/f9-http-exception.filter";
// import { initCurrentApp } from "@src/middlewares/init-current-app.middleware";
// import { PublicAuthGuard } from "@src/middlewares/public-auth.guard";

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(RootModule);

  // app.setGlobalPrefix("/api/*");
  // app.use(initCurrentApp);
  // app.useGlobalFilters(new F9HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.useGlobalGuards(new PublicAuthGuard(new Reflector()));

  const options = new DocumentBuilder()
    .setTitle("just1s")
    .setDescription("단1초(just1s) API 문서 페이지입니다.")
    .setVersion("0.0.1")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("doc", app, document);

  await app.listen(3000);

  // if (module.hot) {
  //   module.hot.dispose(async () => {
  //     await app.close();
  //     console.log('APP closed');
  //   });
  //   module.hot.accept();
  // }
}
bootstrap();
