// import { uploadToCloudinary } from "../config/multer";
// import fs from "fs";
// import { uploader } from "../config/multer";
import upload from "../config/multer";
/* istanbul ignore next */
const uploadArray = (name) => {
  return async (req, res, next) => {
    try {
      upload.array(name)(req, res, (err) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            message: "Cloudinary does not support this upload",
          });
        }
        next();
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: "Cloudinary upload error" });
    }
  };
};
/* istanbul ignore next */
const uploadSingle = (name) => {
  return async (req, res, next) => {
    try {
      upload.single(name)(req, res, (err) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            message: "Cloudinary does not support this upload",
          });
        }
        next();
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: "Cloudinary upload error" });
    }
  };
};

export { uploadArray, uploadSingle };
