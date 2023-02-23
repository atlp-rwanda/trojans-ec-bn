import multer from "multer";

import storage from "./cloudinary";

const fileFilter = (req, file, cb) => {
  /* istanbul ignore next */
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
const upload = multer({
  storage,
  fileFilter,
});
export default upload;
