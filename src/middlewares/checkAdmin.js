import JwtUtil from "../utils/generateToken";

const { User } = require("../database/models");

const checkAdmin = async (req, res, next) => {
  //  const user = JwtUtil.verify(req.headers.authorization.split(" ")[1])
  //  const isAdmin = await User.findOne({where: {email:user.data.email}})

  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(401).json({
      status: 401,
      message: "You are not an admin",
    });
  }
};

export default checkAdmin;
