import JwtUtil from "../utils/generateToken";

const { User } = require("../database/models");

const resetData = async (req, res, next) => {
  try {
    const { token } = req.params;
    const verified = JwtUtil.verify(token);
    const { email, id } = verified.data;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      res.status(403).json({ message: "User not verified" });
    } else {
      req.user = verified.data;
      next();
    }
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

export default resetData;
