import { Sales } from "../database/models";

const checkSaleOwner = async (req, res, next) => {
  try {
    const sale = await Sales.findOne({ where: { id: req.params.id } });
    if (req.user.id === sale.Sellerid) {
      req.sale = sale;
      next();
    } else {
      res.status(403).json({ message: "You're not an owner of this Sale !" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
export default checkSaleOwner;
