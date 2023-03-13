import Joi from "joi";

const changeStatus = Joi.object({
  Status: Joi.string().valid("accepted", "declined", "delivered").required(),
});

export default changeStatus;
