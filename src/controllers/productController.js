/* eslint-disable require-jsdoc */
import ProductServices from "../services/productService";

class ProductController {
  static async addItem(req, res) {
    try {
      await ProductServices.addItem(req);
      return res.status(200).json({ status: 200, message: "Item added" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }

  static async addCategory(req, res) {
    try {
      await ProductServices.addCategory(req.body.name);
      return res.status(200).json({ status: 200, message: "Category added" });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }

  static async viewCategories(req, res) {
    try {
      const categories = await ProductServices.viewCategories();
      return res.status(200).json({ status: 200, categories });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }

  static async deleteCategory(req, res) {
    try {
      await ProductServices.deleteCategory(req.body.name);
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }
}
export default ProductController;
