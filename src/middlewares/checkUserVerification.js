/* eslint-disable require-jsdoc */

const { User } = require("../database/models");

const checkIsVerified = async (req, res, next) => {
  const exists = await User.findOne({
    where: { email: req.body.email, isVerified: false },
  });
  if (exists) {
    return res
      .status(401)
      .json({ status: 401, message: "User is not verified" });
  }
  next();
};

export default checkIsVerified;
