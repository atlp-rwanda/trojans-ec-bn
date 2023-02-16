import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "TrojansEcommerce",
  },
});
const storage1 = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Profiles",
  },
});
export { storage, storage1 };
