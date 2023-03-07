/* eslint-disable no-else-return, require-jsdoc */
import { Sales } from "../database/models";

class SaleServices {
  static async updateSaleStatus(req) {
    const { id } = req.params;
    const update = await Sales.update(req.body, { where: { id } });
    if (update) {
      const UpdatedSale = await Sales.findOne({ where: { id } });
      return UpdatedSale;
    }
  }
}

export default SaleServices;
