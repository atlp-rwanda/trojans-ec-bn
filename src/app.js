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

const app = express();

const port = process.env.PORT || 5000;

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

try {
  app.use("/api/v1", allRouter);
  app.listen(port, () => {
    console.log(`server running on port ${port} `); // eslint-disable-line no-console
  });
} catch (error) {
  console.log(error); // eslint-disable-line no-console
}

app.all("*", notFound);

export default app;
