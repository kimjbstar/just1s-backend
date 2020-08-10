import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { FilesModule } from "./modules/files/files.module";
import { DecksModule } from "./modules/decks/decks.module";
import { MusicModule } from "./modules/music/music.module";
import { PerformModule } from "./modules/perform/perform.module";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    FilesModule,
    DecksModule,
    MusicModule,
    PerformModule,
    MulterModule.register({
      dest: "./static"
    })
  ],
  providers: [],
  exports: []
})
export class RootModule {
  constructor() {
    console.debug("RootModule init"); // //
  }
}
