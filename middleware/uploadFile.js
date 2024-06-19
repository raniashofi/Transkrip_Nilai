const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Konfigurasi penyimpanan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const nim_nip = req.userNim_nip; // Replace this with how you get the user's ID
    const dir = path.join(__dirname, "..", "uploads", `user_${nim_nip}`); // Construct the absolute path

    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const nim_nip = req.userNim_nip; // Replace this with how you get the user's ID
    const timestamp = Date.now();
    // Append the timestamp to the filename
    const filename = `${nim_nip}_${timestamp}.jpg`;
    cb(null, filename);
  },
});

// Middleware untuk memeriksa tipe file gambar
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|pdf/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Error: Invalid file type!"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Maksimal ukuran file 5MB
  fileFilter: fileFilter,
});

module.exports = upload;
