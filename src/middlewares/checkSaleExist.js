/* eslint-disable require-jsdoc */
import { Sales } from "../database/models";

export default async function isSaleExist(req, res, next) {
  try {
    const saleId = req.params.id;
    const sale = await Sales.findOne({ where: { id: saleId } });

    if (!sale) {
      return res.status(400).json({
        status: 400,
        message: "Sale not exist",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
}
