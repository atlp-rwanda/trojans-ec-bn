import BcryptUtil from "../utils/bcrypt";

const { User } = require("../database/models");

const checkPass = async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  console.log(res.locals);
  const { email } = res.locals;

  const user = await User.findOne({ where: { email } });
  const compare = await BcryptUtil.compare(oldPassword, user.password);
  if (!compare) {
    return res
      .status(400)
      .json({ status: 400, message: "Invalid Old password" });
  }
  if (newPassword === confirmPassword) {
    res.locals.password = newPassword;
    next();
  } else {
    return res
      .status(400)
      .json({ status: 400, message: "Confirm password did not match" });
  }
};
export default checkPass;
