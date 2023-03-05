import { Ratings } from "../database/models/index";

const rateAvailable = async (req, res, next) => {
  try {
    const { ratingId } = req.params;
    const rate = await Ratings.findOne({ where: { id: ratingId } });
    if (!rate) {
      return res.status(404).json({ status: 404, message: "rate not found" });
    }
    next();
  } catch (error) {
    /* istanbul ignore next */
    return res
      .status(500)
      .json({ status: 500, message: "internal server error" });
  }
};

export default rateAvailable;
