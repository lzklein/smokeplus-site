const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Set up storage for multer
const storage = multer.diskStorage({
  destination: 'banner/', 
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Endpoint for handling image uploads
router.post('/upload', upload.single('image'), (req, res) => {
  const { filename } = req.file;
  res.json({ success: true, filename });
});

// Endpoint for handling image deletions
router.post('/delete', (req, res) => {
  const { filename } = req.body;
  const imagePath = path.join(__dirname, 'banner', filename);

  // Delete the file
  fs.unlinkSync(imagePath);

  res.json({ success: true, filename });
});

module.exports = router;
