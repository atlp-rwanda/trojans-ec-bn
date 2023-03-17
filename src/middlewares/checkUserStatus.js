/* eslint-disable require-jsdoc */
/* istanbul ignore next */

export default async function checkUserStatus(req, res, next) {
  try {
    const { user } = req;
    if (user.status === "active") {
      next();
    } else {
      return res
        .status(403)
        .json({ status: 403, message: "Your account is not Active" });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, error: "server error" });
  }
}
