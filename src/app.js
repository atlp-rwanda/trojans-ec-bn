import express from "express";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import "./utils/passport.config";
import "./utils/googleAuth";
import allRouter from "./routes/index";
import documentation from "./documentation/index";
import "dotenv/config";
import notFound from "./controllers/notFound";
import "./events/eventHandler/user";
import "./events/eventHandler/eventHandler";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use("/api-docs", documentation);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1", allRouter);

app.all("*", notFound);

export default app;
