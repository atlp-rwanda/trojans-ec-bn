/* eslint-disable import/no-named-as-default-member, import/no-named-as-default */
import Emitter from "../eventEmitter/productEvents";
import ProductServices from "../../services/productService";

const eventObj = new Emitter();

eventObj.on("productExpired", async (data) => {
  /* istanbul ignore next */
  await ProductServices.productExpired(data.id);
});

eventObj.setupSchedules();
