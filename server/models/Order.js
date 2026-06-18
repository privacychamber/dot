const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    email: { type: String, required: true },
    wantsNews: { type: Boolean, default: false }
  },
  shipping: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    apartment: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
    phone: { type: String, required: true }
  },
  payment: {
    method: { type: String, required: true },
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    total: { type: Number, required: true }
  },
  items: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String },
    image: { type: String }
  }],
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
