import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model";
import * as passportJWT from "passport-jwt";
import * as passportLocal from "passport-local";
import { PassportStatic } from "passport";
export const setPassportConfig = async (passport: PassportStatic) => {
  const JWTStrategy = passportJWT.Strategy;
  const ExtractJWT = passportJWT.ExtractJwt;
  const LocalStrategy = passportLocal.Strategy;

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      async (email, password, done) => {
        const _user = await User.findOne({
          where: {
            email: email,
            [Op.and]: [
              Sequelize.literal(
                `pw = CONCAT("*", UPPER(SHA1(UNHEX(SHA1(SHA1("${password}"))))))`
              )
            ]
          }
        });
        if (_user == null) {
          return done(null, false, {
            message: "Incorrect email or password."
          });
        }
        const user = _user.get({ plain: true });
        console.log(user);

        return done(null, user, { message: "Logged In Successfully" });
      }
    )
  );
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
      },
      async (jwtPayload, done) => {
        try {
          const user = await User.findOne({
            where: {
              id: jwtPayload.id
            }
          });
          if (user == null) {
            return done(null, false, {
              message: "Incorrect jwt."
            });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
