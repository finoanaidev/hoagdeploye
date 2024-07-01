
// const express = require("express");
// const router = express.Router();

// // Importez le contrôleur depuis le chemin correct
// const PdfController = require('../controllers/PdfController');

// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./files");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// router.post("/upload-files", upload.single("file"), PdfController.uploadFile);
// router.get("/get-files", PdfController.getFiles);

// module.exports = router;

const express = require("express");
const router = express.Router();

// Importez le contrôleur depuis le chemin correct
const PdfController = require('../controllers/PdfController');

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload-files", upload.single("file"), PdfController.uploadFile);
router.get("/get-files", PdfController.getFiles);

module.exports = router;
