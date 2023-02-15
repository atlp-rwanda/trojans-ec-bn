const checkAdmin = async (req, res, next) => {
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
