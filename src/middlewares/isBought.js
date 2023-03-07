import { Sales, Order } from "../database/models/index";

const isBought = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await Sales.findOne({
      where: { Productid: id },
      include: [
        { model: Order, as: "order", attributes: ["BuyerId", "status"] },
      ],
    });
    if (!sale) {
      res
        .status(400)
        .json({ status: 400, message: "you have to first buy the product" });
    } else {
      const { user } = req;
      const userId = user.id;
      const buyerId = sale.order.dataValues.BuyerId;
      const orderStatus = sale.Status;
      if (orderStatus === "complete" && userId === buyerId) {
        next();
      } else if (orderStatus === "complete" && userId !== buyerId) {
        return res.status(401).json({
          status: 401,
          message: `you have to first buy the product in order to provide feedback`,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: `you can't provide a feedback while your order is ${orderStatus}`,
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
