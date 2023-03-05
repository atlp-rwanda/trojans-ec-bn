import { Ratings } from "../database/models/index";

const RatedBy = async (req, res, next) => {
  try {
    const { ratingId } = req.params;
    const { user } = req;
    const ratings = await Ratings.findOne({ where: { id: ratingId } });
    if (user.id === ratings.buyerId) {
      next();
    } else {
      return res.status(401).json({
        status: 401,
        message: "you are not the owner of this ratings ",
      });
    }
  } catch (error) {
    /* istanbul ignore next */
    return res
      .status(500)
      .json({ status: 500, message: "internal server error" });
  }
};

export default RatedBy;
