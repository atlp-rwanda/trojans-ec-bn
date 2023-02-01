import Joi from "joi";
import PasswordComplexity from "joi-password-complexity"

const validateForm = (schema) => (payload) => schema.validate(payload, { abortEarly: false})

const signUpSchema = Joi.object({
    name: Joi.string().min(1).trim().required(),
    email: Joi.string().email().trim().required(),
    password: new PasswordComplexity({
        min: 8,
        max:15,
        lowerCase: 1,
        numeric: 1
      })
})
 
const validatesignUp = validateForm(signUpSchema)

const signupValidation = (req, res, next) => {

    const { error } = validatesignUp(req.body);
    if (error) {
      res
        .status(400)
        .send(
          error.details.map((detail) =>
            detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
         )
        );
    } else {
      next();
    }
  };

  export default signupValidation;