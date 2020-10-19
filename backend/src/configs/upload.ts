import multer from "multer";
import path from "path";

const multerConfig = {
  storage: multer.diskStorage({
    destination: path.join(__dirname, "..", "..", "uploads"),
    filename: (request, file, callback) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      callback(null, fileName);
    },
  }),
};

export default multerConfig;
