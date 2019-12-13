const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid");
const path = require("path");

dotenv.config({ path: "./config.env" });

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: "us-east-2"
});

const s3 = new AWS.S3();

const checkFileType = (file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Invaild image file format! Only jpeg,jpg,png allowed");
  }
};

const upload = multer({
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  },

  storage: multerS3({
    s3,
    bucket: "users-obanj",
    acl: "public-read",
    key: function(req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          uuid() +
          path.extname(file.originalname)
      );
    }
  })
});

module.exports = upload;
