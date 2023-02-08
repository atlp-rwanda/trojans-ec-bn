import express from "express";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import "./utils/passport.config";
import allRouter from "./routes/index";
import documentation from "./documentation/index";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("dev"));
app.use("/api-docs", documentation);

app.use(passport.initialize());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

try {
  app.use("/api/v1", allRouter);
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
} catch (error) {
  console.log(error);
}
export default app;
