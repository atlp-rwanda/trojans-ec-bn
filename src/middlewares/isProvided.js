/* eslint-disable no-else-return */
import { Op } from "sequelize";
import { Ratings } from "../database/models/index";

const isProvided = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const userId = user.id;
    const ratings = await Ratings.findOne({
      where: { [Op.and]: [{ buyerId: userId }, { productId: id }] },
    });
    if (ratings) {
      return res.status(409).json({
        status: 409,
        message: "you can only provide one feedback on a product",
      });
    } else {
      next();
    }
  } catch (error) {
    /* istanbul ignore next */
    return res
      .status(500)
      .json({ status: 500, message: "internal server error" });
  }
};

export default isProvided;
