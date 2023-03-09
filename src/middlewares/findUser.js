/* eslint-disable no-else-return */
/* eslint-disable require-jsdoc */
import { User } from "../database/models/index";

export default async function findUser(req, res, next) {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      req.user = user;
      return next();
    }
  } catch (error) {
    /* istanbul ignore next */
    return res.status(500).json({ status: 500, error: "server error" });
  }
}
