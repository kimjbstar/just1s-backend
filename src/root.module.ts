import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { Module } from "@nestjs/common";
import { AppModule } from "@src/app.module";
import { MulterModule } from "@nestjs/platform-express";
import { FilesModule } from "./modules/files/files.module";
import { DecksModule } from "./modules/decks/decks.module";
import { MusicModule } from "./modules/music/music.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { UsersService } from "./modules/users/users.service";
import { PerformModule } from "./modules/perform/perform.module";

@Module({
  imports: [
    AppModule,
    UsersModule,
    AuthModule,
    FilesModule,
    DecksModule,
    MusicModule,
    PerformModule,
    UsersService,
    TypeOrmModule.forRoot(),
    MulterModule.register({
      dest: "./static"
    })
  ],
  providers: []
})
export class RootModule {
  constructor(private connection: Connection) {
    this.connection.runMigrations().then((migrations) => {
      console.log(migrations);
    });
  }
}
