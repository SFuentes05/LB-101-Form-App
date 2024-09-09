// middleware/multerConfig.js

import multer from 'multer';
import path from 'path';
import { Request } from "express";

// Set up Multer storage and file handling
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set your desired upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the extension to the filename
  }
});

// Multer configuration with storage
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit the file size to 5MB
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; // Accepted file types
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Images Only!'));
    }
  },
});

export interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export default upload;
