import checkPasswordExpired from "../utils/isPasswordExpired";

const isPasswordExpired = async (req, res, next) => {
  try {
    const passwordUpdated = new Date(req.user.lastTimePasswordUpdated);
    const expiredPassword = checkPasswordExpired(passwordUpdated);
    if (expiredPassword) {
      return res.status(401).json({
        status: 401,
        message:
          "Your password has expired, Please update your password first!.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Error occurred!" });
  }
};

export default isPasswordExpired;
