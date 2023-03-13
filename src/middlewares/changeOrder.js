import statusValidate from "../validations/order.validation";

const validateOrder = async (req, res, next) => {
  try {
    const { error } = statusValidate.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details.map((detail) =>
          detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
        ),
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export default validateOrder;
