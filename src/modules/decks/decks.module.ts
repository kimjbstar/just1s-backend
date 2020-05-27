import { Module, forwardRef } from "@nestjs/common";
import { DecksController } from "./decks.controller";
import { DecksService } from "@src/modules/decks/decks.service";
import { MusicsService } from "../music/music.service";
import { UsersService } from "../users/users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { JwtStrategy } from "../auth/jwt.strategy";
import { RootModule } from "@src/root.module";
import { AppModule } from "@src/app.module";

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [DecksController],
  providers: [
    DecksService,
    MusicsService,
    UsersService,
    UsersService,
    JwtStrategy
  ]
})
export class DecksModule {}
