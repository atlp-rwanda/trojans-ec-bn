/* istanbul ignore file */

import { Op } from "sequelize";
import Emitter from "../eventEmitter/productEvents";
import { ProductServices, prodEmitter } from "../../services/productService";
import {
  Notification,
  User,
  Product,
  ProductWishes,
} from "../../database/models";
import SendEmail from "../../utils/email";
import { io } from "../../utils/socketio";

const eventObj = new Emitter();

eventObj.on("productExpired", async (data) => {
  try {
    await ProductServices.productExpired(data.id);
  } catch (error) {
    console.log(error);
  }
});

eventObj.setupSchedules();

prodEmitter.on("productMadeExpired", async (data) => {
  try {
    const product = await Product.findOne({
      where: { id: data.id },
      include: [
        {
          model: User,
          as: "seller",
        },
        {
          model: ProductWishes,
          as: "wishList",
        },
      ],
    });

    const { name, email, id } = product.seller;

    // The notification intended for the owner of the product
    const ownerNotification = await Notification.create({
      type: "Product Expired",
      message: `Your product ${product.name} is exppired`,
      recipientId: id,
    });
    const savedOwnerNotification = await ownerNotification.save();
    await new SendEmail(
      {
        name,
        email,
        images: product.images,
        message: savedOwnerNotification.message,
        type: savedOwnerNotification.type,
      },
      null,
      product.name
    ).expiredProduct();
    io.to(`user-${savedOwnerNotification.recipientId}`).emit(
      "productExpired",
      savedOwnerNotification.dataValues
    );

    // The notification intended for the buyers who added the product to the cart
    // const existCarts = await Cart.findAll();
    // const cartsWithProduct = existCarts.items;
    // console.log(existCarts);

    // The notification intended for admins
    const admins = await User.findAll({
      where: { role: "admin" },
    });
    admins.forEach(async (user) => {
      const notification = await Notification.create({
        type: "Product Expired",
        message: `The product ${product.name} of the seller ${name} is exppired`,
        recipientId: user.id,
      });
      const savedNotification = await notification.save();
      io.to(`user-${savedNotification.recipientId}`).emit(
        "productExpired",
        savedNotification.dataValues
      );
      const obj = {
        name: user.name,
        email: user.email,
        type: savedNotification.type,
        message: savedNotification.message,
        images: product.images,
      };
      await new SendEmail(obj, null, null).productExpired();
    });
  } catch (error) {
    console.log(error);
  }
});

prodEmitter.on("productMadeAvailable", async (data) => {
  try {
    const { seller, product } = data;

    const recipients = await User.findAll({
      where: {
        role: {
          [Op.or]: ["admin", "buyer"],
        },
      },
    });
    recipients.forEach(async (user) => {
      const notification = await Notification.create({
        type: "Product Available",
        message: `The product ${product.name} of the seller ${seller.name} is now available for sale`,
        recipientId: user.id,
      });
      const savedNotification = await notification.save();
      io.to(`user-${savedNotification.recipientId}`).emit(
        "productMadeAvailable",
        savedNotification.dataValues
      );
      // nodemail fails here that daily sending quota has exceeded and causes test related to fail.
      // so, I just commented these lines.
      // const obj = {
      //   name: user.name,
      //   email: user.email,
      //   images: product.images,
      //   message: savedNotification.message,
      //   type: savedNotification.type,
      // };
      // await new SendEmail(obj, null, null).productMadeAvailable();
    });
  } catch (error) {
    console.log(error);
  }
});

prodEmitter.on("productRemoved", async (data) => {
  try {
    const { seller, product } = data;
    const recipients = await User.findAll({
      where: {
        role: {
          [Op.or]: ["admin", "buyer"],
        },
      },
    });
    // const existCarts = await Cart.findAll();
    // const cartsWithProduct = existCarts.items;
    // console.log(existCarts);
    recipients.forEach(async (user) => {
      const notification = await Notification.create({
        type: "Product Removed",
        message: `The product ${product.name} of the seller ${seller.name} is now not available for sale`,
        recipientId: user.id,
      });
      const savedNotification = await notification.save();
      io.to(`user-${savedNotification.recipientId}`).emit(
        "productRemoved",
        savedNotification.dataValues
      );
      // nodemail fails here that daily sending quota has exceeded and causes test related to fail.
      // so, I just commented these lines.
      // const obj = {
      //   name: user.name,
      //   email: user.email,
      //   type: savedNotification.type,
      //   message: savedNotification.message,
      //   images: product.images,
      // };
      // await new SendEmail(obj, null, null).productRemoved();
    });
  } catch (error) {
    console.log(error);
  }
});

prodEmitter.on("productAdded", async (data) => {
  try {
    const { userInfo, product } = data;
    // The notification intended for the owner the product
    const ownerNotification = await Notification.create({
      type: "Product Added",
      message: `You added the product ${product.name} to the platform`,
      recipientId: userInfo.id,
    });
    const savedOwnerNotification = await ownerNotification.save();
    const userObj = {
      name: userInfo.name,
      email: userInfo.email,
      type: savedOwnerNotification.type,
      message: savedOwnerNotification.message,
      images: product.images,
    };
    io.to(`user-${savedOwnerNotification.recipientId}`).emit(
      "productAdded",
      savedOwnerNotification.dataValues
    );
    await new SendEmail(userObj, null, null).productAdded();

    const recipients = await User.findAll({
      where: {
        role: {
          [Op.or]: ["admin", "buyer"],
        },
      },
    });
    recipients.forEach(async (user) => {
      const notification = await Notification.create({
        type: "Product Added",
        message: `The product ${product.name} is added by the seller ${userInfo.name}`,
        recipientId: user.id,
      });
      const savedNotification = await notification.save();
      io.to(`user-${savedNotification.recipientId}`).emit(
        "productAdded",
        savedNotification.dataValues
      );

      const obj = {
        name: user.name,
        email: user.email,
        type: savedNotification.type,
        message: savedNotification.message,
        images: product.images,
      };
      await new SendEmail(obj, null, null).productAdded();
    });
  } catch (error) {
    console.log(error);
  }
});

// prodEmitter.on("productBought", async (data) => {
//   try{
// io.to(`user-${savedNotification.recipientId}`).emit(
//   "productBought",
//   savedNotification.dataValues
// );
// await new SendEmail(obj, null, null).productBought();
//   }catch(error){
//     console.log(error);
//   }
// })

// prodEmitter.on("orderAccepted", async (data) => {
//   try{
// io.to(`user-${savedNotification.recipientId}`).emit(
//   "orderAccepted",
//   savedNotification.dataValues
// );
// await new SendEmail(obj, null, null).orderAccepted();
//   }catch(error){
//     console.log(error);
//   }
// })

// prodEmitter.on("orderDenied", async (data) => {
//   try{
// io.to(`user-${savedNotification.recipientId}`).emit(
//   "orderDenied",
//   savedNotification.dataValues
// );
// await new SendEmail(obj, null, null).orderDenied();
//   }catch(error){
//     console.log(error);
//   }
// })
