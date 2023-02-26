import { productOrder, User } from "../database/models/index";

const isBought = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await productOrder.findOne({
      where: { productId: id },
      include: [{ model: User, as: "boughtBy", attributes: ["id"] }],
    });
    if (!order) {
      res
        .status(400)
        .json({ status: 400, message: "you have to first buy the product" });
    } else {
      const { user } = req;
      const userId = user.id;
      const buyerId = order.boughtBy.id;
      if (order.orderStatus === "complete" && userId === buyerId) {
        next();
      } else if (order.orderStatus === "complete" && userId !== buyerId) {
        return res.status(401).json({
          status: 401,
          message: `you have to first buy the product in order to provide feedback`,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: `you can't provide a feedback while your order is ${order.orderStatus}`,
        });
      }
    }
  } catch (error) {
    /* istanbul ignore next */
    return res
      .status(500)
      .json({ status: 500, message: "internal server error" });
  }
};

export default isBought;
