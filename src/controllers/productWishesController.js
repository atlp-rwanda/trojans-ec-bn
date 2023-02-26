/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */

import ProductWishesService from "../services/productWishesService";

class ProductWishesController {
  static async addToProductWishes(req, res) {
    try {
      const response = await ProductWishesService.addToProductWishes(req);
      return res.status(201).json({ status: 201, message: response });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, message: error });
    }
  }

  static async getProductWishes(req, res) {
    try {
      const response = await ProductWishesService.getProductWishes(req);
      return res.status(200).json({ status: 200, data: response });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, message: error });
    }
  }

  static async getWishProductByProduct(req, res) {
    try {
      const response = await ProductWishesService.getProductWishesByProduct(
        req
      );
      return res.status(200).json({ status: 200, data: response });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, message: error });
    }
  }

  static async getWishProductByUser(req, res) {
    try {
      const response = await ProductWishesService.getProductWishesByUser(req);
      return res.status(200).json({ status: 200, data: response });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, message: error });
    }
  }
}

export default ProductWishesController;
