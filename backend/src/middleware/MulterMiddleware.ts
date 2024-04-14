import multer from "multer";

// Defined multer storage configration
const serverStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Multer indtance using storage storage configration
const storage = multer({storage: serverStorage})

export default storage