const { User } = require("../database/models");

const alreadyExists = async (req, res, next) => {
  const exists = await User.findOne({ where: { email: req.body.email } });
  if (exists) {
    return res.status(409).send("Email Already Exists");
  }
  next();
};

export default alreadyExists;
