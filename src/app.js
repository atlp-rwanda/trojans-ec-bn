import express from "express";
import swaggerUI from "swagger-ui-express";
import morgan from "morgan";
import allRouter from "./routes/index";
import documentation from "./documentation/index";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("dev"));
app.use("/api-docs", documentation);
app.use(allRouter);

app.listen(port, console.log(`server is starting on port ${port}`)); // eslint-disable-line no-console

export default app;
