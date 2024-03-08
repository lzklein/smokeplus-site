const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const path = require('path');  

const router = express.Router();

router.use(bodyParser.json());

router.get('/', async (req, res) => {
    console.log('getting tax rate!')
    try {
      const filePath = path.join(__dirname, '../taxRate.json'); 
      const data = await fs.readFile(filePath, 'utf8');
      const taxRate = parseFloat(data);
      console.log('tax rate:', taxRate)
      res.json({ taxRate });
    } catch (error) {
      console.error('Error reading tax rate:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.patch('/', async (req, res) => {
    console.log('patching tax rate!')

    const { taxRate } = req.body;
    console.log(taxRate)
    const parsedTaxRate = parseFloat(taxRate);

    if (isNaN(parsedTaxRate)) {
        console.log('invalid input:', typeof taxRate)
        return res.status(400).json({ error: 'Invalid tax rate format' });
    }

    try {
        const filePath = path.join(__dirname, '../taxRate.json'); 
        await fs.writeFile(filePath, parsedTaxRate.toString(), 'utf8');
        res.json({ success: true, taxRate: parsedTaxRate });
    } catch (error) {
        console.error('Error updating tax rate:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }  
});

module.exports = router;
