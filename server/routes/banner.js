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

// image get
router.get('/images', (req, res) => {
  const imagesFolder = path.join(__dirname, '..', 'banner');
  fs.readdir(imagesFolder, (err, files) => {
    if (err) {
      console.error('Error reading images folder:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const imageFiles = files.map((file) => path.join(imagesFolder, file));
      const images = imageFiles.map((imagePath) => {
        const fileData = fs.readFileSync(imagePath, 'base64');
        const fileName = path.basename(imagePath);
        return { file: `data:image/png;base64,${fileData}`, name: fileName };
      });
      res.json({ bannerImages: images });
    }
  });
});


// image upload
router.post('/upload', upload.single('image'), (req, res) => {
  console.log('uploading image');
  const { filename } = req.file;
  res.json({ success: true, filename });
});

// image delete
router.post('/delete', (req, res) => {
  const { filename } = req.body;
  const imagePath = path.join(__dirname, '..', 'banner', filename);

  try {
    fs.unlinkSync(imagePath);
    res.json({ success: true, filename });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
