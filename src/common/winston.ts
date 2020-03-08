import * as winston from "winston";

const logger: winston.Logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.json(),
    winston.format.colorize()
  ),
  defaultMeta: { service: "nbase" },
  transports: [
    new winston.transports.File({
      filename: "../../log/error.log",
      level: "error"
    }),
    new winston.transports.File({ filename: "../../log/combined.log" })
  ]
});
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

export default logger;
