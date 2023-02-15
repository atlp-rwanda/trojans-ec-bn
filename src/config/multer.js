import multer from "multer";

import { storage1, storage } from "./cloudinary";

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported File Format" }, false);
  }
};

const uploadProductImages = multer({
  storage,
  fileFilter,
});
const uploadProfileImages = multer({ storage1, fileFilter });
export { uploadProductImages, uploadProfileImages };
