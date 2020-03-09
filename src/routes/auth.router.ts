import { NBaseError } from "./../common/nbase-error";
import logger from "../library/winston";
import * as passport from "passport";
var express = require("express");
var authRouter = express.Router();
import * as jwt from "jsonwebtoken";

// TODO : post로 변경
authRouter.get("/login", async (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Error occured in authenticate",
        user: user
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });
      res.cookie("jwt", token);
      return res.json({ user, token });
    });
    return {};
  })(req, res);
});

authRouter.get("/whoami", async (req, res, next) => {
  if (res.locals.isAuthenticated === false) {
    next(new NBaseError(401, "token 인증 실패", res.locals.tokenFailMessage));
    return;
  }
  res.send({
    user: res.locals.user.get()
  });
});

export default authRouter;
