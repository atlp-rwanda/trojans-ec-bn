import express from "express";
// import testpassport from "../../utils/authVerify";
import { checkAuth } from "../../middlewares/authVerify";

// testpassport()

const home = express.Router();

home.get("/", checkAuth, (req, res) => {
  res.status(200).json({ message: "Welcome to our homepage" });
});

export default home;
