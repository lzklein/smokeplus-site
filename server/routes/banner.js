const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Set up storage for multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'banner'), 
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// image upload
router.post('/upload', upload.single('image'), (req, res) => {
  console.log('uploading image')
  const { filename } = req.file;
  res.json({ success: true, filename });
});

// image delete
router.post('/delete', (req, res) => {
  console.log('deleting image')
  const { filename } = req.body;
  const imagePath = path.join(__dirname, '..', 'banner', filename);

  fs.unlinkSync(imagePath);

  res.json({ success: true, filename });
});

module.exports = router;