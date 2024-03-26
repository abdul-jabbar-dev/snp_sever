import winston from "winston";
import morgan from "morgan";

const { combine, timestamp, json } = winston.format;
const logger = winston.createLogger({
  level: "http",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    json()
  ),
  transports: [new winston.transports.Console()],
});

export const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      write: (message) => {
        console.log(message);
        return logger.http(message.trim());
      },
    },
  }
);
