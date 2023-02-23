/* eslint-disable require-jsdoc */
import EventEmitter from "events";
import { Product } from "../../database/models";

const schedule = require("node-schedule");

class Emitter extends EventEmitter {
  async setupSchedules() {
    schedule.scheduleJob("0 0 * * *", async () => {
      const products = await Product.findAll();
      products.forEach((data) => {
        const { id, expiryDate } = data.dataValues;
        const expDate = new Date(expiryDate).toLocaleDateString("en-US");
        /* istanbul ignore next */
        const currentDate = new Date().toLocaleDateString("en-US");
        if (currentDate === expDate) {
          this.emit("productExpired", { id });
        }
      });
    });
  }
}

export default Emitter;
