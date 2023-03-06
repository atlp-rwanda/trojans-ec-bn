import { splitPrice } from "../utils/searchUtil";

const checkPriceRange = (req, res, next) => {
  try {
    const { price } = req.query;
    if (price) {
      const range = splitPrice(price);
      if (range.range1 > range.range2) {
        return res.status(400).json({
          status: 400,
          message: `this should be in the format of ${range.range2}-${range.range1}`,
        });
      }
      next();
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "internal server error" });
  }
};

export default checkPriceRange;
