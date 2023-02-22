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
    const allCondition = {
      [Op.and]: [
        { name: product ? { [Op.substring]: product } : null },
        {
          expiryDate: expiryDate ? new Date(expiryDate) : null,
        },
        { sellerId: sellerId || null },
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
    };
    const quadrupleCodition = {
      [Op.or]: [
        {
          [Op.and]: [
            { categoryId: categoryId ? categoryId : null },
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
            { name: product ? { [Op.substring]: product } : null },
          ],
        },
        {
          [Op.and]: [
            { categoryId: categoryId ? categoryId : null },
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
        {
          [Op.and]: [
            { categoryId: categoryId ? categoryId : null },
            { sellerId: sellerId || null },
            { name: product ? { [Op.substring]: product } : null },
            { expiryDate: expiryDate ? new Date(expiryDate) : null },
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
            { name: product ? { [Op.substring]: product } : null },
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
            { name: product ? { [Op.substring]: product } : null },
            { expiryDate: expiryDate ? new Date(expiryDate) : null },
          ],
        },
      ],
    };
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
            { name: product ? { [Op.substring]: product } : null },
          ],
        },
        {
          [Op.and]: [
            { sellerId: sellerId || null },
            {
              expiryDate: expiryDate ? new Date(expiryDate) : null,
            },
            { name: product ? { [Op.substring]: product } : null },
          ],
        },
        {
          [Op.and]: [
            { categoryId: categoryId ? categoryId : null },
            {
              expiryDate: expiryDate ? new Date(expiryDate) : null,
            },
            { name: product ? { [Op.substring]: product } : null },
          ],
        },
        {
          [Op.and]: [
            { categoryId: categoryId ? categoryId : null },
            {
              expiryDate: expiryDate ? new Date(expiryDate) : null,
            },
            {
              sellerId: sellerId || null,
            },
          ],
        },
        {
          [Op.and]: [
            { categoryId: categoryId ? categoryId : null },
            {
              sellerId: sellerId || null,
            },
            {
              name: product ? { [Op.substring]: product } : null,
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
            {
              name: product ? { [Op.substring]: product } : null,
            },
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
            {
              name: product ? { [Op.substring]: product } : null,
            },
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
        {
          [Op.and]: [
            { name: product ? { [Op.substring]: product } : null },
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
      categoryId && sellerId && price && product && expiryDate
        ? allCondition
        : (categoryId && sellerId && price && product) ||
          (categoryId && sellerId && price && expiryDate) ||
          (categoryId && sellerId && product && expiryDate) ||
          (categoryId && price && product && expiryDate) ||
          (price && sellerId && product && expiryDate)
        ? quadrupleCodition
        : (categoryId && price && sellerId) ||
          (expiryDate && price && categoryId) ||
          (expiryDate && price && sellerId) ||
          (product && sellerId && price) ||
          (product && expiryDate && sellerId) ||
          (categoryId && product && expiryDate) ||
          (categoryId && sellerId && expiryDate) ||
          (categoryId && sellerId && product) ||
          (product && price && expiryDate) ||
          (categoryId && price && product)
        ? tripleCondition
        : (product && expiryDate) ||
          (product && sellerId) ||
          (product && categoryId) ||
          (sellerId && expiryDate) ||
          (categoryId && expiryDate) ||
          (categoryId && price) ||
          (sellerId && price) ||
          (expiryDate && price) ||
          (categoryId && sellerId) ||
          (product && price)
        ? andCondition
        : orCondition;
    const response = await Product.findAll({
      where: condition,
    });
    return response.length > 0
      ? response
      : { response, message: "no match found" };
  }

  static async markAvailable(id) {
    const product = await Product.findOne({ where: { id } });
    if (product.available === false) {
      await Product.update({ available: true }, { where: { id } });
      return { name: product.name, availability: true };
    }
    if (product.available === true) {
      await Product.update({ available: false }, { where: { id } });
      return { name: product.name, availability: false };
    }
  }

  static async updateItem(req) {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!req.body.expiryDate) {
      req.body.expiryDate = product.expiryDate;
    }
    const { price, name, bonus, expiryDate, categoryId, quantity } = req.body;
    const images = req.files.map((img) => img.path);
    await Product.update(
      { price, name, bonus, expiryDate, categoryId, quantity, images },
      { where: { id: req.params.id } },
    );
  }

  static async deleteItem(id) {
    await Product.destroy({ where: { id } });
  }
}
export default ProductServices;
