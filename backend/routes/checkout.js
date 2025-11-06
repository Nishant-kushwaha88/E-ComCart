const express = require('express');
const router = express.Router();
const CartItem = require('../models/Cart');

router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const cartItems = await CartItem.find();
    if (cartItems.length === 0) return res.status(400).json({ message: 'Cart empty' });
    
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const receipt = {
      orderId: 'ORD-' + Date.now(),
      customerName: name,
      customerEmail: email,
      items: cartItems,
      total: total,
      timestamp: new Date().toISOString(),
      status: 'Success'
    };
    
    await CartItem.deleteMany({});
    res.json({ message: 'Order placed', receipt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;