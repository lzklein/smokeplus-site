const express = require('express');
const { sequelize, Product,Cart } = require('../models'); 
const { Op } = require('sequelize');
const Fuse = require('fuse.js');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    console.log("Getting All!")
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific product
router.get('/:id', async (req, res) => {
    console.log("Getting One!")

  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get hamburger categories as an array
router.get('/hamburger/category', async (req, res) => {

  try {
    const products = await Product.findAll({
      attributes: ['categories', 'subcategories', 'brands'],
    });

    if (products.length > 0) {
      const categoriesArray = [];

      products.forEach(product => {
        const { categories: productCategories, subcategories, brands } = product;

        const existingCategory = categoriesArray.find(item => item.category === productCategories);

        if (existingCategory) {
          const existingSubcategory = existingCategory.subcategories.find(item => item.subcategory === subcategories);

          if (existingSubcategory) {
            if (!existingSubcategory.brands.includes(brands)) {
              existingSubcategory.brands.push(brands);
            }
          } else {
            existingCategory.subcategories.push({
              subcategory: subcategories,
              brands: [brands],
            });
          }
        } else {
          categoriesArray.push({
            category: productCategories,
            subcategories: [{
              subcategory: subcategories,
              brands: [brands],
            }],
          });
        }
      });

      res.json(categoriesArray);
    } else {
      res.status(404).json({ error: 'No products found' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Fuzzy search for products
router.get('/search/:query', async (req, res) => {
  const searchQuery = req.params.query;

  try {
    const products = await Product.findAll();

    // fuse parameters
    const fuseOptions = {
      keys: ['name', 'flavor', 'categories', 'sizes'],
      threshold: 0.5,
    };
    
    const fuse = new Fuse(products, fuseOptions);
    const searchResults = fuse.search(searchQuery);

    res.json(searchResults);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get flavors of product
router.get('/:productName/flavors', async (req, res) => {
  const productName = req.params.productName;

  try {
    const products = await Product.findAll({
      where: {
        name: productName,
      },
    });

    if (products.length > 0) {
      // const flavors = products.map(product => product.flavor);
      res.json(products);
    } else {
      res.status(404).json({ error: 'Flavors not found for the specified product' });
    }
  } catch (error) {
    console.error('Error fetching flavors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get sizes for product
router.get('/:productName/sizes', async (req, res) => {
  const productName = req.params.productName;

  try {
    const products = await Product.findAll({
      where: {
        name: productName,
      },
    });

    if (products.length > 0) {
      // const sizes = products.map(product => product.size);
      res.json(products);
    } else {
      res.status(404).json({ error: 'Sizes not found for the specified product' });
    }
  } catch (error) {
    console.error('Error fetching sizes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get all categories
router.get('/category/:category', async (req, res) => {
  const category = req.params.category;

  try {
    const products = await Product.findAll({
      where: {
        categories: category,
      },
    });

    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).json({ error: 'Products not found for the specified category' });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get all subcategories
router.get('/subcategory/:subcategory', async (req, res) => {
  const subcategory = req.params.subcategory;

  try {
    const products = await Product.findAll({
      where: {
        subcategories: subcategory,
      },
    });

    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).json({ error: 'Products not found for the specified subcategory' });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get all brands
router.get('/brand/:brand', async (req, res) => {
  const brand = req.params.brand;

  try {
    const products = await Product.findAll({
      where: {
        brands: brand,
      },
    });

    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).json({ error: 'Products not found for the specified brand' });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get all popular
router.post('/popular', async (req, res) => {
  console.log('getting popular products!');
  try {
    const popularProducts = await Product.findAll({
      where: {
        popular: 1,
      },
    });
    res.json(popularProducts);
  } catch (error) {
    console.error('Error fetching related products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all deals
router.post('/deals', async (req, res) => {
  console.log('getting deals products!');
  try {
    const dealsProducts = await Product.findAll({
      where: {
        deals: {
          [Op.not]: 0,
        }      
      },
    });
    res.json(dealsProducts);
  } catch (error) {
    console.error('Error fetching related products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get random products
router.post('/related-products/:category', async (req, res) => {
  const category = req.params.category;
  console.log('getting related products!');
  try {
    let productIdCondition = {}; 
    if (req.body.productId) {
      productIdCondition = {
        id: {
          [Op.ne]: req.body.productId,
        },
      };
    }

    let popularCondition = {};
    if (category === 'popular') {
      popularCondition = {
        popular: 1,
      };
    }

    let dealsCondition = {};
    if (category === 'deals') {
      dealsCondition = {
        deals: {
          [Op.not]: 0,
        }
      };
    }

    const relatedProducts = await Product.findAll({
      where: {
        ...productIdCondition,
        ...popularCondition,
        ...dealsCondition,
        ...(category !== 'deals' && category !== 'popular' && { categories: category }),
      },
      order: sequelize.literal('RANDOM()'),
      limit: 4,
    });
    res.json(relatedProducts);
  } catch (error) {
    console.error('Error fetching related products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new product
router.post('/', async (req, res) => {
    console.log("Posting!")

    const { name, categories, subcategories, brands, sizes, flavors, price, quantity, description, image, id } = req.body;

    try {
      const newProduct = await Product.create({
        name,
        categories,
        subcategories,
        brands,
        price,
        quantity,
        description,
        image,
        id, 
        sizes,
        flavors
      });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Excel Quantity Updater
router.patch('/excel', async (req, res) => {

  const { id, quantity } = req.body; 
  console.log(id, quantity);

  try {
    const product = await Product.findByPk(id);
    if (product) {
      // Subtract quantity from Product.quantity
      const updatedQuantity = product.quantity - quantity;

      const productChanges = {
        quantity: updatedQuantity,
      };

      await product.update(productChanges);
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a product
router.patch('/:id', async (req, res) => {
  console.log("Patching!");

  const productId = req.params.id;
  const {productChanges} = req.body; 
  console.log(productChanges)
  try {
    const product = await Product.findByPk(productId);
    if (product) {
      await product.update(productChanges);
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  console.log("Deleting!")
  const productId = req.params.id;
  console.log(productId)
  try {
    const deletedCarts = await Cart.destroy({
      where: { product: productId },
    });

    const product = await Product.findByPk(productId);
    console.log(product)
    if (product) {
      await product.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;