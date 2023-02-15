/* eslint-disable no-else-return */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable prefer-const */
/* eslint-disable no-const-assign */
/* eslint-disable no-plusplus */
/* eslint-disable require-jsdoc */
/* eslint-disable no-nested-ternary */
import { Op } from "sequelize";
import { expirationDate, splitPrice } from "../utils/searchUtil";

/* eslint-disable require-jsdoc */
const { Product, Category } = require("../database/models");

class ProductServices {
  static async addItem(req) {
    if (!req.body.expiryDate) {
      req.body.expiryDate = "2060/01/01";
    }
    const { price, name, bonus, expiryDate, categoryId, quantity } = req.body;
    // const images = req.files.map((img) => img.path);
    const item = await Product.create({
      sellerId: req.user.id,
      price,
      name,
      bonus,
      categoryId,
      quantity,
      expiryDate,
      // images,
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

  static async searchService(data) {
    const { categoryId, sellerId, expiryDate, price, product } = data;
    const tripleCondition = {
      [Op.or]: [
        {
          [Op.and]: [
            { categoryId: categoryId ? categoryId : null },
            {
              price: price
                ? {
                    [Op.between]: [
                      splitPrice(price).range1,
                      splitPrice(price).range2,
                    ],
                  }
                : null,
            },
            { sellerId: sellerId || null },
          ],
        },
        {
          [Op.and]: [
            { categoryId: categoryId ? categoryId : null },
            {
              price: price
                ? {
                    [Op.between]: [
                      splitPrice(price).range1,
                      splitPrice(price).range2,
                    ],
                  }
                : null,
            },
            { expiryDate: expiryDate ? new Date(expiryDate) : null },
          ],
        },
        {
          [Op.and]: [
            { sellerId: sellerId || null },
            {
              price: price
                ? {
                    [Op.between]: [
                      splitPrice(price).range1,
                      splitPrice(price).range2,
                    ],
                  }
                : null,
            },
            { expiryDate: expiryDate ? new Date(expiryDate) : null },
          ],
        },
      ],
    };
    const andCondition = {
      [Op.or]: [
        {
          [Op.and]: [
            { name: product ? { [Op.substring]: product } : null },
            {
              expiryDate: expiryDate ? new Date(expiryDate) : null,
            },
          ],
        },
        {
          [Op.and]: [
            { name: product ? { [Op.substring]: product } : null },
            { sellerId: sellerId || null },
          ],
        },
        {
          [Op.and]: [
            { sellerId: sellerId || null },
            {
              expiryDate: expiryDate ? new Date(expiryDate) : null,
            },
          ],
        },
        {
          [Op.and]: [
            { name: product ? { [Op.substring]: product } : null },
            { categoryId: categoryId ? categoryId : null },
          ],
        },
        {
          [Op.and]: [
            { expiryDate: expiryDate ? new Date(expiryDate) : null },
            { categoryId: categoryId ? categoryId : null },
          ],
        },
        {
          [Op.and]: [
            { categoryId: categoryId ? categoryId : null },
            {
              price: price
                ? {
                    [Op.between]: [
                      splitPrice(price).range1,
                      splitPrice(price).range2,
                    ],
                  }
                : null,
            },
          ],
        },
        {
          [Op.and]: [
            { sellerId: sellerId || null },
            {
              price: price
                ? {
                    [Op.between]: [
                      splitPrice(price).range1,
                      splitPrice(price).range2,
                    ],
                  }
                : null,
            },
          ],
        },
        {
          [Op.and]: [
            { expiryDate: expiryDate ? new Date(expiryDate) : null },
            {
              price: price
                ? {
                    [Op.between]: [
                      splitPrice(price).range1,
                      splitPrice(price).range2,
                    ],
                  }
                : null,
            },
          ],
        },
        {
          [Op.and]: [
            { categoryId: categoryId ? categoryId : null },
            { sellerId: sellerId || null },
          ],
        },
      ],
    };
    const orCondition = {
      [Op.or]: [
        {
          categoryId: categoryId ? categoryId : null,
        },
        {
          sellerId: sellerId || null,
        },
        {
          name: product ? { [Op.iLike]: `%${product}%` } : null,
        },
        {
          expiryDate: expiryDate
            ? {
                [Op.between]: [
                  expirationDate(expiryDate).today,
                  expirationDate(expiryDate).date,
                ],
              }
            : null,
        },
        {
          price: price
            ? {
                [Op.between]: [
                  splitPrice(price).range1,
                  splitPrice(price).range2,
                ],
              }
            : null,
        },
      ],
    };
    const condition =
      (categoryId && price && sellerId) ||
      (expiryDate && price && categoryId) ||
      (expiryDate && price && sellerId)
        ? tripleCondition
        : (product && expiryDate) ||
          (product && sellerId) ||
          (sellerId && expiryDate) ||
          (product && categoryId) ||
          (categoryId && expiryDate) ||
          (categoryId && price) ||
          (sellerId && price) ||
          (expiryDate && price) ||
          (categoryId && sellerId)
        ? andCondition
        : orCondition;
    const response = await Product.findAll({
      where: condition,
    });
    return response.length > 0
      ? response
      : { response, message: "no match found" };
  }
}
export default ProductServices;
