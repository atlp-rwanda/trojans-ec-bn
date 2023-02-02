import express from "express";
import dotenv from "dotenv";
import allRouter from "./routes/index";

const app = express();

dotenv.config();
const port = process.env.PORT || 5000;
app.use(express.json());

app.use(allRouter);

app.listen(port, console.log(`server is starting on port ${port}`));

export default app;
