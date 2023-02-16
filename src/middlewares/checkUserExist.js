/* eslint-disable require-jsdoc */

import { User } from "../database/models/index";

export default async function IsUserExist(req, res, next) {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
        return res
        .status(404)
        .json({ status: 404, message: "User is not exist" });
     
    }
    next();
  } catch (error) {
    return res.status(500).json({ status: 500, error: "server error" });
  }
}

// export default isInWishList;
