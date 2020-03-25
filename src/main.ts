import "reflect-metadata";
import { RootModule } from "./root.module";
declare const module: any;

import { NestFactory, Reflector } from "@nestjs/core";

// import { F9HttpExceptionFilter } from "@src/f9-base/f9-http-exception.filter";
// import { initCurrentApp } from "@src/middlewares/init-current-app.middleware";
// import { PublicAuthGuard } from "@src/middlewares/public-auth.guard";

async function bootstrap() {
  const application = await NestFactory.create(RootModule);
  // application.setGlobalPrefix("/api/*");
  //   application.use(initCurrentApp);
  //   application.useGlobalFilters(new F9HttpExceptionFilter());
  // application.useGlobalPipes(new ValidationPipe());
  //   application.useGlobalGuards(new PublicAuthGuard(new Reflector()));
  await application.listen(3000);

  // if (module.hot) {
  //   module.hot.dispose(async () => {
  //     await app.close();
  //     console.log('APP closed');
  //   });
  //   module.hot.accept();
  // }
}
bootstrap();
