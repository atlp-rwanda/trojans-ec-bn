import { Op } from "sequelize";
import { Ratings } from "../database/models/index";

const isAvailable = async (req, res, next) => {
  try {
    const { id, ratingId } = req.params;
    const rating = await Ratings.findOne({
      where: { [Op.and]: [{ productId: id, id: ratingId }] },
    });
    if (rating) {
      next();
    } else {
      res.status(404).json({ status: 404, message: "no match found" });
    }
  } catch (error) {
    console.log(error)
    /* istanbul ignore next */
    return res
      .status(500)
      .json({ status: 500, message: "internal server error" });
  }
};

export default isAvailable;
