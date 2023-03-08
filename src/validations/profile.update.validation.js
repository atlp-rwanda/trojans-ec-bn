import Joi from "joi";

const profileUpdateSchema = Joi.object({
  preferredLanguage: Joi.string().min(2).trim().required(),
  preferredCurrency: Joi.string().min(1).trim().required(),
  street: Joi.string().min(3).trim().required(),
  country: Joi.string().min(3).trim().required(),
  postalCode: Joi.string().min(5).trim().required(),
  city: Joi.string().min(3).trim().required(),
  province: Joi.string().min(3).trim().required(),
  profilePic: Joi.any().meta({ swaggerType: "file" }).optional(),
});

const profileUpdateValidation = (req, res, next) => {
  /* istanbul ignore next */
  if (req.file) {
    const body = { ...req.body };
    body.profilePic = req.file.path;
    const { error } = profileUpdateSchema.validate(body, {
      abortEarly: false,
    });
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details.map((detail) =>
          detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
        ),
      });
    } else {
      next();
    }
  } else {
    const { error } = profileUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details.map((detail) =>
          detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
        ),
      });
    } else {
      next();
    }
  }
};

export default profileUpdateValidation;
