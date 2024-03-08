const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const path = require('path');  // Add this line

const router = express.Router();

app.use(bodyParser.json());

app.get('/', async (req, res) => {
    try {
      const filePath = path.join(__dirname, 'taxRate.json');  // Full path to the file
      const data = await fs.readFile(filePath, 'utf8');
      const taxRate = parseFloat(data);
      res.json({ taxRate });
    } catch (error) {
      console.error('Error reading tax rate:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.patch('/', async (req, res) => {
    const { taxRate } = req.body;

    if (taxRate === undefined || typeof taxRate !== 'number') {
      return res.status(400).json({ error: 'Invalid tax rate format' });
    }

    try {
      const filePath = path.join(__dirname, 'taxRate.json');  // Full path to the file
      await fs.writeFile(filePath, taxRate.toString(), 'utf8');
      res.json({ success: true, taxRate });
    } catch (error) {
      console.error('Error updating tax rate:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
