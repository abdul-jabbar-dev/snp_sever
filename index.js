import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import LandRoutes from "./src/routes/land.route.js";
import UserRoutes from "./src/routes/user.route.js";
import FormRoutes from "./src/routes/form.route.js";

import { corsOptions } from "./src/config/corsOptions.js";
import { credentials } from "./src/middleware/credentails.js";
import { morganMiddleware } from "./src/middleware/logger.js";
import { port } from "./src/config/db.js";
import verifyJWT from "./src/middleware/verifyJWT.js";

const app = express();

app.use(morganMiddleware);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use("/api/user", UserRoutes);

app.use(verifyJWT);
app.use("/api", LandRoutes);
app.use("/api/form", FormRoutes);

app.listen(port, () => {
  console.log("app listening on" + port);
});
