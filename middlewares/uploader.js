const multer = require("multer");

// setup multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("file");

module.exports = upload;
