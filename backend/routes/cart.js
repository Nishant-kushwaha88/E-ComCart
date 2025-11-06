const express = require('express');
const router = express.Router();
const CartItem = require('../models/Cart');
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.json({ cartItems, total, itemCount: cartItems.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    const existingItem = await CartItem.findOne({ productId });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json({ message: 'Updated', cartItem: existingItem });
    }
    
    const newItem = new CartItem({ productId, name: product.name, price: product.price, image: product.image, quantity });
    await newItem.save();
    res.status(201).json({ message: 'Added', cartItem: newItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const cartItem = await CartItem.findByIdAndUpdate(req.params.id, { quantity: req.body.quantity }, { new: true });
    res.json({ message: 'Updated', cartItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;