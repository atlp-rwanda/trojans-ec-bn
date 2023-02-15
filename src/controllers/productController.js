/* eslint-disable require-jsdoc */
import ProductServices from "../services/productService";

class ProductController {
  static async addItem(req, res) {
    try {
      await ProductServices.addItem(req);
      return res.status(200).json({ status: 200, message: "Item added" });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }

  static async getAllItems(req, res) {
    try {
      const products = await ProductServices.getAllItems(req.user);
      return res.status(200).json({ status: 200, products });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }

  static async getSingleItem(req, res) {
    try {
      const product = await ProductServices.getSingleItem(
        req.user,
        req.params.id
      );
      if (product == null) {
        return res
          .status(404)
          .json({ status: 404, message: "No products found" });
      }
      return res.status(200).json({ status: 200, product });
    } catch (error) {
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
      await ProductServices.deleteCategory(req.params.id);
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }

  static async searchItem(req, res) {
    try {
      const search = await ProductServices.searchService(req.query);
      return res.status(200).json({ status: 200, search });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default ProductController;
