import Joi from "joi";

const statusValidate = Joi.object({
  status: Joi.string().valid("pending", "declined", "delivered").required(),
  deliveredDate: Joi.date().required(),
});

export default statusValidate;
