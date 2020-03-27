import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "@src/modules/auth/auth.controller";
import { AuthService } from "@src/modules/auth/auth.service";
import { UsersModule } from "@src/modules/users/users.module";
import { LocalStrategy } from "@src/modules/auth/local.strategy";
import { JwtStrategy } from "@src/modules/auth/jwt.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "1q2w3e4r",
      signOptions: { expiresIn: "1d" }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
