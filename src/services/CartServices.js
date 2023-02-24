/* eslint-disable require-jsdoc */
const { Cart, Product } = require("../database/models");

class CartServices {
  static async addItem(req) {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id, available: true } });
    if (product) {
      const item = {
        id: product.id,
        name: product.name,
        image: product.images[0],
        quantity: 1,
        price: product.price,
        Ptotal: product.price,
      };
      const cart = await Cart.findOne({ where: { buyerId: req.user.id } });
      if (!cart) {
        const newCart = await Cart.create({
          items: [item],
          buyerId: req.user.id,
        });
        newCart.total = newCart.items
          .map((item1) => JSON.parse(item1.Ptotal))
          .reduce((sum, next) => sum + next);
        await newCart.save();
        return " added to Cart2";
      }
      const itemExists = cart.items.findIndex(
        (cartitem) => cartitem.id === item.id
      );
      if (itemExists === -1) {
        cart.items.push(item);
        const subtotal = cart.items
          .map((item1) => JSON.parse(item1.Ptotal))
          .reduce((sum, next) => sum + next);
        await Cart.update(
          { items: cart.items, total: subtotal },
          { where: { id: cart.id } }
        );
        return " added to Cart2";
      }
    }
  }

  static async getCartItems(user) {
    const cart = await Cart.findOne({ where: { buyerId: user.id } });
    if (!cart) {
      return "Cart is Empty";
    }
    return cart;
  }

  static async clearCart(user) {
    const cart = await Cart.findOne({ where: { buyerId: user.id } });
    if (!cart) {
      return "No Cart exist";
    }
    cart.items = [];
    cart.total = 0;
    cart.save();
  }

  static async updateCart(req) {
    const { quantity } = req.body;
    const { id } = req.params;
    const cart = await Cart.findOne({ where: { buyerId: req.user.id } });
    if (cart) {
      const itemExists = cart.items.findIndex((cartitem) => cartitem.id == id); // eslint-disable-line eqeqeq
      if (itemExists !== -1) {
        // eslint-disable-line eqeqeq
        if (quantity <= 0) {
          cart.items.splice(itemExists, 1);
          if (cart.items.length !== 0) {
            // eslint-disable-line eqeqeq
            const subtotal = cart.items
              .map((item) => JSON.parse(item.Ptotal))
              .reduce((sum, next) => sum + next);
            await Cart.update(
              { items: cart.items, total: subtotal },
              { where: { id: cart.id } }
            );
          } else {
            await Cart.update(
              { items: cart.items, total: 0 },
              { where: { id: cart.id } }
            );
          }
        } else {
          cart.items[itemExists].quantity = quantity;
          cart.items[itemExists].Ptotal *= quantity;
          const subtotal = cart.items
            .map((item) => JSON.parse(item.Ptotal))
            .reduce((sum, next) => sum + next);
          await Cart.update(
            { items: cart.items, total: subtotal },
            { where: { id: cart.id } }
          );
        }
      }
    }
  }
}
export default CartServices;
