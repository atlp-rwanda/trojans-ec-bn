import BcryptUtil from "../utils/bcrypt";

const { User } = require("../database/models");

const checkPass = async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.user.email } });
  const compare = await BcryptUtil.compare(req.body.oldPassword, user.password);
  if (!compare) {
    return res
      .status(400)
      .json({ status: 400, message: "Invalid Old password" });
  }
  req.user.password = req.body.newPassword;
  next();
};
export default checkPass;
