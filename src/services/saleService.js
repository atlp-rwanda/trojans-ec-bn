/* eslint-disable prettier/prettier */
/* eslint-disable no-else-return, require-jsdoc */
import { Sales, Product } from "../database/models";

class SaleServices {
  static async getSellerSales(data){
      const Sellerid = data;
      const  getSales  = await Sales.findAll(
      {
        where: { Sellerid },
        include: [
          {
            model: Product,
            as: 'product'
          }
        ]
      });

      if(getSales.length === 0){
      return "No Product Sold";
      }
      return getSales
  }

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
