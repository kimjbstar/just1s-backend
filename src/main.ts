import "reflect-metadata";
import { RootModule } from "./root.module";
import * as child_process from "child_process";
declare const module: any;

import { NestFactory, Reflector } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// import { F9HttpExceptionFilter } from "@src/f9-base/f9-http-exception.filter";
// import { initCurrentApp } from "@src/middlewares/init-current-app.middleware";
// import { PublicAuthGuard } from "@src/middlewares/public-auth.guard";

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(RootModule);
  // app.setGlobalPrefix("/api/*");
  // app.use(initCurrentApp);
  // app.useGlobalFilters(new F9HttpExceptionFilter());
  // app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new PublicAuthGuard(new Reflector()));

  const options = new DocumentBuilder()
    .setTitle("just1s")
    .setDescription("just1s API 설명입니다.")
    .setVersion("1.0")
    .addTag("cats")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("doc", app, document);

  // await child_process.execSync(`npx sequelize db:migrate --env local`);
  // this.connection.runMigrations()

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
