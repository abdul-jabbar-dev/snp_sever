import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import LandRoutes from "./src/routes/land.route.js";
import UserRoutes from "./src/routes/user.route.js";
import FormRoutes from "./src/routes/form.route.js";

import { credentials } from "./src/middleware/credentails.js";
import { morganMiddleware } from "./src/middleware/logger.js";
import { port } from "./src/config/db.js";
import verifyJWT from "./src/middleware/verifyJWT.js";

const app = express();

app.use(morganMiddleware);
app.use(credentials);
app.use(cors({
  origin: 'https://66035c6f8fa7e4121a116eee--funny-semolina-3634d5.netlify.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

app.use("/api/user", UserRoutes);

app.use(verifyJWT);
app.use("/api", LandRoutes);
app.use("/api/form", FormRoutes);

app.listen(port, () => {
  console.log("app listening on" + port);
});
