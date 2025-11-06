const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  price: Number,
  image: String,
  quantity: { type: Number, required: true, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('CartItem', cartItemSchema);