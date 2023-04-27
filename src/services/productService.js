/* eslint-disable no-plusplus, no-nested-ternary, require-jsdoc */

import { Op } from "sequelize";
import EventEmitter from "events";
import { expirationDate, splitPrice } from "../utils/searchUtil";
import stats from "../utils/sellerStats";

const { Product, Category, Ratings, Sales } = require("../database/models");

const prodEmitter = new EventEmitter();

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
    prodEmitter.emit("productAdded", {
      userInfo: req.user,
      product: item.dataValues,
    });
    return "item created";
  }

  static async getAllItems(user) {
    let products;
    if (user.role === "seller") {
      const getAll = await Product.findAll({
        where: { sellerId: user.id },
        include: {
          model: Ratings,
          as: "ratings",
          attributes: ["name", "rate", "feedback"],
        },
      });
      const newProductsArr = getAll.map((product) => {
        const rating = product.dataValues.ratings;
        let total = 0;
        let average;
        let message;
        if (rating.length === 0) {
          total = 0;
          average = 0;
          message = "this product is not rated yet";
        } else {
          for (let i = 0; i < rating.length; i++) {
            total += rating[i].rate;
          }
          average = Math.round((total / rating.length) * 10) / 10;
        }
        const returnValue = average
          ? { ...product.dataValues, average }
          : { ...product.dataValues, message };
        return returnValue;
      });
      products = newProductsArr;
    } else if (user.role === "buyer") {
      const getAll = await Product.findAll({
        where: { [Op.and]: [{ available: true, expired: false }] },
        include: {
          model: Ratings,
          as: "ratings",
          attributes: ["name", "rate", "feedback"],
        },
      });
      const newProductsArr = getAll.map((product) => {
        const rating = product.dataValues.ratings;
        let total = 0;
        let average;
        let message;
        if (rating.length === 0) {
          total = 0;
          average = 0;
          message = "this product is not rated yet";
        } else {
          for (let i = 0; i < rating.length; i++) {
            total += rating[i].rate;
          }
          average = Math.round((total / rating.length) * 10) / 10;
        }
        const returnValue = average
          ? { ...product.dataValues, average }
          : { ...product.dataValues, message };
        return returnValue;
      });
      products = newProductsArr;
    } else if (user.role === "admin") {
      const getAll = await Product.findAll({
        include: {
          model: Ratings,
          as: "ratings",
          attributes: ["name", "rate", "feedback"],
        },
      });
      const newProductsArr = getAll.map((product) => {
        const rating = product.dataValues.ratings;
        let total = 0;
        let average;
        let message;
        if (rating.length === 0) {
          total = 0;
          average = 0;
          message = "this product is not rated yet";
        } else {
          for (let i = 0; i < rating.length; i++) {
            total += rating[i].rate;
          }
          average = Math.round((total / rating.length) * 10) / 10;
        }
        const returnValue = average
          ? { ...product.dataValues, average }
          : { ...product.dataValues, message };
        return returnValue;
      });
      products = newProductsArr;
    }
    return products;
  }

  static async getSingleItem(user, id) {
    let products = {};
    if (user.role === "seller") {
      const getOne = await Product.findOne({
        where: { sellerId: user.id, id },
        include: {
          model: Ratings,
          as: "ratings",
          attributes: ["name", "rate", "feedback"],
        },
      });
      const rating = getOne.dataValues.ratings;
      let total = 0;
      let average;
      let message;
      if (rating.length === 0) {
        total = 0;
        average = 0;
        message = "this product is not rated yet";
      } else {
        for (let i = 0; i < rating.length; i++) {
          total += rating[i].rate;
        }
        average = Math.round((total / rating.length) * 10) / 10;
      }
      products = average
        ? { ...getOne.dataValues, average }
        : { ...getOne.dataValues, message };
    } else if (user.role === "buyer") {
      const getOne = await Product.findOne({
        where: { [Op.and]: [{ id, available: true, expired: false }] },
        include: {
          model: Ratings,
          as: "ratings",
          attributes: ["name", "rate", "feedback"],
        },
      });
      const rating = getOne.dataValues.ratings;
      let total = 0;
      let average;
      let message;
      if (rating.length === 0) {
        total = 0;
        average = 0;
        message = "this product is not rated yet";
      } else {
        for (let i = 0; i < rating.length; i++) {
          total += rating[i].rate;
        }
        average = Math.round((total / rating.length) * 10) / 10;
      }
      products = average
        ? { ...getOne.dataValues, average }
        : { ...getOne.dataValues, message };
    } else if (user.role === "admin") {
      const getOne = await Product.findOne({
        where: { id },
        include: {
          model: Ratings,
          as: "ratings",
          attributes: ["name", "rate", "feedback"],
        },
      });
      const rating = getOne.dataValues.ratings;
      let total = 0;
      let average;
      let message;
      if (rating.length === 0) {
        total = 0;
        average = 0;
        message = "this product is not rated yet";
      } else {
        for (let i = 0; i < rating.length; i++) {
          total += rating[i].rate;
        }
        average = Math.round((total / rating.length) * 10) / 10;
      }
      products = average
        ? { ...getOne.dataValues, average }
        : { ...getOne.dataValues, message };
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
          expiryDate: expiryDate
            ? {
                [Op.between]: [
                  expirationDate(expiryDate).today,
                  expirationDate(expiryDate).date,
                ],
              }
            : null,
        },
        { sellerId: sellerId || null },
        { categoryId: categoryId || null },
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
          expired: false,
        },
        {
          available: true,
        },
      ],
    };
    const quadrupleCodition = {
      [Op.or]: [
        {
          [Op.and]: [
            { categoryId: categoryId || null },
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
            {
              expired: false,
            },
            {
              available: true,
            },
            { name: product ? { [Op.substring]: product } : null },
          ],
        },
        {
          [Op.and]: [
            { categoryId: categoryId || null },
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
            {
              expired: false,
            },
            {
              available: true,
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
          ],
        },
        {
          [Op.and]: [
            { categoryId: categoryId || null },
            { sellerId: sellerId || null },
            { name: product ? { [Op.substring]: product } : null },
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
              expired: false,
            },
            {
              available: true,
            },
          ],
        },
        {
          [Op.and]: [
            { categoryId: categoryId || null },
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
              expired: false,
            },
            {
              available: true,
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
            { name: product ? { [Op.substring]: product } : null },
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
              expired: false,
            },
            {
              available: true,
            },
          ],
        },
      ],
    };
    const tripleCondition = {
      [Op.or]: [
        {
          [Op.and]: [
            { categoryId: categoryId || null },
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
            {
              expired: false,
            },
            {
              available: true,
            },
          ],
        },
        {
          [Op.and]: [
            { categoryId: categoryId || null },
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
              expired: false,
            },
            {
              available: true,
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
              expired: false,
            },
            {
              available: true,
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
            { name: product ? { [Op.substring]: product } : null },
            {
              expired: false,
            },
            {
              available: true,
            },
          ],
        },
        {
          [Op.and]: [
            { sellerId: sellerId || null },
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
            { name: product ? { [Op.substring]: product } : null },
            {
              expired: false,
            },
            {
              available: true,
            },
          ],
        },
        {
          [Op.and]: [
            { categoryId: categoryId || null },
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
            { name: product ? { [Op.substring]: product } : null },
            {
              expired: false,
            },
            {
              available: true,
            },
          ],
        },
        {
          [Op.and]: [
            { categoryId: categoryId || null },
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
              sellerId: sellerId || null,
            },
            {
              expired: false,
            },
            {
              available: true,
            },
          ],
        },
        {
          [Op.and]: [
            { categoryId: categoryId || null },
            {
              sellerId: sellerId || null,
            },
            {
              name: product ? { [Op.substring]: product } : null,
            },
            {
              expired: false,
            },
            {
              available: true,
            },
          ],
        },
        {
          [Op.and]: [
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
            {
              name: product ? { [Op.substring]: product } : null,
            },
            {
              expired: false,
            },
            {
              available: true,
            },
          ],
        },
        {
          [Op.and]: [
            { categoryId: categoryId || null },
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
            {
              expired: false,
            },
            {
              available: true,
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
              expired: false,
            },
            {
              available: true,
            },
          ],
        },
        {
          [Op.and]: [
            { name: product ? { [Op.substring]: product } : null },
            { sellerId: sellerId || null },
            {
              expired: false,
            },
          ],
        },
        {
          [Op.and]: [
            { sellerId: sellerId || null },
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
              expired: false,
            },
            {
              available: true,
            },
          ],
        },
        {
          [Op.and]: [
            { name: product ? { [Op.substring]: product } : null },
            { categoryId: categoryId || null },
            {
              expired: false,
            },
          ],
        },
        {
          [Op.and]: [
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
            { categoryId: categoryId || null },
            {
              expired: false,
            },
            {
              available: true,
            },
          ],
        },
        {
          [Op.and]: [
            { categoryId: categoryId || null },
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
              expired: false,
            },
            {
              available: true,
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
            {
              expired: false,
            },
            {
              available: true,
            },
          ],
        },
        {
          [Op.and]: [
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
            {
              expired: false,
            },
            {
              available: true,
            },
          ],
        },
        {
          [Op.and]: [
            { categoryId: categoryId || null },
            { sellerId: sellerId || null },
            {
              expired: false,
            },
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
            {
              expired: false,
            },
            {
              available: true,
            },
          ],
        },
      ],
    };
    const orCondition = {
      [Op.or]: [
        {
          [Op.and]: [
            {
              expired: false,
            },
            {
              available: true,
            },
            {
              categoryId: categoryId || null,
            },
          ],
        },
        {
          [Op.and]: [
            {
              expired: false,
            },
            {
              available: true,
            },
            {
              sellerId: sellerId || null,
            },
          ],
        },
        {
          [Op.and]: [
            {
              expired: false,
            },
            {
              available: true,
            },
            {
              name: product ? { [Op.iLike]: `%${product}%` } : null,
            },
          ],
        },
        {
          [Op.and]: [
            {
              expired: false,
            },
            {
              available: true,
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
          ],
        },
        {
          [Op.and]: [
            {
              expired: false,
            },
            {
              available: true,
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

  static async markAvailable(data) {
    const { id, user } = data;
    const product = await Product.findOne({ where: { id } });
    if (product.available === false) {
      await Product.update({ available: true }, { where: { id } });
      prodEmitter.emit("productMadeAvailable", { seller: user, product });
      return { name: product.name, availability: true };
    }
    if (product.available === true) {
      await Product.update({ available: false }, { where: { id } });
      prodEmitter.emit("productMadeUnAvailable", { seller: user, product });
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
      { where: { id: req.params.id } }
    );
  }

  static async deleteItem(data) {
    const { id, seller, product } = data;
    await Product.destroy({ where: { id }, cascade: true });
    prodEmitter.emit("productRemoved", { seller, product });
  }

  static async productExpired(prodId) {
    const id = prodId;
    await Product.update({ expired: true }, { where: { id } });
    prodEmitter.emit("productMadeExpired", { id });
    return "Product Expired";
  }

  static async getStats(user) {
    const { id } = user;
    const numSales = await Sales.count({ where: { Sellerid: id } });
    const products = await Product.findAll({ where: { sellerId: id } });
    return stats(products, numSales);
  }

  static async createRatings(req) {
    const { user } = req;
    const { rate, feedback } = req.body;
    const ratings = await Ratings.create({
      name: user.name,
      rate,
      feedback,
      buyerId: user.id,
      productId: req.params.id,
    });
    ratings.save();
    return ratings;
  }

  static async updateFeedback(req) {
    const { user } = req;
    const { id, ratingId } = req.params;
    const { rate, feedback } = req.body;
    await Ratings.update(
      {
        name: user.name,
        rate,
        feedback,
        buyerId: user.id,
        productId: id,
      },
      {
        where: { [Op.and]: [{ productId: id, id: ratingId }] },
      }
    );
    const rating = await Ratings.findOne({
      where: { [Op.and]: [{ productId: id, id: ratingId }] },
    });
    return rating;
  }
}
export { ProductServices, prodEmitter };
