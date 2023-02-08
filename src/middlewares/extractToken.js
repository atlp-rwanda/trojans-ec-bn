import JwtUtil from "../utils/generateToken";

const extractToken = (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      return res.status(401).json({ status: 401, message: "Please sign in" });
    }
    const token = req.header("Authorization").split(" ")[1];
    const details = JwtUtil.verify(token);
    req.user = details.data;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: 401, message: "No valid credentials" });
  }
};

export default extractToken;
