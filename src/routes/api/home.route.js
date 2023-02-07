import express from "express";
import testpassport from "../../utils/authVerify";
import { checkAuth } from "../../utils/passport";

testpassport()

const home = express.Router();

home.get("/",checkAuth, (req, res) => {
  res.status(200).json({ message: "Welcome to our homepage" });
});

export default home;
