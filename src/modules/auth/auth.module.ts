import { Module, forwardRef } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthController } from "@src/modules/auth/auth.controller";
import { AuthService } from "@src/modules/auth/auth.service";
import { UsersModule } from "@src/modules/users/users.module";
import { JwtStrategy } from "@src/modules/auth/jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { UsersService } from "@src/modules/users/users.service";
import { RootModule } from "@src/root.module";
import { AppModule } from "@src/app.module";

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, UsersService],
  exports: [AuthService]
})
export class AuthModule {}
