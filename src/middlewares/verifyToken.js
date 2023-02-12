/* eslint-disable require-jsdoc */

import Jwt from "jsonwebtoken";

const { User } = require("../database/models");

const verifyToken = async (req, res, next) => {
  const { data } = Jwt.verify(
    `Bearer ${req.params.token}`.split(" ")[1],
    process.env.JWT_SECRET
  );
  const user = await User.findOne({
    where: { id: data.id, isVerified: false },
  });
  if (!user) {
    return res.status(409).json({
      status: 409,
      message: "Sorry, your validation token is invalid or expired. ",
    });
  }
  next();
};

export default verifyToken;
