const { User } = require("../database/models");

const verifyUser = async (req, res, next) => {
  const exists = await User.findOne({ where: { email: req.body.email } });
  req.User = exists;
  if (exists) {
    return res
      .status(409)
      .json({ status: 409, message: "Email Already Exists" });
  }

  next();
};

export default verifyUser;
