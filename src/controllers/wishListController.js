/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */

import WishListService from "../services/wishListService";

class WishListController {
  static async addToWishList(req, res) {
    try {
      const response = await WishListService.addToWishList(req);
      return res.status(200).json({ status: 200, message: response });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error });
    }
  }

  static async getWishList(req, res) {
    try {
      const response = await WishListService.getWishList(req);
      return res.status(200).json({ status: 200, data: response });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error });
    }
  }

  static async getWishProductByProduct(req, res) {
    try {
      const response = await WishListService.getWishListByProduct(req);
      return res.status(200).json({ status: 200, data: response });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error });
    }
  }

  static async getWishProductByUser(req, res) {
    try {
      const response = await WishListService.getWishListByUser(req);
      return res.status(200).json({ status: 200, data: response });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error });
    }
  }
}

export default WishListController;
