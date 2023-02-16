/* eslint-disable no-else-return */
/* eslint-disable require-jsdoc */
const { ProductWishes, Product } = require("../database/models");

class WishListService {
  static async addToWishList(req) {
    const productId = req.body.product_id;
    const { id, name, email } = req.user;

    const wish = await ProductWishes.findOne({ where: { product_id:productId } });

    if (wish) {
      let users = wish.users.filter((item) => JSON.parse(item).id === id);
      if (users.length > 0) {
        users = wish.users.filter((item) => JSON.parse(item).id !== id);
        console.log(id)
        wish.users = users;
        await wish.save();
        if (wish.users.length === 0) {
          await ProductWishes.destroy({ where: { id: wish.id } });
        }
        return "removed to wishList";
      }

      users.push({ id, name, email });
      wish.users = [JSON.stringify(...users),...wish.users];
      await wish.save();
      return "added to wishList";
    }else{

      const productWish = await ProductWishes.create({
        product_id: productId,
        users: [{ id, name, email }],
      });
  
      await productWish.save();
      return "added to wishList";
    }

  }

  static async getWishList(req) {
    const { id } = req.user;
    const wishList =
      (await ProductWishes.findAll({
        attributes: { exclude: ["product_id", "createdAt", "updatedAt"] },
        include: Product,
      })) || [];
    const newList = [];
    wishList.forEach( (element)=> {
 
      const users = element.users || [];
      const user = users.filter((item) => JSON.parse(item).id === id);
      if (user.length > 0) {
        newList.push({ id: element.id, product: element.Product });
      }
    });

    return newList;
  }
  
  static async getWishListByProduct(req) {
    const { id } = req.params;
    const wishList = await ProductWishes.findAll({
      where: { product_id: id },
      attributes: { exclude: ["product_id", "createdAt", "updatedAt"] },
      include: Product,
    });
    return wishList;
  }

  static async getWishListByUser(req) {
    const { id } = req.params;
    const wishList =
      await ProductWishes.findAll({
        attributes: { exclude: ["product_id", "createdAt", "updatedAt"] },
        include: Product,
      }) || [];
    const newList = [];
    wishList.forEach((element) => {
      const users = element.users || [];
      const user = users.filter((item) => JSON.parse(item).id.toString() === id.toString());
      console.log(user)
      if (user.length > 0) {
        newList.push({ id: element.id, product: element.Product });
      }
    });

    return newList;
  }
}

export default WishListService;
