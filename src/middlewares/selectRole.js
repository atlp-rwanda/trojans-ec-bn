const { User } = require("../database/models");

const checkRole = async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  const role = ["admin", "buyer", "seller"];
  if (!role.includes(req.body.role)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid role name",
    });
  }
  if (user.role === req.body.role) {
    return res.status(400).json({
      status: 400,
      message: "Role already assigned",
    });
  }
  next();
};

export default checkRole;
