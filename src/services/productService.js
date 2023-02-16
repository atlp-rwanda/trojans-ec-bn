/* eslint-disable require-jsdoc */
const { Product, Category } = require("../database/models");

class ProductServices {
  static async addItem(req) {
    if (!req.body.expiryDate) {
      req.body.expiryDate = "2060/01/01";
    }
    const { price, name, bonus, expiryDate, categoryId, quantity } = req.body;
    const images = req.files.map((img) => img.path);
    const item = await Product.create({
      sellerId: req.user.id,
      price,
      name,
      bonus,
      categoryId,
      quantity,
      expiryDate,
      images,
    });
    await item.save();
    return "item created";
  }

  static async getAllItems(user) {
    let products;
    if (user.role === "seller") {
      products = await Product.findAll({ where: { sellerId: user.id } });
    } else if (user.role === "buyer") {
      products = await Product.findAll({ where: { available: true } });
    } else if (user.role === "admin") {
      products = await Product.findAll();
    }
    return products;
  }

  static async getSingleItem(user, id) {
    let products;
    if (user.role === "seller") {
      products = await Product.findOne({
        where: { sellerId: user.id, id },
      });
    } else if (user.role === "buyer") {
      products = await Product.findOne({ where: { id, available: true } });
    } else if (user.role === "admin") {
      products = await Product.findOne({ where: { id } });
    }
    return products;
  }

  static async addCategory(name) {
    const category = await Category.create({
      name,
    });
    await category.save();
    return category;
  }

  static async viewCategories() {
    const categories = await Category.findAll();
    return categories.map((cat) => ({ id: cat.id, name: cat.name }));
  }

  static async deleteCategory(id) {
    await Category.destroy({ where: { id } });
  }
}
export default ProductServices;
