const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    const products = await Product.insertMany([
      { name: 'Wireless Headphones', price: 2999, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', description: 'Premium headphones', category: 'Electronics' },
      { name: 'Smart Watch', price: 4999, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', description: 'Fitness watch', category: 'Electronics' },
      { name: 'Laptop Backpack', price: 1499, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', description: 'Durable backpack', category: 'Accessories' },
      { name: 'USB-C Cable', price: 299, image: 'https://images.unsplash.com/photo-1591290619762-c588f5b5e1f9?w=500', description: 'Fast charging', category: 'Accessories' },
      { name: 'Mechanical Keyboard', price: 3499, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500', description: 'RGB keyboard', category: 'Electronics' }
    ]);
    res.json({ message: 'Products added', count: products.length, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;