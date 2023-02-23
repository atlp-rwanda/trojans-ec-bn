/* eslint-disable no-else-return, require-jsdoc */

const { ProductWishes, Product } = require("../database/models");

class ProductWishesService {
  static async addToProductWishes(req) {
    const productId = req.body.product_id;
    const { id, name, email } = req.user;

    const wish = await ProductWishes.findOne({
      where: { product_id: productId },
    });

    if (wish) {
      let users = wish.users.filter((item) => JSON.parse(item).id === id);
      if (users.length > 0) {
        users = wish.users.filter((item) => JSON.parse(item).id !== id);
        wish.users = users;
        await wish.save();
        if (wish.users.length === 0) {
          await ProductWishes.destroy({ where: { id: wish.id } });
        }
        return "removed to ProductWishes";
      }

      users.push({ id, name, email });
      wish.users = [JSON.stringify(...users), ...wish.users];
      await wish.save();
      return "added to ProductWishes";
    } else {
      const productWish = await ProductWishes.create({
        product_id: productId,
        users: [{ id, name, email }],
      });

      await productWish.save();
      return "added to ProductWishes";
    }
  }

  static async getProductWishes(req) {
    const { id } = req.user;
    const wishList =
      (await ProductWishes.findAll({
        attributes: { exclude: ["product_id", "createdAt", "updatedAt"] },
        include: Product,
      })) || [];
    const newList = [];
    wishList.forEach((element) => {
      const users = element.users || [];
      const user = users.filter((item) => JSON.parse(item).id === id);
      if (user.length > 0) {
        newList.push({ id: element.id, product: element.Product });
      }
    });

    return newList;
  }

  static async getProductWishesByProduct(req) {
    const { id } = req.params;
    const wishList = await ProductWishes.findAll({
      where: { product_id: id },
      attributes: { exclude: ["product_id", "createdAt", "updatedAt"] },
      include: Product,
    });
    return wishList;
  }

  static async getProductWishesByUser(req) {
    const { id } = req.params;
    const wishList =
      (await ProductWishes.findAll({
        attributes: { exclude: ["product_id", "createdAt", "updatedAt"] },
        include: Product,
      })) || [];
    const newList = [];
    wishList.forEach((element) => {
      const users = element.users || [];
      const user = users.filter(
        (item) => JSON.parse(item).id.toString() === id.toString()
      );
      if (user.length > 0) {
        newList.push({ id: element.id, product: element.Product });
      }
    });

    return newList;
  }
}

export default ProductWishesService;
