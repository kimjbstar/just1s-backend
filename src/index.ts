import * as express from "express";
import { sequelize } from "./sequelize";
import * as figlet from "figlet";

const PORT = 3000;

const bootstrap = async () => {
  const WELCOME_TEXT = "welcome to nBase";
  figlet(WELCOME_TEXT, (err, data) => {
    console.log(!err ? data : WELCOME_TEXT);

    setConnection();
    createServer();
  });
};

const setConnection = () => {
  // sequelize.authenticate()
};

const createServer = () => {
  const app = express();
  app.listen(PORT, function() {
    console.log(`Example app listening on port ${PORT}!`);
  });

  app.use((req, res, next) => {
    console.log("middleware");
    // log or something, function moduleize
    next();
  });

  app.get("/", (req, res) => {
    // console.log(req);
    res.send("Hello World!");
  });
};
bootstrap();
