// Import required modules
const multer = require("multer"); // For handling file uploads
const path = require("path"); // For handling file paths
const fs = require("fs"); // For file system operations
const createError = require("http-errors"); // For creating HTTP errors

/**
 * Function to create a route for file uploads based on the current date.
 * @param {Object} req - The request object.
 * @returns {string} - The directory path for file uploads.
 */
function createRoute(req) {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = date.getMonth().toString();
  const day = date.getDate().toString();
  const directory = path.join(
    __dirname,
    "..",
    "public",
    "uploads",
    "blogs",
    year,
    month,
    day
  );
  req.body.fileUploadPath = path.join("uploads", "blogs", year, month, day);
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}

// Configuration for storing uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file?.originalname) {
      const filePath = createRoute(req);
      return cb(null, filePath);
    }
    cb(null, null);
  },
  filename: (req, file, cb) => {
    if (file.originalname) {
      const ext = path.extname(file.originalname);
      const fileName = String(new Date().getTime() + ext);
      req.body.filename = fileName;
      return cb(null, fileName);
    }
    cb(null, null);
  },
});

// Function to filter allowed picture file types
function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname);
  const mimetypes = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  if (mimetypes.includes(ext)) {
    return cb(null, true);
  }
  return cb(createError.BadRequest("The sending format was not correct"));
}

// Function to filter allowed video file types
function videoFilter(req, file, cb) {
  const ext = path.extname(file.originalname);
  const mimetypes = [".mp4", ".mpg", ".mov", ".avi", ".mkv"];
  if (mimetypes.includes(ext)) {
    return cb(null, true);
  }
  return cb(createError.BadRequest("The sending format for video was not correct"));
}

// Maximum file sizes
const pictureMaxSize = 1 * 1000 * 1000; // 1MB for pictures
const videoMaxSize = 300 * 1000 * 1000; // 300MB for videos

// Multer middleware configurations for file uploads
const uploadFile = multer({ storage, fileFilter, limits: { fileSize: pictureMaxSize } });
const uploadVideo = multer({ storage, videoFilter, limits: { fileSize: videoMaxSize } });

// Export configured multer middlewares
module.exports = {
  uploadFile,
  uploadVideo
};
