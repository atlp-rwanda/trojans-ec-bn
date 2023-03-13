import changeStatus from "../validations/sales.validation";

const validateStatus = async (req, res, next) => {
  try {
    const { error } = changeStatus.validate(req.body, { abortEarly: false });
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
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export default validateStatus;
