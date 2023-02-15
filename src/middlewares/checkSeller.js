const checkSeller = async (req, res, next) => {
  try {
    if (req.user.role === "seller") {
      next();
    } else {
      return res.status(401).json({
        status: 401,
        message: "You are not a seller",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error in checkSeller mid" });
  }
};

export default checkSeller;
