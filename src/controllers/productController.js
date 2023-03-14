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
      await ProductServices.deleteCategory(req.params.id);
      return res.status(204).json();
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }

  static async searchItem(req, res) {
    try {
      const search = await ProductServices.searchService(req.query);
      return res.status(200).json({ status: 200, search });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ message: "internal server error" });
    }
  }

  static async markAvailable(req, res) {
    try {
      const product = await ProductServices.markAvailable(req.params.id);
      if (product.availability) {
        return res.status(200).json({
          status: 200,
          message: `Product ${product.name} is available!`,
        });
      }

      return res.status(200).json({
        status: 200,
        message: `Product ${product.name} is not available!`,
      });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }

  static async updateItem(req, res) {
    try {
      await ProductServices.updateItem(req);
      return res.status(200).json({ status: 200, message: "Item updated!" });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }

  static async deleteItem(req, res) {
    try {
      await ProductServices.deleteItem(req.params.id);
      return res
        .status(202)
        .json({ message: "Product deleted", product: req.product });
    } catch (error) {
      /* istanbul ignore next */
      return res
        .status(500)
        .json({ status: 500, error: "Item can't be deleted" });
    }
  }

  static async productExpired(req, res) {
    try {
      const response = await ProductServices.productExpired(req.params.id);
      if (response === "Product not found") {
        return res.status(404).json({
          status: 404,
          message: response,
        });
      }
      return res.status(200).json({
        status: 200,
        message: response,
      });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }

  static async createRatings(req, res) {
    try {
      const response = await ProductServices.createRatings(req);
      return res.status(200).json({ status: 200, response });
    } catch (error) {
      /* istanbul ignore next */
      return res
        .status(500)
        .json({ status: 500, message: "internal server error" });
    }
  }

  static async updateRatings(req, res) {
    try {
      const response = await ProductServices.updateFeedback(req);
      return res.status(200).json({ status: 200, response });
    } catch (error) {
      /* istanbul ignore next */
      return res
        .status(500)
        .json({ status: 500, message: "internal server error" });
    }
  }
}

export default ProductController;
